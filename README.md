# Surjit Electricals website

Static website (HTML, CSS, JavaScript). No build step.

## Edit content
- Text and sections: `index.html`
- Clients, project photos, hero/about images: top of `script.js`
- Colours and fonts: top of `styles.css`

## Add photos
1. Put images in `assets/gallery/`.
2. In `script.js`, set `src` for entries in `GALLERY` (for example `assets/gallery/site1.jpg`). The Projects section appears automatically once at least one photo is set.
3. Optional: set `HERO_IMAGES` (3 images) and `ABOUT_IMAGE`.

## Enquiry form
Submits to Formspree form `myeknagp`. Enquiries go to the email confirmed on that Formspree form.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server`.

## Deploy
Any static host works (GitHub Pages, Netlify, Hostinger). For GitHub Pages: Settings > Pages > Source: GitHub Actions, then merge to `main`.
