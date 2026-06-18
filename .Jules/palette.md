## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-02 - Form AutoComplete & Disabled States
**Learning:** Found input fields lacking `autoComplete` attributes and disabled states during form submissions. Without `autoComplete`, users miss out on browser autofill, hurting conversion, especially on mobile. Without `disabled` states during loading, users can inadvertently edit fields mid-submission leading to unexpected state mismatches.
**Action:** Always include appropriate `autoComplete` tags (like `email`, `current-password`, `one-time-code`) on inputs, and always bind `disabled={loading}` on all inputs (not just submit buttons) during async operations.
