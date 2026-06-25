## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-02 - Icon Buttons & Menus Accessibility
**Learning:** Found instances of icon-only buttons (`sidebar-back-btn`, `btn-save-edit`, `btn-cancel-edit`, `action-btn` kebab menu) lacking descriptive text. This hides their intent from screen reader users. Furthermore, custom dropdown toggle buttons were missing ARIA properties that describe state.
**Action:** Always add descriptive `aria-label`s to icon-only buttons. For interactive menus, ensure the toggle button implements `aria-haspopup` and `aria-expanded` reflecting the visibility state of the menu.
