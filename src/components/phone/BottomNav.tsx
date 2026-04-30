import { Home, MessageCircle, UserRound, Users } from "lucide-react";
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
