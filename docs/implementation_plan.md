# VELOURA Feature Enhancement Plan

Transform the existing VELOURA app into a portfolio/hackathon-ready project by adding AI transparency, visual depth, and premium features.

## User Review Required

> [!IMPORTANT]
> Your app is built with **vanilla HTML/CSS/JS** (not React). The prompt mentions React/Tailwind, but converting would mean discarding all existing work. **I recommend enhancing the current stack** — all features below can be built beautifully without React. This keeps the backend integration, auth system, and glassmorphism design intact.

## What's Already Built ✅

| Feature | Status |
|---|---|
| Quiz with 8 questions | ✅ Done |
| Mood selector | ✅ Done |
| Occasion suggestions | ✅ Done |
| Budget slider with tiers | ✅ Done |
| Weather-based filtering | ✅ Done |
| Save/Like/Dislike (👍👎) | ✅ Done |
| AI loading animation | ✅ Done |
| Dark/Light mode toggle | ✅ Done |
| Glassmorphism + premium design | ✅ Done |
| Gender selection | ✅ Done |
| Result cards (brand, notes, price, emoji) | ✅ Done |
| Question counter ("Q3 of 8") | ✅ Done |
| Authentication system | ✅ Done |
| Backend server (Express) | ✅ Done |
| Feedback/Query page | ✅ Done |

## New Features to Add (in current vanilla stack)

---

### Phase 1 — AI Transparency + Explanation

#### [MODIFY] [script.js](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/script.js)
- Add `generateExplanation(perfume, userAnswers)` function
- Compute per-category match breakdown (mood +25, scent +30, etc.)
- Generate human-readable "Why this perfume?" text
- Add AI confidence score display (already calculated as `match%`)

#### [MODIFY] [index.html](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/index.html)
- Add expandable "Why this?" section inside each result card
- Add fragrance notes bars (Top → Middle → Base) with colored segments

#### [MODIFY] [styles.css](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/styles.css)
- Style explanation panel, confidence badge, notes visualization bars

---

### Phase 2 — Visual Progress Bar + Demo Mode

#### [MODIFY] [index.html](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/index.html)
- Add visual progress bar at top of quiz page
- Add "Try Demo" button on login page

#### [MODIFY] [script.js](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/script.js)
- Progress bar updates on scroll/answer
- Demo mode: pre-fill answers and auto-submit

#### [MODIFY] [styles.css](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/styles.css)
- Animated progress bar styling

---

### Phase 3 — Scent Profile + Personality

#### [MODIFY] [index.html](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/index.html)
- Add new `#page-profile` section for "Your Fragrance Personality"
- Spotify Wrapped-style personality card with traits

#### [MODIFY] [script.js](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/script.js)
- `generateScentProfile()` — maps quiz answers to personality type
- 5 types: **Minimalist**, **Romantic**, **Adventurer**, **Classic**, **Luxury Seeker**
- Trait breakdown (boldness, elegance, warmth, freshness)

#### [MODIFY] [styles.css](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/styles.css)
- Gradient personality card, trait bars, shareable layout

---

### Phase 4 — Compare + Database Explorer

#### [MODIFY] [index.html](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/index.html)
- Add `#page-explore` — filterable perfume database browser
- Add `#page-compare` — side-by-side comparison view
- Add nav buttons for Explore (🔍) and Compare (⚖️)

#### [MODIFY] [script.js](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/script.js)
- Filter/search logic for explore page (by brand, scent family, price, gender)
- Compare mode: select 2-3 perfumes and view differences

#### [MODIFY] [styles.css](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/styles.css)
- Explorer grid, filter chips, comparison table styling

---

### Phase 5 — Interactive Quiz Wizard (One Question per Screen)

#### [MODIFY] [index.html](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/index.html)
- Change `#quiz-sections` to hold single active step instead of all steps
- Add "Back" and "Next" navigation buttons container

#### [MODIFY] [script.js](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/script.js)
- Refactor `renderQuiz()` to `renderQuizStep(index)`
- Add state variable `currentStep`
- Implement "Next" logic (validate current step before moving)
- Add "Hot & Dry" to Weather options
- Add "Hyperhidrosis" to Skin Type options

#### [MODIFY] [styles.css](file:///c:/Users/HP/OneDrive/Desktop/VELOURA/styles.css)
- Style single-question layout (centered, larger text)
- Add animation for slide-in/slide-out effect between steps
- Style nav buttons (Previous/Next)

---

## Verification Plan

### After Each Phase
- Run `node server.js` and test at `http://localhost:3000`
- Verify both dark and light themes
- Test quiz flow → results → explanation → profile
- Test demo mode for instant results
