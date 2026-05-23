## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2026-05-23 - Add aria-labels to icon buttons
**Learning:** Found several icon-only buttons in the Admin Dashboard lacking `aria-label` attributes and a dropdown menu missing `aria-expanded` and `aria-haspopup`.
**Action:** Always verify that icon-only buttons have `aria-label`s and that interactive custom dropdowns have appropriate ARIA states.
