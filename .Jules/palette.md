## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-22 - Form UX and Predictability
**Learning:** For optimal form UX, inputs should use `autoComplete` attributes to allow password managers and browsers to predict and assist the user (e.g. `email`, `current-password`, `one-time-code`). Additionally, fields should be visually and programmatically disabled during asynchronous form submission, preventing accidental mid-submission modifications and signaling process state.
**Action:** When working on form inputs, provide context through `autoComplete` attributes where appropriate, and always pass down `disabled={loading}` props to both buttons and inputs during network requests.
