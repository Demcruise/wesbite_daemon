# wesbite_daemon

Daemon BlockInt marketing site (Next.js at repository root).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Connect this repo and use defaults:

- **Framework:** Next.js (auto-detected)
- **Root Directory:** leave empty (repo root)
- **Build command:** `npm run build`
- **Install command:** `npm install`

After deploy, open the production URL. If you still see **404**, check **Deployments** → latest build → **Build Logs** for errors.

### Environment variables

Copy keys from `.env.local` into Vercel → **Settings** → **Environment Variables** (never commit `.env.local`).

### Legacy `wireframe/` folder

The app was moved to the repo root so Vercel does not need a subdirectory setting. You can delete the local `wireframe/` folder if it only contains cache (`node_modules`, `.next`) or an empty `app/` stub.
