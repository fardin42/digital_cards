## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-05-18 - Context-Aware ARIA Labels for Data Tables
**Learning:** In complex data tables with multiple rows (like AdminDashboard), generic `aria-label`s on row-level checkboxes or icon buttons (e.g., "Select client" or "Actions") fail to provide sufficient context for screen reader users to identify *which* row they are interacting with.
**Action:** Always use template literals to dynamically inject row-specific identifiers (e.g., `aria-label={\`Select client ${client.name}\`}`) into row-level interactive elements. Ensure global icon buttons (like 'Back to site') also receive static ARIA labels.
