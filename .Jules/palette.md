## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-06-10 - Form Accessibility & UX
**Learning:** React login and registration forms frequently lack proper association between `<label>` and `<input>` (via `htmlFor` and `id`), missing `autoComplete` attributes, and failing to disable inputs during async submissions. This creates friction for users relying on password managers and screen readers, and introduces edge cases if users edit fields while requests are in flight.
**Action:** Always ensure `<label>` has `htmlFor` matching the `<input id>`, define explicit `autoComplete` attributes (e.g., `email`, `current-password`, `new-password`, `one-time-code`, `name`), and apply `disabled={loading}` to inputs during form submission.
