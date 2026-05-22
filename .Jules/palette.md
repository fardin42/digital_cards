## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-22 - Consistent Form Accessibility
**Learning:** Found additional forms in the codebase (e.g., ClientLogin) that lacked semantic connections between `<label>` and `<input>` elements, confirming a pattern of accessibility issues across different components.
**Action:** Implemented the previously learned action by adding `htmlFor` and `id` attributes to the ClientLogin form, reinforcing the need to proactively check and update forms for semantic correctness during UX reviews.
