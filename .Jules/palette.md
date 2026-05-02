## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2026-05-02 - ARIA Expanded on Action Menus
**Learning:** Found a pattern where interactive dropdown menus in list views (like Kebab menus on table rows) lacked `aria-expanded` and `aria-haspopup` attributes despite visually opening/closing. This prevents screen readers from announcing state changes when interacting with the menu.
**Action:** When implementing custom dropdowns or popovers triggered by icon buttons, ensure they programmatically convey state using `aria-expanded={isOpen}` and `aria-haspopup="true"`.
