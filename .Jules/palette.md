## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2026-05-28 - ARIA Labels and States in Data Tables
**Learning:** Icon-only buttons (like Kebab menus or edit/delete actions) and custom dropdowns in data tables often lack contextual information for screen readers, meaning users can't know what action the button performs or the state of the dropdown. Row-level checkboxes also need individual context (e.g., "Select client X") rather than just a generic label.
**Action:** Consistently add descriptive `aria-label`s to icon-only interactive elements and row selection inputs. Ensure custom dropdowns implement `aria-haspopup` and `aria-expanded` to appropriately announce their dynamic state.
