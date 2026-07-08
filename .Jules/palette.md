## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-02 - Dynamic ARIA Labels in Mapped Forms
**Learning:** Mapped arrays in forms require dynamic ARIA labels for explicit button intent per context (e.g., 'Delete service X') instead of generic labels to ensure proper accessibility.
**Action:** When mapping over items to render lists or forms, inject individual context into `aria-label` and `title` attributes of icon-only buttons.
