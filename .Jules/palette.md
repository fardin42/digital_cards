## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2025-07-05 - Dynamic ARIA Labels in Data Tables
**Learning:** Generic labels like "Select" or "Options" in repeating table rows provide insufficient context for screen reader users navigating interactively. They do not know which specific item the action applies to.
**Action:** Always inject dynamic row context (e.g., `client.name`) into the `aria-label` attributes of checkboxes and action buttons within mapped lists and tables (e.g., `aria-label="Select client John Doe"` instead of generic `Select`).
