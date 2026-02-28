# Mobile Wedding Invitation Project Guide (github.io)

This document is the shared instruction set for all agents and teammates working on this repository.

Primary goal: build a polished, complete mobile wedding invitation web app that can be deployed on GitHub Pages.

Important: this phase is planning and alignment. Follow these requirements and design guidelines before implementation.

## 1) Product Goal

- Build a mobile-first wedding invitation experience with premium, emotional, and calm aesthetics.
- Deliver a complete experience including `Core Invite`, `RSVP`, and `Extras`.
- Ensure section-to-section transitions feel smooth and luxurious while scrolling on mobile.
- Deploy as a static site on `github.io` with strong performance and stable behavior.

## 2) Scope Definition (Must Include)

### A. Core Invite
- Cover hero section (names, date, short message).
- Invitation message section (parents/family intro optional).
- Ceremony info (date, time, venue, address, map link).
- Gallery section (photo grid or carousel, mobile optimized).
- Contact shortcuts (call/text links for bride/groom sides).

### B. RSVP
- RSVP form with required fields:
  - Attendee name
  - Attendance (yes/no)
  - Number of guests
  - Meal choice (if required)
  - Message to couple (optional)
- Submission success/failure feedback on the same screen.
- Spam-safe, practical flow for static hosting.

### C. Extras
- Calendar add action (Google Calendar / iCal download).
- Directions and transportation guidance.
- Account info for congratulatory gifts (optional toggle, elegant disclosure).
- Share actions (copy link, Kakao/other messenger integration if feasible).
- Optional background music control (must be user-initiated, never auto-play with sound).

## 3) Platform and Technical Constraints

- Hosting target: GitHub Pages (`github.io`).
- Mobile-first as default (primary viewport width 360-430px).
- Progressive enhancement for desktop/tablet (do not break larger screens).
- Keep implementation static-friendly (no mandatory custom server runtime).
- If server-like behavior is needed for RSVP, use one of these patterns:
  1. Google Apps Script endpoint
  2. Supabase/Firebase hosted API
  3. Third-party form backend
- Secrets must not be committed in repository.

## 4) Design Direction (Non-Negotiable)

### Core mood
- Elegant, restrained, emotional, premium.
- Calm whitespace and refined rhythm, never crowded.

### Base color tone
- Primary mood color: pastel mint similar to `#F7FDF2`.
- Build a restrained palette around this tone.
- Avoid flashy saturation and high-contrast neon combinations.

### Color system guidance
- Recommended semantic tokens:
  - `--bg-main`: near `#F7FDF2`
  - `--bg-elevated`: slightly warmer/lighter mint-ivory
  - `--text-primary`: deep neutral (soft charcoal)
  - `--text-secondary`: muted neutral
  - `--line-soft`: low-contrast divider
  - `--accent-soft`: desaturated floral/leaf accent
- Keep contrast accessible while preserving softness.

### Typography guidance
- Korean + Latin friendly pairings with emotional tone.
- Suggested style:
  - Display/headings: elegant serif (high readability on mobile)
  - Body/UI: clean sans-serif for clarity
- Avoid default-looking, generic typography.

### Spacing and composition
- Prefer generous vertical spacing and clear section boundaries.
- Keep line length short and scannable on mobile.
- Use simple hierarchy; avoid cluttered ornament.

## 5) Motion and Scroll Experience

- Scroll interactions must feel natural and premium, not gimmicky.
- Use subtle reveal/transitions for each section (opacity + translate + timing harmony).
- Preserve performance: avoid heavy parallax/jank.
- Transition behavior target:
  - gentle section handoff
  - smooth easing
  - consistent animation rhythm
- Respect reduced motion preferences.

Implementation guidance (when coding starts):
- Consider CSS scroll-snap or section-based reveal patterns only if they improve readability.
- Animation durations should be moderate and consistent.
- Never block user scrolling with aggressive animation locks.

## 6) UX Principles

- One-thumb usability first.
- Important actions must be obvious: RSVP, map, call/contact, share.
- Form UX should minimize friction:
  - clear labels
  - mobile keyboard-friendly input types
  - concise validation messages
- Confirm state changes clearly (submitted, copied, failed, retried).

## 7) Accessibility and Quality Bar

- Semantic HTML structure for all major sections.
- Keyboard-accessible controls.
- Adequate color contrast for core text and actions.
- Image alt text for meaningful content.
- Performance target on mobile:
  - optimized images
  - lazy loading where appropriate
  - avoid large JS bundles

## 8) Suggested Information Architecture

Recommended page flow:
1. Intro/Hero
2. Invitation Message
3. Wedding Info
4. Gallery
5. Location/Map/Transport
6. RSVP
7. Extras (calendar, gift info, share)
8. Footer note

## 9) Delivery Criteria (Definition of Done)

Project is considered complete only when all are satisfied:
- Core Invite, RSVP, Extras all implemented and usable on mobile.
- Visual mood aligns with pastel mint premium emotional direction.
- Scroll transitions are smooth and cohesive across sections.
- GitHub Pages deployment works with no critical UI breakage.
- Basic accessibility and performance checks pass.

## 10) Collaboration Rules for Agents

- Always prioritize this document over generic defaults.
- Do not shift to bright or trendy visual themes that violate the restrained mood.
- Do not remove required scope items (`Core Invite`, `RSVP`, `Extras`).
- Before major UI decisions, check consistency with this guide:
  - palette
  - typography
  - spacing rhythm
  - motion tone
- Document major design/architecture decisions in commit messages or project notes.

## 11) First Implementation Plan (When Coding Begins)

1. Set design tokens (colors, spacing, typography, radius, shadow).
2. Build section skeleton with mobile-first layout.
3. Implement Core Invite content blocks.
4. Implement RSVP data flow suitable for static hosting.
5. Implement Extras actions.
6. Add motion and polish.
7. Run mobile QA and deployment verification on github.io.

## 12) Planning Artifacts (Current Source of Truth)

Before implementation, all teammates and agents must read these documents together:

- `CLAUDE.md` (this file): product requirements and design principles.
- `docs/IA_WIREFRAME.md`: section-by-section mobile information architecture and interaction intent.
- `docs/RSVP_ARCHITECTURE.md`: RSVP integration decision and data flow for static hosting.
- `TODO.md`: implementation checklist and delivery tracking.

If these files conflict, priority is:
1. `CLAUDE.md`
2. `docs/RSVP_ARCHITECTURE.md`
3. `docs/IA_WIREFRAME.md`
4. `TODO.md`

## 13) RSVP Decision for Phase 1

- Default integration: **Google Apps Script Web App endpoint**.
- Why this default:
  - works well with static GitHub Pages
  - low operational overhead
  - easy to route submissions to Google Sheets for operations
- This can be replaced only if project owner explicitly changes the decision.

---

If any teammate or agent proposes a conflicting approach, this file is the source of truth unless explicitly updated by the project owner.
