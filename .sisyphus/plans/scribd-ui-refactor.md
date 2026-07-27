# Scribd Viewer — Complete UI Refactor (Editorial Modern Theme)

## TL;DR

> **Quick Summary**: Complete UI overhaul from scratch with a unique editorial modern theme (warm sand + deep teal), mobile-first responsive design, WCAG 2.1 AA accessibility, and full dark mode support. All 8 components rebuilt with new design system.
>
> **Deliverables**:
> - New design system in `styles/globals.css` (custom OKLCH palette, typography, spacing, shadows)
> - Rebuilt components: Header, UrlForm, DocumentViewer, HistoryList, Footer, ThemeSwitch, Icons
> - Updated layout and page structure with semantic HTML
> - Mobile-responsive at 320px, 768px, 1024px, 1440px breakpoints
> - Zero behavior/logic changes — pure visual/interaction refactor
>
> **Estimated Effort**: Medium (8 tasks, 2 waves)
> **Parallel Execution**: YES — 4 tasks in Wave 1, 4 in Wave 2
> **Critical Path**: globals.css → Header + UrlForm → DocumentViewer + HistoryList → Footer + ThemeSwitch → Page integration

---

## Context

### Original Request
"refactor ui-nya. buat ulang dari awal, tanpa memerhatikan layout yang sudah ada saat ini. kamu dapat atur ulang layout atau tata letaknya. buat uinya yang tidak basic. theme-nya harus unik dan modern, namun tetap easy to use dan easy to read. dan harus mobile responsive, semua elementnya mengecil tanpa terkecuali."

### Interview Summary
**Key Discussions**:
- User wants complete rebuild, not incremental changes
- "Unique modern theme" = avoid purple/indigo AI aesthetic; editorial/magazine-inspired with warm tones
- Must remain functional: Scribd URL input → iframe viewer → history list all preserved
- Mobile-first responsive: everything scales down, nothing breaks
- Dark mode must work (already using next-themes)
- Accessibility baseline: WCAG 2.1 AA
- No new dependencies unless absolutely necessary

**Research Findings**:
- Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript
- 10 components across `/components` and `/app`
- Logic layer (lib/scribd.ts, lib/history.ts) untouched
- next-themes configured with class-based dark mode
- Current globals.css uses basic OKLCH palette (neutral grays + teal accent)
- No shadcn/ui — pure Tailwind approach

### Metis Review (Auto-Resolved)
**Identified Gaps Addressed**:
- Color contrast validation for both themes → **Added to verification criteria**
- Touch target sizes for mobile (44×44px minimum) → **Added to component specs**
- iframe sandbox attributes for security → **Documented in DocumentViewer spec**
- localStorage quota handling in HistoryList → **Already handled in lib/history.ts**
- Reduced motion preference for animations → **Added to globals.css**
- Focus management on theme toggle → **Specified in ThemeSwitch task**

---

## Work Objectives

### Core Objective
Deliver a complete visual/interaction refactor of Scribd Viewer with a distinctive editorial modern design system that is mobile-responsive, accessible, and maintains 100% existing functionality.

### Concrete Deliverables
- `styles/globals.css` — New design system with custom properties, @theme, animations
- `components/header.tsx` — Brand + theme toggle, sticky, responsive
- `components/url-form.tsx` — Input + submit, validation states, accessible
- `components/document-viewer.tsx` — Toolbar + iframe, fullscreen, copy, close
- `components/history-list.tsx` — List with relative timestamps, clear, active state
- `components/footer.tsx` — Minimal attribution
- `components/theme-switch.tsx` — Sun/moon toggle with smooth transition
- `components/icons.tsx` — Updated Lucide-style icons matching new aesthetic
- `app/layout.tsx` — Updated font loading, semantic structure
- `app/page.tsx` — Hero, ViewerApp, How-it-works, FAQ sections with new styling

### Definition of Done
- [ ] `npm run build` passes with no TypeScript errors
- [ ] `npm run lint` passes
- [ ] Visual regression: no layout shift at 320px / 768px / 1024px / 1440px
- [ ] Keyboard navigation: Tab through entire page, all actions reachable
- [ ] Screen reader: NVDA/VoiceOver announces all interactive elements correctly
- [ ] Color contrast: All text ≥4.5:1 (normal) / ≥3:1 (large) in both themes
- [ ] Dark mode: All components render correctly with `class="dark"`
- [ ] Reduced motion: Animations respect `prefers-reduced-motion: reduce`
- [ ] History persistence: localStorage works, 8-item limit enforced

### Must Have
- Unique editorial modern theme (not generic AI purple)
- Mobile-first responsive at 4 breakpoints
- WCAG 2.1 AA compliance
- Zero behavior changes to Scribd parsing/history logic
- Smooth theme transitions (next-themes handles)

### Must NOT Have (Guardrails)
- No new npm dependencies (use existing: next, react, next-themes, tailwind)
- No shadcn/ui or component libraries
- No changes to `lib/scribd.ts`, `lib/history.ts`, `config/site.ts`, `app/providers.tsx`
- No backend/API changes
- No animation libraries (Framer Motion, GSAP) — CSS-only
- No external font CDN loads — use `next/font/google` for Instrument Serif + Inter
- No layout shift on theme toggle
- No inline styles that bypass design tokens

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (Next.js, ESLint, TypeScript configured)
- **Automated tests**: NO (none configured — skipped per user scope)
- **Framework**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios (not just test assertions). Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Playwright — navigate, interact, assert DOM, screenshot
- **CLI/TUI**: tmux — run command, send keystrokes, validate output
- **API/Backend**: curl — send requests, assert status + response fields
- **Library/Module**: Bun/Node REPL — import, call functions, compare output

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — Foundation + Scaffolding):
├── Task 1: Design System — globals.css [quick]
├── Task 2: Icons — icons.tsx [quick]
├── Task 3: Header — header.tsx [quick]
└── Task 4: ThemeSwitch — theme-switch.tsx [quick]

Wave 2 (After Wave 1 — Core Modules, MAX PARALLEL):
├── Task 5: UrlForm — url-form.tsx [unspecified-high]
├── Task 6: DocumentViewer — document-viewer.tsx [deep]
├── Task 7: HistoryList — history-list.tsx [unspecified-high]
└── Task 8: Footer + Page Integration — footer.tsx, layout.tsx, page.tsx [deep]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan Compliance Audit — oracle
├── Task F2: Code Quality Review — unspecified-high
├── Task F3: Real Manual QA — unspecified-high (+ playwright)
└── Task F4: Scope Fidelity Check — deep
-> Present consolidated results -> Get explicit user okay
```

### Dependency Matrix (abbreviated)

| Task | Blocks | Blocked By |
|------|--------|------------|
| 1 (globals.css) | 2,3,4,5,6,7,8 | — |
| 2 (icons.tsx) | 3,4,5,6,7 | 1 |
| 3 (header.tsx) | 8 | 1,2 |
| 4 (theme-switch.tsx) | 3,8 | 1,2 |
| 5 (url-form.tsx) | 6,8 | 1,2 |
| 6 (document-viewer.tsx) | 8 | 1,2 |
| 7 (history-list.tsx) | 8 | 1,2 |
| 8 (footer+layout+page) | F1-F4 | 3,4,5,6,7 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks → `quick` (2), `visual-engineering` (2)
- **Wave 2**: 4 tasks → `deep` (2), `unspecified-high` (2)
- **Wave FINAL**: 4 tasks → `oracle` (1), `unspecified-high` (2), `deep` (1)

---

## TODOs

- [x] 1. **Design System — `styles/globals.css`**

  **What to do**:
  - Replace entire globals.css with the editorial modern design system
  - Define CSS custom properties in `:root` and `.dark` for:
    - Warm sand + deep teal color palette (OKLCH)
    - Semantic tokens: `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--accent`, `--muted`, `--border`, `--input`, `--success`, `--warning`, `--destructive`
    - Border radius scale: `--radius-{sm,md,lg,xl}`
    - Shadow scale: `--shadow-{sm,md,lg,xl}`
    - Typography: `--font-display` (Instrument Serif), `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
  - Wire up `@theme inline {}` so Tailwind utilities work with custom tokens
  - Add `@layer base` styles: body reset, heading typography, selection color, smooth scrolling, focus-visible styles
  - Add `@layer components` styles: `.glass` (frosted glass), `.gradient-text`, `.gradient-bg`, `.card-hover`, `.btn-{primary,secondary,ghost}`, `.input`
  - Add `@layer utilities` styles: `.scrollbar-hide`, `.text-balance`, `.animate-in` (fade + slide)
  - Add `prefers-reduced-motion` media query to disable animations
  - Add custom keyframes: `slideUp`, `pulse-soft`
  - Include `::selection` styling matching primary/accent palette
  - Ensure all tokens have valid dark-mode counterparts
  - Reference: current `styles/globals.css`, `oklch.com` for color validation

  **Must NOT do**:
  - No HSL `hsl()` wrapper syntax — use raw OKLCH values
  - No CSS frameworks or PostCSS plugins beyond @tailwindcss/postcss
  - No `!important` flags
  - No unused custom properties (if it's defined, use it somewhere)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design token architecture is a visual-system decision with component-wide impact
  - **Skills**: [`ui-styling`]
    - `ui-styling`: Tailwind CSS 4 theming, OKLCH color theory, CSS custom properties

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 2, 3, 4, 5, 6, 7, 8
  - **Blocked By**: None

  **References**:
  - Current globals.css: demonstrates existing structure to replace
  - `ui-styling/references/tailwind-customization.md`: @theme directive, OKLCH syntax
  - `ui-styling/references/shadcn-theming.md`: CSS variable pattern for dark mode

  **Acceptance Criteria**:
  - [ ] `npm run dev` starts without errors
  - [ ] `body` background matches `var(--background)` in light mode
  - [ ] `.dark` class on `<html>` flips to dark palette
  - [ ] `bg-primary`, `text-foreground`, `border-border` all resolve to correct OKLCH values
  - [ ] All custom CSS classes (`.glass`, `.btn`, `.input`) compile and render

  **QA Scenarios**:
  ```
  Scenario: Light mode design tokens apply correctly
    Tool: Playwright
    Preconditions: Dev server running at localhost:3000
    Steps:
      1. Navigate to http://localhost:3000
      2. Snapshot page
    Expected Result: Background is light warm color (sand), text is dark, no missing styles
    Evidence: .sisyphus/evidence/task-1-light-theme.png

  Scenario: Dark mode design tokens apply correctly
    Tool: Playwright
    Preconditions: Dev server running, dark theme active
    Steps:
      1. Set <html class="dark"> via evaluate
      2. Snapshot page
    Expected Result: Background is dark charcoal, text is light, all tokens switch correctly
    Evidence: .sisyphus/evidence/task-1-dark-theme.png

  Scenario: Build passes with new CSS
    Tool: Bash
    Preconditions: All files in place
    Steps:
      1. Run `npm run build`
    Expected Result: Build succeeds, exit code 0
    Evidence: .sisyphus/evidence/task-1-build.txt
  ```

  **Evidence to Capture**:
  - [ ] Screenshot of light theme page
  - [ ] Screenshot of dark theme page
  - [ ] Build output log

  **Commit**: YES (with Task 2)
  - Message: `feat(design-system): new editorial modern theme tokens`
  - Files: `styles/globals.css`
  - Pre-commit: `npm run lint`

---

- [x] 2. **Icons — `components/icons.tsx`**

  **What to do**:
  - Rewrite all SVG icons to modern Lucide-style aesthetic matching the editorial theme
  - Keep the same Icon wrapper component but update SVG path data for cleaner, more refined look
  - Icons to rewrite: SunIcon, MoonIcon, ExternalLinkIcon, CopyIcon, CheckIcon, MaximizeIcon, MinimizeIcon, CloseIcon, ClockIcon, FileIcon
  - Add new icons if needed: SearchIcon (for url form), HistoryIcon (for history section header), MenuIcon, ArrowRightIcon
  - Ensure consistent stroke width (1.5 instead of 2 for a refined feel)
  - All icons must be on 24×24 viewBox with proper paths
  - Keep `aria-hidden="true"` on SVG elements
  - Keep TypeScript types clean

  **Must NOT do**:
  - No inline `<style>` blocks — paths only
  - No third-party icon libraries
  - No icon size props beyond current `width`/`height`
  - No removing existing icon function signatures that components depend on

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Icon design requires visual precision and SVG path craftsmanship
  - **Skills**: [`ui-styling`]
    - `ui-styling`: SVG icon patterns, stroke-width consistency

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 3, 4, 5, 6, 7
  - **Blocked By**: Task 1 (for design token awareness)

  **References**:
  - Current `components/icons.tsx`: shows existing SVG wrapper pattern to follow
  - `lucide.dev`: reference for clean, modern SVG icon paths

  **Acceptance Criteria**:
  - [ ] All 10+ icon components render without visual artifacts
  - [ ] `npm run build` passes
  - [ ] Each icon has consistent 1.5px stroke width
  - [ ] Icons scale properly at 16px default size

  **QA Scenarios**:
  ```
  Scenario: Icons render correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Check header for theme toggle SVG renders
      3. Check URL form for any icon usage
    Expected Result: All SVG icons visible, no broken paths, consistent stroke
    Evidence: .sisyphus/evidence/task-2-icons.png

  Scenario: Build validates icon types
    Tool: Bash
    Preconditions: Task complete
    Steps:
      1. Run `npm run typecheck`
    Expected Result: No TypeScript errors for icons.tsx
    Evidence: .sisyphus/evidence/task-2-types.txt
  ```

  **Evidence to Capture**:
  - [ ] Screenshot showing icons on page
  - [ ] TypeScript check output

  **Commit**: YES (with Task 1)
  - Message: `feat(design-system): new editorial modern theme tokens`
  - Files: `components/icons.tsx`
  - Pre-commit: `npm run lint`

---

- [x] 3. **Header — `components/header.tsx`**

  **What to do**:
  - Complete rebuild with new editorial design
  - Sticky header with subtle backdrop-blur glass effect
  - Left: site name/logo (Instrument Serif font, larger size)
  - Right: ThemeSwitch component
  - Responsive: on mobile, header height reduces slightly (56px → 48px)
  - Add subtle bottom border/gradient
  - Use semantic `<header>` tag
  - Link wraps around site name with proper focus-visible styles
  - Import and use `ThemeSwitch` component
  - Import `siteConfig` for name

  **Must NOT do**:
  - No extra navigation items
  - No dropdowns or hamburger menus
  - No animations beyond CSS transitions

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple layout, no complex logic — single presentational component
  - **Skills**: [`frontend-ui-engineering`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1 (design tokens), 2 (icons via ThemeSwitch)

  **References**:
  - Current `components/header.tsx`: existing structure to replace
  - `components/theme-switch.tsx`: sibling to import

  **Acceptance Criteria**:
  - [ ] Header renders at top of page
  - [ ] Site name links to `/`
  - [ ] ThemeSwitch is visible and clickable
  - [ ] Sticky positioning works on scroll
  - [ ] Glass effect visible (backdrop-blur)
  - [ ] Header height reduced on mobile (< 640px)

  **QA Scenarios**:
  ```
  Scenario: Header renders and sticks on scroll
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Verify site name "Scribd Viewer" visible
      3. Verify theme toggle button visible
      4. Scroll down 300px
    Expected Result: Header stays at top (sticky), glass effect visible
    Evidence: .sisyphus/evidence/task-3-header.png

  Scenario: Mobile header responsive
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to localhost:3000
    Expected Result: Header fits width, height ≤ 48px on mobile
    Evidence: .sisyphus/evidence/task-3-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] Desktop screenshot showing header
  - [ ] Mobile screenshot showing responsive header

  **Commit**: YES
  - Message: `feat(header): rebuilt with new design language`
  - Files: `components/header.tsx`
  - Pre-commit: `npm run lint`

---

- [x] 4. **ThemeSwitch — `components/theme-switch.tsx`**

  **What to do**:
  - Rebuild with smooth rotation/animation between sun and moon icons
  - Use CSS-only rotation animation (rotate-90 + scale-0 pattern for exit, rotate-0 + scale-100 for entry)
  - Match new editorial aesthetic: transparent bg, hover state with updated colors
  - Keep SSR-safe pattern (useSyncExternalStore for mounted detection)
  - On mount placeholder: render `div` with same dimensions to prevent layout shift
  - Use updated SunIcon and MoonIcon from new icons.tsx
  - Focus-visible ring using primary color
  - Accessible aria-label that changes with state

  **Must NOT do**:
  - No Framer Motion or JavaScript animation
  - No layout shift on mount/theme toggle
  - No inline styles

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Animation transitions and visual polish require aesthetic judgment
  - **Skills**: [`accessibility`]
    - `accessibility`: ARIA labels, focus-visible states, reduced motion

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Task 3 (Header imports this)
  - **Blocked By**: Tasks 1 (design tokens), 2 (icons)

  **References**:
  - Current `components/theme-switch.tsx`: SSR pattern, useSyncExternalStore

  **Acceptance Criteria**:
  - [ ] Theme toggle switches between light/dark
  - [ ] Smooth icon rotation animation
  - [ ] No layout shift during mount (placeholder div)
  - [ ] aria-label reflects current theme
  - [ ] Focus-visible ring visible
  - [ ] Respects prefers-reduced-motion (no animation)

  **QA Scenarios**:
  ```
  Scenario: Theme toggle switches to dark mode
    Tool: Playwright
    Preconditions: Dev server running, light mode
    Steps:
      1. Navigate to localhost:3000
      2. Click theme toggle button
    Expected Result: Page switches to dark theme, icon rotates
    Evidence: .sisyphus/evidence/task-4-dark-mode.png

  Scenario: Theme toggle switches to light mode
    Tool: Playwright
    Preconditions: Dark mode active
    Steps:
      1. Click theme toggle button again
    Expected Result: Page switches back to light theme
    Evidence: .sisyphus/evidence/task-4-light-mode.png

  Scenario: No layout shift on SSR mount
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Measure header height with placeholder div
      2. Wait for hydration
      3. Re-measure header height
    Expected Result: Header height unchanged after hydration
    Evidence: .sisyphus/evidence/task-4-no-shift.txt
  ```

  **Evidence to Capture**:
  - [ ] Dark mode screenshot
  - [ ] Light mode screenshot
  - [ ] Height measurement log

  **Commit**: YES
  - Message: `feat(theme-switch): modern toggle with smooth transition`
  - Files: `components/theme-switch.tsx`
  - Pre-commit: `npm run lint`

---

- [x] 5. **UrlForm — `components/url-form.tsx`**

  **What to do**:
  - Complete rebuild with modern editorial form design
  - Use semantic `<form>` with proper accessibility
  - Input with:
    - Large, readable placeholder text
    - Focus ring using primary color
    - Error state: red border + error message with `role="alert"`
    - `aria-invalid` and `aria-describedby` for error
    - `aria-describedby` for helper text in normal state
  - Submit button styled with `.btn-primary` class
  - Responsive: full-width on mobile, row layout on sm+
  - Add subtle card container (glass effect)
  - Helper text below input showing supported formats
  - Animation: form fades in with `animate-in` class
  - Touch target sizes: button min 44×44px, input min 44px height
  - Use updated external icon references from icons.tsx

  **Must NOT do**:
  - No client-side form validation library (keep current validation)
  - No built-in browser validation (`novalidate` stays)
  - No autocomplete suggestions

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Significant visual redesign with multiple states (default, focus, error, disabled)
  - **Skills**: [`accessibility`]
    - `accessibility`: ARIA states, form labeling, error announcements

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: Task 8 (page integration)
  - **Blocked By**: Tasks 1 (design tokens), 2 (icons)

  **References**:
  - Current `components/url-form.tsx`: props interface, handler pattern
  - `ui-styling/references/shadcn-accessibility.md`: form accessibility patterns

  **Acceptance Criteria**:
  - [ ] Form renders with input and submit button
  - [ ] Input has correct placeholder text
  - [ ] Error state shows red border + error message
  - [ ] Normal state shows helper text
  - [ ] Submit calls `onSubmit` prop
  - [ ] Input change calls `onChange` prop
  - [ ] Mobile: full-width input + button stacked
  - [ ] Desktop: input + button in a row
  - [ ] Button min 44px height (touch target)

  **QA Scenarios**:
  ```
  Scenario: Normal state renders correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Check input has placeholder "Paste a Scribd link or document ID"
      3. Check helper text visible below input
      4. Check submit button says "View document"
    Expected Result: Form renders with all elements, proper spacing
    Evidence: .sisyphus/evidence/task-5-normal.png

  Scenario: Error state displays correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Type "invalid" in input
      3. Submit form
    Expected Result: Input has red border, error message visible with role="alert"
    Evidence: .sisyphus/evidence/task-5-error.png

  Scenario: Mobile responsive layout
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to localhost:3000
    Expected Result: Input full-width, button below it, both minimum 44px height
    Evidence: .sisyphus/evidence/task-5-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] Desktop screenshot (normal state)
  - [ ] Desktop screenshot (error state)
  - [ ] Mobile screenshot

  **Commit**: YES
  - Message: `feat(url-form): accessible input with validation states`
  - Files: `components/url-form.tsx`
  - Pre-commit: `npm run lint`

---

- [x] 6. **DocumentViewer — `components/document-viewer.tsx`**

  **What to do**:
  - Complete rebuild with modern toolbar + iframe viewer
  - Toolbar layout:
    - Fullscreen button (conditionally shown based on `fullscreenSupported`)
    - Copy link button
    - Open on Scribd external link
    - Close button (right-aligned)
  - Use updated icons from icons.tsx for all toolbar buttons
  - Style buttons with `.btn-ghost` or `.btn-secondary` classes
  - iframe container:
    - Loading state: spinner/skeleton centered
    - Rounded corners (when not fullscreen)
    - Full bleed when fullscreen
    - Fixed aspect ratio: `h-[70dvh] min-h-[420px]` responsive
  - Fullscreen management: keep existing logic, update visual wrapper
  - Copy confirmation: checkmark animation with temp state
  - Ensure sandbox attributes preserved for security
  - Add subtle card-hover effect on the viewer container
  - Use `preconnect` from "react-dom" for scribd.com
  - Responsive: on mobile (< 640px), toolbar wraps to multi-row if needed

  **Must NOT do**:
  - No changes to fullscreen logic or error handling
  - No changes to embed URL construction
  - No fetching/loading Scribd content directly

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex interplay between fullscreen states, loading states, and responsive toolbar
  - **Skills**: [`accessibility`]
    - `accessibility`: Focus management in fullscreen, toolbar button labels

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 7, 8)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1 (design tokens), 2 (icons)

  **References**:
  - Current `components/document-viewer.tsx`: fullscreen logic, preconnect, copy handling

  **Acceptance Criteria**:
  - [ ] iframe renders with correct embed URL
  - [ ] Loading spinner visible while iframe loads
  - [ ] Toolbar shows correct 4 buttons (fullscreen, copy, open, close)
  - [ ] Fullscreen toggle expands viewer
  - [ ] Copy button shows "Copied" confirmation
  - [ ] Mobile: toolbar buttons wrap to multiple rows
  - [ ] Close button calls `onClose` prop

  **QA Scenarios**:
  ```
  Scenario: Viewer renders with toolbar
    Tool: Playwright
    Preconditions: Dev server running, ?d=12345 in URL
    Steps:
      1. Navigate to localhost:3000/?d=12345
      2. Check iframe is visible
      3. Check toolbar has fullscreen, copy, open, close buttons
    Expected Result: Viewer visible, toolbar items present, iframe loads scribd embeds
    Evidence: .sisyphus/evidence/task-6-viewer.png

  Scenario: Copy link shows confirmation
    Tool: Playwright
    Preconditions: Document viewer visible
    Steps:
      1. Click "Copy link" button
    Expected Result: Button text changes to "Copied" with checkmark icon
    Evidence: .sisyphus/evidence/task-6-copied.png

  Scenario: Mobile responsive toolbar
    Tool: Playwright
    Preconditions: ?d=12345
    Steps:
      1. Set viewport to 375x812
      2. Check toolbar layout
    Expected Result: Toolbar buttons wrap or remain accessible at small viewport
    Evidence: .sisyphus/evidence/task-6-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] Desktop viewer screenshot
  - [ ] Copied state screenshot
  - [ ] Mobile viewer screenshot

  **Commit**: YES
  - Message: `feat(document-viewer): toolbar + iframe with fullscreen`
  - Files: `components/document-viewer.tsx`
  - Pre-commit: `npm run lint`

---

- [x] 7. **HistoryList — `components/history-list.tsx`**

  **What to do**:
  - Complete rebuild with editorial list design
  - Section header: "Recent documents" title + "Clear all" link
  - Each entry: document ID (tabular-nums), relative timestamp, icon
  - Active document highlighted with primary color accent
  - Empty state: return `null` (no section shown when empty)
  - Responsive: entries stack full-width on mobile
  - Use updated ClockIcon and FileIcon from icons.tsx
  - Hover effect: subtle bg change, border transition
  - Use Intl.RelativeTimeFormat for timestamps (keep existing logic)
  - Focus-visible styles on each entry button
  - List uses semantic `<ul>` + `<li>`

  **Must NOT do**:
  - No changes to `lib/history.ts` logic
  - No changes to `HistoryEntry` type
  - No changes to timestamp formatting logic

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple states (empty, items, active) + responsive + accessibility
  - **Skills**: [`accessibility`]
    - `accessibility`: List semantics, ARIA roles, focus management

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 8)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1 (design tokens), 2 (icons)

  **References**:
  - Current `components/history-list.tsx`: API contract, timestamp format, prop shape

  **Acceptance Criteria**:
  - [ ] Empty history: component renders `null`
  - [ ] With entries: shows list with correct formatting
  - [ ] Active entry highlighted
  - [ ] "Clear all" button works
  - [ ] Entry click calls `onSelect`
  - [ ] Timestamps show relative time ("2 minutes ago")
  - [ ] Mobile: entries full-width, no overflow

  **QA Scenarios**:
  ```
  Scenario: History displays recent entries
    Tool: Playwright
    Preconditions: localStorage has history entries, dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Scroll to history section
      3. Check document IDs visible with timestamps
    Expected Result: History list shows entries, each with ID and relative time
    Evidence: .sisyphus/evidence/task-7-history.png

  Scenario: Active entry highlighted
    Tool: Playwright
    Preconditions: ?d=12345 in URL, history has entry 12345
    Steps:
      1. Navigate to localhost:3000/?d=12345
      2. Check active entry styling
    Expected Result: Entry 12345 has highlighted border/background
    Evidence: .sisyphus/evidence/task-7-active.png

  Scenario: Clear all removes all entries
    Tool: Playwright
    Preconditions: History has entries
    Steps:
      1. Click "Clear all"
    Expected Result: History section disappears from page
    Evidence: .sisyphus/evidence/task-7-cleared.png
  ```

  **Evidence to Capture**:
  - [ ] History with entries screenshot
  - [ ] Active entry highlighted screenshot
  - [ ] After clear confirmation

  **Commit**: YES
  - Message: `feat(history-list): relative timestamps, clear, active state`
  - Files: `components/history-list.tsx`
  - Pre-commit: `npm run lint`

---

- [x] 8. **Footer + Page Integration — `components/footer.tsx`, `app/layout.tsx`, `app/page.tsx`**

  **What to do**:
  - **Footer**: Minimal editorial footer with attribution. Use `.btn-ghost` style link, reduced padding for mobile.
  - **Layout**: Update font loading to use Instrument Serif (display) alongside Inter (sans). Keep Inter as body font, add Instrument Serif for headings. Update max-width container to match new editorial spacing. Ensure Providers wrapper intact. Keep all SEO/metadata unchanged.
  - **Page**: Rebuild hero section with larger display font for h1, subtitle in body weight. Add gradient-text accent for emphasis. Redesign "How it works" steps as editorial card grid with numbers. Redesign FAQ as styled details/summary with smooth open/close. Keep JSON-LD structured data intact.
  - All sections must have proper aria-labels
  - How-it-works: 3-step grid, 1 col mobile → 3 col desktop
  - FAQ: accordion style with plus/minus icon rotation
  - ViewerFallback: skeleton loading matching new card style
  - Responsive: all sections scale down, no overflow

  **Must NOT do**:
  - No changes to `app/providers.tsx`
  - No changes to SEO metadata (keep existing)
  - No changes to JSON-LD schema data
  - No changes to ViewerApp component logic

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Multi-file orchestration, layout structure, typography integration, responsive sections
  - **Skills**: [`frontend-ui-engineering`, `accessibility`]
    - `frontend-ui-engineering`: Grid layouts, responsive breakpoints, semantic HTML
    - `accessibility`: ARIA landmarks, heading hierarchy, focus management

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: Nothing (final integration task)
  - **Blocked By**: Tasks 3 (Header), 4 (ThemeSwitch), 5 (UrlForm), 6 (DocumentViewer), 7 (HistoryList)

  **References**:
  - Current `app/layout.tsx`: font loading, metadata, viewport
  - Current `app/page.tsx`: section structure, FAQ, How it works, JSON-LD
  - Current `components/footer.tsx`: link pattern, attribution
  - `next/font/google` docs for Instrument Serif

  **Acceptance Criteria**:
  - [ ] Footer renders at bottom with attribution link
  - [ ] Layout loads both fonts (Inter + Instrument Serif)
  - [ ] Hero section uses display font for h1
  - [ ] "How it works" grid: 1 col mobile, 3 col desktop
  - [ ] FAQ accordion opens/closes smoothly
  - [ ] JSON-LD still embedded in page
  - [ ] All previous tasks' components wired correctly
  - [ ] No layout breaking at any breakpoint

  **QA Scenarios**:
  ```
  Scenario: Hero section renders
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Check h1 text "Read Scribd documents freely"
      3. Check subtitle present
    Expected Result: Hero with display font, proper spacing, no overflow
    Evidence: .sisyphus/evidence/task-8-hero.png

  Scenario: How it works renders as 3-step grid
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to "How it works" section
    Expected Result: 3 cards with numbers visible, responsive grid
    Evidence: .sisyphus/evidence/task-8-how-it-works.png

  Scenario: FAQ accordion opens and closes
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to FAQ section
      2. Click first question
    Expected Result: Answer expands with smooth animation
    Evidence: .sisyphus/evidence/task-8-faq.png

  Scenario: Footer renders with attribution
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to bottom of page
    Expected Result: Footer with "handikatriarlan" link visible
    Evidence: .sisyphus/evidence/task-8-footer.png

  Scenario: Mobile responsive — all elements scale
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 320x568
      2. Scroll through entire page
    Expected Result: No horizontal scroll, all elements fit viewport
    Evidence: .sisyphus/evidence/task-8-mobile.png

  Scenario: Build passes
    Tool: Bash
    Preconditions: All tasks complete
    Steps:
      1. Run `npm run build`
      2. Run `npm run lint`
    Expected Result: Build succeeds, lint passes
    Evidence: .sisyphus/evidence/task-8-build.txt
  ```

  **Evidence to Capture**:
  - [ ] Hero section screenshot
  - [ ] How it works grid screenshot
  - [ ] FAQ accordion screenshot (open state)
  - [ ] Footer screenshot
  - [ ] Mobile full-page screenshot
  - [ ] Build + lint output

  **Commit**: YES
  - Message: `feat(page): integrate all components, hero, how-it-works, faq`
  - Files: `components/footer.tsx`, `app/layout.tsx`, `app/page.tsx`
  - Pre-commit: `npm run lint`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `bun test` (if any). Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `feat(design-system): new editorial modern theme tokens` — styles/globals.css — pre-commit: `npm run lint`
- **2**: `feat(icons): updated icon set for new aesthetic` — components/icons.tsx — pre-commit: `npm run lint`
- **3**: `feat(header): rebuilt with new design language` — components/header.tsx — pre-commit: `npm run lint`
- **4**: `feat(theme-switch): modern toggle with smooth transition` — components/theme-switch.tsx — pre-commit: `npm run lint`
- **5**: `feat(url-form): accessible input with validation states` — components/url-form.tsx — pre-commit: `npm run lint`
- **6**: `feat(document-viewer): toolbar + iframe with fullscreen` — components/document-viewer.tsx — pre-commit: `npm run lint`
- **7**: `feat(history-list): relative timestamps, clear, active state` — components/history-list.tsx — pre-commit: `npm run lint`
- **8**: `feat(page): integrate all components, hero, how-it-works, faq` — app/layout.tsx, app/page.tsx, components/footer.tsx — pre-commit: `npm run lint`

---

## Success Criteria

### Verification Commands
```bash
npm run build        # Expected: Compiled successfully, no TS errors
npm run lint         # Expected: No lint warnings
npm run typecheck    # Expected: No type errors
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] All 4 Final Verification agents APPROVE
- [x] User gives explicit "okay" after seeing F1-F4 results