# Interiorlogy

A premium full‑stack interior design showcase application featuring a cinematic hero, animated masonry portfolio, parallax enhanced storytelling sections, and a refined contact funnel — built with a TypeScript React frontend (Vite) and an Express + Drizzle ORM backend.

## ✨ Highlights
- **Luxury Visual System**: Glassy navigation, golden accent gradients, premium typography, subtle glow + sheen micro–interactions.
- **Animated Portfolio**: Masonry layout with Ken Burns ambience, scroll reveals, hover overlays, category filtering, and reduced‑motion fallbacks.
- **Parallax Sections**: Reusable `ParallaxSection` component provides depth without overwhelming motion.
- **Accessible Contact Funnel**: Validated form with ARIA live feedback, toast notifications, external FormBackend submission, and animated info cards.
- **Theming + Dark Mode**: Theme toggle with persisted preference.
- **Modern Component Stack**: Radix primitives + shadcn‑style UI composition (buttons, dialogs, navigation, form inputs, etc.).
- **Typed Domain Layer**: Drizzle ORM schema (`shared/schema.ts`) with Zod validation helpers.
- **Single Deployment Surface**: API + built client served from one Node process (ideal for Render deployment).

## 🧱 Tech Stack
| Layer | Tech |
|-------|------|
| UI / SPA | React 18, Vite, TypeScript, Wouter routing |
| Styling | Tailwind CSS, CSS utility animations, custom premium gradients |
| Motion | Framer Motion (scroll + entrance + ambient) |
| Data Layer | Drizzle ORM + Postgres (extensible) |
| Validation | Zod + drizzle-zod |
| Server | Express (single entry: `server/index.ts`) |
| Build | Vite build for client, esbuild bundle for server |
| Deployment | Render (single web service) |

## 📁 Project Structure
```
root
├─ client/                 # React + Vite frontend (root set to this in vite.config)
│  ├─ index.html
│  └─ src/
│     ├─ components/       # UI + premium sections
│     ├─ pages/
│     ├─ hooks/
│     ├─ lib/
│     └─ main.tsx          # SPA bootstrap
├─ server/
│  ├─ index.ts             # Express entry (serves API + static in prod)
│  ├─ routes.ts            # (Extendable) API registration
│  └─ vite.ts              # Dev integration + static serving
├─ shared/
│  └─ schema.ts            # Drizzle schema + Zod types
├─ drizzle.config.ts       # Drizzle CLI config
├─ tailwind.config.ts      # Tailwind theme + tokens
├─ tsconfig.json           # TS config for both client + server
├─ package.json            # Scripts / deps
└─ README.md
```

## 🚀 Local Development
### Prerequisites
- Node.js 18+
- (Optional) Postgres database if you extend user data (current routes are placeholder)

### Install Dependencies
```bash
npm install
```

### Run in Development (client + API via Vite middleware)
```bash
npm run dev
```
This runs `server/index.ts` with Vite middleware (hot reload for the React app).

### Type Check
```bash
npm run check
```

### Build (Client + Server)
```bash
npm run build
```
Outputs:
- Server bundle: `dist/index.js`
- Built client assets: `dist/public/*`

### Production Start
```bash
npm start
```
Serves the prebuilt client + API on `PORT` (default 5000).

## 📨 Contact Form (FormBackend)
The contact form posts to FormBackend endpoint:
```
https://www.formbackend.com
```
Fields submitted: `name`, `email`, optional `phone`, `message` as `multipart/form-data`.
You can view / manage submissions via your FormBackend dashboard.

## 🌫 Parallax & Motion
All scroll + reveal animations honor reduced motion preferences. To adjust parallax intensity, edit `ParallaxSection` props.

## 🛠 Extending the API
Currently `server/routes.ts` is a scaffold. Add routes like:
```ts
app.get('/api/health', (_req, res) => res.json({ ok: true }));
```
Then redeploy. The logging middleware prints compact JSON summaries for `/api/*` responses.

## 🗃 Database & Drizzle
If you provision a Postgres database:
1. Set `DATABASE_URL` in your environment.
2. Define tables in `shared/schema.ts`.
3. Push schema:
```bash
npm run db:push
```
(If `DATABASE_URL` is missing, `drizzle.config.ts` throws early to prevent silent misconfig.)

## ☁️ Deploying on Render
### 1. Push to GitHub
Include all files except those ignored by `.gitignore` (already excludes `node_modules`, build output, etc.). Make sure you commit:
- `client/`, `server/`, `shared/`, config files, `package.json`, `package-lock.json`, `drizzle.config.ts`, `tailwind.config.ts`, `tsconfig.json`, assets under `attached_assets/`.

### 2. Create a New Web Service
- Build Command: `npm run build`
- Start Command: `npm start`
- Environment: Node 18+ (Render default is fine)
- Add Environment Variables (optional):
  - `PORT` (Render supplies automatically)
  - `DATABASE_URL` (if using Postgres / Drizzle)
  - Any auth or feature flags you add later

### 3. (Optional) Postgres on Render
- Provision a Render Postgres instance.
- Copy its connection string into `DATABASE_URL`.
- Run a one-off deploy or use a job to execute: `npm run db:push`.

### 4. CDN & Caching
Static assets are served from `dist/public`. Leverage long‑term caching by keeping file hashes (Vite handles this automatically).

### 5. Verify Deployment
After deploy completes:
```bash
curl -s https://your-service.onrender.com | head
```
Add a health route for better monitoring:
```ts
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
```

## 🔒 Environment & Secrets
Do not commit secrets. Use Render Dashboard for all keys. `.gitignore` already excludes build artifacts.

## 🧪 Suggested Next Enhancements
- Add authentication (passport local already in deps) and protected routes.
- Introduce image optimization / CDN.
- Implement a real portfolio CMS (Headless or simple CRUD with Drizzle).
- Add integration tests with Vitest or Jest + supertest.
- Add skeleton loading states where data will be dynamic.

## 🖼 Design Language Notes
- Golden accent hex approximations: `#fde63e`, `#f8d64e`, `#f1b84b`, softened variants for hover states.
- Use `backdrop-blur` + layered translucent panels for premium depth.
- Maintain accessible contrast — avoid pure gold text on light backgrounds without outline / shadow.

## 📜 License
MIT © Interiorlogy

---
Crafted with focus on polish, performance, and accessibility.
