# Deployment and form integration

## Vercel

Import this folder as a new Vercel project. No framework preset or build command is required; use the project root as the output directory. `vercel.json` supplies security and immutable asset-cache headers.

The same folder can be published on Netlify, GitHub Pages or any static web server.

Before launch, replace the canonical and Open Graph URLs in `index.html` if the final domain differs from `https://www.vacs.org/`.

## Apps Script form connection

The production-ready receiver is in `apps-script/Code.gs`. It accepts JSON from all four form variants, validates common fields, creates separate sheets automatically, generates safe sequential submission IDs, and emails `info@vacstrust.org` after a row is saved.

1. Create a Google Sheet for website enquiries.
2. From that Sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with `apps-script/Code.gs`.
4. Select **Deploy → New deployment → Web app**.
5. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
6. Deploy, authorize the script, and copy the URL ending in `/exec`.
7. Open the `/exec` URL in a browser. It should return `Connect With Us API is running.`

The first submission of each type creates its sheet automatically: `Members`, `Volunteers`, `Collaborations`, or `Support`.

To enable submission, edit `config.js`:

```js
window.VACS_FORM_CONFIG = Object.freeze({
  enabled: true,
  endpoint: "YOUR_APPS_SCRIPT_WEB_APP_URL",
  method: "POST"
});
```

## Activating future sections

The showreel, events, impact, testimonials and partner structures remain inside a hidden container in `index.html`. Approved content should first be added to the corresponding entry in `siteFeatures` in `script.js`; only then should the feature be enabled and rendered. Never use provisional statistics, attributed quotations or partner marks in production.

The frontend sends JSON as `text/plain` to avoid an unnecessary browser preflight while allowing Apps Script to parse `e.postData.contents`. Keep `enabled: false` until the `/exec` endpoint has been tested with all four form types.
