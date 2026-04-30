# Soluna 2.0 Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a low-fidelity Apple-like case-study website with three before-after feature chapters and a complete interactive Soluna 2.0 phone prototype.

**Architecture:** Use a Vite + React + TypeScript single-page app. The outer `DemoShell` owns feature selection and manual before-after mode; the inner `SolunaPrototype` owns phone routes, local interaction state, bottom navigation, and page rendering. Data lives in typed mock-data modules so future copy, videos, and images can be replaced without rewriting layout components.

**Tech Stack:** Vite, React, TypeScript, CSS modules or plain CSS imported through `src/styles.css`, lucide-react icons, Vitest, React Testing Library, Playwright.

---

## Scope Check

The approved spec describes one front-end prototype with three case-study chapters. This is large but not three independent products: every chapter shares the same shell, phone frame, route system, shared UI primitives, and mocked data. Keep it as one implementation plan.

## File Structure

Create this structure:

```txt
package.json
index.html
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.setup.ts
playwright.config.ts
src/
  main.tsx
  App.tsx
  styles.css
  data/
    features.ts
    mockContent.ts
  prototype/
    routeTypes.ts
    usePrototypeNavigation.ts
    SolunaPrototype.tsx
    routeConfig.ts
  components/
    demo/
      DemoShell.tsx
      NarrativePanel.tsx
      PhoneStage.tsx
      BeforeVideo.tsx
    phone/
      PhoneFrame.tsx
      PhoneHeader.tsx
      BottomNav.tsx
      UiPrimitives.tsx
  pages/
    HomePage.tsx
    SafetyPages.tsx
    BunnyPages.tsx
    CoachPages.tsx
    CommunityPages.tsx
    ProfilePages.tsx
    LibraryPage.tsx
    PlaceholderPage.tsx
  tests/
    featureData.test.ts
    navigation.test.tsx
    demoShell.test.tsx
    phoneFlows.test.tsx
e2e/
  soluna-prototype.spec.ts
```

Responsibilities:

- `src/data/features.ts`: three case-study chapters, narrative copy, before video metadata, after starting routes.
- `src/data/mockContent.ts`: all mock coaches, posts, poll, articles, resources, services, sessions, and profile rows.
- `src/prototype/routeTypes.ts`: route names and typed route objects.
- `src/prototype/usePrototypeNavigation.ts`: push, replace, back, reset, and tab navigation.
- `src/prototype/SolunaPrototype.tsx`: route renderer and phone-level local state wiring.
- `src/components/demo/*`: outer website layout, feature tabs, manual before-after toggle, narrative panel, phone stage.
- `src/components/phone/*`: reusable phone frame, headers, bottom nav, cards, chips, fields, section rows, sticky footers, and asset replacement slots.
- `src/pages/*`: page groups matching the approved markdown.
- `src/tests/*`: fast unit and integration tests.
- `e2e/soluna-prototype.spec.ts`: browser verification for layout, before-after behavior, and representative flows.

## Route Map

Use these route names exactly:

```ts
export type RouteName =
  | "home"
  | "safety"
  | "crisis"
  | "localServices"
  | "bunnyChat"
  | "bunnySummary"
  | "library"
  | "coach"
  | "dropInChat"
  | "waitingRoom"
  | "coachList"
  | "coachingQA"
  | "coachProfile"
  | "schedule"
  | "sessionFormat"
  | "bookingReview"
  | "bookingSuccess"
  | "mySessions"
  | "community"
  | "poll"
  | "postDetail"
  | "profile"
  | "settings"
  | "appInformation"
  | "placeholder";
```

Feature start routes:

- Trust: `coach`
- Community Engagement: `community`
- Design Accessibility: `home`

## Task 1: Project Scaffold

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create the Vite React TypeScript package files**

Use these exact file contents.

`package.json`:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest",
    "vitest": "latest"
  }
}
```

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Soluna 2.0 Prototype</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "playwright.config.ts"]
}
```

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts"
  }
});
```

`vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

`playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run dev -- --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 14"] } }
  ]
});
```

`src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-root">
      <h1>Soluna 2.0 Prototype</h1>
      <p>Prototype scaffold ready.</p>
    </main>
  );
}
```

`src/styles.css`:

```css
:root {
  color: #111827;
  background: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  --page: #f5f5f7;
  --surface: #ffffff;
  --surface-muted: #f2f2f7;
  --text: #111827;
  --muted: #6b7280;
  --line: #d9d9df;
  --strong: #111111;
  --accent: #2563eb;
  --radius: 16px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: var(--page);
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-root {
  min-height: 100vh;
  padding: 32px;
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: `node_modules` and `package-lock.json` are created.

- [ ] **Step 3: Verify scaffold builds**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite complete successfully.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts vitest.setup.ts playwright.config.ts src/main.tsx src/App.tsx src/styles.css
git commit -m "chore: scaffold Soluna prototype app"
```

## Task 2: Data Contracts and Mock Content

**Files:**

- Create: `src/prototype/routeTypes.ts`
- Create: `src/data/features.ts`
- Create: `src/data/mockContent.ts`
- Create: `src/tests/featureData.test.ts`

- [ ] **Step 1: Write data contract tests**

`src/tests/featureData.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { features } from "../data/features";
import { coaches, communityPosts, crisisResources, localServices, poll, profileSections } from "../data/mockContent";

describe("feature metadata", () => {
  it("defines exactly the three approved feature chapters", () => {
    expect(features.map((feature) => feature.id)).toEqual(["trust", "community", "accessibility"]);
  });

  it("maps every feature to a before video replacement label and after start route", () => {
    for (const feature of features) {
      expect(feature.beforeVideoLabel).toContain("Replace with recorded before video");
      expect(feature.afterStartRoute.name).toMatch(/home|coach|community/);
      expect(feature.problem.length).toBeGreaterThan(80);
      expect(feature.prototypePath.length).toBeGreaterThan(2);
    }
  });
});

describe("mock content", () => {
  it("contains enough data to render the major prototype sections", () => {
    expect(coaches.length).toBeGreaterThanOrEqual(3);
    expect(communityPosts.length).toBeGreaterThanOrEqual(3);
    expect(crisisResources.length).toBeGreaterThanOrEqual(4);
    expect(localServices.length).toBeGreaterThanOrEqual(3);
    expect(poll.options.length).toBe(4);
    expect(profileSections.length).toBeGreaterThanOrEqual(4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/tests/featureData.test.ts
```

Expected: FAIL because the imported modules do not exist.

- [ ] **Step 3: Add route types**

`src/prototype/routeTypes.ts`:

```ts
export type RouteName =
  | "home"
  | "safety"
  | "crisis"
  | "localServices"
  | "bunnyChat"
  | "bunnySummary"
  | "library"
  | "coach"
  | "dropInChat"
  | "waitingRoom"
  | "coachList"
  | "coachingQA"
  | "coachProfile"
  | "schedule"
  | "sessionFormat"
  | "bookingReview"
  | "bookingSuccess"
  | "mySessions"
  | "community"
  | "poll"
  | "postDetail"
  | "profile"
  | "settings"
  | "appInformation"
  | "placeholder";

export type PrototypeRoute = {
  name: RouteName;
  title?: string;
  params?: Record<string, string>;
};

export type FeatureId = "trust" | "community" | "accessibility";
```

- [ ] **Step 4: Add feature metadata**

`src/data/features.ts`:

```ts
import type { FeatureId, PrototypeRoute } from "../prototype/routeTypes";

export type FeatureChapter = {
  id: FeatureId;
  title: string;
  eyebrow: string;
  problem: string;
  insight: string;
  redesign: string[];
  prototypePath: string[];
  beforeVideoLabel: string;
  beforeVideoSrc: string;
  afterStartRoute: PrototypeRoute;
};

export const features: FeatureChapter[] = [
  {
    id: "trust",
    title: "Trust",
    eyebrow: "Feature 1",
    problem:
      "Research signals show that users may wonder whether coaches are real people, why the service is free, and whether their information is being sold. The answers exist behind the system through state funding and care partners, but the original design makes those trust signals too quiet.",
    insight:
      "Trust improves when legitimacy is visible before the user is asked to book, wait, or share personal context.",
    redesign: [
      "Surface coach identity, credentials, focus areas, and language fit.",
      "Preview what a session feels like before confirmation.",
      "Repeat free-service and state-funded explanations where booking decisions happen."
    ],
    prototypePath: ["Coach", "Coach Profile", "Schedule", "Session Format", "Booking Review", "Success", "Coaching FAQ"],
    beforeVideoLabel: "Replace with recorded before video: Trust friction demo",
    beforeVideoSrc: "/videos/trust-before.mp4",
    afterStartRoute: { name: "coach" }
  },
  {
    id: "community",
    title: "Community Engagement",
    eyebrow: "Feature 2",
    problem:
      "Users come to community spaces for sharing and connection, but long posts with no visible response can feel like nobody cares. A generic like can feel emotionally wrong, while writing a full reply can take too much energy.",
    insight:
      "Feedback should be quick, specific, and emotionally appropriate to the exact sentence or moment the reader is responding to.",
    redesign: [
      "Keep poll participation and lightweight reactions available.",
      "Add sentence-level annotation reactions for more specific support.",
      "Make response signals visible without forcing a long comment."
    ],
    prototypePath: ["Community", "Poll", "Post Detail", "Annotation Reaction", "My Activity"],
    beforeVideoLabel: "Replace with recorded before video: Community engagement friction demo",
    beforeVideoSrc: "/videos/community-before.mp4",
    afterStartRoute: { name: "community" }
  },
  {
    id: "accessibility",
    title: "Design Accessibility",
    eyebrow: "Feature 3",
    problem:
      "Soluna contains many resources, but text-heavy navigation can be exhausting for users dealing with anxiety or reading fatigue. The Space Bunny mascot exists as a brand asset, but it is not doing enough work inside the product experience.",
    insight:
      "A visible companion can organize access, listen after coach hours, and gently point users toward resources without making the user research everything alone.",
    redesign: [
      "Place Space Bunny at the center of the home experience.",
      "Use Bunny as a reflective listener, not a diagnostic chatbot.",
      "Connect Bunny prompts to articles, local resources, safety support, widgets, and coach reminders."
    ],
    prototypePath: ["Home", "Bunny Prompt", "Bunny Chat", "Summary", "Safety", "Local Services", "Library"],
    beforeVideoLabel: "Replace with recorded before video: Design accessibility friction demo",
    beforeVideoSrc: "/videos/accessibility-before.mp4",
    afterStartRoute: { name: "home" }
  }
];
```

- [ ] **Step 5: Add mock content**

`src/data/mockContent.ts`:

```ts
export const coaches = [
  {
    id: "sarah",
    name: "Dr. Sarah Chen",
    pronouns: "she/her",
    languages: ["English", "Mandarin"],
    label: "Your Regular Coach",
    credentials: "Licensed clinical psychologist",
    tags: ["Anxiety", "School Stress", "Mindfulness"],
    bio: "I help young people slow down racing thoughts and find one practical next step.",
    availability: "Thu 11:00 AM"
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    pronouns: "they/them",
    languages: ["English", "Spanish"],
    label: "Most Matched New Coach",
    credentials: "Counseling graduate, CCPA certified",
    tags: ["Identity", "Family", "Relationships"],
    bio: "I support teens and young adults navigating identity, family pressure, and belonging.",
    availability: "Fri 2:00 PM"
  },
  {
    id: "emma",
    name: "Emma Rodriguez",
    pronouns: "she/her",
    languages: ["English", "Spanish", "Mandarin"],
    label: "Recent Available Coach",
    credentials: "Youth mental health coach",
    tags: ["Communication", "Boundaries", "Conflict"],
    bio: "I focus on practical conversations that make relationships feel less impossible.",
    availability: "Mon 9:00 AM"
  }
];

export const practiceCards = ["Goal", "Mood Log", "Values", "Startboard", "Let it Out", "Breathwork", "Free Write"];

export const blogCards = [
  { id: "sleep", title: "When sleep feels far away", type: "Guide", readTime: "4 min", read: false },
  { id: "stress", title: "Tiny resets for stressful days", type: "Practice", readTime: "3 min", read: true },
  { id: "grounding", title: "Grounding when thoughts run fast", type: "Article", readTime: "5 min", read: false }
];

export const crisisResources = [
  { name: "988 Suicide & Crisis Lifeline", number: "988", description: "Free confidential support for emotional distress or crisis." },
  { name: "Crisis Text Line", number: "Text HOME to 741741", description: "Text-based crisis support in the United States." },
  { name: "Emergency Services", number: "911", description: "Use for immediate danger or medical emergencies." },
  { name: "California Youth Crisis Line", number: "1-800-843-5200", description: "Support for youth and families in California." }
];

export const localServiceCategories = ["Food", "Housing", "Goods", "Transit", "Health", "Money", "Care", "Education", "Work", "Legal", "Crisis Text", "Call 911"];

export const localServices = [
  { id: "food", title: "Community Food Pantry", category: "Food", distance: "1.2 miles", address: "120 Hope St, Los Angeles, CA" },
  { id: "housing", title: "Youth Housing Support", category: "Housing", distance: "2.4 miles", address: "88 Care Ave, Los Angeles, CA" },
  { id: "legal", title: "Free Legal Aid Desk", category: "Legal", distance: "3.1 miles", address: "41 Civic Center Dr, Los Angeles, CA" }
];

export const poll = {
  question: "What makes it hard for you to find common ground with someone?",
  responses: 29,
  options: ["Feeling misunderstood", "Not knowing what to say", "Worrying I will be judged", "Being too tired to explain"]
};

export const communityPosts = [
  {
    id: "fire-blog",
    author: "MoonSignal",
    title: "I wrote a long post and still felt alone",
    timestamp: "Yesterday at 9:52 PM",
    topic: "Anxiety",
    comments: 0,
    reactions: 2,
    sentences: [
      "I wanted to share something real, but after posting it I kept checking and nobody responded.",
      "It made me wonder if the community was quiet because nobody cared.",
      "I know that might not be true, but it still felt heavy in the moment."
    ]
  },
  {
    id: "school",
    author: "SoftLaunch",
    title: "School feels louder than usual",
    timestamp: "Today at 8:10 AM",
    topic: "School",
    comments: 3,
    reactions: 8,
    sentences: ["The week started fast.", "I am trying to find one thing I can control today."]
  },
  {
    id: "intro",
    author: "CloudPocket",
    title: "New here and saying hi",
    timestamp: "Mon at 7:20 PM",
    topic: "Introduction",
    comments: 5,
    reactions: 12,
    sentences: ["I am new here.", "I hope this can be a low-pressure place to talk."]
  }
];

export const profileSections = [
  { title: "About me", rows: ["Language setting", "Interests", "My activity"] },
  { title: "Setting", rows: ["Notification Settings", "Language Settings", "Sign out", "Deactivate my account", "Support and Complaints"] },
  { title: "App Information", rows: ["Privacy Policy", "Notice of Privacy Policy", "Community Guidelines", "Terms of Service", "Soluna Website", "Contact Center & Tele-coaching", "Diagnostics"] },
  { title: "Saved", rows: ["My bunny conversation", "Bookmarks collection", "Share app to friends"] }
];

export const sessions = [
  { coach: "Dr. Sarah Chen", date: "Thursday, May 7", time: "11:00 AM to 11:45 AM", topic: "Discussion about exam stress" }
];
```

- [ ] **Step 6: Run data tests**

Run:

```bash
npm test -- src/tests/featureData.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/prototype/routeTypes.ts src/data/features.ts src/data/mockContent.ts src/tests/featureData.test.ts
git commit -m "feat: add prototype data contracts"
```

## Task 3: Navigation State

**Files:**

- Create: `src/prototype/usePrototypeNavigation.ts`
- Create: `src/prototype/routeConfig.ts`
- Create: `src/tests/navigation.test.tsx`

- [ ] **Step 1: Write navigation tests**

`src/tests/navigation.test.tsx`:

```tsx
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrototypeNavigation } from "../prototype/usePrototypeNavigation";

describe("usePrototypeNavigation", () => {
  it("starts at the requested route", () => {
    const { result } = renderHook(() => usePrototypeNavigation({ name: "coach" }));
    expect(result.current.route.name).toBe("coach");
  });

  it("pushes routes and returns with back", () => {
    const { result } = renderHook(() => usePrototypeNavigation({ name: "home" }));
    act(() => result.current.push({ name: "safety" }));
    act(() => result.current.push({ name: "crisis" }));
    expect(result.current.route.name).toBe("crisis");
    act(() => result.current.back());
    expect(result.current.route.name).toBe("safety");
  });

  it("resets history when feature start route changes", () => {
    const { result } = renderHook(() => usePrototypeNavigation({ name: "home" }));
    act(() => result.current.push({ name: "safety" }));
    act(() => result.current.reset({ name: "community" }));
    expect(result.current.route.name).toBe("community");
    act(() => result.current.back());
    expect(result.current.route.name).toBe("community");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/tests/navigation.test.tsx
```

Expected: FAIL because `usePrototypeNavigation` does not exist.

- [ ] **Step 3: Add route labels and navigation hook**

`src/prototype/routeConfig.ts`:

```ts
import type { RouteName } from "./routeTypes";

export const tabRoutes: RouteName[] = ["home", "coach", "community", "profile"];

export const routeLabels: Record<RouteName, string> = {
  home: "Home",
  safety: "Safety",
  crisis: "Crisis Support",
  localServices: "Local Services",
  bunnyChat: "Talk to Bunny",
  bunnySummary: "Conversation Summary",
  library: "Library",
  coach: "Coach",
  dropInChat: "Drop-in Chat",
  waitingRoom: "Waiting Room",
  coachList: "Find Your Coach",
  coachingQA: "About Coaching",
  coachProfile: "Coach Profile",
  schedule: "Schedule",
  sessionFormat: "How would you like to connect?",
  bookingReview: "Confirm Booking",
  bookingSuccess: "Booking Confirmed",
  mySessions: "My Sessions",
  community: "Community",
  poll: "Poll",
  postDetail: "Post",
  profile: "Profile",
  settings: "Settings",
  appInformation: "App Information",
  placeholder: "Prototype Placeholder"
};
```

`src/prototype/usePrototypeNavigation.ts`:

```ts
import { useCallback, useMemo, useState } from "react";
import type { PrototypeRoute, RouteName } from "./routeTypes";
import { tabRoutes } from "./routeConfig";

export function usePrototypeNavigation(initialRoute: PrototypeRoute) {
  const [history, setHistory] = useState<PrototypeRoute[]>([initialRoute]);

  const route = history[history.length - 1];

  const push = useCallback((nextRoute: PrototypeRoute) => {
    setHistory((current) => [...current, nextRoute]);
  }, []);

  const replace = useCallback((nextRoute: PrototypeRoute) => {
    setHistory((current) => [...current.slice(0, -1), nextRoute]);
  }, []);

  const reset = useCallback((nextRoute: PrototypeRoute) => {
    setHistory([nextRoute]);
  }, []);

  const back = useCallback(() => {
    setHistory((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);

  const goTab = useCallback((name: RouteName) => {
    if (tabRoutes.includes(name)) {
      setHistory([{ name }]);
    }
  }, []);

  return useMemo(
    () => ({ route, canGoBack: history.length > 1, push, replace, reset, back, goTab }),
    [back, goTab, history.length, push, replace, reset, route]
  );
}
```

- [ ] **Step 4: Run navigation tests**

Run:

```bash
npm test -- src/tests/navigation.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/prototype/usePrototypeNavigation.ts src/prototype/routeConfig.ts src/tests/navigation.test.tsx
git commit -m "feat: add prototype navigation state"
```

## Task 4: Demo Shell and Before-After Stage

**Files:**

- Modify: `src/App.tsx`
- Create: `src/components/demo/DemoShell.tsx`
- Create: `src/components/demo/NarrativePanel.tsx`
- Create: `src/components/demo/PhoneStage.tsx`
- Create: `src/components/demo/BeforeVideo.tsx`
- Create: `src/components/phone/PhoneFrame.tsx`
- Create: `src/tests/demoShell.test.tsx`

- [ ] **Step 1: Write shell tests**

`src/tests/demoShell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("DemoShell", () => {
  it("renders the three feature chapters", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Trust" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Community Engagement" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Design Accessibility" })).toBeInTheDocument();
  });

  it("manually toggles before and after outside the phone", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText("Replace with recorded before video: Trust friction demo")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "After" }));
    expect(screen.getByTestId("after-prototype-slot")).toBeInTheDocument();
  });

  it("updates narrative copy when feature changes", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Community Engagement" }));
    expect(screen.getByText(/sentence-level annotation reactions/i)).toBeInTheDocument();
    expect(screen.getByText("Replace with recorded before video: Community engagement friction demo")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/tests/demoShell.test.tsx
```

Expected: FAIL because demo shell components do not exist.

- [ ] **Step 3: Implement the demo shell**

`src/App.tsx`:

```tsx
import { DemoShell } from "./components/demo/DemoShell";

export default function App() {
  return <DemoShell />;
}
```

`src/components/demo/DemoShell.tsx`:

```tsx
import { useState } from "react";
import { features } from "../../data/features";
import type { FeatureId } from "../../prototype/routeTypes";
import { NarrativePanel } from "./NarrativePanel";
import { PhoneStage } from "./PhoneStage";

export type CompareMode = "before" | "after";

export function DemoShell() {
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>("trust");
  const [mode, setMode] = useState<CompareMode>("before");
  const activeFeature = features.find((feature) => feature.id === activeFeatureId) ?? features[0];

  return (
    <main className="demo-shell">
      <section className="demo-topbar" aria-label="Soluna prototype navigation">
        <div>
          <p className="eyebrow">Soluna 2.0 Redesign</p>
          <h1>Interactive case-study prototype</h1>
        </div>
        <div className="feature-tabs" aria-label="Feature chapters">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={feature.id === activeFeatureId ? "is-active" : ""}
              onClick={() => {
                setActiveFeatureId(feature.id);
                setMode("before");
              }}
            >
              {feature.title}
            </button>
          ))}
        </div>
      </section>
      <section className="demo-layout">
        <NarrativePanel feature={activeFeature} />
        <PhoneStage feature={activeFeature} mode={mode} onModeChange={setMode} />
      </section>
    </main>
  );
}
```

`src/components/demo/NarrativePanel.tsx`:

```tsx
import type { FeatureChapter } from "../../data/features";

export function NarrativePanel({ feature }: { feature: FeatureChapter }) {
  return (
    <aside className="narrative-panel">
      <p className="eyebrow">{feature.eyebrow}</p>
      <h2>{feature.title}</h2>
      <section>
        <h3>Problem</h3>
        <p>{feature.problem}</p>
      </section>
      <section>
        <h3>Insight</h3>
        <p>{feature.insight}</p>
      </section>
      <section>
        <h3>Redesign Response</h3>
        <ul>
          {feature.redesign.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Prototype Path</h3>
        <p>{feature.prototypePath.join(" -> ")}</p>
      </section>
      <p className="replacement-note">Replace this panel copy with final case-study writing when ready.</p>
    </aside>
  );
}
```

`src/components/demo/BeforeVideo.tsx`:

```tsx
import type { FeatureChapter } from "../../data/features";

export function BeforeVideo({ feature }: { feature: FeatureChapter }) {
  return (
    <div className="before-video" aria-label={`${feature.title} before video replacement`}>
      <div className="video-box">
        <p>{feature.beforeVideoLabel}</p>
        <span>{feature.beforeVideoSrc}</span>
      </div>
    </div>
  );
}
```

`src/components/demo/PhoneStage.tsx`:

```tsx
import type { FeatureChapter } from "../../data/features";
import type { CompareMode } from "./DemoShell";
import { BeforeVideo } from "./BeforeVideo";
import { PhoneFrame } from "../phone/PhoneFrame";

type PhoneStageProps = {
  feature: FeatureChapter;
  mode: CompareMode;
  onModeChange: (mode: CompareMode) => void;
};

export function PhoneStage({ feature, mode, onModeChange }: PhoneStageProps) {
  return (
    <section className="phone-stage" aria-label="Prototype stage">
      <div className="compare-toggle" aria-label="Before and after control">
        <button className={mode === "before" ? "is-active" : ""} onClick={() => onModeChange("before")}>
          Before
        </button>
        <button className={mode === "after" ? "is-active" : ""} onClick={() => onModeChange("after")}>
          After
        </button>
      </div>
      <PhoneFrame>{mode === "before" ? <BeforeVideo feature={feature} /> : <div data-testid="after-prototype-slot">After prototype slot</div>}</PhoneFrame>
      <p className="stage-caption">Manual comparison control stays outside the phone frame.</p>
    </section>
  );
}
```

`src/components/phone/PhoneFrame.tsx`:

```tsx
import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone-frame" aria-label="Interactive phone frame">
      <div className="phone-sensor" aria-hidden="true" />
      <div className="phone-screen">{children}</div>
    </div>
  );
}
```

- [ ] **Step 4: Add shell CSS**

Append to `src/styles.css`:

```css
.demo-shell {
  min-height: 100vh;
  padding: 28px;
}

.demo-topbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  max-width: 1180px;
  margin: 0 auto 24px;
}

.demo-topbar h1,
.narrative-panel h2 {
  margin: 0;
  letter-spacing: 0;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.feature-tabs,
.compare-toggle {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-muted);
}

.feature-tabs button,
.compare-toggle button {
  border: 0;
  border-radius: 999px;
  padding: 10px 14px;
  color: var(--text);
  background: transparent;
}

.feature-tabs button.is-active,
.compare-toggle button.is-active {
  background: var(--surface);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.demo-layout {
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(360px, 1.05fr);
  gap: 36px;
  align-items: start;
  max-width: 1180px;
  margin: 0 auto;
}

.narrative-panel {
  padding: 24px;
}

.narrative-panel section {
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}

.narrative-panel h3 {
  margin: 0 0 8px;
  font-size: 18px;
}

.narrative-panel p,
.narrative-panel li {
  color: #3f3f46;
  line-height: 1.6;
}

.replacement-note,
.stage-caption {
  color: var(--muted);
  font-size: 13px;
}

.phone-stage {
  display: grid;
  justify-items: center;
  gap: 16px;
}

.phone-frame {
  position: relative;
  width: min(390px, 88vw);
  height: min(780px, 78vh);
  min-height: 640px;
  padding: 14px;
  border: 10px solid #111;
  border-radius: 46px;
  background: #111;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.18);
}

.phone-sensor {
  position: absolute;
  top: 16px;
  left: 50%;
  z-index: 2;
  width: 112px;
  height: 28px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #050505;
}

.phone-screen {
  height: 100%;
  overflow: hidden;
  border-radius: 34px;
  background: var(--surface);
}

.before-video,
.video-box {
  display: grid;
  height: 100%;
  place-items: center;
}

.video-box {
  margin: 18px;
  padding: 24px;
  border: 1px dashed #a1a1aa;
  border-radius: 24px;
  background: #f8fafc;
  text-align: center;
}

.video-box p {
  max-width: 240px;
  margin: 0;
  font-weight: 700;
}

.video-box span {
  display: block;
  margin-top: 10px;
  color: var(--muted);
  font-size: 12px;
}

@media (max-width: 860px) {
  .demo-topbar,
  .demo-layout {
    grid-template-columns: 1fr;
  }

  .demo-topbar {
    display: grid;
  }

  .feature-tabs {
    overflow-x: auto;
    max-width: 100%;
  }
}
```

- [ ] **Step 5: Run shell tests and build**

Run:

```bash
npm test -- src/tests/demoShell.test.tsx
npm run build
```

Expected: both commands pass.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/demo src/components/phone/PhoneFrame.tsx src/tests/demoShell.test.tsx src/styles.css
git commit -m "feat: add case study demo shell"
```

## Task 5: Shared Phone UI Primitives

**Files:**

- Create: `src/components/phone/PhoneHeader.tsx`
- Create: `src/components/phone/BottomNav.tsx`
- Create: `src/components/phone/UiPrimitives.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add phone primitives**

`src/components/phone/PhoneHeader.tsx`:

```tsx
import { ArrowLeft, Bell, ShieldAlert, X } from "lucide-react";

type PhoneHeaderProps = {
  title: string;
  left?: "back" | "close" | "safety" | "none";
  right?: "bell" | "none";
  onBack?: () => void;
  onSafety?: () => void;
  onNotifications?: () => void;
};

export function PhoneHeader({ title, left = "back", right = "bell", onBack, onSafety, onNotifications }: PhoneHeaderProps) {
  return (
    <header className="phone-header">
      <button
        aria-label={left === "safety" ? "Open safety" : "Go back"}
        className="icon-button"
        onClick={left === "safety" ? onSafety : onBack}
        disabled={left === "none"}
      >
        {left === "safety" ? <ShieldAlert size={18} /> : left === "close" ? <X size={18} /> : left === "none" ? null : <ArrowLeft size={18} />}
      </button>
      <h2>{title}</h2>
      <button aria-label="Open notifications" className="icon-button" onClick={onNotifications} disabled={right === "none"}>
        {right === "bell" ? <Bell size={18} /> : null}
      </button>
    </header>
  );
}
```

`src/components/phone/BottomNav.tsx`:

```tsx
import { Home, MessageCircle, Users, UserRound } from "lucide-react";
import type { RouteName } from "../../prototype/routeTypes";

const tabs: { route: RouteName; label: string; icon: typeof Home }[] = [
  { route: "home", label: "Home", icon: Home },
  { route: "coach", label: "Coach", icon: MessageCircle },
  { route: "community", label: "Community", icon: Users },
  { route: "profile", label: "Profile", icon: UserRound }
];

export function BottomNav({ activeRoute, onNavigate }: { activeRoute: RouteName; onNavigate: (route: RouteName) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Soluna bottom navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button key={tab.route} className={activeRoute === tab.route ? "is-active" : ""} onClick={() => onNavigate(tab.route)}>
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

`src/components/phone/UiPrimitives.tsx`:

```tsx
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function PhonePage({ children, withBottomNav = false }: { children: ReactNode; withBottomNav?: boolean }) {
  return <div className={withBottomNav ? "phone-page with-bottom-nav" : "phone-page"}>{children}</div>;
}

export function PhoneScroll({ children }: { children: ReactNode }) {
  return <div className="phone-scroll">{children}</div>;
}

export function Section({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="phone-section">
      {(title || action) && (
        <div className="section-heading">
          {title ? <h3>{title}</h3> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag className={`phone-card ${className}`} onClick={onClick}>
      {children}
    </Tag>
  );
}

export function Row({ title, description, onClick }: { title: string; description?: string; onClick?: () => void }) {
  return (
    <button className="phone-row" onClick={onClick}>
      <span>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <ChevronRight size={18} />
    </button>
  );
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button className={active ? "chip is-active" : "chip"} onClick={onClick}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`primary-button ${props.className ?? ""}`} />;
}

export function SecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`secondary-button ${props.className ?? ""}`} />;
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`text-input ${props.className ?? ""}`} />;
}

export function ImageSlot({ label = "Replace with actual image" }: { label?: string }) {
  return (
    <div className="image-slot" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return <div className="sticky-footer">{children}</div>;
}
```

- [ ] **Step 2: Add phone primitive CSS**

Append to `src/styles.css`:

```css
.phone-page {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  background: #fbfbfd;
}

.phone-page.with-bottom-nav {
  grid-template-rows: auto 1fr auto;
}

.phone-header {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  min-height: 64px;
  padding: 18px 12px 8px;
  border-bottom: 1px solid var(--line);
  background: rgba(251, 251, 253, 0.96);
}

.phone-header h2 {
  margin: 0;
  overflow: hidden;
  font-size: 16px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-button {
  display: inline-grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 0;
  border-radius: 999px;
  color: var(--text);
  background: transparent;
}

.icon-button:disabled {
  cursor: default;
  opacity: 0;
}

.phone-scroll {
  min-height: 0;
  overflow-y: auto;
  padding: 14px;
}

.phone-section {
  margin: 0 0 18px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 8px;
}

.section-heading h3 {
  margin: 0;
  font-size: 16px;
}

.phone-card,
.phone-row {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  color: var(--text);
  text-align: left;
}

.phone-card {
  padding: 14px;
}

.phone-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
}

.phone-row small {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  line-height: 1.35;
}

.h-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.chip {
  flex: 0 0 auto;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 12px;
  color: var(--text);
  background: var(--surface);
}

.chip.is-active {
  border-color: var(--strong);
  color: white;
  background: var(--strong);
}

.primary-button,
.secondary-button {
  min-height: 44px;
  border-radius: 14px;
  padding: 0 16px;
  font-weight: 700;
}

.primary-button {
  border: 0;
  color: white;
  background: var(--strong);
}

.secondary-button {
  border: 1px solid var(--line);
  color: var(--text);
  background: var(--surface);
}

.text-input {
  min-height: 44px;
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0 12px;
  background: var(--surface);
}

.image-slot {
  display: grid;
  min-height: 120px;
  place-items: center;
  border: 1px dashed #a1a1aa;
  border-radius: 16px;
  background: #f8fafc;
  color: var(--muted);
  text-align: center;
}

.sticky-footer {
  position: sticky;
  bottom: 0;
  display: grid;
  gap: 8px;
  padding: 12px 14px 18px;
  border-top: 1px solid var(--line);
  background: rgba(251, 251, 253, 0.96);
}

.bottom-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
  background: rgba(251, 251, 253, 0.98);
}

.bottom-nav button {
  display: grid;
  gap: 3px;
  justify-items: center;
  border: 0;
  padding: 8px 4px 10px;
  color: var(--muted);
  background: transparent;
  font-size: 11px;
}

.bottom-nav button.is-active {
  color: var(--strong);
  font-weight: 700;
}
```

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/phone src/styles.css
git commit -m "feat: add phone UI primitives"
```

## Task 6: Prototype Route Renderer and Placeholder Pages

**Files:**

- Create: `src/prototype/SolunaPrototype.tsx`
- Create: `src/pages/PlaceholderPage.tsx`
- Modify: `src/components/demo/PhoneStage.tsx`
- Create: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Write route renderer smoke tests**

`src/tests/phoneFlows.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SolunaPrototype } from "../prototype/SolunaPrototype";

describe("SolunaPrototype", () => {
  it("renders the requested start route", () => {
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    expect(screen.getByRole("heading", { name: "Coach" })).toBeInTheDocument();
  });

  it("navigates between bottom tabs", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    await user.click(screen.getByRole("button", { name: /Community/i }));
    expect(screen.getByRole("heading", { name: "Community" })).toBeInTheDocument();
  });

  it("shows replacement content for unbuilt destinations", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "placeholder", title: "Mini Game Practice" }} />);
    expect(screen.getByText("Mini Game Practice")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Go back" }));
    expect(screen.getByText("Mini Game Practice")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: FAIL because `SolunaPrototype` does not exist.

- [ ] **Step 3: Add minimal route renderer and placeholder page**

`src/pages/PlaceholderPage.tsx`:

```tsx
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { PhonePage, PhoneScroll, Card } from "../components/phone/UiPrimitives";

export function PlaceholderPage({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <PhonePage>
      <PhoneHeader title={title} left="close" right="none" onBack={onBack} />
      <PhoneScroll>
        <Card>
          <h3>{title}</h3>
          <p>This is a low-fidelity destination for the prototype. Replace this with detailed content when the flow is expanded.</p>
        </Card>
      </PhoneScroll>
    </PhonePage>
  );
}
```

`src/prototype/SolunaPrototype.tsx`:

```tsx
import { useEffect } from "react";
import { BottomNav } from "../components/phone/BottomNav";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { PhonePage, PhoneScroll, Card } from "../components/phone/UiPrimitives";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { routeLabels, tabRoutes } from "./routeConfig";
import type { PrototypeRoute } from "./routeTypes";
import { usePrototypeNavigation } from "./usePrototypeNavigation";

function BasicTabPage({ title }: { title: string }) {
  return (
    <>
      <PhoneHeader title={title} left={title === "Home" || title === "Community" ? "safety" : "none"} />
      <PhoneScroll>
        <Card>
          <h3>{title}</h3>
          <p>{title} layout will be filled in the page-group tasks.</p>
        </Card>
      </PhoneScroll>
    </>
  );
}

export function SolunaPrototype({ startRoute }: { startRoute: PrototypeRoute }) {
  const nav = usePrototypeNavigation(startRoute);

  useEffect(() => {
    nav.reset(startRoute);
  }, [startRoute.name]);

  const isTab = tabRoutes.includes(nav.route.name);
  const title = nav.route.title ?? routeLabels[nav.route.name];

  if (nav.route.name === "placeholder") {
    return <PlaceholderPage title={title} onBack={nav.back} />;
  }

  return (
    <PhonePage withBottomNav={isTab}>
      <BasicTabPage title={title} />
      {isTab ? <BottomNav activeRoute={nav.route.name} onNavigate={nav.goTab} /> : null}
    </PhonePage>
  );
}
```

`src/components/demo/PhoneStage.tsx`:

```tsx
import type { FeatureChapter } from "../../data/features";
import { SolunaPrototype } from "../../prototype/SolunaPrototype";
import type { CompareMode } from "./DemoShell";
import { BeforeVideo } from "./BeforeVideo";
import { PhoneFrame } from "../phone/PhoneFrame";

type PhoneStageProps = {
  feature: FeatureChapter;
  mode: CompareMode;
  onModeChange: (mode: CompareMode) => void;
};

export function PhoneStage({ feature, mode, onModeChange }: PhoneStageProps) {
  return (
    <section className="phone-stage" aria-label="Prototype stage">
      <div className="compare-toggle" aria-label="Before and after control">
        <button className={mode === "before" ? "is-active" : ""} onClick={() => onModeChange("before")}>
          Before
        </button>
        <button className={mode === "after" ? "is-active" : ""} onClick={() => onModeChange("after")}>
          After
        </button>
      </div>
      <PhoneFrame>{mode === "before" ? <BeforeVideo feature={feature} /> : <SolunaPrototype startRoute={feature.afterStartRoute} />}</PhoneFrame>
      <p className="stage-caption">Manual comparison control stays outside the phone frame.</p>
    </section>
  );
}
```

- [ ] **Step 4: Run smoke tests**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx src/tests/demoShell.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/prototype/SolunaPrototype.tsx src/pages/PlaceholderPage.tsx src/components/demo/PhoneStage.tsx src/tests/phoneFlows.test.tsx
git commit -m "feat: add phone prototype route shell"
```

## Task 7: Home, Safety, Local Services, Bunny, and Library Pages

**Files:**

- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/SafetyPages.tsx`
- Create: `src/pages/BunnyPages.tsx`
- Create: `src/pages/LibraryPage.tsx`
- Modify: `src/prototype/SolunaPrototype.tsx`
- Modify: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Add flow tests for accessibility chapter**

Append to `src/tests/phoneFlows.test.tsx`:

```tsx
describe("accessibility chapter flows", () => {
  it("opens safety and local services from home", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    await user.click(screen.getByRole("button", { name: "Open safety" }));
    expect(screen.getByRole("heading", { name: "Safety" })).toBeInTheDocument();
    await user.click(screen.getByText("Local services"));
    expect(screen.getByRole("heading", { name: "Local Services" })).toBeInTheDocument();
  });

  it("starts and summarizes a bunny conversation", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    await user.type(screen.getByPlaceholderText(/share your thought/i), "I feel awake and worried");
    await user.click(screen.getByRole("button", { name: "Send to bunny" }));
    expect(screen.getByRole("heading", { name: "Talk to Bunny" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "End conversation" }));
    expect(screen.getByRole("heading", { name: "Conversation Summary" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: FAIL because these pages are still basic shells.

- [ ] **Step 3: Implement the page group**

Use these interaction requirements:

- `HomePage`: header safety button, widget banner, image replacement slot for Bunny, rotating dialogue, Bunny input, practice cards, blog cards, Library button.
- `SafetyPage`: urgent support and local services rows.
- `CrisisPage`: crisis resource list; tapping a number shows a prototype acknowledgement card.
- `LocalServicesPage`: category chips reveal subcategory tags; map replacement area with service marker buttons; marker opens service card.
- `BunnyChatPage`: chat history, message input, reflective Bunny reply, end button.
- `BunnySummaryPage`: emotional journey, insights, next steps, sticky back-home action.
- `LibraryPage`: topic and for-you article cards with progress.

Required component signatures:

```tsx
type PageNav = {
  push: (route: PrototypeRoute) => void;
  back: () => void;
  reset: (route: PrototypeRoute) => void;
};

export function HomePage({ nav }: { nav: PageNav }) {}
export function SafetyPage({ nav }: { nav: PageNav }) {}
export function CrisisPage({ nav }: { nav: PageNav }) {}
export function LocalServicesPage({ nav }: { nav: PageNav }) {}
export function BunnyChatPage({ nav }: { nav: PageNav }) {}
export function BunnySummaryPage({ nav }: { nav: PageNav }) {}
export function LibraryPage({ nav }: { nav: PageNav }) {}
```

Wire these routes in `SolunaPrototype`:

```tsx
if (nav.route.name === "home") return <HomePage nav={nav} />;
if (nav.route.name === "safety") return <SafetyPage nav={nav} />;
if (nav.route.name === "crisis") return <CrisisPage nav={nav} />;
if (nav.route.name === "localServices") return <LocalServicesPage nav={nav} />;
if (nav.route.name === "bunnyChat") return <BunnyChatPage nav={nav} />;
if (nav.route.name === "bunnySummary") return <BunnySummaryPage nav={nav} />;
if (nav.route.name === "library") return <LibraryPage nav={nav} />;
```

- [ ] **Step 4: Run accessibility flow tests**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.tsx src/pages/SafetyPages.tsx src/pages/BunnyPages.tsx src/pages/LibraryPage.tsx src/prototype/SolunaPrototype.tsx src/tests/phoneFlows.test.tsx
git commit -m "feat: add home safety bunny and library flows"
```

## Task 8: Coach and Booking Pages

**Files:**

- Create: `src/pages/CoachPages.tsx`
- Modify: `src/prototype/SolunaPrototype.tsx`
- Modify: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Add coach flow tests**

Append to `src/tests/phoneFlows.test.tsx`:

```tsx
describe("trust chapter coach flows", () => {
  it("books a mocked session through the trust path", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    await user.click(screen.getByRole("button", { name: /Browse All Coaches/i }));
    expect(screen.getByRole("heading", { name: "Find Your Coach" })).toBeInTheDocument();
    await user.click(screen.getByText("Dr. Sarah Chen"));
    expect(screen.getByRole("heading", { name: "Coach Profile" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Check Availability/i }));
    await user.click(screen.getByRole("button", { name: "30" }));
    await user.click(screen.getByRole("button", { name: "11:00 AM" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Text" }));
    await user.click(screen.getByRole("button", { name: "Review & Confirm" }));
    await user.click(screen.getByRole("button", { name: /How is the service free/i }));
    expect(screen.getByText(/state as a public mental health initiative/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm the Session" }));
    expect(screen.getByRole("heading", { name: "Booking Confirmed!" })).toBeInTheDocument();
  });

  it("joins and leaves drop-in waiting room", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    await user.click(screen.getByText("Drop-in Chat"));
    await user.click(screen.getByRole("button", { name: "Join Waiting Room" }));
    expect(screen.getByText("You're in the Waiting Room")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Leave Queue" }));
    expect(screen.getByRole("heading", { name: "Coach" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: FAIL because coach pages are still basic shells.

- [ ] **Step 3: Implement coach page group**

Implement these exported pages in `src/pages/CoachPages.tsx`:

```tsx
export function CoachPage({ nav }: { nav: PageNav }) {}
export function DropInChatPage({ nav }: { nav: PageNav }) {}
export function WaitingRoomPage({ nav }: { nav: PageNav }) {}
export function CoachListPage({ nav }: { nav: PageNav }) {}
export function CoachingQAPage({ nav }: { nav: PageNav }) {}
export function CoachProfilePage({ nav }: { nav: PageNav }) {}
export function SchedulePage({ nav }: { nav: PageNav }) {}
export function SessionFormatPage({ nav }: { nav: PageNav }) {}
export function BookingReviewPage({ nav }: { nav: PageNav }) {}
export function BookingSuccessPage({ nav }: { nav: PageNav }) {}
export function MySessionsPage({ nav }: { nav: PageNav }) {}
```

Required behavior:

- Use `coaches` and `sessions` from `mockContent.ts`.
- Coach page includes drop-in banner, free session card, upcoming session, three recommendation cards, and session history row.
- Full coach list renders every coach and opens profile.
- Coaching QA has three info sections and a one-open-at-a-time FAQ accordion.
- Coach profile has image replacement avatar, bio, focus tags, education/certificates, bookmark toggle, and sticky availability button.
- Schedule has a May 2026 calendar grid, disabled visual states for unavailable days, selectable date `30`, selectable time `11:00 AM`, and Continue button.
- Session format single-selects Video or Text and accepts notes.
- Booking review shows coach, session details, what to expect, expandable funding note, and confirmation button.
- Confirmation success links to My Sessions and Coach.
- Drop-in chat and waiting room match the markdown flow.

Wire these routes in `SolunaPrototype`:

```tsx
if (nav.route.name === "coach") return <CoachPage nav={nav} />;
if (nav.route.name === "dropInChat") return <DropInChatPage nav={nav} />;
if (nav.route.name === "waitingRoom") return <WaitingRoomPage nav={nav} />;
if (nav.route.name === "coachList") return <CoachListPage nav={nav} />;
if (nav.route.name === "coachingQA") return <CoachingQAPage nav={nav} />;
if (nav.route.name === "coachProfile") return <CoachProfilePage nav={nav} />;
if (nav.route.name === "schedule") return <SchedulePage nav={nav} />;
if (nav.route.name === "sessionFormat") return <SessionFormatPage nav={nav} />;
if (nav.route.name === "bookingReview") return <BookingReviewPage nav={nav} />;
if (nav.route.name === "bookingSuccess") return <BookingSuccessPage nav={nav} />;
if (nav.route.name === "mySessions") return <MySessionsPage nav={nav} />;
```

- [ ] **Step 4: Run coach flow tests**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CoachPages.tsx src/prototype/SolunaPrototype.tsx src/tests/phoneFlows.test.tsx
git commit -m "feat: add coach booking flows"
```

## Task 9: Community Pages and Annotation Reactions

**Files:**

- Create: `src/pages/CommunityPages.tsx`
- Modify: `src/prototype/SolunaPrototype.tsx`
- Modify: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Add community flow tests**

Append to `src/tests/phoneFlows.test.tsx`:

```tsx
describe("community chapter flows", () => {
  it("votes in the poll and shows results", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "community" }} />);
    await user.click(screen.getByText("tap to vote"));
    await user.click(screen.getByLabelText("Feeling misunderstood"));
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByText(/Your choice/i)).toBeInTheDocument();
    expect(screen.getByText(/29 responses/i)).toBeInTheDocument();
  });

  it("adds sentence-level support on a post", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "community" }} />);
    await user.click(screen.getByText("I wrote a long post and still felt alone"));
    await user.click(screen.getByText(/nobody responded/i));
    await user.click(screen.getByRole("button", { name: "I hear this" }));
    expect(screen.getByText("1 annotation reaction")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: FAIL because community pages are still basic shells.

- [ ] **Step 3: Implement community page group**

Implement these exports in `src/pages/CommunityPages.tsx`:

```tsx
export function CommunityPage({ nav }: { nav: PageNav }) {}
export function PollPage({ nav }: { nav: PageNav }) {}
export function PostDetailPage({ nav }: { nav: PageNav }) {}
```

Required behavior:

- Community page includes safety icon, title, notification icon, poll banner, search row, `+ Post` button, topic chips, my activity link, pinned post accordion, and post feed.
- Poll page supports single radio choice, disabled Submit before selection, result percentages after submit, and selected-choice highlight.
- Post detail shows title, author, full sentences, reaction row, and annotation reaction controls.
- Annotation interaction: tapping a sentence selects it; tapping `I hear this` adds one sentence-level reaction and displays `1 annotation reaction`.
- Search, `+ Post`, my activity, bookmark, comments, and unsupported destinations route to `placeholder` with meaningful titles.

Wire these routes in `SolunaPrototype`:

```tsx
if (nav.route.name === "community") return <CommunityPage nav={nav} />;
if (nav.route.name === "poll") return <PollPage nav={nav} />;
if (nav.route.name === "postDetail") return <PostDetailPage nav={nav} />;
```

- [ ] **Step 4: Run community tests**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CommunityPages.tsx src/prototype/SolunaPrototype.tsx src/tests/phoneFlows.test.tsx
git commit -m "feat: add community annotation flows"
```

## Task 10: Profile, Settings, App Information, and Remaining Destinations

**Files:**

- Create: `src/pages/ProfilePages.tsx`
- Modify: `src/prototype/SolunaPrototype.tsx`
- Modify: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Add profile tests**

Append to `src/tests/phoneFlows.test.tsx`:

```tsx
describe("profile and remaining destinations", () => {
  it("opens settings and app information subpages", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "profile" }} />);
    await user.click(screen.getByText("Setting"));
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Go back" }));
    await user.click(screen.getByText("App Information"));
    expect(screen.getByRole("heading", { name: "App Information" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: FAIL because profile pages are still basic shells.

- [ ] **Step 3: Implement profile pages**

Implement these exports in `src/pages/ProfilePages.tsx`:

```tsx
export function ProfilePage({ nav }: { nav: PageNav }) {}
export function SettingsPage({ nav }: { nav: PageNav }) {}
export function AppInformationPage({ nav }: { nav: PageNav }) {}
```

Required behavior:

- Profile overview uses an icon-only anonymous avatar and anonymous name such as `Moon Garden`.
- Self assessment card appears near top.
- `About me`, `Setting`, `App Information`, saved Bunny conversations, share card, and bookmarks collections appear.
- Settings subpage shows notification settings, language settings, sign out, deactivate account, support and complaints.
- App Information subpage shows privacy policy, notice of privacy policy, community guidelines, terms of service, Soluna website, contact center and tele-coaching, diagnostics.
- Rows that would open browser links route to `placeholder` with title `External resource acknowledgement`.

Wire these routes in `SolunaPrototype`:

```tsx
if (nav.route.name === "profile") return <ProfilePage nav={nav} />;
if (nav.route.name === "settings") return <SettingsPage nav={nav} />;
if (nav.route.name === "appInformation") return <AppInformationPage nav={nav} />;
```

- [ ] **Step 4: Run full test suite**

Run:

```bash
npm test
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ProfilePages.tsx src/prototype/SolunaPrototype.tsx src/tests/phoneFlows.test.tsx
git commit -m "feat: add profile and remaining destinations"
```

## Task 11: Responsive Polish and E2E Verification

**Files:**

- Create: `e2e/soluna-prototype.spec.ts`
- Modify: `src/styles.css`

- [ ] **Step 1: Add Playwright tests**

`e2e/soluna-prototype.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("desktop shows narrative and phone stage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Interactive case-study prototype")).toBeVisible();
  await expect(page.getByLabel("Interactive phone frame")).toBeVisible();
  await expect(page.getByRole("button", { name: "Before" })).toBeVisible();
  await expect(page.getByRole("button", { name: "After" })).toBeVisible();
});

test("before-after toggle opens the after prototype", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Replace with recorded before video: Trust friction demo")).toBeVisible();
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByRole("heading", { name: "Coach" })).toBeVisible();
});

test("feature tabs reset before video labels", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Community Engagement" }).click();
  await expect(page.getByText("Replace with recorded before video: Community engagement friction demo")).toBeVisible();
  await page.getByRole("button", { name: "Design Accessibility" }).click();
  await expect(page.getByText("Replace with recorded before video: Design accessibility friction demo")).toBeVisible();
});

test("mobile layout keeps controls usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Trust" })).toBeVisible();
  await expect(page.getByRole("button", { name: "After" })).toBeVisible();
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByRole("heading", { name: "Coach" })).toBeVisible();
});
```

- [ ] **Step 2: Run E2E tests to find layout issues**

Run:

```bash
npm run e2e
```

Expected: PASS after browsers are installed. If Playwright reports missing browsers, run `npx playwright install chromium` and rerun `npm run e2e`.

- [ ] **Step 3: Tighten responsive CSS**

Update `src/styles.css` so:

- `.phone-frame` does not exceed viewport height on desktop.
- `.phone-screen` keeps all app content clipped inside rounded corners.
- `.feature-tabs` remains horizontally scrollable on narrow widths.
- `.narrative-panel` uses no nested card styling.
- Buttons and chips have at least 44px touch targets.
- Text inside cards and buttons wraps instead of overflowing.

Use this CSS patch if these rules are not already true:

```css
.phone-card,
.phone-row,
.primary-button,
.secondary-button,
.chip {
  overflow-wrap: anywhere;
}

@media (max-width: 520px) {
  .demo-shell {
    padding: 16px;
  }

  .narrative-panel {
    padding: 8px 0;
  }

  .phone-frame {
    width: min(360px, 94vw);
    height: 720px;
    min-height: 620px;
  }
}
```

- [ ] **Step 4: Run final verification**

Run:

```bash
npm test
npm run build
npm run e2e
```

Expected: all commands pass.

- [ ] **Step 5: Commit**

```bash
git add e2e/soluna-prototype.spec.ts src/styles.css
git commit -m "test: add prototype browser verification"
```

## Task 12: Final Manual Review and Demo Handoff

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Add README**

`README.md`:

```md
# Soluna 2.0 Prototype

Low-fidelity Apple-like case-study demo for the Soluna 2.0 redesign.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## What This Demo Contains

- Three case-study chapters: Trust, Community Engagement, and Design Accessibility.
- Manual Before / After toggle outside the phone frame.
- Before mode uses replacement video slots at `/videos/trust-before.mp4`, `/videos/community-before.mp4`, and `/videos/accessibility-before.mp4`.
- After mode runs an interactive front-end-only phone prototype.
- All images are visible replacement slots labeled `Replace with actual image`.
- All state is mocked in the browser.

## Verification

```bash
npm test
npm run build
npm run e2e
```

## Content Replacement

Edit `src/data/features.ts` for case-study narrative copy and before video paths.
Edit `src/data/mockContent.ts` for coaches, posts, poll content, articles, resources, sessions, and profile rows.
```

- [ ] **Step 2: Start dev server**

Run:

```bash
npm run dev -- --port 4173
```

Expected: Vite serves the app at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Manual smoke path**

In the browser, verify:

- Trust before video replacement is visible on first load.
- Trust After opens Coach.
- Coach booking reaches Booking Confirmed.
- Community tab Before shows community video replacement.
- Community After opens Community and annotation reaction works.
- Design Accessibility Before shows accessibility video replacement.
- Design Accessibility After opens Home and Bunny chat summary works.
- Safety and Local Services open from Home.
- Profile settings and app information open.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add prototype handoff instructions"
```

## Self-Review Checklist

- Spec coverage: all approved pages and subpages are assigned across Tasks 7 through 10.
- Before-after behavior: Task 4 creates manual controls outside the phone; Task 11 verifies them.
- Three features: Task 2 defines the exact three chapters; Task 4 renders them.
- Asset replacement slots: Task 4 covers before videos; Task 5 covers image slots.
- Pure front-end mocked state: all data comes from `src/data/*`; no backend files are planned.
- Apple-like low fidelity: Task 4 and Task 5 establish clean system-font layout, neutral surfaces, simple controls, and restrained phone UI.
- Verification: Tasks 1 through 12 include unit, integration, build, browser, and manual checks.
