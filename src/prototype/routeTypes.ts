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
