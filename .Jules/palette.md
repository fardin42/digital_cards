## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2024-05-18 - [Dropdown Toggle Accessibility]
**Learning:** [Custom dropdown toggles lacking ARIA attributes (like `aria-haspopup` and `aria-expanded`) are inaccessible to screen readers, and icon-only toggles need both `aria-label` and `title` to be usable for keyboard and mouse users.]
**Action:** [When implementing or modifying custom dropdowns, always ensure the trigger has `aria-haspopup`, `aria-expanded` (tracking state), `aria-label`, and `title` if it's icon-only.]
