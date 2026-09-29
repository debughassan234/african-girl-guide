# African Girl Guide — website

She learns. She leads. She thrives.

A fast, static, mobile-friendly website for African Girl Guide, an initiative of Paw Salvation (registered 501(c)(3)). No build step: plain HTML, CSS and JavaScript, ready for GitHub Pages.

## Pages
- `index.html` — Home
- `about.html` — Our story, Advisory Board, partnerships
- `donate.html` — Donation form
- `404.html` — Not-found page

## Put it live on GitHub Pages
1. Sign in at github.com and create a new **public** repository (e.g. `african-girl-guide`).
2. On the repo page choose **Add file → Upload files**, drag in *everything inside this folder* (keep the `assets` folder structure), then **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, and **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/african-girl-guide/`.

### Use africangirlguide.org (optional)
1. In **Settings → Pages → Custom domain**, enter `www.africangirlguide.org` and save.
2. At your domain registrar, add a `CNAME` record: `www` → `<your-username>.github.io`.
3. For the bare domain, add `A` records for `@` pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153.
4. Back in Pages settings, tick **Enforce HTTPS** once it becomes available.

Note: the current africangirlguide.org site (and app.africangirlguide.org logins) are linked from this site — coordinate before pointing the domain here.

## Before launch — fill these in
- **Photos:** every patterned block marked `PHOTO` is a slot. Put images in `assets/img/` and add `<img src="assets/img/your-photo.jpg" alt="Describe the photo">` inside that block (it fills automatically).
- **EIN:** search the files for `[EIN]` and replace it.
- **Donations:** in `assets/js/main.js`, set `DONATE_URL` to your checkout link (Stripe Payment Link, PayPal, Givebutter, Donorbox…).
- **Newsletter:** set `NEWSLETTER_ENDPOINT` in the same file to your form endpoint (Formspree, Mailchimp, Kit…).
- **WhatsApp:** set `WHATSAPP_NUMBER` in `assets/js/main.js` (international format, digits only, e.g. `2348012345678`). The WhatsApp buttons stay hidden until it's set. You can also change the pre-filled `WHATSAPP_MESSAGE`.
- **Instagram:** the Instagram buttons open a direct message to @africangirlguide (`https://ig.me/m/africangirlguide`). Change the handle in the HTML files if it differs.

## Forms (Join page + newsletter)
Both forms use **Netlify Forms**, so submissions arrive in your Netlify dashboard.
1. In Netlify open your site → **Forms** → **Enable form detection**.
2. Make any small commit on GitHub (or click **Deploys → Trigger deploy**) so Netlify scans the pages.
3. Submissions appear under **Forms → join** and **Forms → newsletter**. Under **Forms → Form notifications** you can get each one emailed to info@africangirlguide.org.
