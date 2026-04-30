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
