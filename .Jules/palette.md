## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2024-11-25 - Dynamic ARIA labels in Data Tables
**Learning:** For data tables like AdminDashboard, row-level checkboxes need dynamic `aria-label` attributes (e.g., `aria-label={\`Select client ${client.name}\`}`) to provide individual context, rather than a generic label. Furthermore, custom dropdown menus on action buttons benefit greatly from `aria-haspopup="menu"` and `aria-expanded` state.
**Action:** When adding accessibility to complex admin data tables, always correlate row-specific actions (checkboxes, dropdowns) with the primary identifier for that row in their `aria-label` or `aria-labelledby`.
