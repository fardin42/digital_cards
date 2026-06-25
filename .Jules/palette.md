## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-11 - Missing ARIA attributes on custom table row dropdowns
**Learning:** Custom dropdown menus triggered by icon-only buttons (like a kebab menu in a table) are completely inaccessible to screen readers without proper aria attributes, as they lack context and state indication.
**Action:** Ensure custom dropdown triggers always include an `aria-label` for screen reader context, `aria-haspopup="menu"`, and an `aria-expanded` attribute linked to the component's state to properly convey their interactive nature and state.
