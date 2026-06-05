## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-06-05 - Form UX Improvements (Attributes & Disabled States)
**Learning:** Implementing appropriate `autoComplete` attributes (like `email`, `current-password`, `new-password`, and `one-time-code`) significantly improves user experience by allowing browser autofill to work accurately. In addition, failing to disable form inputs during asynchronous operations (like API submissions) can allow users to inadvertently modify values mid-flight, potentially causing conflicting states or errors.
**Action:** For optimal form UX, always add context-specific `autoComplete` attributes to inputs. Furthermore, explicitly disable all interactive form elements (inputs and submit buttons) using a `loading` state while awaiting asynchronous operations.
