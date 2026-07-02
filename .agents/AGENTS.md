# Gogram AI Guidelines & Lessons Learned

Follow these guidelines for all changes in the Gogram repository:

## 1. Frontend Styling & Accessibility (a11y)
* **Maintain Text Contrast**: Avoid styling font colors or card backgrounds dynamically using user-configured or database-driven colors (such as category theme colors). If text is light (e.g. yellow or lime green), it will become unreadable on light theme pages.
* **Accent Indicators Only**: When applying category theme colors, use design accents such as filled circular dots, SVG stroke outlines, or small borders, keeping typography standard.

## 2. API & Data Loading Flow
* **Sequence APIs over Ad-Hoc Spinners**: If a component has blank flashes when rendering, check if state data (like categories or units) is loading asynchronously. Await these dependencies at the API/Provider layer (e.g. inside `syncProfile` in `userStore.jsx`) before releasing the main authentication loading screens, instead of adding ad-hoc spinners to layout components.
* **Keep Admin Actions Optimized**: Keep the `/admin` startup optimized by skipping eager data fetching of learner modules if the path starts with `/admin`.

## 3. Imports & Code Tracing
* **Verify API Helper Exports**: Do not assume API utilities are default exports under a `utils/` folder. In this project, use `{ api }` named import from `src/data/api`. Always search adjacent components for how helpers are imported before adding new ones.
