# Somby

Ett 2D zombie-överlevnadsspel byggt med p5.js.

## Om spelet

Somby är ett sidscrollande överlevnadsspel där du slåss mot vågor av zombies. Överlev så länge som möjligt genom att skjuta zombies, samla hp och ammunition, och undvika skada.

## Hur man spelar

### Kontroller

| Tangent    | Handling   |
| ---------- | ---------- |
| A          | Gå vänster |
| D          | Gå höger   |
| Mellanslag | Hoppa      |
| W          | Skjut      |
| R          | Ladda om   |

### Spelmekanik

- Zombies spawnar från båda sidor av skärmen och går mot dig
- Skjut zombies innan de når dig - kontakt med zombies ger skada
- Dödade zombies har 1/3 chans att droppa antingen hp eller ammunition
- Spawnhastigheten ökar över tid, vilket gör spelet svårare
- Spelet slutar när din HP når 0

### Gränssnitt

- **Uppe till vänster**: Kill counter (dödskalle-ikon)
- **Uppe till vänster**: HP (hjärtan)
- **Uppe till höger**: Ammunitionsräknare och omladdningsbar
- **Mitten**: Omladdningsikon visas när magasinet är tomt

## Installation

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Förhandsgranska produktionsbygge
npm run preview
```

## Projektstruktur

```
src/
├── sketch.js        # Huvudspelloop och setup
├── Player.js        # Spelarkaraktär med rörelse och animation
├── Zombie.js        # Fiendezombies med AI och animation
├── Bullet.js        # Projektillogik
├── Entity.js        # Basklass för spelentiteter
├── Drop.js          # Samlingsbara föremål (hälsa/ammunition)
├── Background.js    # Parallax-bakgrundsrendering
├── HP.js            # Hälsomätare UI-komponent
├── Magazine.js      # Ammunitionsvisning UI-komponent
├── NumberDisplay.js # Dödräknare UI-komponent
├── Box.js           # Hitbox-kollisionsdetektering
├── Block.js         # Mark/plattformsblock
└── deathScreen.js   # Game over-skärm
```

## Teknologier

- [p5.js](https://p5js.org/) - Kreativt kodningsbibliotek
- [Vite](https://vitejs.dev/) - Byggverktyg och utvecklingsserver
