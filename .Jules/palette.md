## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-02 - Data Table Accessibility
**Learning:** Discovered that generic `aria-label` attributes on row-level checkboxes in data tables fail to provide sufficient context for screen reader users, making it difficult to understand which item is being selected.
**Action:** For data tables, always ensure row-level checkboxes use dynamic `aria-label` attributes providing individual context (e.g., 'Select client X') instead of generic labels to ensure proper screen reader accessibility.
