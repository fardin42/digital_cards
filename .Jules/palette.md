## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2025-02-14 - Dynamic Checkbox aria-labels for Data Tables
**Learning:** Generic aria-labels on table row checkboxes (like "Select row") provide no context to screen reader users about what they are actually selecting. Similarly, dropdown menus need explicit aria-haspopup and aria-expanded attributes so users know they are interacting with a menu that toggles.
**Action:** When working with data tables, ensure row-level checkboxes use dynamic aria-labels with specific context (e.g., `aria-label={\`Select client ${client.name}\`}`). Always add `aria-haspopup="true"` and a dynamic `aria-expanded` state to dropdown action buttons.
