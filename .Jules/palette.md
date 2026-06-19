## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-18 - Admin Data Table Accessibility
**Learning:** Found an admin dashboard data table lacking proper accessibility on its interactive elements. The checkboxes, icon-only action buttons, and dropdown menus had no semantic labels or state indicators.
**Action:** For data tables, ensure checkboxes have dynamic `aria-label` attributes providing individual context (e.g., 'Select client X'). Ensure icon-only buttons have descriptive `aria-label`s. Enhance custom dropdowns with `aria-haspopup` and `aria-expanded` to convey their purpose and state to screen readers.
