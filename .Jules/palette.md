## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-02 - Dynamic ARIA Context
**Learning:** Found multiple instances where datatable checkboxes and icon-only action buttons lacked individually meaningful contextual descriptors, presenting generic names to screen readers (e.g. just "Select" instead of "Select Client X").
**Action:** When mapping over items to render forms or lists, always dynamically inject the individual item's context into the `aria-label` and `title` attributes (e.g. `aria-label={"Save " + client.name}`) to ensure complete and unambiguous programmatic accessibility.
