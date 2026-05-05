# Soluna Main Workflow High-Fi Design

Date: 2026-05-05

## Goal

Upgrade the Soluna low-fidelity app screens to a high-fidelity app experience for the main workflow only, using the Soluna design system and the provided moodboard direction.

The outer website/demo layout must remain unchanged. The redesign applies only to the phone app interior.

## Scope

Included screens:

- Home
- Coach landing
- Coach profile
- Schedule
- Confirm booking
- Booking confirmed
- My Sessions
- Shared phone app header and bottom navigation where they appear in the workflow

Out of scope:

- Website/demo page layout around the phone
- Narrative/feature content below or beside the phone
- Non-main-workflow screens unless shared components require small alignment updates
- Content model or navigation changes beyond preserving already requested workflow behavior

## Visual Direction

Use a hybrid high-fidelity direction:

- Main app background: one large ambient full-screen gradient per phone page
- Gradient palette: purple, pink, and yellow only
- No green tones
- UI elements: glass style only
- Cards and buttons must not add their own decorative gradients

The app should feel immersive and cosmic while keeping the current UX readable and reviewable.

## Palette Application

Use the design system as the source of truth, adapted to the approved palette constraint.

- Deep base: Deep Void Purple / app dark purple
- Ambient glow: violet, magenta, soft pink
- Warm highlight: Cosmic Gold / Starlight Yellow
- Text primary: near-white
- Text secondary: muted lavender
- Borders: low-opacity white or lavender
- Positive/completion states: use warm yellow or white checkmarks instead of green
- Disabled states: reduced opacity, desaturated lavender/gray

Avoid:

- Green, teal, mint, or blue-green accents
- Per-card gradient fills
- Decorative blob/orb elements inside cards
- Changing the website background or page structure

## Background System

Each included phone page gets a single app-level ambient gradient behind the content.

Background requirements:

- Covers the full phone app viewport
- Remains visible behind scrolling content
- Feels soft, blurred, atmospheric, and dimensional
- Uses only purple, pink, and yellow
- Does not interfere with text contrast
- Can vary slightly by page state, but should remain recognizably Soluna

Suggested structure:

- A dark purple radial/linear base
- A large pink/violet glow from one corner
- A warm yellow glow placed sparingly as a secondary light source
- Subtle glass haze through translucent page sections

## Glass UI System

Cards, buttons, chips, rails, nav, and callouts should use glass treatments:

- Translucent fill
- Backdrop blur
- Subtle inner/outer border
- Soft shadow for separation
- Rounded corners consistent with the design system
- No internal decorative gradient fills

Glass intensity can vary by hierarchy:

- Primary cards: stronger frosted fill and border
- Secondary cards: lighter fill
- Disabled or quiet content: lower opacity
- Sticky CTAs: high-contrast glass or solid dark glass with clear text

## Typography

Use the design system hierarchy with an app-native feel:

- Page titles and section titles: bold, high contrast, near-white
- Body text: readable, calm, slightly muted
- Metadata: muted lavender
- Chips and controls: compact, confident, legible

Maintain the current wording unless a prior annotation already requested a change.

## Home Screen

Keep the current Home workflow and hierarchy:

- Widget suggestion
- Space Bunny Buddy
- Thought input
- Mental health practice
- Exercise rail
- Topics of the week
- Article cards
- See all Blog button

High-fi treatment:

- Use the new ambient app background
- Convert existing cards to glass surfaces
- Use yellow/pink highlights only for key active or completed states
- Preserve the current progress/task layout
- Keep article cards in the reference-inspired format, but as glass cards over the ambient background

## Coach Landing

Keep the current coach landing structure:

- Drop-in chat
- Book a free session
- Coach list
- Upcoming session
- Session history
- Bottom navigation

High-fi treatment:

- Dark ambient gradient background
- Glass rows and list sections
- Coach avatars become polished circular initials or soft image placeholders
- Active coach tab uses warm yellow or bright white emphasis, not green
- Existing navigation fixes remain intact:
  - Upcoming Session opens My Sessions
  - Session History opens My Sessions with Past selected

## Coach Profile

Keep the current profile content and top identity information:

- Avatar/initials
- Name
- Pronouns
- Identity metadata row
- Next availability
- Bio
- Specialties
- Certificates
- Education
- Session expectation/callout
- Fixed Check Availability CTA

High-fi treatment:

- Hero identity sits cleanly over the ambient background
- Bio and content sections use glass cards
- Specialty chips show first three as matched/stronger emphasis
- Additional chips remain quieter
- Next availability has reduced weight and sits below identity, above bio
- Session expectation section remains in normal scroll flow
- Check Availability is fixed at the bottom of the phone app screen

## Schedule

Keep the existing scheduling interaction:

- Calendar for May 2026
- Disabled days before May 6
- Random available day/time selection behavior as previously requested
- Time options
- Continue CTA

High-fi treatment:

- Calendar sits on a glass panel
- Disabled dates are visibly unavailable through opacity and low contrast
- Selected date/time uses dark glass or warm yellow emphasis
- CTA remains legible and fixed or placed according to current workflow behavior

## Confirm Booking

Keep current confirmation flow:

- Review card with coach profile picture at left
- Date/time
- Video session
- What to expect from your chat
- Service/free explanation
- Confirm the Session CTA

High-fi treatment:

- Review card uses glass
- Coach picture appears as a circular avatar/initials at left
- "What to expect from your chat" follows the vertical timeline reference structure, adapted to glass/dark-purple styling
- Timeline uses white or yellow accents, not green
- Confirm CTA uses strong contrast and glass-compatible styling

## Booking Confirmed

Keep current confirmation behavior:

- Booking confirmed page
- Primary success message centered horizontally and vertically within its region
- No border on the success message
- Message has the strongest weight on the screen
- Next steps heading removed
- Back to Coach is lower weight and borderless
- Close/back links route to coach homepage as requested

High-fi treatment:

- Use calm celebratory glass/ambient treatment
- Success icon/checkmark uses white or warm yellow
- Avoid green success color

## My Sessions

Keep current session behavior:

- Back button routes to Coach homepage
- Upcoming tab
- Past tab
- Session cards
- Upcoming Session and Session History links route here appropriately

High-fi treatment:

- Tabs use glass segmented control
- Session cards use glass
- Action buttons are lower visual weight than session title
- Past subset remains reachable from Session History

## Interaction And State Rules

- Preserve all existing main workflow navigation behavior.
- Do not alter the outer demo website layout.
- Hide scrollbars as already requested.
- Preserve mobile phone dimensions and bottom nav behavior.
- Keep text readable over the ambient background.
- Keep focus/selected states visible without relying on green.

## Acceptance Criteria

- The website layout around the phone matches the current/demo layout and is not redesigned.
- Main phone workflow screens visually match the high-fi Soluna direction.
- Phone page backgrounds use large purple/pink/yellow ambient gradients.
- Cards and buttons use glass styling without internal decorative gradients.
- No green appears in the app UI.
- Main workflow navigation still works end to end.
- The UI remains legible at the current phone viewport.
- Scrollbars remain hidden.
- Build and relevant tests pass after implementation.
