# RSVP Architecture for Static Hosting (Phase 1)

This document defines the RSVP technical approach for a GitHub Pages deployment.

## 1) Decision

- Selected approach: **Google Apps Script Web App endpoint + Google Sheets storage**.
- Decision status: Approved default for Phase 1.

## 2) Why This Approach

- Works with static hosting (`github.io`) without custom backend servers.
- Operationally simple for non-engineering event management.
- Fast setup and maintenance for a single-event product.
- Easy to audit and export RSVP responses from Sheets.

## 3) Data Contract (Submission Payload)

Required fields:
- `name`: string
- `attendance`: `yes` or `no`
- `guestCount`: integer >= 1

Optional fields:
- `meal`: string
- `message`: string

System fields (client-generated):
- `submittedAt`: ISO timestamp
- `locale`: locale code (optional)
- `honeypot`: hidden field (must stay empty)

## 4) Client Validation Rules

- Name is non-empty after trim.
- Attendance must be selected.
- Guest count must be valid integer in defined range.
- Message length capped for readability and abuse prevention.
- On invalid input: inline field-level feedback + summary feedback near submit button.

## 5) Submission and Response Flow

1. User fills RSVP form on invitation page.
2. Client validates fields.
3. Client sends POST request to Apps Script endpoint.
4. Endpoint validates payload and writes one row to Google Sheets.
5. Endpoint returns result JSON with success/failure state.
6. UI shows clear success or retryable error message.

## 6) Abuse and Spam Mitigation (Static-Friendly)

- Hidden honeypot field; reject if filled.
- Minimum submit time threshold (example: reject near-instant submissions).
- Client-side button lock during pending request.
- Optional per-IP throttling at Apps Script layer where feasible.
- Keep endpoint URL in public client code, but never expose secrets.

## 7) Failure Handling UX

- Timeout/network error: show concise retry message.
- Endpoint error: show fail state and preserve user input for retry.
- Unknown error: fallback generic message and retry option.
- Never lose the typed form values on temporary failure.

## 8) Security and Privacy Notes

- No secrets or API keys committed into repository.
- Sheet access restricted to owner/editor accounts only.
- Do not collect unnecessary personal data.
- Keep message and guest info only for event operation.

## 9) Deployment and Operations Checklist

- Apps Script deployed as web app endpoint.
- CORS and content-type behavior verified from GitHub Pages domain.
- Test submissions create rows in expected columns.
- Success and error UI states verified on mobile.
- Backup/export process for Sheets confirmed.

## 10) Future Upgrade Paths (Optional)

- Move to Supabase/Firebase if advanced analytics or auth is needed.
- Add stronger bot protection if traffic abuse appears.
- Add admin dashboard if operations complexity grows.
