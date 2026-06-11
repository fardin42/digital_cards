## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2024-06-11 - Client Login Form A11y and UX Improvements
**Learning:** For optimal form UX and accessibility in React, always map `<label>` to `<input>` using `htmlFor` and `id`. Additionally, `disabled={loading}` on all interactive fields prevents mid-submission state modifications, and proper `autoComplete` attributes (like `one-time-code` and conditionally `new-password`/`current-password` for toggleable auth forms) significantly improve browser and password manager integration.
**Action:** Apply `disabled` state derived from form submission loading state to all `<input>` elements in forms. Map labels using `htmlFor` and ensure appropriate `autoComplete` values are used, especially dynamic ones for dual-purpose sign-in/sign-up components.
