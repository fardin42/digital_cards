## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-06-29 - Client Login Form Accessibility and UX
**Learning:** Proper linkage between labels (`htmlFor`) and inputs (`id`), along with accurate `autoComplete` attributes, significantly improve form usability for screen readers and auto-fill managers. Also, disabling inputs during async operations (`disabled={loading}`) prevents unwanted modifications during authentication tasks.
**Action:** Always ensure complete semantic labeling (`htmlFor`/`id`), correct `autoComplete` values (`email`, `current-password`, `new-password`, `one-time-code`), and disabled states on inputs for async form elements.
