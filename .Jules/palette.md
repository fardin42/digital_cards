## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-15 - Dynamic Form Array Accessibility
**Learning:** Dynamic form arrays (like lists of services or working hours) often use icon-only buttons (e.g., "X", "✕", or "↺") for actions like remove or reset. These buttons frequently lack accessible names and tooltips, making them ambiguous for screen reader users and confusing for sighted users who rely on hover context.
**Action:** Always provide `aria-label` and `title` attributes to icon-only buttons, especially within dynamic, repetitive components, to clearly describe their action (e.g., `aria-label="Remove service"`).
