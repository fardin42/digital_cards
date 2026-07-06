## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-02 - Advanced Form UX
**Learning:** In asynchronous forms (like `ClientLogin.jsx`), inputs must be explicitly disabled during submission to prevent users from accidentally changing values mid-flight. Additionally, applying explicit `autoComplete` attributes drastically reduces friction, particularly for authentication flows (e.g., `new-password`, `current-password`, `one-time-code`).
**Action:** Add `disabled={loading}` and appropriate `autoComplete` attributes to all inputs involved in async submissions.
