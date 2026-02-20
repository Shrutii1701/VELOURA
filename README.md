# VELOURA - AI Perfume Recommendation System

**VELOURA** is a luxury, AI-powered single-page application (SPA) that helps users discover their signature scent. Built with vanilla HTML5, CSS3, and JavaScript, it features a glassmorphism design, real-time "Scent Personality" analysis, and a comprehensive fragrance directory.

## Features ✨

- **AI-Powered Quiz**: Analyzes 8 key factors (mood, occasion, weather, etc.) to recommend perfumes.
- **Scent Personality**: Generates a unique visualization based on your quiz results.
- **Visual Progress**: Real-time progress tracking and "Demo Mode" for quick testing.
- **Explore & Compare**: Browse the full fragrance directory and compare perfumes side-by-side.
- **Premium UI**: Glassmorphism design, smooth animations, and dark/light theme support.
- **Authentication**: Guest mode, Sign Up/Login, and saved preferences via a lightweight backend.

## Tech Stack 🛠️

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Data**: JSON-based storage (local `data/` folder, no external database required)

## Getting Started 🚀

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Server**:
    ```bash
    node server.js
    ```

3.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000)

## Project Structure 📂

- `index.html`: Main application entry point.
- `styles.css`: All styling, animations, and theme logic.
- `script.js`: Frontend logic, API calls, and quiz state management.
- `server.js`: Express backend for auth and data persistence.
- `docs/`: Expanded project documentation and implementation plans (`task.md`, `implementation_plan.md`).

---
*Developed with Google DeepMind's Antigravity Agent*