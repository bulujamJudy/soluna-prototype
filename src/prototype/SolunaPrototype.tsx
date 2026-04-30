import { useEffect } from "react";
import {
  BookingReviewPage,
  BookingSuccessPage,
  CoachListPage,
  CoachPage,
  CoachProfilePage,
  CoachingQAPage,
  DropInChatPage,
  MySessionsPage,
  SchedulePage,
  SessionFormatPage,
  WaitingRoomPage
} from "../pages/CoachPages";
import { CommunityPage, PollPage, PostDetailPage } from "../pages/CommunityPages";
import { BunnyChatPage, BunnySummaryPage } from "../pages/BunnyPages";
import { HomePage } from "../pages/HomePage";
import { LibraryPage } from "../pages/LibraryPage";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { AppInformationPage, ProfilePage, SettingsPage } from "../pages/ProfilePages";
import { CrisisPage, LocalServicesPage, SafetyPage } from "../pages/SafetyPages";
import { routeLabels } from "./routeConfig";
import type { PrototypeRoute } from "./routeTypes";
import { usePrototypeNavigation } from "./usePrototypeNavigation";

export function SolunaPrototype({ startRoute }: { startRoute: PrototypeRoute }) {
  const nav = usePrototypeNavigation(startRoute);

  useEffect(() => {
    nav.reset(startRoute);
  }, [startRoute.name]);

  const title = nav.route.title ?? routeLabels[nav.route.name];

  if (nav.route.name === "placeholder") {
    return <PlaceholderPage title={title} onBack={nav.back} />;
  }

  if (nav.route.name === "home") return <HomePage nav={nav} />;
  if (nav.route.name === "safety") return <SafetyPage nav={nav} />;
  if (nav.route.name === "crisis") return <CrisisPage nav={nav} />;
  if (nav.route.name === "localServices") return <LocalServicesPage nav={nav} />;
  if (nav.route.name === "bunnyChat") return <BunnyChatPage nav={nav} />;
  if (nav.route.name === "bunnySummary") return <BunnySummaryPage nav={nav} />;
  if (nav.route.name === "library") return <LibraryPage nav={nav} />;

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

  if (nav.route.name === "community") return <CommunityPage nav={nav} />;
  if (nav.route.name === "poll") return <PollPage nav={nav} />;
  if (nav.route.name === "postDetail") return <PostDetailPage nav={nav} />;

  if (nav.route.name === "profile") return <ProfilePage nav={nav} />;
  if (nav.route.name === "settings") return <SettingsPage nav={nav} />;
  if (nav.route.name === "appInformation") return <AppInformationPage nav={nav} />;

  return <PlaceholderPage title={title} onBack={nav.back} />;
}
