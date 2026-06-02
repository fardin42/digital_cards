## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-02 - Data Table Accessibility
**Learning:** Data tables often contain repeated interactive elements like row-level checkboxes or kebab menus. Screen readers need dynamic context to differentiate these. Using generic labels like 'Select' or 'Actions' creates a frustrating experience.
**Action:** For data tables, always use dynamic `aria-label` attributes that provide individual context (e.g., 'Select client X') and ensure dropdowns have `aria-expanded` and `aria-haspopup`.
