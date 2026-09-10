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

## Laptop brand tiles
The laptop brand directory uses promotional category imagery, not stock or availability claims.
- Lenovo Yoga and ASUS Zenbook: existing local sample photos (see above).
- Acer Swift X: https://images.acer.com/is/image/acer/Swift-X-SFX14-41G-FP-Backliton-Safari-Gold-01a-1?wid=700
- ROG Strix: https://rog.asus.com/laptops-group/ ; image https://dlcdnwebimgs.asus.com/gain/0075CD12-E145-49F5-916C-EF86E8691207/w750/h470/fwebp
- Gigabyte AORUS 17X: https://www.gigabyte.com/Laptop/AORUS-17X--2024/gallery ; image https://static.gigabyte.com/StaticFile/Image/Global/785bff31bf61450958bfaf2692ed329e/Product/39222/png/1000
- Lenovo, Acer, ASUS and ROG logos: Simple Icons via https://cdn.simpleicons.org/ (white variants, original proportions retained).
- Gigabyte wordmark: https://commons.wikimedia.org/wiki/File:Gigabyte_Technology_logo_20080107.svg (PD-textlogo; trademark retained).
Manufacturer imagery is used for this design proof of concept. Replace with approved iWarehouse merchandising assets before a public commercial launch.

## iWherehouse concept identity
The orange-and-white integrated iW monogram (`public/iwherehouse-monogram.png`) was generated for this project and selected by the user. The original artwork is preserved; CSS frames it in the header and footer. iWherehouse is an independent student mockup inspired by iWarehouse, not an official storefront.
