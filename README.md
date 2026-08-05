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
