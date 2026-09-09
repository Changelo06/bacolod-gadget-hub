# iWarehouse polish checklist

## Direction
Multi-brand retail for Philippine shoppers. Design variance 4/10, motion 2/10, density 2/10.
Retain black, white and orange brand identity; use ordinary retail controls with the existing component system. Use sample device photography rather than generated brand-specific products.

## Implemented
- [x] Visible search, category browsing and brand selection.
- [x] Brand, category, condition and PHP budget filters combine correctly.
- [x] Search/filter/sort selections are shareable URL state.
- [x] Prices use en-PH currency formatting and tabular numerals.
- [x] New and pre-owned labels are visible without colour dependence.
- [x] Product options update prices and pass the selected device into the inquiry.
- [x] Contact fields retain text on validation failure and focus the first error.
- [x] No fake send success, made-up financing rates, testimonials or stock claims.
- [x] Empty, loading, failed-request and retry states are separate.
- [x] Sample catalog is explicitly marked; no checkout or payment is enabled.
- [x] Mobile layouts, 44px controls, visible focus, skip link and reduced-motion styles.
- [x] Self-hosted font and local WebP images with reserved dimensions.
- [x] Consistent light storefront with black brand header/footer.
- [x] Branch selection is URL-based, with unverified contact details labelled honestly.

## Container rules
1320px maximum width with fluid gutters. Home has three sections: introduction, four featured devices, branch invitation. Section spacing grows from 48px on mobile to 88-100px on desktop. No home brand wall, budget panels, side navigation drawer or decorative arrows. Desktop header stays on one row; mobile links occupy one deliberate row below the logo. Search expands inline on smaller screens. Product grids use four columns on wide home screens and two on mobile. Catalog filters stay in the catalog.

## Business and brand confirmation
- [ ] Supply final logo variants and approved media elements.
- [ ] Replace all sample devices, images and prices with approved inventory.
- [ ] Verify actual brand range, exact product condition and specifications.
- [ ] Confirm branch addresses, map pins, phone numbers and opening hours.
- [ ] Confirm official Messenger, email and other contact channels.
- [ ] Verify payment methods, installment terms, fees and eligibility.
- [ ] Supply warranty, returns, repair and pre-owned grading policies.
- [ ] Connect real inquiry delivery, with success only after confirmed delivery.
- [ ] Replace prototype/no-index treatment and add final metadata only after approval.

## Manual acceptance pending
- [ ] Review layout at 360, 390, 768, 1024 and 1440px, including long names.
- [ ] Check 200% zoom, keyboard navigation, dialog focus return and screen reader output.
- [ ] Complete contrast and focus visibility audit.
- [ ] Walk through category → brand → budget → product → inquiry → branch.
- [ ] Verify Back/Forward, refreshing and shared URLs.
- [ ] Test real Shopify failures, slow requests, empty catalog and image failures.
- [ ] Validate loading state dimensions against real product content.
- [ ] Add cursor pagination if the live catalog exceeds 100 devices.
- [ ] Verify routing, performance and real contact delivery on the final host.
- [ ] Obtain business-owner approval before replacing the live website.

## Verification
Automated checks cover filter combinations, numeric budget sorting, audio/phone separation, legacy category URLs, variant-to-inquiry handoff, input retention and catalog retry.
Passing automated checks does not complete the manual or business checks above.
The repository has existing lint issues in generated command/textarea components and the legacy cart store; these are separate from the redesigned customer flow.

Final automated results: production build passed; TypeScript passed; 10 tests passed; focused lint passed; whitespace checks passed. Full repository lint still has existing generated-component and legacy-cart issues. Browser checks confirmed the simplified home at 390px and intermediate width, no horizontal overflow at 390px and 1440px, aligned desktop header, inline search expansion and correct search results. The broader manual acceptance checks remain pending.
