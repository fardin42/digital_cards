## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-09 - Form Submission UX and State Management
**Learning:** Discovered inputs remained active during asynchronous authentication operations. This allows users to potentially change input values mid-submission or trigger multiple requests. Additionally, missing `autoComplete` attributes forces users to manually type credentials rather than leveraging browser password managers, adding unnecessary friction to the login flow.
**Action:** Always disable input fields `disabled={loading}` during async form submissions. Furthermore, provide proper `autoComplete` attributes (`email`, `current-password`, `new-password`, `name`, `one-time-code`) to enhance browser autofill support and overall user convenience.
