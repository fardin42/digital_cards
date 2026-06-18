## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-18 - Data Table Checkbox and Menu Accessibility
**Learning:** Found data tables where row-level checkboxes and kebab action menus lacked individual context for screen reader users, making it difficult to distinguish which item a checkbox or action applies to.
**Action:** For data tables, always ensure row-level checkboxes use dynamic `aria-label` attributes providing individual context (e.g., `Select client ${client.name}`), and custom dropdown menus have `aria-haspopup` and `aria-expanded`.
