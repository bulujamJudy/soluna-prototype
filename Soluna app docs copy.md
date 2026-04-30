# Project Overview
- App name: Soluna 2.0
- Purpose: to reduce previous version's user experience friction to increase users engagement. The app itself provides state-funded (free for users) coaching services for all Californian residents from 13-25.
- Target users: all Californian residents from 13-25, no insurance information required.
- Key features/modules at a glance:
	- coaching session (drop-in chat, schedule call available)
	- community post, users can write and share their mental journey with others.
	- space bunny buddy, chat-in AI companion.
	- mental Mini-game practice (only placeholder in this prototype)
	- blog library containing all past post to read.
# Navigation Architecture

```
Main Menu/Routes:
among all page
	- notification
	- safety
		  - crisis support options
		  - local services
- Homepage
	- space bunny buddy
		- chat page
	- mini game
	- blog library
	  - blog page
- Coach Chat
	- drop-in chat information
	  - chat page
	- Coach profile page
- community
	- post
- profile
	- setting
	- QA, policy
	  
```

---
# Page Content

Menu at the bottom:
- Homepage
- Coach
- Community
- Profile
## Page: Homepage
**Purpose:** Quick update and quick action for users to navigate between features

**Layout & description:**
- header: emergency icon | Title "Soluna 2.0" | notification icon
	- emergency icon
	- notification icon
- small notification banner: suggestion to add widget
	- Title within banner: "Add a Soluna widget"
	- description: ""
- Space Bunny Buddy section
	- illustration of the bunny at the center
	- dialogue bubble (at top right side of the bunny)
		- bubble type (look different for different case)
			- upcoming coach alert
			- new poll, new discussion to attend
			- no event: show "..." for random dialogue to click
	- conversation message input box
		- 2/3 width text input, description within: type in to share your thought with space bunny
		- 1/3 width send button with send icon
- Mental health practice card list: horizontal scrollable
	- each card: icon \\ text
	- Card (all placeholder): Goal, Mood Log, Values, Startboard, Let it Out, Breathwork, Free Write
- Blog library: all past blogs content
	- topics of the week: horizontal card collections, prioritize unread articles to the front. Mark read articles as read.
		- Progress bar (show many read articles, i.e. 3/5)
		- card contains(in horizontal layout): 
			-  top: illustration
			- title
			- type label | read time
	- For you (horizontal card collections)
	- See all button

**Interactions:**
- click emergency icon -> navigate to safety page
- onclick bunny illustration -> bunny move a bit with dialogue text pop out at its top: "It's 3 a.m. now, I'm here with you," "How are you feeling right now? I can listen to you." After 10 seconds, the dialogue disappears. Switch dialogue when user click again.
- onclick bunny text input -> pop out keyboard for users to type in, once sent (either press enter in the keyboard or click the send button), move to the Bunny conversation page
- onclick any of the Mental health practice card -> move to a placeholder page with exit icon
- onclick any of the blog card -> move to a placeholder page with exit icon
- onclick Library See all button -> navigate to library page
### subpage: safety
**Purpose:** for mental health emergency support, quick action

**Layout & description:**
- header: exit icon | Title (Safety) | Notification icon
- section 1:
	- title: Need urgent support?
	- description: See options for anonymous, free support if you or someone you know is unsafe or in crisis.
	- right arrow icon
- section 2:
	- title: Local services
	- description: find free or reduced-cost services like food pantries, housing, financial assistance, legal support, health car, and more -- all in your area
	- right arrow icon
**interaction**:
- click section 1 -> navigate to "crisis support option" page
- click section 2 -> navigate to "local services" page.

### subpage from safety: crisis support option
all available emergency call numbers in the US
- text list layout, each number has a brief description of its purpose with instruction if needed.

**Interaction:**
- exit icon -> go back to the safety page
- page scrollable
- onclick number -> dial to the services

### subpage from safety: local services
containing an interactive map visualization with all available local services

**layout:**
- header: exit icon | Title: Local Services
- search bar
	- inside text: "search for services or by ZIP code"
	- search button
- horizontal scroll cards (with icon)
	- Food, housing, goods, transit, health, money, care, education, work, legal, crisis text, call 911
- map (interactive, zoom in and out)
- Call support section
	- Title: "California Resources and Support" | open in browser icon
	- Care coordinator | Call button with icon

**interaction:**
- exit icon -> go back to the safety page
- map: moveable inside, zoom in zoom out
	- onclick one mark -> show card above ( xx miles from you | exit icon \\ title \\ category/type of service \\ address info)
- onclick one horizontal scroll cards -> show a row of sub-category tag below that section (food -> community gardens | Emergency Food | Food Delivery | Food Pantry | Help Pay For Food | Meals | Nutrition Education)
- onclick open in browser icon -> jump to an external placeholder link
### Subpage: Bunny conversation
**Purpose:** AI chatbot like page for users to talk with the bunny. The bunny will not comment on the users' contents but to guide users' responses to understand their feeling. This is a mental health coaching service after business hour.

**layout:**
- Header
	- Title: talk to bunny
	- end conversation button
- chat history: chat content
- bunny illustration
- type in box | send button

**interaction:**
- onclick end conversation button -> show a summary of the conversation

### Subpage: bunny conversation summary

**Layout:**
- Back to home page button (at the bottom, always on top)
	- small description below: "your summary will be saved at your profile"
- Emotional Journey
	- Key emotions identified throughout conversation
	- Emotional arc (how feelings shifted/evolved)
	- Peak moments or turning points
- Insights
	- Self-realizations expressed
	- Perspectives the user gained
	- Contradictions or growth moments noted
- Next Steps
	- Gentle recommendations ("Consider journaling about...")
	- When to reach out to professional support
	- Encouragement to continue reflection

**What to Avoid**
- ❌ Diagnosis or clinical language
- ❌ Overly detailed transcript
- ❌ Prescriptive advice
- ❌ Negative framing

### Subpage: Library
**Purpose:**

**layout:**

**interaction:**


## Page: Coach
**Purpose:** help user to navigate coach list and book a session with them

**layout:**
- Drop-in Chat banner
	- chat icon
	- Title: Drop-in Chat
	- description: Join the waiting rooma and chat with the next available coach
	- status: open | 1 person in line
	- next icon
- Book a Free Session Section
    - Illustration
    - Title: "Book a Free Session"
    - Description: "Book free sessions with caring coaches who understand you. Free, forever."
    - Office Hours: 9:00 AM - 10:00 PM
    - Primary button: "Browse All Coaches" (dark, centered)
    - Link: "Learn more about Coaching"
    - callout: "Free for students · State-funded mental health support"
- Upcoming Session Card
    - Calendar icon
    - Title: "Upcoming Session"
    - Details: Coach name • Date at Time (e.g., "Dr. Sarah Chen • Feb 26 at 3:00 PM")
    - Chevron right icon
- Coach Recommendation Cards (list of 3)
    - Each card contains:
        - Icon/avatar (left)
        - Label: category name (e.g., "Your Regular Coach", "Most Matched New Coach", "Recent Available Coach")
        - Coach name | Languages (e.g., "Emma Rodriguez | En • Cn • Es")
        - Tags: specialty badges (e.g., "Family", "Relationships")
        - Chevron right icon
    - Tag styles:
        - Outline tags for regular/recent coaches
        - Filled dark tags for "Most Matched" coach (highlighted)
- Session History Row
    - Title: "Session History"
    - Chevron right icon
    - Full-width, bottom of page

**interaction:**
- onclick drop-in chat banner -> navigate to drop-in chat subpage
- onclick "Browse All Coaches" button -> navigate to full coach list page
- onclick "Learn more about Coaching" link -> navigate to coaching QA page
- onclick Upcoming Session card -> navigate to session detail
- onclick any Coach Recommendation card -> navigate to coach profile
- onclick Session History row -> navigate to session history page

### Subpage: full coach list
**Purpose**: Browse and filter the full list of available coaches

**layout**:
- Header
    - Back arrow icon (left)
    - Title: "Find Your Coach" (centered)
    - Notification bell icon (right)
- Description
    - Text: "Browse our team of caring mental health professionals. Each coach specializes in different areas to support you."
- Filter/Sort Row
    - Filter icon + "Filter" (left)
    - Sort icon + "Sort by" (right)
- Coach List (repeating cards, multiple pages, max 10 cards per page)
    - Each card contains:
        - Coach avatar (circular, left)
        - Coach name (bold) + tag in color (e.g., "you recent coach", "most matched")
        - Pronouns (e.g., "she/her") + second Language row (e.g.,  "Mandarin • Spanish", less-spoken languages in lighter text)
        - Focus area tags (wrapped, one row)
            - Primary specialties: dark filled tags (e.g., "Family", "Relationships")
            - Secondary specialties: outline tags, fewer (e.g., "Social Skills", "Communication", "Conflict Resolution", "Boundaries")
        - Short bio text (1 sentence, e.g., "Expert in navigating family dynamics and teen relationships. Let's talk about what matters most to you.")
        - Recent availability row: "Recent Available: Mon 9:00 am..." + chevron right icon
    - Cards separated by spacing
- footer card
	- Title: "Not Sure Who to Choose?"
	- text: "All our coaches are qualified and ready to help. You can always switch coaches later if you want to try working with someone else. The most important thing is taking that first step!"

interaction:
- onclick back arrow -> navigate back to previous page
- onclick "Filter" -> open filter panel (e.g., by language, specialty, availability, focus topic)
- onclick "Sort by" -> open sort options (e.g., by availability, match score, name)
- onclick any coach card -> navigate to Coach Profile page
- onclick recent availability row -> navigate to scheduling/calendar view for that coach

### Subpage: Coaching QA 
**purpose:** FAQ page to answer common questions about the coaching service

**layout:**
- Header
    - Back arrow icon (left)
    - Title: "About Coaching" (centered)
    - Notification bell icon (right)
- Subtitle
    - Text: "Common questions about scheduling and coaching sessions"
- Info Sections (no borders, stacked with spacing)
    - Section 1: "Who pays for this?"
        - Title (bold)
        - Body: "This service is entirely free and funded by the state as a public mental health initiative for Californians aged 13-25. You do not need to provide any insurance information, nor payment information. No ads, no data harvesting."
    - Section 2: "Who runs it?"
        - Title (bold)
        - Body: "Soluna is operated by California Mental Health Services, a public health agency. We're not a startup—we're a government-backed service."
    - Section 3: "Your privacy"
        - Title (bold)
        - Body: "Your data stays with us. We don't sell information or share it with third parties."
- FAQ Accordion List
    - Each item contains:
        - Question text (bold, left-aligned)
        - Chevron icon (right-aligned, down when collapsed, up when expanded)
        - Answer text (visible only when expanded, gray text)
        - Left border accent line
    - Questions:
        1. "What would a coaching session look like?"
        2. "How do I book a session?"
        3. "Is my conversation private?"
        4. "What is Drop-in Chat?"
        5. "Can I cancel or reschedule?"
        6. "How do I choose the right coach?"
        7. "What are the office hours?"

**interaction:**
- onclick back arrow -> navigate back to previous page
- onclick notification bell -> navigate to notifications (placeholder)
- onclick any FAQ item -> toggle expand/collapse accordion (only one open at a time)


### Subpage: coach profile
**Purpose:** Display detailed information about a specific coach to help user decide and book

**layout:**
- Header
    - Back arrow icon (left)
    - Title: "Coach Profile" (centered)
- Coach Info Section
    - Coach avatar (circular, large, flat illustration character art avatar)
    - Name: "Dr. Sarah Chen" (bold)
    - Pronouns: "she/her" (gray, below name)
    - Tags row: Ethnicity • Languages • Age range (e.g., "Asian • English • Mandarin • 20-30")
- Personal Bio Card
    - Title: "Personal Bio"
    - Body text: coach's personal introduction and background
    - Bordered card container
- Areas of Focus Section
    - Title: "Areas of Focus"
    - Tag chips (wrapped, multiple rows)
        - First tag highlighted (dark filled, e.g., "Anxiety")
        - Remaining tags outline style (e.g., "School Stress", "Academic Pressure", "Test Anxiety", "Mindfulness", "Breathing Techniques")
- Education Section
    - Title: "Education"
    - Bullet list of degrees (e.g., "PhD in Clinical Psychology, Harvard University", "Bachelor of Science in Neuroscience, MIT")
- Certificates Section
    - Title: "Certificates"
    - Bullet list of certifications (e.g., "Licensed Clinical Psychologist", "Cognitive Behavioral Therapy (CBT) Certification", "Mindfulness-Based Stress Reduction (MBSR) Certification")
- Sticky Footer Bar
    - Bookmark/save icon (left)
    - "Check Availability" button (dark filled, takes remaining width)

**interaction:**
- onclick back arrow -> navigate back to previous page
- onclick bookmark icon -> toggle save/unsave coach
- onclick "Check Availability" -> navigate to scheduling/calendar view
### Subpage: scheduling page
**Purpose**: Select a date and time slot to book a session with a specific coach

**layout**:
- Header
    - Back arrow icon (left)
    - Title: "Schedule" (centered)
    - More options icon / three dots (right)
- Coach Info Row
    - Coach name (bold, e.g., "Jordan Lee")
    - Next availability hint (gray, e.g., "Next available Thursday")
- Calendar Card
    - Month/Year header: "May 2026"
    - Navigation arrows: left chevron + right chevron (prev/next month)
    - Day-of-week headers: S M T W T F S
    - Date grid (7 columns)
        - Past dates: grayed out / disabled
        - Available dates: normal text, selectable
        - Selected date: filled circle (e.g., "30")
        - Unavailable dates: light gray text
- Available Times Section
    - Title: "Available times"
    - Time slot buttons (2-column grid)
        - Rounded outline buttons
        - e.g., "9:00 AM", "10:00 AM", "2:00 PM", "3:30 PM", "4:00 PM", "5:00 PM"
        - set some of the time disabled: light gray text
- Sticky Footer
    - "Continue" button (full-width, purple/blue filled)

interaction:

- onclick back arrow -> navigate back to Coach Profile or Find Your Coach
- onclick more options (three dots) -> open options menu (e.g., view coach profile, report issue)
- onclick left/right chevron -> navigate to previous/next month
- onclick available date -> select date, update available times below
- onclick time slot -> highlight/select time slot
- onclick "Continue" -> navigate to session format page
- disabled dates are not clickable

### Subpage: session format
**Purpose**: Let user choose their preferred communication method for the session

**layout**:
- Header
    - Back arrow icon (left)
    - Title: "How would you like to connect?" (centered)
    - More options icon / three dots (right)
- Connection Option Cards (selectable, single-select)
    - Video Option
        - Video camera emoji/icon
        - Title: "Video" (bold)
        - Description: "Face-to-face conversation over video"
        - Default: unselected (plain border)
    - Text Option
        - Chat bubble emoji/icon
        - Title: "Text" (bold)
        - Description: "Written conversation at your pace"
        - Selected state: blue/purple highlighted border + light blue background
- Add Notes section
	- Title: "Add Notes (Optional)"
	- Type in box, with description inside: "What would you like to talk about? This helps your coach prepare for the session if needed."
- Action Button
    - "Review & Confirm" button (full-width, purple/blue filled)

**interaction**:
- onclick back arrow -> navigate back to Schedule page
- onclick more options (three dots) -> open options menu
- onclick Video card -> select Video, deselect Text
- onclick Text card -> select Text, deselect Video
- only one option can be selected at a time
- onclick add note box -> open keyboard for users to enter
- onclick "Review & Confirm" -> navigate to booking review/confirmation page

### subpage: booking review/confirmation 
**Purpose**: Review session details before finalizing the booking

**layout**:
- Header
    - Back arrow icon (left)
    - Title: "Confirm Booking" (centered)
- Coach Card
    - Label: "COACH" (uppercase, gray/blue small text)
    - Coach name (bold, e.g., "Jordan Lee")
    - Credentials (gray, e.g., "Counseling graduate, CCPA certified")
    - Left accent border (light blue)
- Session Details Card
    - Label: "SESSION DETAILS" (uppercase, gray/blue small text)
    - Duration + Type (bold, e.g., "45 minutes, Text")
    - Date + Time (gray, e.g., "Thursday, April 25, 10:00 AM")
    - Left accent border (light blue)
- What to Expect Card
    - Label: "WHAT TO EXPECT" (uppercase, gray/blue small text)
    - Paragraph 1: "Chats are up to 45 minutes long."
    - Paragraph 2: "This is an AI-free zone. You'll connect with a real human with real care."
    - Paragraph 3: "Your coach starts by asking what's been on your mind. No agenda required."
- Funding Note Toggle (click to expand)
	- Header: "How is the service free?" + down chevron
    - Text: "This service is entirely free and funded by the state as a public mental health initiative for Californians aged 13-25. You do not need to provide any insurance information, nor payment information. No ads, no data harvesting."
- Action Button
    - "Confirm the Session" button (full-width, purple/blue filled)

interaction:
- onclick back arrow -> navigate back to Connection Type page
- onclick funding note toggle card -> expand the card to show full info
- onclick "Book the Session" -> submit booking, navigate to confirmation success page

### Subpage: confirmation success
**Purpose**: Confirm successful booking and provide next steps

**layout**:
- Success Icon
    - Large checkmark circle icon (centered, dark)
- Confirmation Header
    - Title: "Booking Confirmed!" (bold, centered)
    - Subtitle: "Your text chat has been successfully scheduled." (gray, centered)
- Session Details Card
    - Title: "Session Details" (bold)
    - Coach avatar (circular, with chat icon overlay at bottom-right)
    - Date (bold, e.g., "Thursday, May 7")
    - Time range (blue/purple text, e.g., "11:00 AM to 11:45 AM")
    - Coach name (gray, e.g., "with Dr. James Parker")
    - Left accent border
- What's Next Card
    - "What's next?" (bold inline)
    - Body: "You'll receive a reminder before your session. Your coach will reach out at the scheduled time."
    - Left accent border
    - Light gray background
- Action Buttons (bottom)
    - "View My Sessions" button (full-width, dark filled, primary)
    - "Back to Coach" button (full-width, outline style, secondary)

interaction:
- onclick "View My Sessions" -> navigate to My Sessions page
- onclick "Back to Coach" -> navigate back to Coach page

### Subpage: My Sessions
**Purpose**: View and manage upcoming and past coaching sessions

**layout:**
- Header
    - Back arrow icon (left)
    - Title: "My Sessions" (centered)
    - Notification bell icon (right)
- Tab Navigation
    - "Upcoming" tab (active, dark filled)
    - "Past Sessions" tab (inactive, light)
- Session Cards (list, repeating)
    - Each card contains:
        - Coach avatar (circular, top-left)
        - Coach name (bold)
        - Calendar icon + Date (e.g., "Thursday, February 26, 2026")
        - Clock icon + Time (e.g., "3:00 PM")
        - Session topic note (optional, gray background row with chat icon, e.g., "Discussion about exam stress")
        - "Reschedule" button (full-width, dark filled)
        - "Cancel" button (full-width, outline style)
- Tip Section (bottom)
    - Title: "Tip: Prepare for Your Session"
    - Description: "Before your session, take a few minutes to think about what you'd like to discuss. It's okay if things come up differently—your coach is here to support whatever you need to talk about!"

interaction:
- onclick back arrow -> navigate back to previous page
- onclick notification bell -> navigate to notifications (placeholder)
- onclick "Upcoming" tab -> show upcoming sessions (default)
- onclick "Past Sessions" tab -> show past session history

### subpage: drop-in chat 
**layout:**
- top header
	- back icon
	- Title: drop-in chat
- Header Section
	- Chat icon + "Drop-in Chat" title
	- Subtitle: "Join the waiting room and talk with the next available coach. No appointment needed!"
	- Status Bar
		- Green dot indicator + "Open"
		- "1 person in line" text
	- Call-to-Action
		- Full-width dark button
		- Text: "Join Waiting Room"
- How it Works Section: numbered step cards (1, 2, 3)
	- Step 1: Join the Queue
		- Click button to enter waiting room
		- See your position in line
	- Step 2: Wait for a Coach
		- Next available coach connects with you
		- Average wait time: 5-10 minutes
	- Step 3: Start Chatting
		- 30-minute session
		- Talk about what's on your mind
- Tips for Drop-in Chat Section
	- Be ready to start talking when coach connects
	- Keep phone nearby for notifications
	- Consider booking scheduled session for specific expertise
	- Text-based format for privacy and comfort

**interaction:**
- onclick Call-to-Action button -> move to in line subpage
### Subpage: in line
**Layout**:
- top header
	- back icon
	- Title: drop-in chat
- In line Section
	- Chat icon (centered, light background circle)
	- Title: "You're in the Waiting Room"
	- Subtitle: "A coach will connect with you shortly. Please keep this window open."
	- Queue Status Card
		- Label: "Your Position"
		- Large bold text: "2nd in line"
		- Subtext: "Estimated wait: 8 minutes"
	 - Action Button
		- Full-width button
		- Text: "Leave Queue"
- While You Wait Section
	- Section title: "While You Wait"
	- Text: "Your coach will be randomly assigned from our available team. All coaches are licensed professionals trained to support teens with various concerns."
	- Text: "You'll receive a notification when your coach is ready. The chat window will open automatically."

**Interaction:**
- onclick Leave Queue button -> move back to the coach page

## Page: Community
**Purpose**: Browse forums, explore topics, and engage with peer posts in a community space

**layout:**
- Header
    - safety icon (left)
    - Title: "Community" (centered)
    - Notification bell icon with badge (right)
- Poll event banner card toggle
	- Poll icon + Title: "Poll" + ending date (align right): "Ongoing: Ending in 3 days"
	- Title:"What makes it hard for you to find common ground with someone?"
	- status: "you haven't voted yet" or "Your choice: ..." (show this once the user made a choice in the poll)
	- call to action button: "tap to vote" or "See result" (if the user has voted already)
- Search & Post Row
    - Search bar with magnifying glass icon (left, takes most width)
    - "+ Post" button (right, rounded, light/white)
- Suggested Topics Section (Topic chips, horizontal scrolling labels)
	- "All"(default, highlighted), "Relationships", "Identity", "School", "Anxiety", "Body Image", "Music", "Introduction"
- My Activity Link (same row with the suggested topics)
    - Text: "my activity" + chevron right icon (right-aligned)
- Forum Posts Feed (scrollable list)
    - Pinned Post
        - Avatar + Username: "ForumsTeam"
        - Title: "Welcome to Forums!"
        - Expand/collapse chevron (right)
    - User Posts (repeating cards)
        - Each post contains:
            - Avatar + Username
            - Timestamp (e.g., "Yesterday at 9:52 PM")
            - Bookmark icon (top-right)
            - Post title (bold, e.g., "Anxiety")
            - Comment icon + count (bottom-left)
            - reaction count (bottom-right, stack icons that don't have the count) + reaction button
	            - Heart icon + count
	            - support hand icon + count
	            - sad face icon + count
	            - sun icon + count
- Bottom Navigation Bar (global, 5 tabs)
    - Home (diamond icon)
    - Community (people icon, active/highlighted)
    - Chat (chat bubble icon)
    - Activities (circle icon)
    - Profile (person icon)

**interaction:**
- onclick "Forums" tab -> show forums view (default)
- onclick "Explore" tab -> show explore/discover view
- onclick search bar -> open search with keyboard
- onclick "+ Post" -> navigate to create new post flow
- onclick any topic chip -> filter posts by that topic
- onclick "my activity" -> navigate to user's post/comment history
- onclick pinned post chevron -> expand/collapse welcome message
- onclick any user post -> navigate to full post detail + comments
- onclick bookmark icon -> toggle save/unsave post
- onclick comment icon -> navigate to post comments
- onclick heart icon -> toggle like on post
- onclick any bottom nav tab -> navigate to respective page


### Subpage: poll content
**Purpose**: Display a community poll for users to vote on

**layout**:
- Header
    - Back arrow icon (left)
- Poll Card
    - Poll Header Row
        - Bar chart emoji/icon + "Poll" label (left)
        - Timer icon + "6 days left" (right, countdown)
    - Question text (large, bold, e.g., "Someone pays for your meal. What's your move?")
    - Answer Options (radio select, single choice)
        - Each option contains:
            - Radio button (circle, unselected)
            - Emoji + option text
        - Option 1: "🔄 Pay for the next person"
        - Option 2: "🏃 Take the win and go"
        - Option 3: "😭 Cry from the kindness"
        - Option 4: "🗣️ Tell everyone the story"
    - "Submit" button (full-width, dark/gray filled, disabled until selection made)
    - Response count: "29 responses" (right-aligned, below button)
- Bottom Navigation Bar (global, 5 tabs)
    - Home (diamond icon)
    - Community (people icon, active/highlighted)
    - Chat (chat bubble icon)
    - Activities (circle icon)
    - Profile (person icon)

**interaction**:
- onclick back arrow -> navigate back to Community page
- onclick any radio option -> select that option, deselect others
- onclick "Submit" -> submit vote, show results (percentage bars)
- submit button disabled until an option is selected
- after voting -> options show result percentages, user's choice highlighted
- onclick any bottom nav tab -> navigate to respective page

## Page: Profile
placeholder for this page, show a typical app profile page

**Layout & description:**
- Profile overview
	- profile icon (icon only with plain color)
	- anonymous name (random internet name, not human name)
- Self assessment card (icon | Title + description)
- action list
	- About me
		- language setting
	- Interests
	- My activity
	- Setting
		- Notification Settings
		- Language Settings
		- Sign out
		- Deactivate my account
		- Support and Complaints
	- App Information (All jumps to a browser website)
		- Privacy Policy
		- Notice of Privacy Policy
		- Community Guidelines
		- Terms of Service
		- Soluna Website
		- Contact Center & Tele-coaching
		- Diagnostics
	- Widget
- My bunny conversation
- Share app to friends card
- Bookmarks collection
	- Bookmark coach collection in cards
	- show all bookmarks blogs

**Interactions:**
- no interaction
- onclick setting -> move to subpage with the inside list
- onclick app Information -> move to subpage with the inside list
