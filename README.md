# 🗺️ Geo Nerd — India Geography Quiz Game

A browser-based geography quiz game that tests your knowledge of India's states and districts. Type names to reveal them on an interactive SVG map — built with React, D3, and TopoJSON.

## Modes

### 🏛️ Play Indian States
Guess all 36 Indian states and union territories. Type a state name and press **Enter** — if correct, it lights up green on the map. Keep going until you find them all.

### 📍 Play State Districts
Choose any state from a grid (each card shows a live mini-map of that state). Once inside, guess every district of that state the same way — type and press **Enter**.

## How to Play
1. Start on the home screen and pick a mode.
2. Type a name in the input box and press **Enter**.
3. Correct guesses turn **green** on the map.
4. The current input highlights matching regions in **orange** as you type.
5. Hover any region to reveal its name via tooltip.
6. Track your progress with the live score counter.

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI & state management |
| [Vite](https://vite.dev) | Dev server & bundler |
| [D3](https://d3js.org) | SVG map rendering & geo projections |
| [TopoJSON Client](https://github.com/topojson/topojson-client) | Decoding compressed map data |
| [React Router v7](https://reactrouter.com) | Client-side routing |

## Map Data

All geographic data is served from a single `india-states.json` TopoJSON file (`/public`). It contains two objects:

- **`states`** — 36 states & union territories
- **`districts`** — 723 districts across all states

TopoJSON is used instead of GeoJSON because it encodes shared borders only once, making the file ~7× smaller.

> **Data source:** Map data is sourced from [udit-001/india-maps-data](https://github.com/udit-001/india-maps-data) — a comprehensive repository of India geographic data in TopoJSON and GeoJSON formats. All credit for the map data goes to that project.

## Project Structure

```
src/
├── App.jsx                        # Router shell
├── App.css                        # Shared styles
├── components/
│   └── StateMiniMap/              # Reusable mini SVG map for state cards
└── pages/
    ├── HomePage/                  # Landing page with mode selection
    ├── StatesGame/                # Indian states guessing game
    ├── StatesGridPage/            # State picker grid
    └── DistrictGame/              # District guessing game for a single state
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
