## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-24 - Accessibility tooltips for icon-only action buttons
**Learning:** Icon-only action buttons (e.g. '✕', '↺') without `aria-label` and `title` attributes act as unlabeled ambiguous elements in this design system. They fail to convey purpose to both screen-reader users and sighted mouse users who rely on tooltips.
**Action:** Always provide both `aria-label` (for screen readers) and `title` (for mouse hover tooltips) when using custom icon-only action buttons or inputs in Editor Blocks.
