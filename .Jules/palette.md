## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-14 - Data Table Accessibility
**Learning:** Found that generic aria-labels on data table elements (like checkboxes and icon-only action buttons) make screen readers struggle to identify the context. For row-level checkboxes, generic "Select" isn't helpful when reading row-by-row.
**Action:** Always provide dynamic `aria-label` attributes for row-level elements (e.g., "Select Client Name") and complete ARIA patterns (`aria-haspopup`, `aria-expanded`, and `aria-label`) for generic action menus.
