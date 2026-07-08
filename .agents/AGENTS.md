# Gogram AI Guidelines & Lessons Learned

Follow these guidelines for all changes in the Gogram repository:

## 1. Frontend Styling & Accessibility (a11y)
* **Maintain Text Contrast**: Avoid styling font colors or card backgrounds dynamically using user-configured or database-driven colors (such as category theme colors). If text is light (e.g. yellow or lime green), it will become unreadable on light theme pages.
* **Accent Indicators Only**: When applying category theme colors, use design accents such as filled circular dots, SVG stroke outlines, or small borders, keeping typography standard.

## 2. API & Data Loading Flow
* **Sequence APIs over Ad-Hoc Spinners**: If a component has blank flashes when rendering, check if state data (like categories or units) is loading asynchronously. Await these dependencies at the API/Provider layer (e.g. inside `syncProfile` in `userStore.jsx`) before releasing the main authentication loading screens, instead of adding ad-hoc spinners to layout components.
* **Keep Admin Actions Optimized**: Keep the `/admin` startup optimized by skipping eager data fetching of learner modules if the path starts with `/admin`.
* **Login & Profile Sync Robustness**: The `/api/auth/sync` endpoint is critical for application entry and must never fail or be blocked. If the login API triggers a connection error (`TypeError: Failed to fetch` or `ERR_CONNECTION_REFUSED`), check if the backend server is down due to a database connection timeout.
  * *Troubleshooting*: Gogram uses a remote Google Cloud SQL PostgreSQL instance (`34.126.85.240`). If the developer's public IP changes dynamically, the GCP Cloud SQL firewall (Authorized Networks) will block the connection, crashing the server startup. The developer's current public IP must be authorized in the Google Cloud console.

## 3. Imports & Code Tracing
* **Verify API Helper Exports**: Do not assume API utilities are default exports under a `utils/` folder. In this project, use `{ api }` named import from `src/data/api`. Always search adjacent components for how helpers are imported before adding new ones.

## 4. Testability & Developer Tracking
* **Unique Selectors for Interactive Elements**: All interactive HTML/React elements (such as buttons, input fields, and selectors) must be assigned unique, descriptive `className` or `id` attributes to facilitate developer tracking and reliable selector targeting in QA and browser automation tests.
* **Unique Classnames for Component Containers**: Key frontend component containers, wrapper cards, and section elements (e.g., `profile-settings-card`, `premium-status-card`) must be assigned unique, descriptive `className` selectors to facilitate easy element targeting for page assertions, QA scripts, and browser automation.

## 5. Cloud Deployment & Database Connections
* **Unix Socket SSL Negotiation**: In production, when using a Unix domain socket database connection (e.g. Cloud Run connecting to Cloud SQL via `/cloudsql/...`), database SSL negotiation must be disabled in `server/db/index.js`. Attempting to negotiate SSL over a local Unix socket fails and will crash the server on startup.
* **Production API Base URL**: The production backend API URL in `src/data/api.js` must always terminate with the `/api` path prefix to correctly route requests to the mounted Express app routes.
* **Cloud Build Trigger Optimization**: To prevent unnecessary containers from building and to save build costs during frontend-only updates, the Cloud Build Trigger for the backend service must be filtered using the **Included files** glob set to `server/**`.

## 6. Database Safety & Seeding Safeguards
* **No Unsanctioned Database Resets**: Never execute database seeding commands (`npm run seed`) or clear tables (`DELETE FROM ...` / `DROP TABLE ...`) without the developer's explicit permission.
* **Avoid Redundant Data Insertion**: Make sure any manual insert queries or seeding scripts use `ON CONFLICT` checks or verification queries to prevent duplicate entries and maintain database integrity.

