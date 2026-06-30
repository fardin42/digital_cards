## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2024-06-30 - Icon-Only Links Accessibility
**Learning:** Icon-only interactive elements like links and buttons lack context for screen readers and can be confusing without visual tooltips for mouse users.
**Action:** Always include a visually hidden text label, `aria-label`, or a `title` attribute when using icon-only interactive elements to ensure accessibility across all device types.
