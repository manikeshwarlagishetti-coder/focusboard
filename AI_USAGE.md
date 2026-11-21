# AI Usage Disclosure — FocusBoard

This document transparently outlines the AI assistance utilized during the architecture, design inspection, implementation, and verification of the **FocusBoard — Frontend Trainee Assessment**.

---

## 1. AI Tooling & Environment

- **AI Tool:** Google Gemini 3.8 Flash (High) via Antigravity Agentic Platform
- **Role:** Senior Frontend Developer, UI/UX Architect, and QA Engineer
- **Environment:** Windows PowerShell, Vite, React 18, Headless Microsoft Edge for verification

---

## 2. AI-Assisted Areas

1. **Figma Canvas Inspection & Design Token Extraction:**
   - Autonomous inspection of the official Figma design frames:
     - Desktop dashboard (1440 × 1000)
     - Mobile dashboard (390 × 1128)
     - Create-task form (760 × 822)
     - Focus Notes carousel slides 1, 2, and 3
   - Extraction of design tokens including hex codes (`#4F46E5`, `#5B47FB`, `#EEF2FF`, `#0F172A`), spacing scales, badge pill dimensions, and typography weights.

2. **Modular Architecture & Component Scaffolding:**
   - Architecture of the single-source-of-truth state management pattern using React Context API + `useReducer`.
   - Separation of concerns across 15 modular components: `Sidebar`, `Header`, `FocusNotes`, `DashboardStats`, `StatCard`, `TaskSection`, `TaskItem`, `TaskForm`, `SearchBar`, `FilterTabs`, `PriorityFilter`, `EmptyState`, `ConfirmDialog`, `Toast`, and `MobileNavigation`.

3. **Styling & Responsive System Design:**
   - Generation of custom CSS3 stylesheets (`global.css`, `layout.css`, `components.css`, `responsive.css`) matching Figma styling without relying on CSS utility frameworks.
   - Crafting responsive media queries specifically targeting 390px mobile, 768px tablet, and 1440px desktop breakpoints.

4. **Edge Case Handling & Quality Assurance:**
   - Safe division by zero for completion rate when zero tasks exist.
   - Resilient `localStorage` parsing with corrupted JSON handling.
   - Keyboard accessibility for modal dialogs (`Escape` key, focus management) and carousel arrow keys.

---

## 3. Representative Prompts

### Prompt 1: Design Extraction & Frame Inspection
> *"Inspect the official Figma references for the FocusBoard project (Desktop dashboard 1440×1000, Mobile dashboard 390×1128, Create-task form 760×822, and Focus Notes slides 1, 2, 3). Extract the exact copy, color codes, progress values, badge variants, and layout structure."*

### Prompt 2: State Management Architecture
> *"Design a centralized React Context with `useReducer` to manage task CRUD operations. Ensure statistics and multi-filter search results are derived reactively via `useMemo`. Integrate browser `localStorage` under the key `focusboard_tasks` such that user changes are persisted across refreshes without sample data overwriting existing tasks."*

### Prompt 3: Focus Notes Carousel Implementation
> *"Implement the mandatory Focus Notes carousel supporting all 3 official slides: 'Make today count' (62%), 'Small steps, big progress' (67%), and 'Celebrate the wins' (100%). Provide previous and next button controls, segmented indicator bars, keyboard arrow navigation, and a responsive mobile card layout."*

### Prompt 4: Production Build & Visual Quality Verification
> *"Run `npm run build` to verify the production bundle. Capture high-resolution desktop (1440×1000) and mobile (390×1128) screenshots of the rendered application to verify visual fidelity against the Figma specification."*

---

## 4. Code Review & Verification Process

All AI-generated code underwent rigorous review and testing:
1. **Static Analysis & Build Verification:** Executed `npm run build` using Vite to verify there were no missing imports, broken JSX tags, or syntax errors. The build compiled cleanly in under 4 seconds.
2. **Visual Fidelity Review:** Generated standalone production bundles and captured screenshots at exact 1440×1000 and 390×1128 viewports using headless Microsoft Edge. Visual layout was cross-compared against the Figma inspection data.
3. **Responsive Stress Testing:** Tested layout responsiveness on mobile (390px) to verify that the sidebar collapses into the mobile header and bottom navigation bar, stat cards reflow to a 2-column grid, and no horizontal overflow exists.

---

## 5. Checked, Corrected & Rejected AI Suggestions

### AI Suggestion Checked & Corrected: Mobile Task Card Layout & Overview Grid

- **Initial AI Output:**
  During initial CSS generation, the AI positioned the category and priority badges on the same line as the task title in a flexible row. On narrow screens (390px mobile), this caused the badges to wrap awkwardly and overlap the task title when titles were moderately long.
- **Why It Was Corrected:**
  Cross-referencing the official Mobile Figma frame (`node-id=1-167`) revealed that on mobile:
  1. The task title and status checkbox occupy the top row, with the three-dots action menu (`···`) pinned to the top right.
  2. The category badge, priority badge, and calendar due date sit neatly on a second row with a `34px` left margin matching the title indentation.
  3. The Overview statistics section on mobile displays only two primary summary cards (`Total tasks` and `Completed`), whereas desktop shows 4 cards.
- **Remediation:**
  The CSS for `.task-item-inner` was rewritten to enforce a dedicated top row and meta row on mobile viewports. Additionally, `.desktop-stat-wrapper` was added to `DashboardStats.jsx` to hide secondary metric cards on mobile, bringing the mobile layout to 100% pixel-perfect compliance with the mobile Figma reference.
