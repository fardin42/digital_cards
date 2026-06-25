## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-05-15 - ARIA Labels for Icon-Only Buttons
**Learning:** Icon-only buttons (like "X" or "↺") in dynamic form elements (like `ServicesBlock` and `WorkingHoursBlock`) require explicit `aria-label` attributes to ensure screen reader users understand their purpose, especially when multiple identical elements exist (e.g., removing a specific service). Adding a `title` attribute also improves UX for mouse users.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes. When these buttons control specific items in a list, try to include the item's context (e.g., "Remove service 1") or a clear general description (e.g., "Remove working hours") if dynamic context is too complex. Include a `title` for visual tooltips.
