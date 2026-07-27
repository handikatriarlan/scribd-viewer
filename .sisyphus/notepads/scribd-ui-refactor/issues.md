# Issues — scribd-ui-refactor

## Must NOT do
- No changes to: lib/scribd.ts, lib/history.ts, config/site.ts, app/providers.tsx
- No new npm dependencies
- No shadcn/ui or component libraries
- No Framer Motion / GSAP
- No inline styles that bypass design tokens

## Timing Concerns
- Task 1 blocks all others (design tokens needed by every component)
- Task 8 blocked by Tasks 3-7
