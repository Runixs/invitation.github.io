# Mobile Wedding Invitation - Implementation TODO

This checklist tracks delivery from planning to production deployment.

## 0) Planning Alignment

- [x] Finalize product/design requirements in `CLAUDE.md`
- [x] Finalize IA and wireframe in `docs/IA_WIREFRAME.md`
- [x] Finalize RSVP architecture in `docs/RSVP_ARCHITECTURE.md`
- [x] Confirm final copy/content assets (names, date, venue, text, images)

## 1) Design Foundation

- [x] Define design tokens (color, typography, spacing, radius, elevation)
- [x] Establish responsive layout rules (360-430px first, desktop enhancement)
- [x] Define motion tokens (duration, easing, reveal offsets)
- [x] Validate palette and contrast for accessibility

## 2) Core Invite Implementation

- [x] Hero section (names/date/message)
- [x] Invitation message section
- [x] Wedding info section (time/venue/address/map)
- [x] Gallery section (optimized mobile media)
- [x] Contact shortcuts (call/text actions)

## 3) Location and Transport

- [x] Add map deep link/open action
- [x] Add transport guidance (car/transit/parking)
- [x] Add optional address copy action with feedback

## 4) RSVP Implementation (Phase 1: Apps Script)

- [x] Build form fields and validation UX
- [x] Connect submission to Apps Script endpoint
- [x] Handle loading/success/error states in-page
- [x] Add spam mitigation (honeypot + basic timing guard)
- [ ] Verify data row mapping to Google Sheets

## 5) Extras Implementation

- [x] Calendar actions (Google Calendar and/or iCal)
- [x] Gift account disclosure toggle (optional)
- [x] Share actions (copy link and messenger integration if feasible)
- [x] User-initiated background music control (no autoplay with sound)

## 6) Motion and Polish

- [x] Add subtle section reveal transitions
- [x] Ensure smooth mobile scroll handoff between sections
- [x] Respect reduced-motion preferences
- [x] Verify no animation blocks user scrolling

## 7) Accessibility and Performance

- [x] Semantic sections and heading structure
- [x] Keyboard/focus accessibility for interactive controls
- [x] Touch target and one-thumb usability checks
- [x] Image optimization and lazy loading
- [x] Minimize blocking scripts and bundle size

## 8) QA and Release

- [x] Mobile QA on representative devices/viewports
- [ ] Validate RSVP submission end-to-end in production-like environment
- [x] Verify all critical actions (RSVP/map/call/share/calendar)
- [ ] Deploy to GitHub Pages and smoke test
- [x] Final visual pass for premium pastel mint mood consistency
