## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2025-05-05 - Dynamic Table Accessibility
**Learning:** Data tables with complex inline row actions (edit, save, cancel, status toggles) and row-level selection often use icon-only buttons for visual neatness. Without `aria-label`s, screen readers announce these buttons redundantly or meaninglessly. Furthermore, dropdowns without `aria-expanded` and `aria-haspopup` do not inform users of their dynamic state.
**Action:** Always add descriptive, context-aware `aria-label`s (e.g., using the row item's name) to icon-only action buttons and checkboxes. Apply `aria-expanded` and `aria-haspopup` to any toggle that controls a dropdown menu.
