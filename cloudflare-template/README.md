# HeartCheck – Cloudflare Template

One‑click deploy a public, read‑only `/heart` endpoint that returns JSON‑LD.

## Deploy (recommended)

1. Push this folder as its own GitHub repo (or fork it)
2. Click the button below and select your repo

[![Deploy to Cloudflare](https://deploy.workers.dev/button)](https://deploy.workers.dev/?url=REPLACE_WITH_YOUR_REPO_URL)

After deploy, visit your Worker URL and append `/heart`.

## Configure data (no code)

- In Cloudflare → Workers & Pages → your Worker → Settings → Variables → Text
- Add a variable named `HEART_JSON`
- Paste your JSON‑LD (you can generate it at /builder on the site)

That’s it — your `/heart` endpoint is live.

## Local quick test (optional)

- Install Wrangler
- `wrangler dev`
- Open `http://127.0.0.1:8787/heart`

## Data shape (minimum)

- `@context`, `@type = EthicsTransparency`, `@id`, `service_name`, `timestamp`, `version`, `governance`
- Optionally include `contact` and self‑assessed metrics (dignity_score, etc.)

For examples, see the main site’s Examples and Field Definitions sections.

