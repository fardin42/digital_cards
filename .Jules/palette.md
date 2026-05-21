## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2024-05-18 - Form Accessibility
**Learning:** Form inputs without associated labels (via `htmlFor` and `id` mapping) are completely inaccessible to screen reader users and fail basic accessibility audits.
**Action:** Always ensure that `<label>` tags use the `htmlFor` attribute mapped exactly to the corresponding `<input>`'s `id` attribute.
