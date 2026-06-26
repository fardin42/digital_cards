## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-10-24 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple instances where icon-only buttons (like delete 'X' or reset '↺' icons) were missing both `aria-label` and `title` attributes. This breaks accessibility for screen readers and provides no visual tooltip for mouse users to understand the button's purpose without context.
**Action:** Always ensure icon-only buttons include both `aria-label` (for screen readers) and `title` (for mouse user tooltips) attributes, providing clear context of the action they perform.
