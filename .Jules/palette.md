## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-07-01 - Array Item Action Buttons Context
**Learning:** Found instances where icon-only action buttons (like delete or reset) inside dynamically mapped arrays lacked specific context, resulting in generic screen reader announcements and ambiguous visual tooltips for multiple identical buttons.
**Action:** When mapping over items to render forms or rows, inject individual dynamic context into `aria-label` and `title` attributes of icon-only buttons (e.g. `Delete service "${srv}"` instead of just `Delete`) to ensure explicit programmatic accessibility and clarity.
