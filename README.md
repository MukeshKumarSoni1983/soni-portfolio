# Mukesh Kumar — Portfolio (Angular 17, Style D)

Angular standalone components on GitHub Pages + a free Cloudflare Worker that counts and records visits.

## 1. Backend (visitor count + private visitor log)
```bash
cd worker
npx wrangler login
npx wrangler d1 create portfolio-visits          # copy database_id into wrangler.toml
npx wrangler d1 execute portfolio-visits --remote --file=schema.sql   # (re-running this resets the log)
npx wrangler secret put ADMIN_PASSWORD           # choose a strong password
npx wrangler deploy                              # prints https://portfolio-visits.<you>.workers.dev
```
Set `ALLOWED_ORIGIN` in `wrangler.toml` to `https://<your-github-username>.github.io` before deploying.

## 2. Connect the site
Put the Worker URL in `src/app/config.ts`.

## 3. Run locally
```bash
npm install
npm start        # http://localhost:4200
```
http://localhost:4200 is also allowed by the Worker, so the counter works locally once the Worker is deployed.

## 4. Push to GitHub
```bash
git init && git add . && git commit -m "Angular portfolio"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
Then repo → Settings → Pages → Source: **GitHub Actions**. Every push to `main` deploys.

## 5. Your private visitor page
`https://portfolio-visits.<you>.workers.dev/admin` — the browser asks for a login: any username, password = your `ADMIN_PASSWORD`.
Shows time, IP, country, region, city, postal code, timezone, coordinates, network/ISP, browser/device and referrer. It is not linked anywhere on the site.
Location is approximate (from the IP). Keep the privacy line in the footer.
"# Mukesh-Kumar-Portfolio" 
