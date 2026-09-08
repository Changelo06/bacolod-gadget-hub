# iWarehouse proof of concept

A multi-brand storefront for Philippine shoppers, retaining the existing React, Vite, Tailwind and Radix foundation.

## Design decisions
- Search is visible in the header. Categories, brand choices and peso budgets lead into one catalog.
- Combined filters and sorting live in the URL and work with Back/Forward and refresh.
- Product choices lead into a prefilled inquiry. This prototype does not send messages or take payments.
- Manrope is self-hosted; product images are local WebP assets. Motion is limited to short interaction feedback.
- Existing route slugs and the supplied logo are retained.

## Data modes
The default is an explicitly labelled sample catalog. All sample prices are invented Philippine-peso values for design review, not current offers or converted USD prices. Sample devices do not represent confirmed iWarehouse inventory or brand partnerships.

To use the original Shopify connection, set VITE_CATALOG_MODE=live and VITE_SHOPIFY_STOREFRONT_TOKEN to the store's public Storefront token in an ignored .env.local before building. Never use an Admin API token. The existing live catalog returned no products during this review.

The live catalog currently loads its first 100 items; filters apply to that loaded set. Add cursor pagination before launching a larger catalog. Shopify API configuration remains unchanged.

## Development
Install locked dependencies with npm ci. Start with npm run dev.
Verify with npm run build, npm exec tsc -- --noEmit -p tsconfig.app.json, and npm test.

## Review
See POLISH-CHECKLIST.md for implementation checks, remaining business confirmation and manual device QA.

See ASSET-SOURCES.md for sample imagery and font provenance. Replace sample assets and prices before using this as an operating storefront.
