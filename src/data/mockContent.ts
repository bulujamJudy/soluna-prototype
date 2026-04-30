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
