"""Builds ffxiv-sheet.html from ffxiv-plugins-and-openers.md and the downloaded manifests in dl/."""
import glob, html, json, os, re

MD = "ffxiv-plugins-and-openers.md"
s = open(MD, encoding="utf-8-sig").read()

fixes = [
    ("6 Raiton [Ten Chi Jin], then Fuma Shuriken, Raiton, Suiton [Meisui], 10", "6 Raiton [Ten Chi Jin], 7 Fuma Shuriken, 8 Raiton, 9 Suiton [Meisui], 10"),
    ("1 Wing Motif, 2 Hammer Stamp (Starry Muse before it) [Subtractive Palette]", "1 Wing Motif [Starry Muse], 2 Hammer Stamp [Subtractive Palette]"),
    ("- Same through Moon Flute, 5 Triple Trident", "- 1 Whistle, 2 Tingle, 3 Rose of Destruction, 4 Moon Flute [J Kick], 5 Triple Trident"),
]
for a, b in fixes:
    s = s.replace(a, b)
open(MD, "w", encoding="utf-8").write(s)


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', t)
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    return t


def md2html(text):
    out, lines, i = [], text.strip().split("\n"), 0
    while i < len(lines):
        l = lines[i]
        if not l.strip():
            i += 1
        elif l.startswith("### "):
            out.append(f"<h4>{inline(l[4:])}</h4>"); i += 1
        elif l.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip("|").split("|")]); i += 1
            head, body = rows[0], rows[2:]
            t = "<thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead><tbody>"
            t += "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body)
            out.append(f'<div class="tbl"><table>{t}</tbody></table></div>')
        elif l.startswith("- "):
            items = []
            while i < len(lines) and re.match(r"\s*- ", lines[i]):
                items.append(lines[i].strip()[2:]); i += 1
            out.append("<ul>" + "".join(f"<li>{inline(x)}</li>" for x in items) + "</ul>")
        else:
            out.append(f"<p>{inline(l)}</p>"); i += 1
    return "\n".join(out)


def section(n, nxt):
    m = re.search(rf"^## {n}\..*?$(.*?)(?=^## {nxt})", s, re.S | re.M)
    return m.group(1)


def split_top(t):
    parts, d, cur = [], 0, ""
    for ch in t:
        d += ch == "["
        d -= ch == "]"
        if ch == "," and d == 0:
            parts.append(cur.strip()); cur = ""
        else:
            cur += ch
    parts.append(cur.strip())
    return parts


STEP = re.compile(r"^(?:\[([^\]]*)\]\s*)?(\d+(?: to \d+| onward)?) ([^\[]+?)(?:\s*\[(.*)\])?$")


def parse_seq(b):
    tokens = split_top(b)
    steps = []
    for t in tokens:
        m = STEP.match(t)
        if not m:
            return None
        steps.append({"o0": split_top(m[1]) if m[1] else [], "n": m[2], "a": m[3], "o": split_top(m[4]) if m[4] else []})
    return steps if steps and steps[0]["n"].split()[0] in "1" or len(steps) > 3 else None


roles = {"Tanks": "tank", "Healers": "heal", "Melee": "melee", "Physical ranged": "ranged", "Casters": "caster"}
jobs, role, job = [], None, None
for line in section(4, 5).split("\n"):
    if line.startswith("### ") and line[4:] in roles:
        role = line[4:]; job = None
    elif role is None:
        continue
    elif (m := re.match(r"\*\*([A-Z][A-Za-z ]+)\*\* \((.+?)\)\s*$", line)):
        meta = m[2].replace("*", "")
        job = {"name": m[1], "role": roles[role], "group": role, "meta": meta.split(",")[0] if "better" in meta else meta,
               "better": "better" in meta, "blocks": []}
        jobs.append(job)
    elif job and line.startswith("- Pre: "):
        job["blocks"].append({"pre": line[7:]})
    elif job and line.startswith("- "):
        seq = parse_seq(line[2:])
        job["blocks"].append({"seq": seq} if seq else {"note": inline(line[2:])})
    elif job and line.strip():
        job["blocks"].append({"sub" if line.endswith(":") else "note": inline(line.rstrip(":") if line.endswith(":") else line)})

m = re.search(r"### How to read these(.*?)### Source check(.*?)### Tanks", section(4, 5), re.S)
how_html, check_html = md2html(m[1]), md2html(m[2])


def rd(p):
    try:
        return json.load(open(p, encoding="utf-8-sig"))
    except Exception:
        return []


cat = []


def add(src, url, items):
    for p in items:
        d = re.sub(r"\s+", " ", p.get("Punchline") or p.get("Description") or "")
        cat.append([p.get("Name", ""), p.get("Author", ""), src, p.get("DalamudApiLevel") or "", p.get("DownloadCount") or 0, d[:150]])


add("Official", "", rd("dl/pluginmaster.json"))
for f in sorted(glob.glob("dl/puni/*.json")):
    add("Puni: " + os.path.basename(f)[:-5], "", rd(f))
repo_rows = [
    ("Puni.sh core", "ment", "https://love.puni.sh/ment.json"),
    ("NightmareXIV", "nightmare", "https://raw.githubusercontent.com/NightmareXIV/MyDalamudPlugins/main/pluginmaster.json"),
    ("CombatReborn", "rs", "https://raw.githubusercontent.com/FFXIV-CombatReborn/CombatRebornRepo/main/pluginmaster.json"),
    ("Paissa", "paissa", "https://raw.githubusercontent.com/paissaheavyindustries/Dalamud-Repo/main/repo.json"),
    ("Hasel", "haselnuss", "https://raw.githubusercontent.com/Haselnussbomber/MyDalamudPlugins/main/repo.json"),
    ("UnknownX", "unknownx", "https://raw.githubusercontent.com/UnknownX7/DalamudPluginRepo/master/pluginmaster.json"),
    ("Nexus", "nexus", "https://raw.githubusercontent.com/NexusFFXIV/DalamudRepo/main/pluginmaster.json"),
]
for label, f, url in repo_rows:
    add(label, url, rd(f"dl/repos/{f}.json"))
add("Sea of Stars", "", rd("dl/seaofstars.json"))
cat.sort(key=lambda r: r[0].lower())
repos = [[l, u] for l, _, u in repo_rows]
repos += [["Sea of Stars", "https://raw.githubusercontent.com/Ottermandias/SeaOfStars/main/repo.json"],
          ["Puni.sh publisher", "https://puni.sh/api/repository/<publisher>"]]

data = {"jobs": jobs, "cat": cat, "repos": repos}
blob = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")

tpl = open("site_template.html", encoding="utf-8").read()
page = (tpl.replace("%%HOW%%", how_html).replace("%%CHECK%%", check_html)
        .replace("%%ECO%%", md2html(section(1, 2))).replace("%%RISK%%", md2html(section(2, 3)))
        .replace("%%PLUGINS%%", md2html(section(3, 4))).replace("%%PATTERNS%%", md2html(section(5, 6)))
        .replace("%%EVERCOLD%%", md2html(section(6, 7))).replace("%%UNLOCKS%%", md2html(section(7, "Sources"))).replace("%%SOURCES%%", md2html(s.split("## Sources")[1]))
        .replace("%%DATA%%", blob))
open("ffxiv-sheet.html", "w", encoding="utf-8").write(page)
print(len(page), len(jobs), len(cat), [j["name"] for j in jobs if not any("seq" in b for b in j["blocks"])])
