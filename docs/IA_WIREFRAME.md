# IA and Wireframe Spec (Mobile Wedding Invitation)

This document defines the mobile-first information architecture and section-level wireframe behavior.

## 1) Device and Layout Baseline

- Primary viewport: 360-430px width.
- Content max width: keep body content readable and centered on larger screens.
- Vertical rhythm: maintain generous spacing between sections.
- Scroll behavior: section transitions should feel calm, continuous, and premium.

## 2) Page Flow (Top to Bottom)

1. Intro/Hero
2. Invitation Message
3. Wedding Info
4. Gallery
5. Location/Map/Transport
6. RSVP
7. Extras
8. Footer Note

## 3) Section Wireframe Requirements

### 3.1 Intro/Hero

- Purpose: emotional first impression.
- Must include: couple names, wedding date, short one-line message.
- Optional: subtle decorative divider or emblem.
- Interaction: soft reveal on first load, no aggressive animation.
- Primary CTA: `Scroll to details` or direct jump to RSVP.

### 3.2 Invitation Message

- Purpose: formal invitation text and tone.
- Must include: invitation body text.
- Optional: family introduction (bride/groom parents).
- Typography: readable on mobile without dense paragraphs.

### 3.3 Wedding Info

- Purpose: event facts at a glance.
- Must include:
  - date and weekday
  - ceremony time
  - venue name
  - full address
  - map link button
- Interaction: one-thumb-friendly action buttons.

### 3.4 Gallery

- Purpose: visual storytelling.
- Must include: mobile-optimized photo list (grid or carousel).
- Constraints:
  - preserve image quality and loading speed balance
  - lazy load non-critical images
  - maintain consistent aspect treatment

### 3.5 Location/Map/Transport

- Purpose: reduce travel confusion.
- Must include:
  - map shortcut button
  - transport guidance (car/public transit/parking)
  - quick copy for address if needed
- Interaction: map and copy actions should confirm success state.

### 3.6 RSVP

- Purpose: attendance collection with minimal friction.
- Must include fields:
  - attendee name (required)
  - attendance yes/no (required)
  - guest count (required)
  - meal choice (optional by event policy)
  - message to couple (optional)
- Must include:
  - submit loading state
  - success feedback
  - failure feedback with retry path

### 3.7 Extras

- Must include:
  - add to calendar (Google Calendar and/or iCal)
  - gift account information (optional disclosure/toggle)
  - share action (copy link and messenger integration if feasible)
  - background music control (user initiated only)
- Interaction: no hidden critical controls; labels must be explicit.

### 3.8 Footer Note

- Purpose: graceful ending and gratitude.
- Must include: short thank-you note and optional copyright/contact.

## 4) Motion and Section Transition Rules

- Prefer lightweight opacity + translate reveals.
- Keep animation timing consistent across sections.
- Avoid heavy parallax or long chained effects that hurt readability.
- Respect reduced-motion preferences.
- Never lock scroll for decorative animation.

## 5) Accessibility and UX Guardrails

- Semantic section structure and heading order.
- Buttons and links must be keyboard accessible.
- Clear focus states and touch target sizes suitable for one-thumb usage.
- Avoid low-contrast text even in pastel palette.
- Action feedback must be visible and understandable.

## 6) Ready-for-Implementation Checklist

- Every section in page flow has required content and action points.
- RSVP placement and field contract are fixed.
- Mobile-first spacing and transition principles are reflected.
- No section violates the restrained premium mint mood.
