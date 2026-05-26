## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-05-18 - Admin Dashboard Kebab Menu Accessibility
**Learning:** Kebab menus (MoreHorizontal) used on table rows are functionally dropdown menus but often lack proper ARIA attributes to indicate their state and purpose. Missing labels on these obscure functionality for screen reader users.
**Action:** When implementing generic icon-only actions like Kebab menus, always add `aria-label="More actions"`, `aria-haspopup="menu"`, and dynamically update `aria-expanded` based on the dropdown's open state.
