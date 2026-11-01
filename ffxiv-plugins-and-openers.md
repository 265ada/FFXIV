# FFXIV plugins and openers

Researched 2026-10-31. The game is on Dawntrail 7.56, its final patch. Evercold (8.0, level 110) launches 2027-02-23, with early access from 2027-02-19.

The complete plugin lists are in [ffxiv-plugin-catalogue.md](ffxiv-plugin-catalogue.md). This file explains how the ecosystem fits together and gives the openers.

## 1. How the ecosystem works

- **XIVLauncher** is a replacement launcher. It injects **Dalamud**, the plugin framework, into the game.
- **Dalamud** gives plugins game data and hooks. Plugins are C# and draw their UI with ImGui. Common libraries include FFXIVClientStructs, ECommons, KamiLib, OtterGui and PunishLib.
- **API level** is the version gate. Current is API 15. Every game patch can break plugins until authors update, and a major patch often raises the API level. Expect heavy breakage around 8.0.
- **Repositories** are JSON manifests.
  - The official repo is `kamori.goats.dev/Plugin/PluginMaster`, with plugins reviewed by goatcorp.
  - Custom repos are added under Dalamud Settings > Experimental > Custom Plugin Repositories.
- **ACT** (Advanced Combat Tracker) is a separate program that reads combat data for parsing. It uses FFXIV_ACT_Plugin and OverlayPlugin, with cactbot, Triggernometry and Triggevent for triggers.
- **IPC** lets plugins call each other, which is how the automation stack below works.

**The goatcorp page you linked is stale.** It shows 88 plugins. The live manifest has 500, of which 412 are on API 15 and 88 are on older API levels.

### Scale of what I covered

| Source | Plugins |
|---|---|
| Official repo | 500 |
| Puni.sh core repo | 14 |
| Puni.sh publisher repos | about 80, across 29 publishers |
| NightmareXIV | 16 |
| CombatReborn | 10 |
| Sea of Stars | 9 |
| Paissa, Hasel, UnknownX, Nexus | 15 |
| Akurosia's list of custom repos | about 110 repo URLs, not opened individually |

No list of unofficial plugins can be truly complete, because anyone can host a repo. xivplugins.com returned an empty page, so I could not use it.

### Depth of this research

I read manifests and descriptions for all of them, READMEs for only two (Wrath Combo and Umbra), and no source code. The "in depth" notes below combine those sources with my prior knowledge of the ecosystem, so check specifics before relying on them.

## 2. Risk: read this before installing

Square Enix's terms ban all third-party tools, and Yoshida has described this as a blanket ban. The official penalties are suspension, then a permanent ban for repeat offences. In November 2024 a Japanese guild had its world-first clear of a 7.11 fight revoked. I found no 2026 statement that changes this.

**My practical rule, from the sources and my own judgement, not from Square Enix:**

| Tier | Examples | Why |
|---|---|---|
| Lower risk | PingPlugin, Item Search, Allagan Tools, Simple Tweaks, Price Insight | Client-side display and convenience. Still against the terms. |
| Medium | Penumbra, Glamourer, Splatoon, BossMod radar, Avarice | Visible in clips, or gives information the game does not show. |
| High | Wrath auto-rotation, Rotation Solver, AutoDuty, Questionable, Artisan automation, AutoHook, AutoRetainer, Orbwalker, Saucy, vnavmesh pathing | Automated play is the clearest botting case. |
| Avoid | Hoard Farm (its own label says DETECTABLE), Hyperborea, multiboxing tools, Burning Down the House in public | Detectable or exploit-style behaviour. |

- Never show plugin UI in clips or streams, or talk about plugins in-game. Public promotion is itself covered by the notice.
- Off-repo plugins are arbitrary code running in your game process. Only add repos you trust. The official repo's plugins are reviewed, custom repos are not.

## 3. Plugins that matter, by job to be done

### Foundations

| Plugin | Repo | What it does in practice |
|---|---|---|
| Simple Tweaks | Official | Hundreds of small toggles, all off by default. The most-downloaded plugin at 8.9M. |
| VanillaPlus | Official | A newer tweak collection with a focus on native UI. |
| HaselTweaks | Hasel | More QoL tweaks. |
| Allagan Tools | Official | Inventory search across retainers, craft lists, mob and duty lookup. |
| JustBackup | Official | Backs up game and plugin config. Install this first. |
| Umbra XIV | Official | Customisable toolbars and 3D world markers for quests, nodes and FATEs. |

The una-xiv GitHub is Umbra's home: the plugin, the Una.Drawing library, docs, a sample plugin, and add-ons for Bejeweled, Glamourer widgets and CounterSpy (world markers on players targeting you).

### Combat and improvement

| Plugin | Repo | Notes |
|---|---|---|
| OpenerCreator | Official | Build and practise openers. The best match for section 4. |
| ActionTimeline | Official | Shows your actions live, which makes GCD clipping visible. |
| DragoonMayCry | Official | Style ranks for fundamentals. |
| Death Recap | Official | Explains what killed someone. |
| NoTankYou | Official | Warns about missing stances, food and role actions. |
| JobBars, DelvUI, DelvCD | Official | Gauges, party cooldowns, replacement HUD. |
| XIV Combo | Official | Puts combos on one button. Press-to-act only. |
| Mouseover Action, Redirect | Official | Mouseover targeting without macros. |
| ReAction, ReActionEx | UnknownX, taurenkey | Queuing and input QoL. |
| NoClippy | UnknownX | Reduces lag effects and shows GCD clips. |
| Wrath Combo | Puni | XIVCombo plus Simple and Advanced one-button modes, and Auto-Rotation. |
| Rotation Solver Reborn | CombatReborn | Full automated rotation. |
| Boss Mod | veyn | Mechanic radar, with an AI movement module in the Reborn fork. |
| Splatoon | Puni | Scriptable world overlay. Layouts draw mechanics. |
| Avarice | Puni | Positional and range indicators. |

### Gil and gathering

| Plugin | Repo | Notes |
|---|---|---|
| GatherBuddy | Official | Node and fish lookup, plus timed-node alarms. |
| Craftimizer | Official | Simulate crafts and generate macros. |
| Market board, Price Insight, Penny Pincher | Official | Market lookups and pricing. |
| Allagan Market | Official | Retainer sales and undercut tracking. |
| Submarine Tracker, Accountant | Official | Timers for subs, ventures and more. |
| AutoRetainer, Artisan, AutoHook, Marketbuddy | Puni | Retainer, crafting, fishing and market automation. |

### Cosmetics and modding

| Plugin | Repo | Notes |
|---|---|---|
| Penumbra | Sea of Stars | The core mod loader. |
| Glamourer | Sea of Stars | Appearance changes, client-side. |
| Customize+, Simple Heels, Moodles | Sea of Stars | Body scaling, height, custom statuses. |
| Brio, Ktisis | Sea of Stars | GPose posing. |
| Heliosphere | Sea of Stars | Mod platform on top of Penumbra. |
| DynamicBridge | Sea of Stars, Nightmare | Swaps appearance by condition. |
| VFXEditor | Official | Edits VFX. |
| Glamaholic | Official | Saves glamour plates. |

### Travel and quality of life

| Plugin | Repo | Notes |
|---|---|---|
| Lifestream | Nightmare | Fast Aethernet and world travel. A common dependency. |
| Teleporter | Official | Teleport by chat command. |
| Wotsit | Official | Search-anything launcher. |
| Chat 2 | Official | Replacement chat window. |
| Better Party Finder | Official | Filters and presets. |
| Waymark Preset Plugin | Official | Waymark library and import. |
| Sonar, Hunt Helper | Official | Hunts and relays. |
| Visibility | Official | Hides players and minions for FPS. |
| TextAdvance | Nightmare | Skips dialogue and cutscene prompts. |

### Niche content

| Content | Plugins |
|---|---|
| Eureka and Occult Crescent | Eureka Linker, Eureka Helper, Occult Crescent Helper |
| Bozja | Bozja Buddy |
| Deep Dungeons | MonsterDex, OfDungeonsDeep, Palantir, PalacePal |
| Island Sanctuary | ReSanctuary, Beachcomber, Workshop Optimizer |
| Blue Mage | Blue Mage Helper, Better in Blue |
| Ocean Fishing | Distant Seas, Ocean Fishin' |
| Gold Saucer | ezMiniCactpot, TriadBuddy, ezWondrousTails, Saucy |

### The automation stack

These plugins are built to chain through IPC:

- **vnavmesh** does pathfinding, and many others require it.
- **Boss Mod** or Rotation Solver provides combat AI.
- **AutoDuty** runs dungeons using vnavmesh, a rotation engine and Boss Mod.
- **Questionable** runs quests using vnavmesh, Lifestream and a combat module.
- **Something Need Doing** scripts anything else.
- **Yes Already, Pandora's Box and LazyLoot** handle dialogs and small tasks.

### External tools from your links

- **Parsing:** ACT, FF Logs, xivanalysis.
- **Crafting:** Raphael, Teamcraft.
- **Gearing:** xivgear.app. The older etro.gg and Ariyala are still listed in xiv-resources.
- **Market:** Universalis.
- **Guides:** The Balance, The PF Strat, Allagan Studies.
- **Developers:** Lumina, FFXIVClientStructs, XIVAPI, xiv.dev.

## 4. Openers

### How to read these

- `-1.5` means seconds before pull, on the countdown.
- GCDs are numbered.
- `[brackets]` are oGCDs weaved after that GCD.
- `Pot` is the current-tier tincture.

### Source check

- I read all 25 charts on the openers link, then compared them with The Balance's current pages.
- **That link's page says 7.4, but several charts are older.**
- **Better version found for 2 jobs:** Viper's opener changed in 7.5, and Summoner's 7.5 chart runs longer. Both are below.
- **Worth knowing for 5 more:** Dragoon, Reaper, Scholar, Gunbreaker and Monk have useful alternatives or notes.
- **The rest:** where I read both versions, the Balance chart matches the sequence on the link. I did not read the Balance copies for White Mage or Sage. Some Balance pages have not been updated since 7.1 to 7.4, so a chart may simply not have been revised. Ninja's page says 7.1, and Astrologian's says 7.3.
- **Machinist, Bard, Red Mage, Pictomancer:** I read only the main chart. Their alternates are named, not transcribed.

All sequences were transcribed from images, so run each one once in-game with OpenerCreator to catch any misread.

### Tanks

**Paladin** (chart 7.0, page 7.4)
- Pre: `-1.75` Holy Spirit
- 1 Fast Blade, 2 Riot Blade [Pot], 3 Royal Authority [Fight or Flight, Imperator], 4 Confiteor [Circle of Scorn, Expiacion], 5 Blade of Faith [Intervene], 6 Blade of Truth [Intervene], 7 Blade of Valor [Blade of Honor], 8 Goring Blade, 9 Atonement, 10 Supplication, 11 Sepulchre, 12 Holy Spirit
- Filler: Royal Authority, Atonement, Fast Blade, Riot Blade, Supplication, Holy Spirit, Sepulchre, then repeat. Use Fight or Flight whenever it comes off cooldown.

**Warrior** (7.2, page 7.4)
- Pre: `-0.7` Tomahawk, Infuriate at pull
- 1 Heavy Swing, 2 Maim, 3 Storm's Eye [Inner Release, Pot], 4 Inner Chaos [Upheaval, Onslaught], 5 Fell Cleave [Onslaught], 6 Fell Cleave [Onslaught], 7 Fell Cleave [Primal Wrath, Infuriate], 8 Primal Rend, 9 Primal Ruination, 10 Inner Chaos, 11 Heavy Swing, 12 Maim, 13 Storm's Path, 14 Fell Cleave [Infuriate], 15 Inner Chaos
- Buffs are expected up around 7.8s. Above about 2.45 GCD, oGCDs may shift slightly.

**Dark Knight** (chart 7.2, page 7.5)
- Pre: `-3` The Blackest Night, `-1` Unmend [Pot]
- [Edge of Shadow] 1 Hard Slash [Living Shadow], 2 Syphon Strike, 3 Souleater [Delirium], 4 Disesteem [Salted Earth, Edge], 5 Scarlet Delirium [Shadowbringer, Edge], 6 Comeuppance [Carve and Spit, Edge], 7 Torcleaver [Shadowbringer, Edge], 8 Bloodspiller [Salt and Darkness]
- If the pre-pull Blackest Night will not break, skip it and use the last Edge once MP allows.

**Gunbreaker** (7.4)
- Pre: `-0.7` Lightning Shot, Bloodfest at pull
- 1 Keen Edge, 2 Brutal Shell [No Mercy, Pot], 3 Gnashing Fang [Jugular Rip, Bow Shock], 4 Double Down [Blasting Zone], 5 Sonic Break, 6 Savage Claw [Abdomen Tear], 7 Wicked Talon [Eye Gouge], 8 Reign of Beasts, 9 Noble Blood, 10 Lionheart, 11 Solid Barrel, 12 Gnashing Fang [Jugular Rip]
- Late-weave No Mercy if your GCD can fit 9 GCDs inside it. Do not facepull. Trajectory at `-0.66` or Provoke at `-0.6` also work.

### Healers

**White Mage** (7.4)
- Pre: `-2.3` Glare III
- [Pot] 1 Dia, 2 Glare III, 3 Glare III [Presence of Mind, Assize], 4 Glare IV, 5 Afflatus Misery, 6 Glare IV, 7 Glare IV, 8 to 12 Glare III, 13 Dia
- This refreshes Dia early. Double Misery is a niche alternative for two-target pulls.

**Scholar** (chart 7.0, page 7.4)
- Pre: `-1.5` Broil IV
- [Pot] 1 Biolysis [Dissipation], 2 Broil IV [Chain Stratagem], 3 Broil IV [Energy Drain], 4 Broil IV [Energy Drain], 5 Broil IV [Energy Drain], 6 Broil IV [Aetherflow], 7 Broil IV [Baneful Impaction], 8 Broil IV [Energy Drain], 9 Broil IV [Energy Drain], 10 Broil IV [Energy Drain], 11 Biolysis
- The page says you can swap Aetherflow and Dissipation. Dissipation first returns your fairy about 15s sooner. Energy Drain placement is flexible, so hold stacks if the fight needs healing.
- On the chart, the first oGCD is labelled Dissipation and the second is Dissipation as well. I read the second as Aetherflow from context, so check this one.

**Astrologian** (7.01, page 7.3)
- Pre: `-4` Earthly Star (anywhere from `-19`), `-2.1` Fall Malefic
- [Pot] 1 Combust III [Lightspeed], 2 Fall Malefic, 3 Fall Malefic [Divination, the Balance], 4 Fall Malefic [Lord of Crowns, Umbral Draw], 5 Fall Malefic [the Spear, Oracle], 6 to 10 Fall Malefic, 11 Combust III, 12 Fall Malefic
- Card DPS, not yourself. The chart shows self-use only for timing.

**Sage** (7.0, page 7.3)
- Pre: `-5` Eukrasia, `-2.1` Pot, `-1.5` Toxikon II
- 1 Eukrasian Dosis III, 2 to 4 Dosis III, 5 Phlegma III [Psyche], 6 Phlegma III, 7 to 10 Dosis III, 11 Eukrasia, 12 Eukrasian Dosis III, 13 to 15 Dosis III
- The Pneuma opener is the alternative.

### Melee

**Monk** (chart 7.0, page 7.4)
Solar Lunar:
- 1 Dragon Kick [Perfect Balance], 2 Twin Snakes [Pot], 3 Demolish [Brotherhood, Riddle of Fire], 4 Leaping Opo [Forbidden Chakra, Riddle of Wind], 5 Rising Phoenix, 6 Dragon Kick, 7 Wind's Reply, 8 Fire's Reply, 9 Leaping Opo [Perfect Balance], 10 Dragon Kick, 11 Leaping Opo, 12 Dragon Kick, 13 Elixir Burst, 14 Leaping Opo

Double Lunar:
- 1 Dragon Kick [Perfect Balance, Pot], 2 Leaping Opo, 3 Dragon Kick [Brotherhood, Riddle of Fire], 4 Leaping Opo [Forbidden Chakra, Riddle of Wind], 5 Elixir Burst, 6 Dragon Kick, 7 Wind's Reply, 8 Fire's Reply, 9 Leaping Opo [Perfect Balance], 10 Dragon Kick, 11 Leaping Opo, 12 Dragon Kick, 13 Elixir Burst, 14 Leaping Opo

Pick by kill time: use Solar Lunar if it gains a Rising Phoenix, which means ending on an odd Riddle of Fire window. Both have 5s and 7s buff variants, and Demolish-first versions.

**Dragoon** (chart 7.1, page 7.5)
The page now lists **No Piercing Talon as standard**:
- 1 True Thrust, 2 Spiral Blow [Lance Charge, Pot], 3 Chaotic Spring [Battle Litany, Geirskogul], 4 Wheeling Thrust [High Jump, Life Surge], 5 Drakesbane [Dragonfire Dive, Nastrond], 6 Raiden Thrust [Stardiver], 7 Lance Barrage [Starcross, Life Surge], 8 Heavens' Thrust [Rise of the Dragon, Mirage Dive], 9 Fang and Claw, 10 Drakesbane, 11 Raiden Thrust [Wyrmwind Thrust]

The link's version adds Elusive Jump at `-15` and Piercing Talon at `-0.85`, then potions after True Thrust. Use that when the boss needs a ranged pull.

**Ninja** (chart 7.0, page 7.1)
- Pre: `-6.5` Ten, `-6` Chi, `-5.5` Jin, `-0.9` Suiton, Kassatsu at pull
- 1 Spinning Edge [Pot], 2 Gust Slash [Dokumori, Bunshin], 3 Phantom Kamaitachi, 4 Armor Crush [Kunai's Bane], 5 Hyosho Ranryu [Dream Within a Dream], 6 Raiton [Ten Chi Jin], 7 Fuma Shuriken, 8 Raiton, 9 Suiton [Meisui], 10 Fleeting Raiju [Zesho Meppo, Tenri Jindo], 11 Fleeting Raiju [Bhavacakra], 12 Raiton, 13 Fleeting Raiju
- The page starts Suiton mudras at `-6.0`, and the chart at `-6.5`. A 3rd-GCD Kunai's Bane variant suits 2.10 GCD. Drift Dokumori by one GCD after the opener.
- **Mudras:** Fuma: any 1. Raiton: Ten-Chi or Jin-Chi. Katon: Chi-Ten or Jin-Ten. Hyoton: Ten-Jin or Chi-Jin. Huton: Jin-Chi-Ten or Chi-Jin-Ten. Doton: Ten-Jin-Chi or Jin-Ten-Chi. Suiton: Ten-Chi-Jin or Chi-Ten-Jin. Under Kassatsu, Katon becomes Goka Mekkyaku and Hyoton becomes Hyosho Ranryu.
- That mudra chart is from Endwalker, and some names have since changed.

**Samurai** (7.05)
- Pre: `-14` Meikyo Shisui, `-5` True North
- 1 Gekko [Pot], 2 Kasha [Ikishoten], 3 Yukikaze, 4 Tendo Setsugekka [Hissatsu: Senei], 5 Tendo Kaeshi Setsugekka [Meikyo Shisui], 6 Gekko [Zanshin], 7 Higanbana, 8 Ogi Namikiri [Shoha], 9 Kaeshi Namikiri, 10 Kasha [Shinten], 11 Gekko [Gyoten], 12 Gyofu, 13 Yukikaze [Shinten], 14 Tendo Setsugekka, 15 Tendo Kaeshi Setsugekka
- Phasing can favour Kasha before Gekko.

**Reaper** (chart 7.0, text 7.55)
- Pre: Soulsow, then `-1.7` Harpe
- 1 Shadow of Death [Pot, late], 2 Soul Slice [Arcane Circle, late; Gluttony], 3 Executioner's Gibbet, 4 Executioner's Gallows, 5 Soul Slice, 6 Plentiful Harvest [Enshroud], 7 Void Reaping [Sacrificium], 8 Cross Reaping [Lemure's Slice], 9 Void Reaping, 10 Cross Reaping [Lemure's Slice], 11 Communio, 12 Perfectio [Unveiled Gibbet], 13 Gibbet, 14 Shadow of Death, 15 Slice
- The 7.55 text lists these as the order after Perfectio: Soul Slice, Unveiled Gibbet, Gibbet, Shadow of Death, Slice, then Soul Slice, Unveiled Gallows, Gallows. That adds a Soul Slice the 7.0 chart omits, so prefer the text.
- Plentiful Harvest clips below 2.47 GCD or on high ping. The fix is to move the Soul Slice from after Perfectio to before it.

**Viper** (**7.5, better than the link**)
- Pre: `-0.5` Slither
- 1 Steel or Reaving Fangs [Serpent's Ire], 2 Swiftskin's Sting, 3 Vicewinder, [Pot] 4 Hunter's Coil [Twinfang, Twinblood], 5 Swiftskin's Coil [Twinblood, Twinfang], 6 Reawaken, 7 First Generation [First Legacy], 8 Second Generation [Second Legacy], 9 Third Generation [Third Legacy], 10 Fourth Generation [Fourth Legacy], 11 Ouroboros, 12 Uncoiled Fury [Uncoiled Twinfang, Twinblood], 13 Uncoiled Fury [Uncoiled Twinfang, Twinblood], 14 Hindsting Strike or Hindsbane Fang [Death Rattle], 15 Vicewinder, 16 Hunter's Coil [Twinfang, Twinblood], 17 Swiftskin's Coil [Twinblood, Twinfang]
- The link's chart is 7.0 and has a third Uncoiled Fury before the second coil pair. That is out of date.

### Physical ranged

**Bard** (chart 7.0, page 7.4)
- 1 Stormbite [Heartbreak Shot, Wanderer's Minuet], 2 Caustic Bite [Pot, Radiant Finale], 3 Burst Shot [Battle Voice, Raging Strikes], 4 Burst Shot [Empyreal Arrow], 5 Radiant Encore [Barrage], 6 Refulgent Arrow [Sidewinder], 7 Resonant Arrow, 8 Refulgent Arrow, 9 Burst Shot, 10 Iron Jaws [Empyreal Arrow], 11 Burst Shot [Pitch Perfect]
- Any Burst Shot may be a Refulgent proc, except the one spent with Barrage. Use the first skill as the countdown hits zero. Use Pitch Perfect at three stacks and Heartbreak Shot as able. The 3-6-9 version is for 2.49 to 2.50 GCD.
- The page's other option, "Adjusted Standard", and the 2.49 standard are not transcribed.

**Machinist** (chart 7.0, page 7.3)
- Pre: `-5` Reassemble, `-2` Pot
- 1 Air Anchor [Checkmate, Double Check], 2 Drill [Barrel Stabilizer], 3 Chain Saw, 4 Excavator [Automaton Queen, Reassemble], 5 Drill [Checkmate, Wildfire], 6 Full Metal Field [Double Check, Hypercharge], 7 to 11 Blazing Shot with a Checkmate or Double Check after each, 12 Drill [Double Check, Checkmate], 13 Heated Split Shot [Double Check], 14 Heated Slug Shot, 15 Heated Clean Shot
- The page also has an alternate that follows the even-minute burst setup. It prefers a two-minute potion when the fight allows.

**Dancer** (chart 7.0, page 7.40)
- Pre: `-16` Closed Position, `-15` Standard Step, Step, Step, `-5` Peloton, `-1` Pot
- 1 Standard Finish, 2 Technical Step, 3 to 6 Step, 7 Technical Finish [Devilment], 8 Tillana [Flourish], 9 Dance of the Dawn [Fan Dance IV], 10 Last Dance [Fan Dance III], 11 Finishing Move, 12 Saber or Starfall Dance, 13 onward priority GCDs

### Casters

**Black Mage** (7.2, page 7.4)
- Start Fire III at about `-4` so it lands on pull.
- 1 Fire III, 2 High Thunder [Swiftcast, Amplifier], 3 Fire IV [Pot, Ley Lines], 4 to 7 Fire IV, 8 Xenoglossy [Manafont], 9 Fire IV, 10 Flare Star, 11 Fire IV, 12 Fire IV, 13 High Thunder, 14 to 17 Fire IV, 18 Flare Star, 19 Despair [Transpose, Triplecast], 20 Blizzard III, 21 Blizzard IV, 22 Paradox [Transpose], 23 Paradox, 24 Firestarter
- Called "5+7": five Fire IV before Manafont and seven after, for two Flare Stars.
- AoE loop: Flare Star, Foul or High Thunder II [Transpose], Freeze, Foul or High Thunder II [Transpose], Flare, Flare, Flare Star.
- The page also lists an alternative single-target Flare opener.

**Summoner** (**7.5, better than the link**)
- Pre: `-1.5` Ruin III
- 1 Summon Solar Bahamut [Pot], 2 Umbral Impulse [Searing Light], 3 Umbral Impulse, 4 Umbral Impulse [Energy Drain], 5 Umbral Impulse [Enkindle Solar Bahamut, Necrotize], 6 Umbral Impulse [Sunflare, Necrotize], 7 Umbral Impulse [Searing Flash], 8 Summon Titan II, 9 to 12 Topaz Rite [Mountain Buster], 13 Summon Garuda II [Swiftcast], 14 Slipstream
- The 7.5 chart runs further than the link's, adding Swiftcast into Slipstream at the end. The earlier sequence is the same. You can skip the Ruin III and use Bahamut at 0.

**Red Mage** (7.0, page 7.4)
- Pre: `-5` Veraero III
- 1 Verthunder III [Swiftcast, Pot], 2 Verthunder III [Fleche, Acceleration], 3 Verthunder III [Embolden, Manafication], 4 Enchanted Riposte [Contre Sixte], 5 Enchanted Zwerchhau [Engagement], 6 Enchanted Redoublement [Corps-a-corps], 7 Verholy [Vice of Thorns], 8 Scorch [Engagement, Corps-a-corps], 9 Resolution [Prefulgence], 10 Grand Impact [Acceleration], 11 Verfire, 12 Grand Impact, 13 Verthunder III [Fleche], 14 Veraero III, 15 Verfire, 16 Verthunder III, 17 Verstone, 18 Veraero III [Swiftcast], 19 Veraero III [Contre Sixte]
- This is the highest-damage, strictest option. The page also has more flexible variants, including Early Contre Sixte.

**Pictomancer** (7.2, page 7.4)
- Pre: `-4.5` Rainbow Drip, then [Pot, Pom Muse, Striking Muse]
- 1 Wing Motif [Starry Muse], 2 Hammer Stamp [Subtractive Palette], 3 Blizzard in Cyan, 4 Stone in Yellow, 5 Thunder in Magenta, 6 Comet in Black [Winged Muse, Mog of the Ages], 7 Star Prism, 8 Hammer Brush, 9 Polishing Hammer, 10 Rainbow Drip, 11 Fire in Red [Swiftcast], 12 Aero in Green
- Order inside the nine-spell window is free. This is the default. A 3rd-GCD Starry opener exists for parties with later buffs. Expect a slight clip from the triple weave on high ping.

**Blue Mage** (no patch label)
Winged:
- 1 Whistle, 2 Tingle, 3 Rose of Destruction, 4 Moon Flute [J Kick], 5 Triple Trident [Nightbloom], 6 Winged Reprobation [Feather Rain, Sea Shanty], 7 Winged Reprobation [Shock Strike, Being Mortal], 8 Bristle [Swiftcast, Surpanakha x4], 9 Matra Magic [Phantom Flurry]

DoT:
- 1 Whistle, 2 Tingle, 3 Rose of Destruction, 4 Moon Flute [J Kick], 5 Triple Trident [Nightbloom], 6 Bristle [Feather Rain, Sea Shanty], 7 Mortal Flame or Breath of Magic [Shock Strike], 8 Bristle [Swiftcast, Surpanakha x4], 9 Matra Magic [Being Mortal, Phantom Flurry]

## 5. Patterns that hold across jobs

- **Buffs land around the second to third GCD.** Most openers aim for raid buffs at about 7s to 8s. Your own big hits are held for that.
- **Precast or pre-pull an ability** so your first GCD lands near zero, which keeps party timing aligned.
- **Potions are flexible.** Bard and Machinist pages both note a two-minute potion can be better when the kill time allows.
- **Standard openers are for dummies and default pulls.** Fight-specific versions come from The Balance Discord and fight guides.

## 6. For Evercold

Level 110 and Evolved Mode mean every opener here will change on 2027-02-23, and every plugin will need an update. Do not trust either until authors confirm. The new jobs are Bastion (tank) and Zephyr (physical ranged).

## 7. Job unlocks

Quest names, quest givers and coordinates come from the FFXIV Community Wiki. Coordinates are map (x, y).

### The rules that apply to everything

- **Your first class** is chosen at character creation, and it must finish its level 10 class quest before you can take any other class.
- **Other starter classes, crafters and gatherers:** after that level 10 quest, go to the guild and take the "So You Want to Be…" quest. All start at level 1.
- **Sylph-management** is the level 20 Main Scenario quest from Minfilia Warde at The Waking Sands (6.9, 6.1). It is required for every level 30 job upgrade.
- **Level-gated jobs** only need any Disciple of War or Magic at that level. They have no base class.
- **Limited jobs** (Blue Mage, Beastmaster) need level 50 and The Ultimate Weapon, the Main Scenario quest from Raubahn in Northern Thanalan (15.5, 16.9).

### Starter combat classes

| Class | Becomes | Unlock quest | Quest giver | Location | Coords |
|---|---|---|---|---|---|
| Gladiator | Paladin | So You Want to Be a Gladiator | Lulutsu | Ul'dah - Steps of Thal | 9.2, 11.7 |
| Marauder | Warrior | So You Want to Be a Marauder | Blauthota | Limsa Lominsa Upper Decks | 11.0, 6.3 |
| Conjurer | White Mage | So You Want to Be a Conjurer | Madelle | Old Gridania | 6.0, 11.0 |
| Arcanist | Summoner, Scholar | So You Want to Be an Arcanist | Murie | Limsa Lominsa Lower Decks | 4.5, 11.2 |
| Pugilist | Monk | So You Want to Be a Pugilist | Gagaruna | Ul'dah - Steps of Nald | 9.0, 10.0 |
| Lancer | Dragoon | So You Want to Be a Lancer | Jillian | Old Gridania | 14.1, 5.8 |
| Rogue | Ninja | So You Want to Be a Rogue | Lonwoerd | Limsa Lominsa Lower Decks | 8.1, 16.1 |
| Archer | Bard | So You Want to Be an Archer | Athelyna | New Gridania | 15.0, 12.0 |
| Thaumaturge | Black Mage | So You Want to Be a Thaumaturge | Yayake | Ul'dah - Steps of Nald | 7.3, 12.4 |

- Rogue is the only one here you cannot pick at character creation. It also needs the Armory System unlocked, and access to Limsa Lominsa if you started elsewhere.

### Level 30 job upgrades

Reach level 30 on the class, then finish Sylph-management and the level 30 class quest. The job quest gives you the soul crystal.

| Job | From | Level 30 class quest | Class quest giver | First job quest | Job trainer |
|---|---|---|---|---|---|
| Paladin | Gladiator | The Rematch | Mylla, Steps of Thal (9.3, 12.0) | Paladin's Pledge | Jenlyns, Hustings Strip (10.7, 11.1) |
| Warrior | Marauder | Pride and Duty (Will Take You from the Mountain) | Wyrnzoen, Limsa Upper Decks (11.2, 6.1) | Same quest | Curious Gorge, Eastern La Noscea (30.6, 22.9) |
| White Mage | Conjurer | In Nature's Embrace | E-Sumi-Yan, Old Gridania (6.0, 10.0) | Seer Folly | Raya-O-Senna, South Shroud (18.6, 27.1) |
| Scholar | Arcanist | Sinking Doesmaga | Thubyrgeim, Limsa Lower Decks (4.7, 11.4) | Forgotten but Not Gone | Alka Zolka, Limsa Upper Decks (11.1, 6.2) |
| Summoner | Arcanist | Sinking Doesmaga | Thubyrgeim, Limsa Lower Decks (4.7, 11.4) | Austerities of Flame | Y'mhitra, Old Gridania (10.9, 6.3) |
| Monk | Pugilist | Return of the Holyfist | Hamon, Steps of Nald (9.7, 10.3) | Brother from Another Mother | Erik, Steps of Thal (10.6, 13.1) |
| Dragoon | Lancer | Proof of Might | Ywain, Old Gridania (14.3, 5.8) | Eye of the Dragon | Alberic, Coerthas Central Highlands (25.8, 28.3) |
| Ninja | Rogue | Cloying Victory | Jacke, Limsa Lower Decks (6.0, 6.1) | Peasants by Day, Ninjas by Night | Oboro, Dock Storehouse (21.2, 26.6) |
| Bard | Archer | The One That Got Away | Luciane, New Gridania (15.4, 11.9) | A Song of Bards and Bowmen | Jehantel, South Shroud (21.8, 21.3) |
| Black Mage | Thaumaturge | Facing Your Demons | Cocobuki, Steps of Nald (6.2, 12.8) | Taking the Black | Lalai, Steps of Thal (12.9, 13.5) |

- To get the second Arcanist job, be on Arcanist with the other soul crystal unequipped.
- The first job quest for each job comes from the wiki's list of quests after Sylph-management. I matched each name to its job myself, so confirm in-game.

### Jobs with no base class

| Job | Role | Need | Starts at | Unlock quest | Quest giver | Location | Coords | Expansion |
|---|---|---|---|---|---|---|---|---|
| Dark Knight | Tank | Level 50, Before the Dawn | 30 | A Dark Spectacle | Ishgardian Citizen | The Pillars | 13.2, 8.8 | Heavensward |
| Astrologian | Healer | Level 50, Before the Dawn | 30 | What's Your Sign | Jannequinard | The Pillars | 15.2, 10.0 | Heavensward |
| Machinist | Ranged | Level 50, Before the Dawn | 30 | So You Want to Be a Machinist | Stephanivien | Foundation | 8.1, 10.1 | Heavensward |
| Samurai | Melee | Level 50 | 50 | The Way of the Samurai | Ul'dahn Citizen | Ul'dah - Steps of Nald | 9.2, 9.1 | Stormblood |
| Red Mage | Caster | Level 50 | 50 | Taking the Red | Distraught Lass | Ul'dah - Steps of Thal | 14.1, 11.7 | Stormblood |
| Gunbreaker | Tank | Level 60 | 60 | The Makings of a Gunbreaker | Gods' Quiver Bow | New Gridania | 11.5, 11.9 | Shadowbringers |
| Dancer | Ranged | Level 60 | 60 | Shall We Dance | Eager Lominsan | Limsa Lominsa Lower Decks | 9.8, 12.0 | Shadowbringers |
| Reaper | Melee | Level 70, Endwalker owned | 70 | The Killer Instinct | Flustered Attendant | Ul'dah - Steps of Nald | 12.8, 8.6 | Endwalker |
| Sage | Healer | Level 70, Endwalker owned | 70 | Sage's Path | Sharlayan Maiden | Limsa Lominsa Lower Decks | 9.4, 12.9 | Endwalker |
| Viper | Melee | Level 80, Dawntrail owned | 80 | Enter the Viper | Worried Weaver | Ul'dah - Steps of Nald | 9.3, 9.2 | Dawntrail |
| Pictomancer | Caster | Level 80, Dawntrail owned | 80 | The Joy of Pictomancy | Cheerless Hearer | Old Gridania | 8.0, 10.3 | Dawntrail |

- Before the Dawn is the Main Scenario quest that opens Ishgard, from Haurchefant in Coerthas Central Highlands (26.7, 17.4).

### Limited jobs

| Job | Need | Starts at | Level cap | Unlock quest | Quest giver | Location | Coords |
|---|---|---|---|---|---|---|---|
| Blue Mage | Level 50, The Ultimate Weapon | 1 | 80 | Out of the Blue | Zealous Yellowjacket | Limsa Lominsa Lower Decks | 9.9, 11.0 |
| Beastmaster | Level 50, The Ultimate Weapon, Dawntrail owned | 1 | 50 | Strangers in the Wood | Excited Adventurer | New Gridania | 11.8, 13.6 |

### Crafting jobs (Disciples of the Hand)

Finish your starting class's level 10 quest, then talk to the guild receptionist. All start at level 1.

| Class | Makes | Guild city | Unlock quest | Quest giver | Location | Coords |
|---|---|---|---|---|---|---|
| Carpenter | Wooden items, furniture, staves | Gridania | So You Want to Be a Carpenter | Corgg | New Gridania | 10.8, 12.1 |
| Blacksmith | Metal weapons and tools | Limsa Lominsa | So You Want to Be a Blacksmith | Randwulf | Limsa Lominsa Upper Decks | 10.1, 15.0 |
| Armorer | Plate armor and shields | Limsa Lominsa | So You Want to Be an Armorer | G'wahnako | Limsa Lominsa Upper Decks | 10.2, 15.0 |
| Goldsmith | Jewelry and fine metalwork | Ul'dah | So You Want to Be a Goldsmith | Jemime | Ul'dah - Steps of Thal | 10.5, 13.1 |
| Leatherworker | Leather gear and goods | Gridania | So You Want to Be a Leatherworker | Randall | Old Gridania | 12.5, 8.2 |
| Weaver | Cloth gear | Ul'dah | So You Want to Be a Weaver | Maronne | Ul'dah - Steps of Thal | 13.9, 13.2 |
| Alchemist | Potions and spell tomes | Ul'dah | So You Want to Be an Alchemist | Deitrich | Ul'dah - Steps of Thal | 8.9, 13.6 |
| Culinarian | Food | Limsa Lominsa | So You Want to Be a Culinarian | Charlys | Limsa Lominsa Upper Decks | 10.0, 7.9 |

### Gathering jobs (Disciples of the Land)

Same rule as crafters. All start at level 1.

| Class | Gathers | Unlock quest | Quest giver | Location | Coords |
|---|---|---|---|---|---|
| Miner | Ore and stone | So You Want to Be a Miner | Linette | Ul'dah - Steps of Thal | 11.3, 14.3 |
| Botanist | Timber and plants | So You Want to Be a Botanist | Leonceault | Old Gridania | 6.4, 8.3 |
| Fisher | Fish | So You Want to Be a Fisher | N'nmulika | Limsa Lominsa Lower Decks | 7.9, 14.2 |

### Coming in Evercold

| Job | Role | Need | Starting city |
|---|---|---|---|
| Bastion | Tank | Level 90 | Limsa Lominsa |
| Zephyr | Physical ranged | Level 90 | Gridania |

These are pre-release details, and no unlock quests are published yet.

## Sources

- [Puni.sh](https://puni.sh/)
- [Official plugin list](https://goatcorp.github.io/DalamudPlugins/plugins.html)
- [Naty's plugin gist](https://gist.github.com/natyusha/1fa9bf8897225acbf5e01565943d3464)
- [Naty's openers](https://natyusha.github.io/FFXIV/Openers.html)
- [una-xiv](https://github.com/una-xiv)
- [xiv-resources](https://github.com/karashiiro/xiv-resources)
- [The Balance](https://www.thebalanceffxiv.com/)
- [Evercold delay (Gematsu)](https://www.gematsu.com/2026/10/final-fantasy-xiv-evercold-expansion-delayed-to-february-23-2027)
- [Third-party tools notice (Icy Veins)](https://icy-veins.com/forums/topic/65764-ffxiv-third-party-tools-notice)
- [Yoshida on third-party tools (PC Gamer)](https://www.pcgamer.com/final-fantasy-14s-director-says-no-way-jose-to-thirdparty-software)
- [World-first revoked (Mein-MMO)](https://mein-mmo.de/final-fantasy-xiv-den-besten-raidern-werden-alle-belohnungen-entzogen/)
- [FFXIV Community Wiki](https://ffxiv.consolegameswiki.com/wiki/Jobs)
- [Akurosia's repo collection](https://github.com/Akurosia/MyCustomDalamudPluginRepoCollection)
