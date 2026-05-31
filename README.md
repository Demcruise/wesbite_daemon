# wesbite_daemon

Daemon BlockInt marketing site (Next.js).

## Local development

```bash
cd wireframe
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

The Next.js app lives in **`wireframe/`**, not the repository root. If Root Directory is left empty, Vercel builds the wrong folder and the site returns **404 NOT_FOUND**.

1. [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **General**
2. **Root Directory** → set to **`wireframe`** → Save
3. **Deployments** → open the latest deployment → **Redeploy** (or push a new commit)

Framework should stay **Next.js**. Build command: `npm run build` (default). Install: `npm install` (default).

### Environment variables

Copy any keys from `wireframe/.env.local` into Vercel → **Settings** → **Environment Variables** (do not commit `.env.local`).
