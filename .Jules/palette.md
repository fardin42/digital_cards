## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.
## 2024-05-17 - Icon-only Interactive Elements Lack Context
**Learning:** Found multiple instances where interactive elements (buttons and links) relied entirely on SVG icons without accompanying `aria-label` or `title` attributes. This completely hides the element's purpose from screen readers and provides poor UX for mouse users seeking clarification.
**Action:** Always verify that icon-only buttons (`<button>`, `<a>`) include descriptive `aria-label` attributes for accessibility and `title` attributes for visual tooltips.
