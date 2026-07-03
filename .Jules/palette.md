## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-07-03 - Dynamic ARIA Labels in Data Tables
**Learning:** Discovered that static `aria-label` attributes on repeated row-level action buttons (like "Delete" or "Edit") within data tables create ambiguity for screen reader users, making it difficult to know which specific item the action applies to.
**Action:** When rendering lists or data tables, always inject dynamic, item-specific context (e.g., `aria-label="Delete ${client.name}"`) into the `aria-label` and `title` attributes of action buttons and row-level checkboxes.
