# African Girl Guide — website (self-contained build)

Every page carries its own styling and scripts, so there are no folders to manage.
Files: index.html, about.html, leadership.html, join.html, donate.html, 404.html

## Update the live site
1. On GitHub, open the repository's main page → Add file → Upload files.
2. Drag in all six .html files and click Commit changes. Netlify updates in about a minute.
3. The old `assets` folder is no longer used and can be deleted.

## Settings (edit in every .html file, near the bottom, under `const SETTINGS`)
- WHATSAPP_NUMBER: digits only in international format, e.g. 2348012345678. Buttons stay hidden until set.
- DONATE_URL: your checkout link (Stripe, PayPal, Givebutter, Donorbox).

## Forms
Join and newsletter sign-ups use Netlify Forms: Netlify → your site → Forms → Enable form detection, then Deploys → Trigger deploy.
