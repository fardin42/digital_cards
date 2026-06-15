## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-15 - Enhancing OTP and Auth Form UX
**Learning:** Found that relying solely on labels is insufficient for robust UX in authentication flows. Mobile users strongly benefit from standard `autoComplete` attributes (like `one-time-code`, `name`, `email`, and `current-password`/`new-password`) to streamline data entry. Additionally, inputs must be explicitly disabled (`disabled={loading}`) during async submissions to prevent users from modifying values mid-flight, which can lead to frustrating validation or state mismatch errors.
**Action:** Always map inputs with specific `autoComplete` strings for their data type and enforce `disabled` states universally across all form elements while loading is active.
