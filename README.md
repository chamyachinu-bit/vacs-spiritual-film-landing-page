# VACS production landing page

A dependency-free production website for Vaishvik Adhyatmik Chitranagari Samiti.

## Run locally

Serve this folder with any static server. For example:

```powershell
python -m http.server 8080
```

Open `http://localhost:8080`. Opening `index.html` directly also works, but a local server is recommended for deployment-like testing.

## Structure

- `index.html` - semantic page structure and metadata
- `styles.css` - brand tokens, responsive layouts and motion
- `script.js` - initiatives, trustees, navigation, reveals and forms
- `config.js` - form endpoint feature flag
- `assets/` - official brand artwork, icons and optimized photography
- `legacy/` - notes about the preserved Claude Design exports

The site has no runtime packages or framework dependency.

## Cinematic opening

Every full page load begins with a silent, approximately four-second floral-aperture entrance. Visitors can choose **Enter** immediately; Escape also continues to the site. The generated floral halo gathers around the official logo, receives one soft glimmer, then zooms and dissolves into the hero. The sequence has a seven-second fail-safe and becomes a short opacity fade when reduced motion is requested.

## Future programming

Showreel, events, impact, testimonials and partner areas are intentionally hidden until approved content exists. Their feature flags and empty data arrays are centralized in `siteFeatures` at the top of `script.js`; do not enable a feature until its real content and assets have been supplied.
