## 2026-05-01 - Form Accessibility
**Learning:** Found multiple instances where form labels were visually placed next to inputs but lacked semantic connection via `htmlFor` and `id` attributes. This breaks screen reader support and reduces the clickable hit area for inputs, especially impacting mobile users.
**Action:** Always ensure `<label>` tags use `htmlFor` mapping to the input's `id` to guarantee programmatic association and better UX.

## 2024-05-08 - Icon-Only Button and Link Accessibility
**Learning:** Icon-only interactive elements, such as social links or action buttons without accompanying text, fail accessibility guidelines when they lack descriptive labels. Screen readers announce them as "link" or "button," leaving users unaware of their purpose.
**Action:** Always add descriptive `aria-label` attributes to icon-only buttons and links (e.g., social media icons, share buttons) to ensure their function is clearly communicated to assistive technologies.
