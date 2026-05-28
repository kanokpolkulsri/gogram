# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 🚀 Live Deployment (Google Cloud)

This project is deployed to Google Cloud using **Firebase Hosting**.

- 🌐 **Live Web App**: [https://gogram-web-2026.web.app](https://gogram-web-2026.web.app)
- 🔥 **Firebase Developer Console**: [https://console.firebase.google.com/project/gogram-web-2026/overview](https://console.firebase.google.com/project/gogram-web-2026/overview)
- ☁️ **Google Cloud Platform (GCP) Console**: [https://console.cloud.google.com/home/dashboard?project=gogram-web-2026](https://console.cloud.google.com/home/dashboard?project=gogram-web-2026)

### How to Redeploy

To push updates live to Google Cloud, run:

```bash
# 1. Build optimized static assets
npm run build

# 2. Deploy to Firebase Hosting
export PATH="$HOME/.local/bin:$PATH"
npx -y firebase-tools@latest deploy --only hosting
```

