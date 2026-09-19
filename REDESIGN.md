# Portfolio redesign

## Design and component sources

The existing Next.js 14, Tailwind 3, Framer Motion, Firebase data layer, routes, SEO metadata, and logo are retained. The home page now leads with selected projects, followed by about, experience, skills, certificates, and contact. The project archive reuses the same cards and category filters.

Two actual components were retrieved through the connected 21st MCP on 2026-09-19:

- Grid Pattern by designali-in: https://21st.dev/@designali-in/components/grid-pattern
- Magnetic Button by bundui: https://21st.dev/@bundui/components/magnetic-button

Their adapted implementations live in `src/components/ui/`. Grid Pattern supplies the subtle hero grid. Magnetic Button uses local pointer events and spring motion values, and disables movement for touch and reduced-motion preferences. No additional runtime dependencies were needed.

## Local verification

- Passed: `npx tsc --noEmit`, `npm run build`, and focused Next.js ESLint on 19 changed/new TSX files (zero errors or warnings).
- Production preview started at http://localhost:3000. HTTP 200 verified for `/`, `/projects`, `/about`, and `/nfc/test`; linked CSS, fonts, and JavaScript assets also returned 200. HTTP checks do not establish rendered UI correctness.
- The linked Portfoliodox Netlify production configuration was copied into the git-ignored `.env.local`. Values were not printed. The rebuilt client bundles include the correct Firebase configuration.
- Browser verification is blocked because the browser tool could not verify the admin-enforced security policy. No bypass was attempted. Visual desktop/mobile layout and pointer/keyboard interactions remain unverified.
- No deployment was performed.

## Interaction review checklist

At desktop and 390px mobile widths, check navigation and Escape-to-close, project category filters and detail links, résumé/contact/social destinations, certificate zoom and Escape-to-close, keyboard focus, and reduced-motion mode. Check image content with actual Firebase data and long project titles.


## Follow-up: original palette and Firebase

- Restored the original Tailwind cyan/purple palette and neutral dark surfaces throughout the redesign CSS.
- Restored Firebase-controlled hero title and subtitle.
- Fixed Firebase configuration validation to check resolved static values, since Next.js does not inline dynamic `process.env[key]` access.
- Anonymous Firebase client SDK reads succeeded: 1 profile, 5 projects, 25 skills, 6 experience entries, 3 certificates.
- Rendered all five data-backed sections to HTML with actual Firebase records and the project image configuration; expected database content was present. This is a component rendering check, not a browser visual test.
- Rebuilt with `.env.local` and restarted the local production preview on port 3000. Build and focused lint passed. No deployment or Firebase data/rule changes were performed.
