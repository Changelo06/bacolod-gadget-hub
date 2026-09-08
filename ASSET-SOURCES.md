# Asset sources

## Existing brand asset
src/assets/iwarehouse-logo.png came from the user's repository. The image is shown without colour inversion, using CSS to frame its existing wordmark area. Final horizontal logo exports are still requested.

## Sample device photos
The 12 WebP files under public/images are sample catalog photography from DummyJSON, retrieved from image URLs in its public dataset:
- Dataset: https://github.com/Ovi/DummyJSON/blob/master/database/products.json
- Intended prototyping usage: https://dummyjson.com/docs/products
- Source IDs: 125, 128, 133, 123, 79, 81, 80, 159, 160, 107, 134, 78.

Original image references and titles are retained in src/data/sample-source.json.
Only sample names and product photos were used. Ratings, reviews, warranties, stock, discount claims and prices from that dataset were not imported.
Prices in sample-products.json are illustrative PHP amounts. Brand labels are catalog filters, not endorsements or authorized-reseller claims.
Confirm rights and obtain actual store/product photography before a commercial launch. No generated product imagery was added.

## Font
Manrope Variable, Latin subset:
https://cdn.jsdelivr.net/npm/@fontsource-variable/manrope@latest/files/manrope-latin-wght-normal.woff2
License: public/fonts/OFL.txt (SIL Open Font License).

## Review references
Taste Skill: local design-taste-frontend/SKILL.md.
Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
