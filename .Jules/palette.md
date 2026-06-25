## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-15 - Icon-only Buttons Accessibility
**Learning:** Found multiple instances in Editor Blocks where icon-only action buttons (e.g., delete "X", reset "↺") lacked `aria-label` and `title` attributes. This leaves screen reader users without context and mouse users without visual tooltips, causing confusion when interacting with dynamic forms.
**Action:** Always ensure icon-only buttons include `aria-label` for screen readers and `title` for visual tooltips to provide clear intent for all users.
