## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-18 - Dynamic Table Accessibility
**Learning:** Found that static "Select row" or "Actions" ARIA labels in dynamic data tables provide insufficient context for screen reader users when navigating tabular data. Users struggle to identify which specific client or item the action corresponds to.
**Action:** Always implement dynamic, context-aware `aria-label` attributes (e.g., `aria-label="Select client X"`) on row-level controls and interactive elements.
