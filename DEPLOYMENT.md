# Deployment and form integration

## Vercel

Import this folder as a new Vercel project. No framework preset or build command is required; use the project root as the output directory. `vercel.json` supplies security and immutable asset-cache headers.

The same folder can be published on Netlify, GitHub Pages or any static web server.

Before launch, replace the canonical and Open Graph URLs in `index.html` if the final domain differs from `https://www.vacs.org/`.

## Apps Script form connection

All four form variants post the following common field names:

`intent`, `name`, `email`, `phone`, `city`, `message`, `consent`

Intent-specific fields:

- Member: `industry_role`, `experience`, `areas_of_interest`
- Volunteer: `skills`, `availability`, `preferred_contribution`
- Collaborate: `organization`, `collaboration_type`, `proposal_summary`
- Support: `support_type`, `preferred_contact_method`

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

The Apps Script endpoint must accept browser form-data POST requests and return a successful 2xx response with appropriate CORS behaviour. Keep `enabled: false` until that endpoint has been tested.
