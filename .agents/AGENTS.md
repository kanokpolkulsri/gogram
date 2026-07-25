# Gogram AI Guidelines & Lessons Learned

Follow these guidelines for all changes in the Gogram repository:

## 1. Frontend Styling & Accessibility (a11y)
* **Maintain Text Contrast**: Avoid styling font colors or card backgrounds dynamically using user-configured or database-driven colors (such as category theme colors). If text is light (e.g. yellow or lime green), it will become unreadable on light theme pages.
* **Accent Indicators Only**: When applying category theme colors, use design accents such as filled circular dots, SVG stroke outlines, or small borders, keeping typography standard.
* **Avoid Inline Styling Blocks**: Do not style components using large inline style properties (the `style={{ ... }}` attribute) inside React components. Large style blocks must be defined in their own `.css` stylesheet using clear, unique class selectors (e.g. `src/App.css` or component-specific CSS files) to keep JSX markup clean and easily maintainable.

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

## 7. Curriculum & Seeding Specifications
* **Curriculum Standard**: The Grammar category has a fixed configuration of exactly 75 units (topics) and 5 difficulty levels per unit (Easy, Medium 1, Medium 2, Hard 1, Hard 2) with 10 questions per level. Do not modify this default count, question distribution, or database schema configuration.
* **Frontend Static Units**: The Grammar category units are loaded statically on the frontend from `src/data/mockData.js` to optimize API workload and startup speed. If any changes are made to the Grammar curriculum units (e.g., adding, deleting, or reordering units), ensure `src/data/mockData.js` is updated accordingly so the static frontend layout matches the database.
* **Category Icon Convention**: All study category icons must use a single capital letter (`iconChar`) representing the first letter of the category title (e.g., `G` for Grammar, `V` for Vocabulary, `M` for Mixed Grammar, `C` for Conversation). Emojis or special character symbols must not be used as category logo characters.
* **Conversation Curriculum Standard**: The Conversation category is structured with 30 units (Units 301–330) and 5 difficulty levels per unit (Easy, Medium 1, Medium 2, Hard 1, Hard 2) with exactly **5 story questions per level node** (forming a cohesive 5-part continuous story scene per level).
* **Always Discuss Before Modifying/Deploying**: Because the platform is actively serving real users in production, do not make code changes, commit, or run the deployment script (`deploy.sh`) without first presenting the proposed plan to the developer and obtaining their explicit permission.
## 8. Infrastructure Sizing & Cost Optimization Rules
* **Cloud SQL Instance Sizing**: Never provision or default to Enterprise Plus or multi-core (>1 vCPU) Cloud SQL database instances. Default strictly to **Enterprise Edition (Standard)** with **`db-f1-micro`** (Shared Core, 0.6 GB RAM) or **`db-custom-1-3840`** (1 vCPU, 3.75 GB RAM) and 10–20 GB SSD storage. Data Cache (NVMe) must remain disabled as Gogram's entire database dataset (<50 MB) fits comfortably inside standard PostgreSQL memory buffers.
* **Cloud Run Service Optimization**:
  * **Min Instances**: Must be set to `0` (`--min-instances 0`) so Cloud Run scales down to zero when idle, preventing baseline hourly charges.
  * **CPU Allocation**: CPU must be set to `cpu-throttled` (CPU allocated only during request processing).
  * **Memory & vCPU**: Provision `512Mi` RAM and `1 vCPU` max for the API container.
  * **Concurrency**: Concurrency target set to `80` requests per instance.
* **Cloud Build Trigger Filtering**: Build triggers must restrict included file paths to `server/**` so frontend code edits or documentation changes do not spawn paid container build steps.
* **Instant Container Port Binding**: Backend entrypoints (`server/index.js`) must execute `app.listen(PORT)` immediately upon process start. Database connection tests or schema migrations must run asynchronously to ensure GCP container health probes (`PORT=8080`) pass within seconds without timing out.

