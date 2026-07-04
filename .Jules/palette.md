## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-15 - Data Table Accessibility
**Learning:** Data tables often use generic checkbox, edit, and action buttons per row. Without individual context, screen readers read "Checkbox, Edit, Options" repeatedly, making navigation confusing. Passing row-specific data (e.g., `client.name`) into dynamic `aria-label` attributes ensures screen readers announce the exact context for each action.
**Action:** When rendering data tables or mapped lists with interactive elements, always use dynamic `aria-label`s (like `aria-label={\`Edit \${item.name}\`}`) for all icon-only buttons, row-level checkboxes, and inline form inputs.
