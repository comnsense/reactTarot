# 🔮 
## Interactive Tarot Card Guide - Your digital companion in the world of Tarot.

## 📖 Project Overview
Tarot101 is an interactive web application designed to help both beginners and advanced enthusiasts understand the meaning of each Tarot card and their combinations. The project serves as a comprehensive digital encyclopedia for all 78 cards in the classic Tarot deck.

###  Core Objectives
- Educational - Accessible information for every Tarot card
- Practical - Assistance with card interpretation and combinations
- Interactive - Card selection and interpretation generation
- Visual - Beautiful and intuitive card presentation
---
## Features
### Card Library (/)
- Browse all 78 cards in an organized grid
- Filter by type (Major Arcana, suits, court cards, numbers)
- Detailed information for each card:
- Name and English translation
- Keywords
- Detailed meaning
- Symbolism
- Astrological correspondences
- Card advice

### Interpretation Assistant (/mycards)
- Select up to 10 cards from the deck
- Interactive interface with selected cards visualization
- Automatic combination detection:
- "The Lovers + 2 of Cups + Ace of Cups" → "Fated Love"
- "The Fool + Death" → "New Beginning After an End"
- 80+ pre-defined combinations
- Detailed interpretations for each card
- "Clear" and "Done" buttons for easy navigation

### 📖 Combination Encyclopedia (/readings)
- Complete list of 80+ pre-defined combinations
- Filter by category (love, career, money, health, spirituality, crisis)
- Filter by suit (Wands, Cups, Swords, Pentacles) and Major Arcana
- Search by name, cards, or description
- For each combination:
- Exact cards involved
- Brief meaning
- Detailed description

Mystical advice
----
## Design & User Experience
- Color Palette - Black and white theme with purple accents
- Fully Responsive - Optimized for all devices (mobile, tablet, desktop)
- Animations:
- Smooth element transitions
- Pulsing effects for discovered combinations
- Hover effects with detailed informatioM

---
## 🛠 Technology Stack
- Category	Technology	Version	Purpose
- Core	React	^18.2.0	Main framework
- Routing	React Router DOM	^6.8.0	Navigation
- Styling	CSS	-	Styling and themes
- Icons	React Icons	^4.10.0	Icons
- Build Tool	Create React App	^5.0.0	Build and development
- Deployment	Vercel	-	Hosting
---

📁 Project Structure
```text

ReactTarot/
├── public/
│   ├── images/           # All 78 card images
│   └── index.html
├── src/
│   ├── components/        # React components
│   │   ├── cards/        # Cards and related components
│   │   ├── filters/      # Filters
│   │   ├── readings/     # Combinations
│   │   └── layout/       # Navigation and layout
│   ├── data/             # Card and combination data
│   ├── pages/            # Pages
│   ├── context/          # React Context (themes)
│   ├── types/            # TypeScript types
│   ├── App.tsx
│   └── index.tsx
└── package.json
```
---

### 🚀 Getting Started
```bash
# Clone the repository
git clone https://github.com/comnsense/reactTarot.git

# Navigate to the directory
cd reactTarot

# Install dependencies
npm install

# Start the development server
npm start
The application will open at http://localhost:3000
```

📦 Production Build
```bash
npm run build
This creates an optimized production build in the build folder.
```
---
### 🚀 Live Demo
 https://react-tarot-sandy.vercel.app/
--- 
 ## License
This project is licensed under the MIT License - see the LICENSE file for details.
---
### GitHub: @comnsense

