# Soluna 2.0 Prototype Design

## Goal

Build a low-fidelity, Apple-like case-study demo website for the Soluna 2.0 redesign. The demo presents three redesign themes with a manual before-after comparison and an interactive phone prototype that implements all pages and subpages from `Soluna app docs copy.md`.

## Source Material

- Primary product structure: `Soluna app docs copy.md`
- Prototype mode: pure front-end, mocked state only
- Image policy: every image slot uses a visible placeholder that says it must be replaced with an actual image
- Video policy: every before-video slot uses a visible placeholder that says it must be replaced with the recorded before video

## Scope

The project is a single front-end prototype. It does not include backend APIs, real authentication, persistent storage, production analytics, real maps, real emergency service integrations, or live AI behavior.

The app must implement all pages and subpages described in the markdown:

- Home
- Safety
- Crisis support options
- Local services
- Bunny conversation
- Bunny conversation summary
- Library
- Coach
- Drop-in chat
- In line waiting room
- Full coach list
- Coaching QA
- Coach profile
- Scheduling
- Session format
- Booking review and confirmation
- Confirmation success
- My Sessions
- Community
- Poll content
- Community post/detail flow
- Profile
- Profile subpages for settings and app information
- Placeholder pages for mini-games, articles, notifications, and other listed destinations without detailed content

## Demo Website Layout

The outer website is a case-study stage with two main columns on desktop.

Left column: narrative panel

- Shows the active feature chapter.
- Uses provisional copy based on the research argument.
- Includes sections for problem, insight, redesign response, and prototype path.
- Is data-driven so final copy can be changed later without editing layout components.

Right column: demo stage

- Shows feature tabs and a manual `Before | After` segmented control outside the phone.
- Contains a phone frame.
- In `Before` mode, the phone frame displays the active feature's video placeholder.
- In `After` mode, the phone frame displays the interactive Soluna 2.0 prototype.

Responsive behavior:

- Wide desktop: left narrative column and right phone stage sit side by side.
- Tablet: both columns remain side by side with reduced spacing and a smaller phone.
- Narrow/mobile browser: content stacks as feature tabs, narrative panel, before-after toggle, then phone frame.

## Feature Chapters

The demo has three top-level feature chapters.

### 1. Trust

Problem:

Users may question whether coaches are real people, whether the service is AI chatbots, why the service is free, and whether information is being sold. The existing app may contain answers, but the design does not make them visible enough.

Redesign response:

- Surface coach identity and credentials.
- Explain what a session feels like before booking.
- Make state funding and free-service logic visible in booking and coaching FAQ screens.

After prototype path:

- Coach page
- Coach profile
- Scheduling
- Session format
- Booking review
- Confirmation success
- Coaching QA

Before asset:

- A video placeholder labeled `Replace with recorded before video: Trust friction demo`.

### 2. Community Engagement

Problem:

Users want sharing and connection, but long posts with low visible response can make the community feel uncaring. Standard reactions are often too blunt for mental health content, and writing a full reply can feel like too much effort.

Redesign response:

- Keep community browsing and posting lightweight.
- Add specific, appropriate reactions.
- Add an annotation-style reaction concept for responding within sentence context.
- Support poll participation as a lower-friction engagement path.

After prototype path:

- Community page
- Poll content
- Post detail
- Annotation reaction interaction
- My activity placeholder

Before asset:

- A video placeholder labeled `Replace with recorded before video: Community engagement friction demo`.

### 3. Design Accessibility

Problem:

Soluna has many resources, but text-heavy information can be hard to navigate, especially for users experiencing anxiety or reading fatigue. The app has a Space Bunny mascot, but the mascot is not visible enough as a guide.

Redesign response:

- Make Space Bunny a visible companion on the home screen.
- Let Space Bunny guide emotional reflection after coach business hours.
- Use Bunny prompts to point users toward articles, resources, and upcoming coaching sessions.
- Surface widget behavior as more than a static image.
- Keep safety and local services quick to access.

After prototype path:

- Home
- Space Bunny interaction
- Bunny conversation
- Bunny conversation summary
- Safety
- Local services
- Blog/library placeholders

Before asset:

- A video placeholder labeled `Replace with recorded before video: Design accessibility friction demo`.

## Interaction Model

The outer demo owns:

- Active feature chapter
- Before-after mode
- The starting route for the after prototype when the feature changes

The phone prototype owns:

- Current app route
- Back stack
- Bottom tab state
- Local interaction state, such as selected poll option, expanded FAQ item, selected coach date/time, selected session format, queue status, bookmark toggles, and chat message entries

When the active feature changes, the after prototype should reset to that feature's recommended starting route. Within a feature, users may still navigate freely through the prototype.

## Visual Direction

The demo should be low-fidelity but clean and Apple-like.

Use:

- System font stack
- White and light gray surfaces
- Subtle borders and dividers
- iOS-like grouped sections
- Simple segmented controls
- Rounded phone frame
- Calm spacing
- Minimal shadows
- Icon buttons where appropriate

Avoid:

- Heavy gradients
- Decorative illustration polish
- Loud color systems
- Complex animation
- Production-level branding
- Stock-like imagery

All image areas should use a reusable placeholder treatment with fixed aspect ratio and text such as `Replace with actual image`.

All video areas should use a reusable placeholder treatment and be ready to accept a local video path later. When real videos are added, they should autoplay only inside `Before` mode and be muted/looped for demo reliability.

## Architecture

Use a Vite + React + TypeScript front-end.

Top-level structure:

```txt
DemoShell
├── NarrativePanel
├── FeatureTabs
├── BeforeAfterToggle
└── PhoneStage
    └── PhoneFrame
        ├── BeforeVideo
        └── SolunaPrototype
```

Phone prototype structure:

```txt
SolunaPrototype
├── AppHeader
├── RouteRenderer
├── BottomNav
└── page components
```

Data should be separated from rendering:

- Feature chapter metadata
- Mock coaches
- Mock posts
- Mock poll
- Mock blog cards
- Mock safety resources
- Mock local services
- Mock sessions
- Mock profile settings

The implementation should prefer small focused components over large page files. Shared layout primitives should cover headers, section rows, cards, chips, placeholders, sticky footers, and phone-safe scroll areas.

## Page Behavior Requirements

Home:

- Emergency icon opens Safety.
- Notification icon opens placeholder notifications.
- Widget banner remains visible.
- Space Bunny illustration placeholder reacts to click with rotating dialogue.
- Bunny input navigates to Bunny conversation when submitted.
- Mental practice cards navigate to placeholder practice pages.
- Blog cards navigate to placeholder article pages.
- See all opens Library.

Safety:

- Shows urgent support and local services rows.
- Urgent support opens crisis support options.
- Local services opens local services page.

Crisis support options:

- Scrollable list of emergency numbers and descriptions.
- Tapping a number can show a non-dialing prototype acknowledgement.

Local services:

- Search bar and category row.
- Category selection reveals subcategory tags.
- Map area is a placeholder interactive panel with service markers.
- Marker selection shows a service card.

Bunny conversation:

- Chat-style page.
- User can enter messages.
- Bunny replies with reflective, non-diagnostic prompts.
- End conversation opens summary.

Bunny summary:

- Shows emotional journey, insights, and next steps.
- Uses gentle, non-clinical language.
- Back to home returns to Home.

Coach:

- Drop-in chat opens drop-in flow.
- Browse all coaches opens full coach list.
- Learn more opens Coaching QA.
- Upcoming session opens My Sessions or session detail placeholder.
- Coach cards open Coach profile.
- Session history opens My Sessions.

Coach booking:

- Coach profile supports bookmark toggle and availability navigation.
- Scheduling supports month navigation, date selection, time selection, and continue.
- Session format supports single-select Video/Text and optional notes.
- Booking review supports funding note expansion.
- Confirm session opens success page.
- Success page links to My Sessions and Coach.

Drop-in chat:

- Join waiting room opens In line page.
- Leave queue returns to Coach.

Community:

- Poll banner opens Poll content.
- Topic chips filter visible post labels in a mocked way.
- Pinned post expands/collapses.
- Post cards support bookmark and reaction toggles.
- Post cards open detail page.
- `+ Post`, search, and my activity open placeholder pages.

Poll:

- Option selection enables Submit.
- Submit shows result percentages and highlights selected choice.

Community post detail:

- Shows the full post.
- Supports normal reaction buttons.
- Supports annotation-style reaction by selecting a sentence or tapping a sentence row in the prototype.
- Shows sentence-level feedback in a lightweight low-fidelity style.

Profile:

- Shows anonymous profile overview.
- Shows settings, app information, bunny conversations, share app, and bookmarks sections.
- Settings and app information open subpages.
- External links show placeholder browser acknowledgement.

Library:

- Shows topic collections, for-you collection, and read-status progress.
- Article cards open placeholder article pages.

Placeholder pages:

- Use a consistent placeholder layout with header, title, description, and exit/back action.
- Clearly label areas that need future content.

## Error Handling and Boundaries

Because this is a prototype, errors should be handled as visible non-blocking states:

- Missing video paths show the video replacement placeholder.
- Empty mock collections show a simple empty state.
- Disabled dates/times are visibly disabled and do not navigate.
- Actions that would normally leave the app show an in-prototype acknowledgement instead of opening external services.
- Emergency phone numbers do not place real calls in the demo.

## Testing and Verification

Implementation should verify:

- The app starts locally.
- The desktop layout shows the narrative panel and phone stage side by side.
- The narrow layout stacks cleanly.
- Feature tabs update narrative content and reset the after route.
- Before-after toggle manually changes the phone content.
- Before mode shows the correct video placeholder for all three features.
- After mode supports core flows across all pages.
- Image placeholders are visible wherever images are expected.
- No key text overlaps in the phone frame.
- Bottom navigation and back navigation work across representative flows.

## Non-Goals

- Real clinical advice
- Real AI chat
- Real coach booking
- Real service map data
- Real emergency dialing
- Real user accounts
- Real persistent data
- Final visual design polish
- Final case-study copy
- Final before videos or production images
