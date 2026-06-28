## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-28 - Data Table Checkbox Accessibility
**Learning:** Found that checkboxes in data tables often lack individual context for screen reader users when their only label is generic (like "Select"). In a table listing clients, reading "Select checkbox" repeatedly provides poor UX compared to "Select client John Doe".
**Action:** Always ensure row-level checkboxes use dynamic `aria-label` attributes that incorporate identifying information (e.g., `client.name`) to provide individualized context.
