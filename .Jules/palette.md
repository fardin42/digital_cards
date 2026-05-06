## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-01 - Interactive Element Accessibility
**Learning:** Found multiple icon-only buttons, custom dropdowns, inline edit inputs, and table checkboxes lacking accessible names, which makes them inaccessible to screen readers.
**Action:** Always provide `aria-label` for icon-only buttons, inputs missing visually connected labels, and checkboxes. For custom dropdown buttons, ensure `aria-expanded` and `aria-haspopup` are correctly set.
