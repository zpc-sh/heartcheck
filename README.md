# HeartCheck Site

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

Svelte 5 + Vite site for the HeartCheck RFC, docs, and tools.

Key routes
- `/` — landing (single CTA to Builder)
- `/docs` — docs hub (links to Spec, RFC, FAQ, Examples, Print, Present, Viral, Validate)
- `/builder` — form → JSON‑LD → Cloudflare Worker tools
- `/validate` — validate any `/heart` endpoint
- `/viral` — viral toolkit (mdsvex)

## Develop

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

Output is written to `dist/`.

## Deploy: Cloudflare Pages

This repo is configured to deploy as a static SPA on Cloudflare Pages.

Recommended Pages settings
- Framework preset: Vite (auto-detected)
- Build command: `pnpm install && pnpm build`
- Build output directory: `dist`
- Environment variables: `NODE_VERSION=20`

One‑click start

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-0f172a?logo=cloudflare&logoColor=F38020)](https://dash.cloudflare.com/?to=/:account/pages/new)

[Deploy to Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages/new)

Click the link above (requires Cloudflare login), choose your Git provider + this repo, and set the build settings as listed. Pages will auto-deploy on every push to your default branch.

Using Wrangler (optional)

```sh
# build the site
pnpm build

# local preview with Pages emulator
npx wrangler pages dev

# or explicitly point to the build output directory
npx wrangler pages dev dist

# deploy to Pages
npx wrangler pages deploy

# or explicitly
npx wrangler pages deploy dist
```

The root `wrangler.toml` includes `pages_build_output_dir = "dist"`, so `wrangler pages dev/deploy` can infer the output.


Routing and headers
- SPA fallback: handled by `public/_redirects` (`/* /index.html 200`)
- JSON‑LD endpoints: `public/_headers` sets the correct headers for `/heart` and `/heart.json`:
  - `Content-Type: application/ld+json; charset=utf-8`
  - `Access-Control-Allow-Origin: *`

Custom domains
- Attach your domains in Pages → Custom domains (e.g., `heartcheck.dev`, `heartcheck.sh`).
- After DNS is verified, deep links like `/docs/rfc` will work thanks to `_redirects`.

## Cloudflare Worker template (optional)

For services to host their own `/heart` endpoint, a Worker template is included:
- `cloudflare-template/worker.js` — serves `GET /heart` from `HEART_JSON` env or a safe default
- `cloudflare-template/wrangler.toml` — minimal config with optional inline `HEART_JSON`

One‑click deploy
- Put the `cloudflare-template/` into its own public GitHub repo
- Use the Deploy to Cloudflare button format in the template README:
  `https://deploy.workers.dev/?url=YOUR_REPO_URL`

## i18n & theming

- Language: basic EN/ES support via `src/lib/i18n.ts` + `LanguageSwitcher`
- Theme: light/dark/system via `ThemeToggle`
