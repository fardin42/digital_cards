## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.


## 2023-10-27 - Icon-Only Button and Dropdown Toggle Accessibility
**Learning:** Found custom icon-only buttons (like edit/save/cancel actions, back buttons, and suspend toggles) missing accessible names, leading to empty button announcements for screen reader users. Additionally, custom kebab-menu dropdown toggles lacked necessary states (`aria-haspopup` and `aria-expanded`) to communicate their behavior.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes and a `title` attribute for hover tooltips. When creating custom dropdowns, use `aria-haspopup="true"` and dynamically toggle `aria-expanded` based on the menu state.
