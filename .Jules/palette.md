## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-06-07 - Form Autocomplete & Disabled States
**Learning:** Auth forms often lack `autoComplete` attributes, forcing users to manually type credentials and one-time codes, which creates friction. Additionally, leaving inputs enabled during async submission allows accidental modifications that can invalidate the request or cause confusion.
**Action:** Always include appropriate `autoComplete` attributes (e.g., `email`, `current-password`, `one-time-code`) on inputs and disable them (`disabled={loading}`) during asynchronous submissions.
