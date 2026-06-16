## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2026-05-02 - Data Table and Menu Accessibility
**Learning:** Data tables often have checkboxes for row selection and icon-only buttons for actions (like kebab menus). When these elements lack explicit labels, screen reader users miss crucial context about what they are selecting or acting upon. Furthermore, dynamic menus need `aria-expanded` and `aria-haspopup` states for clarity.
**Action:** Always provide contextual, dynamic `aria-label` attributes to row-level checkboxes (e.g., "Select client XYZ") instead of generic labels. For menu buttons, add `aria-label="More actions"`, `aria-haspopup="menu"`, and track the `aria-expanded` state.
