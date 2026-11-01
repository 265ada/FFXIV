// Hover cards for class and job names. Marks names in the unlock tables and opener cards.
(function(){
  var I={
    Gladiator:["GLA","Tank class","Sword and shield","Ul'dah's arena fighter. Learns to hold an enemy's attention, block hits and protect allies. Becomes Paladin at level 30."],
    Marauder:["MRD","Tank class","Greataxe","A hard-hitting axe fighter from La Noscea who survives by dealing damage and healing through it rather than blocking. Becomes Warrior at level 30."],
    Conjurer:["CNJ","Healer class","Cane or wand","Gridania's healer, drawing on the power of nature to mend wounds and strike with earth and wind magic. Becomes White Mage at level 30."],
    Arcanist:["ACN","Caster and healer class","Grimoire","Limsa Lominsa's scholars of geometric magic, who fight alongside a summoned carbuncle. The only class with two job paths: Summoner or Scholar."],
    Pugilist:["PGL","Melee DPS class","Fist weapons","Ul'dah's bare-knuckle fighter. Moves through a repeating cycle of stances, and rewards striking from the correct side of the enemy. Becomes Monk at level 30."],
    Lancer:["LNC","Melee DPS class","Polearm","Gridania's spear fighter, built around long weapon combos and damage-over-time thrusts. Becomes Dragoon at level 30."],
    Rogue:["ROG","Melee DPS class","Twin daggers","A nimble dagger fighter from Limsa Lominsa, trained in fast combos and striking from the flanks. Cannot be picked at character creation. Becomes Ninja at level 30."],
    Archer:["ARC","Physical ranged class","Bow","Gridania's bow fighter. Attacks from a distance while moving freely, using poisons and quick procs. Becomes Bard at level 30."],
    Thaumaturge:["THM","Caster class","Scepter or staff","Ul'dah's destruction mages. Balances fire spells for damage against ice spells for mana recovery. Becomes Black Mage at level 30."],

    Paladin:["PLD","Tank","Sword and shield","A holy knight who mixes sword combos with magic. The most defensive-minded tank, with shields for allies and strong party protection, including the invulnerability Hallowed Ground."],
    Warrior:["WAR","Tank","Greataxe","A berserker who channels inner rage into huge axe swings. Heals itself heavily while attacking, making it very sturdy and simple to play. Invulnerability is Holmgang."],
    "Dark Knight":["DRK","Tank","Greatsword","A sword-wielding fighter who spends mana on heavy damage and protective barriers. Leans on a strong two-minute burst and a shadow clone. Its invulnerability, Living Dead, needs healer support."],
    Gunbreaker:["GNB","Tank","Gunblade","Fires charged cartridges through a gunblade to power fast, flashy combos. The busiest tank rotation, with a sharp burst window under No Mercy."],
    "White Mage":["WHM","Pure healer","Cane or wand","The classic healer. Has the strongest direct healing spells and heal-over-time effects, and builds free heals into its rotation. Its Afflatus Misery rewards healing with damage."],
    Scholar:["SCH","Barrier healer","Codex","A tactician who commands a fairy companion. Prevents damage with barriers rather than healing after the fact, and manages Aetherflow stacks for its strongest tools."],
    Astrologian:["AST","Pure healer","Star globe","A star reader who draws cards to boost allies and heals through timed effects such as Earthly Star. Provides large raid support but rewards planning ahead."],
    Sage:["SGE","Barrier healer","Nouliths","Uses floating nouliths to pair with one ally, turning damage into healing for them. Very mobile and damage-focused, with shields that scale from its Addersgall resource."],
    Monk:["MNK","Melee DPS","Fist weapons","A martial artist cycling through three forms at high attack speed. Spends Perfect Balance windows on strong Blitz finishers, including Rising Phoenix and Elixir Burst."],
    Dragoon:["DRG","Melee DPS","Polearm","A leaping spear warrior of Ishgard. Long combos feed high-damage jumps, and it adds party damage through Battle Litany."],
    Ninja:["NIN","Melee DPS","Twin daggers","Weaves hand signs called mudras into powerful ninjutsu spells between fast combos. Very bursty, with Kunai's Bane raising its damage dealt. Mudra timing is the main skill."],
    Samurai:["SAM","Melee DPS","Katana","A pure damage dealer with no party buff. Collects three Sen through combos, then releases them in Iaijutsu strikes such as Midare Setsugekka. Simple to learn, with high personal damage."],
    Reaper:["RPR","Melee DPS","War scythe","Harvests souls with a scythe and merges with a voidsent avatar during Enshroud for a chain of fast attacks. Also provides the party buff Arcane Circle."],
    Viper:["VPR","Melee DPS","Twin blades","A high-speed fighter whose twin blades join into a double-ended weapon. Combos flow directly into each other, and Reawaken delivers an extended burst sequence."],
    Bard:["BRD","Physical ranged DPS","Bow","Plays songs that boost the party while firing arrows on the move. Its procs make the rotation reactive, and Radiant Finale and Battle Voice add party damage."],
    Machinist:["MCH","Physical ranged DPS","Firearm","A gunner who overheats their weapon for rapid fire and deploys an Automaton Queen. Very fast and heavy on off-global actions, with Wildfire as its burst."],
    Dancer:["DNC","Physical ranged DPS","Throwing weapons","Performs step sequences that power up the party, and picks one ally as a dance partner. Rewarding support with a strong two-minute Technical Finish."],
    "Black Mage":["BLM","Magical ranged DPS","Scepter or staff","The strongest pure spellcaster, but it must stand still for long casts. Swaps between Astral Fire and Umbral Ice to manage mana, with few movement tools."],
    Summoner:["SMN","Magical ranged DPS","Grimoire","Calls Bahamut, Phoenix and elemental primals in a fixed cycle. Most spells are instant, so it is very mobile, and it can also raise fallen allies."],
    "Red Mage":["RDM","Magical ranged DPS","Rapier","Balances white and black magic to build mana, then spends it in a melee combo. Can raise allies and heal in a pinch, and its dual casting keeps it moving."],
    Pictomancer:["PCT","Magical ranged DPS","Brush","Paints creatures, weapons and landscapes on canvas ahead of a fight, then unleashes them as spells. Its prepared motifs make for a big, colourful two-minute burst."],
    "Blue Mage":["BLU","Limited job","Cane","Learns spells by watching and surviving enemy abilities. Solo-focused, with level and content limits, and it cannot join normal Duty Finder play. Levels through Masked Carnivale and spell collecting."],
    Beastmaster:["BST","Limited job, melee DPS","Beast familiars","A solo-focused job that captures up to 50 wild beasts and swaps between three in combat, each with its own actions. No role actions. Level 30 opens the Crucible of the Unbroken challenges."],
    Bastion:["New in Evercold","Tank","Shape-changing greatshield","A coming tank from Aerslaent. Its skyltborg shields shift form to fire aetherial artillery at near or far targets, and provide defensive and healing effects. Details may change before release."],
    Zephyr:["New in Evercold","Physical ranged DPS","Crossbow","A coming hunter from Ilsabard who fights with a crossbow alongside a bird familiar called a Nephele. Evasive, with breezy movement actions and party support. Details may change before release."],

    Carpenter:["CRP","Crafter","Saw","Works wood into weapon shafts, shields, spinning wheels, furniture and housing items. Essential for many other crafters' materials and for housing."],
    Blacksmith:["BSM","Crafter","Cross-pein hammer","Forges metal blades, axes and the tools that gatherers and other crafters use. Pairs closely with Armorer through shared metal materials."],
    Armorer:["ARM","Crafter","Raising hammer","Shapes metal into heavy plate armor, shields and helmets for tanks and melee fighters, plus metal furnishings."],
    Goldsmith:["GSM","Crafter","Chaser hammer","Cuts gems and works precious metals into rings, earrings, necklaces and bracelets. Accessories for every role, plus staves, wands and glamour pieces."],
    Leatherworker:["LTW","Crafter","Head knife","Turns hides into boots, belts, light armor and ranged gear. Also makes bags, straps and materials used across other crafts."],
    Weaver:["WVR","Crafter","Needle","Makes cloth from cotton and other fibres, then sews robes, casual wear and caster gear. Very popular for glamour and dyeable outfits."],
    Alchemist:["ALC","Crafter","Alembic","Brews potions, tinctures, dyes and magical reagents, and binds grimoires. Raid tinctures make it valuable for high-end players."],
    Culinarian:["CUL","Crafter","Frypan","Cooks meals that give stat bonuses and extra experience for a time. Raiders buy food constantly, making it steady income."],
    Miner:["MIN","Gatherer","Pickaxe","Digs ore, stone and crystals from mining nodes. Supplies Blacksmith, Armorer and Goldsmith, and timed nodes hold rare materials."],
    Botanist:["BTN","Gatherer","Hatchet","Harvests logs, plants and fibres from trees and wild growth. Supplies Carpenter, Weaver, Alchemist and Culinarian."],
    Fisher:["FSH","Gatherer","Fishing rod","Catches fish using bait and timing. Has its own systems, including Ocean Fishing and spearfishing, and rare fish that appear only in certain weather."]
  };
  var tip=document.createElement('div');tip.className='jobtip';tip.hidden=true;tip.setAttribute('role','tooltip');document.body.appendChild(tip);
  function line(c,t){var d=document.createElement('div');d.className=c;d.textContent=t;return d}
  function place(el){
    var r=el.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight,x=Math.min(Math.max(8,r.left),innerWidth-w-8),y=r.bottom+6;
    if(y+h>innerHeight-8)y=Math.max(8,r.top-h-6);
    tip.style.left=x+'px';tip.style.top=y+'px';
  }
  function show(el){
    var n=el.getAttribute('data-job'),i=I[n];if(!i)return;
    tip.textContent='';
    tip.appendChild(line('jt-name',n));
    tip.appendChild(line('jt-sub',i[0]+' · '+i[1]+' · '+i[2]));
    tip.appendChild(line('jt-text',i[3]));
    tip.hidden=false;place(el);
  }
  function hide(){tip.hidden=true}
  function mk(n){var s=document.createElement('span');s.className='jobname';s.setAttribute('data-job',n);s.tabIndex=0;s.textContent=n;return s}
  function markCell(c){
    if(c.querySelector('[data-job]'))return;
    var ps=c.textContent.split(', ');if(!ps.every(function(p){return I[p]}))return;
    c.textContent='';ps.forEach(function(p,k){if(k)c.appendChild(document.createTextNode(', '));c.appendChild(mk(p))});
  }
  function mark(){
    [].forEach.call(document.querySelectorAll('#unlocks table'),function(t){
      var ths=[].map.call(t.querySelectorAll('th'),function(h){return h.textContent});
      [].forEach.call(t.querySelectorAll('tbody tr'),function(tr){
        ths.forEach(function(h,k){if(/^(Class|Job|Becomes|From)$/.test(h)&&tr.cells[k])markCell(tr.cells[k])});
      });
    });
    [].forEach.call(document.querySelectorAll('.job-h h4'),function(h){if(I[h.textContent]){var n=h.textContent;h.textContent='';h.appendChild(mk(n))}});
  }
  document.addEventListener('mouseover',function(e){var t=e.target.closest&&e.target.closest('[data-job]');if(t)show(t);else hide()});
  document.addEventListener('focusin',function(e){var t=e.target.closest&&e.target.closest('[data-job]');if(t)show(t)});
  document.addEventListener('focusout',hide);
  document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-job]');if(t)show(t);else hide()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')hide()});
  addEventListener('scroll',hide,{passive:true});
  mark();
  var b=document.getElementById('board-wrap');if(b)new MutationObserver(mark).observe(b,{childList:true});
})();
