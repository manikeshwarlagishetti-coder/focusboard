# AI Usage Disclosure — FocusBoard

This document transparently outlines the AI assistance utilized during the architecture, design inspection, implementation, testing, and verification of the **FocusBoard — Frontend Trainee Assessment**.

---

## 1. AI Tooling & Environment

- **AI Model:** Google Gemini 3.8 Flash (High) via Antigravity Agentic Platform
- **Role:** Senior Frontend Developer, UI/UX Architect, QA Engineer, and Deployment Specialist
- **Environment:** Windows PowerShell, Vite 6, React 18, Node.js built-in test runner, Headless Microsoft Edge for visual verification

---

## 2. AI-Assisted Areas

1. **Figma Canvas Inspection & Design Token Extraction:**
   - Autonomous inspection of the official Figma design frames:
     - Desktop dashboard (1440 × 1000)
     - Mobile dashboard (390 × 1128)
     - Create-task form (760 × 822)
     - Focus Notes carousel slides 1, 2, and 3
   - Extraction of design tokens including hex codes (`#4F46E5`, `#5B47FB`, `#EEF2FF`, `#0F172A`), spacing scales, badge dimensions, and typography weights.

2. **Modular Architecture & Component Scaffolding:**
   - Single-source-of-truth state management pattern using React Context API + `useReducer`.
   - Separation of concerns across 15 modular components: `Sidebar`, `Header`, `FocusNotes`, `DashboardStats`, `StatCard`, `TaskSection`, `TaskItem`, `TaskForm`, `SearchBar`, `FilterTabs`, `PriorityFilter`, `EmptyState`, `ConfirmDialog`, `Toast`, and `MobileNavigation`.

3. **Styling & Responsive System Design:**
   - Generation of custom CSS3 stylesheets (`global.css`, `layout.css`, `components.css`, `responsive.css`) matching Figma styling without relying on external CSS frameworks.
   - Crafting responsive media queries specifically targeting 390px mobile, 768px tablet, and 1440px desktop breakpoints.

4. **Edge Case Handling & LocalStorage Persistence:**
   - Safe division by zero for completion percentage when zero tasks exist.
   - Resilient `localStorage` parsing with corrupted JSON handling.
   - Resolution of the critical **empty-list persistence bug**, ensuring that deleting all tasks preserves `[]` across browser refreshes without sample data re-seeding.
   - Keyboard accessibility for modal dialogs (`Escape` key, focus management) and carousel arrow keys.

---

## 3. Representative Prompts

### Prompt 1: Design Extraction & Frame Inspection
> *"Inspect the official Figma references for the FocusBoard project (Desktop dashboard 1440×1000, Mobile dashboard 390×1128, Create-task form 760×822, and Focus Notes slides 1, 2, 3). Extract the exact copy, color codes, progress values, badge variants, and layout structure."*

### Prompt 2: State Management Architecture
> *"Design a centralized React Context with `useReducer` to manage task CRUD operations. Ensure statistics and multi-filter search results are derived reactively via `useMemo`. Integrate browser `localStorage` under the key `focusboard_tasks` such that user changes are persisted across refreshes without sample data overwriting existing tasks."*

### Prompt 3: Empty-List Persistence Bug Fix
> *"When all tasks are deleted, the application must preserve an empty task list after refreshing. Inspect conditions such as `Array.isArray(parsed) && parsed.length > 0`. Do not treat an empty array as missing data. Ensure deleting all tasks does not cause sample tasks to reappear after refresh."*

### Prompt 4: Focus Notes Mobile Navigation & Indicators
> *"Ensure that Focus Notes carousel navigation controls (Previous/Next buttons) and indicator dots are fully accessible, visible, and touch-friendly on mobile (390px) without overlapping slide content, while preserving the desktop layout."*

### Prompt 5: Production Build & Automated Verification
> *"Run `npm run build` and automated test verification (`npm test`). Capture high-resolution desktop (1440×1000) and mobile (390×1128) screenshots of the rendered application to verify visual fidelity against the Figma specification."*

---

## 4. Manual Review, Automated Testing & Verification Performed

All code and fixes underwent rigorous manual and automated testing:
1. **Automated Unit & Integration Test Suite (`tests/focusboard.test.js`):**
   - 14 automated tests executed via `npm test` using Node's native test runner (`node:test`).
   - Verified statistics calculations, zero-task safety, search case-insensitivity, combined filtering, unique ID generation, date formatting, and localStorage persistence.
   - Explicitly verified that `localStorage` containing an empty array `[]` restores `[]` and does not reload initial sample tasks.
2. **Production Build Verification (`npm run build`):**
   - Verified clean compilation with Vite.
   - 1600 modules transformed, 0 warnings/errors, production bundles generated in `dist/`.
3. **Visual Quality Review:**
   - Captured real screenshots at exact 1440×1000 and 390×1128 viewports using headless Microsoft Edge.
   - Verified that both images open correctly and display expected layouts without overflow or clipping.

---

## 5. Checked, Corrected & Rejected AI Suggestions

### 1. Corrected: Empty-List Persistence Bug
- **Initial Code:** `TaskContext.jsx` used `if (Array.isArray(parsed) && parsed.length > 0)`.
- **Defect:** When all tasks were deleted by the user, `parsed` was `[]`. Because `parsed.length > 0` evaluated to `false`, refreshing the browser caused the app to fall back to `INITIAL_TASKS`, resurrecting deleted tasks.
- **Correction:** Changed condition to `if (Array.isArray(parsed)) return { tasks: parsed };`. Deleting all tasks now permanently retains the empty state after refresh.

### 2. Corrected: Mobile Carousel Controls Hidden
- **Initial Code:** In `responsive.css`, `.focus-notes-aside` and `.carousel-indicators` had `display: none;` on screen widths `<= 768px`.
- **Defect:** Mobile users were unable to navigate through Focus Notes slides 2 and 3 because the navigation controls and indicators were hidden.
- **Correction:** Re-architected mobile carousel styles. Replaced generic hiding with `.desktop-carousel-aside { display: none; }` and created `.mobile-carousel-controls` displayed cleanly on mobile in the header row, with indicator dots positioned cleanly below the text.

---

## 6. Project Status & Limitations

- **Current Status:** 100% complete and fully verified.
- **Backend Limitations:** None within assessment scope. The application intentionally runs entirely on the frontend with client-side `localStorage` persistence as required by the specification.
