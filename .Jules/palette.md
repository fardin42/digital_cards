## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-27 - Dynamic ARIA Labels in Data Tables
**Learning:** Found data tables where row-level selection checkboxes and action buttons lacked individual context, making it hard for screen reader users to know which row they were interacting with (e.g., just hearing "checkbox, unchecked").
**Action:** Use dynamic aria-label attributes providing row-specific context for interactive elements in data tables.
