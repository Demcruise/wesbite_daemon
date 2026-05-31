# wesbite_daemon

Daemon BlockInt marketing site (Next.js in `wireframe/`).

## Local development

```bash
cd wireframe
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

The Next.js app is in **`wireframe/`**. Vercel must build that folder, not the repo root (README/LICENSE only), or you get **404 NOT_FOUND**.

### Where to set the app folder

**Root Directory is not under General.** Use one of these:

#### Option A — Existing project (recommended)

1. [Vercel Dashboard](https://vercel.com/dashboard) → open project **wesbite_daemon** (click the project name, not Team settings).
2. Top tabs or left sidebar → **Settings**.
3. Open **Build and Deployment** (sometimes labeled **Build & Deployment**) — **not** General.
4. Scroll to **Root Directory** (may appear under **Framework Settings**).
5. Enter **`wireframe`** → **Save**.
6. **Deployments** → **Redeploy** the latest deployment.

If you do not see Root Directory, set **Framework Preset** to **Next.js** on the same page, save, and scroll again.

#### Option B — Re-import the repo (if Option A is missing)

1. **Add New…** → **Project** → import `Demcruise/wesbite_daemon`.
2. On the **Configure Project** screen (before the first deploy), click **Edit** next to **Root Directory**.
3. Choose **`wireframe`**.
4. Deploy.

Or use this clone URL (replace only if your repo URL differs):

`https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDemcruise%2Fwesbite_daemon&root-directory=wireframe`

### Root `vercel.json`

This repo includes a root [`vercel.json`](vercel.json) that runs install/build inside `wireframe/`. That helps some setups, but **Option A or B is still the reliable fix** for Next.js on Vercel.

### Environment variables

Copy keys from `wireframe/.env.local` into Vercel → **Settings** → **Environment Variables** (never commit `.env.local`).
