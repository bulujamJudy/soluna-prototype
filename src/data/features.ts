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
    beforeVideoLabel: "Trust friction before screenshot",
    beforeVideoSrc: "/trust-before.png",
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
    beforeVideoLabel: "Community engagement friction before screenshot",
    beforeVideoSrc: "/community-before.png",
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
    beforeVideoLabel: "Design accessibility friction before screenshot",
    beforeVideoSrc: "/accessibility-before.png",
    afterStartRoute: { name: "home" }
  }
];
