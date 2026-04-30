import { Bell, UserRound } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "../components/phone/BottomNav";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, PhonePage, PhoneScroll, Row, Section } from "../components/phone/UiPrimitives";
import { profileSections } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";

type PageNav = {
  push: (route: PrototypeRoute) => void;
  back: () => void;
  reset: (route: PrototypeRoute) => void;
  goTab: (route: RouteName) => void;
};

type ProfilePageProps = { nav: PageNav };
type SettingsPageProps = { nav: PageNav };
type AppInformationPageProps = { nav: PageNav };

const appInformationRows = [
  "Privacy Policy",
  "Notice of Privacy Policy",
  "Community Guidelines",
  "Terms of Service",
  "Soluna Website",
  "Contact Center & Tele-coaching",
  "Diagnostics"
];

function goPlaceholder(nav: PageNav, title: string) {
  nav.push({ name: "placeholder", title });
}

export function ProfilePage({ nav }: ProfilePageProps) {
  const [savedIndex, setSavedIndex] = useState(0);

  return (
    <PhonePage withBottomNav>
      <PhoneHeader title="Profile" left="none" right="bell" onNotifications={() => goPlaceholder(nav, "Notifications")} />
      <PhoneScroll>
        <Section>
          <div className="phone-card" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  background: "rgba(0, 120, 255, 0.12)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--strong)",
                  flex: "0 0 auto"
                }}
              >
                <UserRound size={28} />
              </div>
              <div style={{ minWidth: 0 }}>
                <strong>Anonymous</strong>
                <p style={{ margin: "4px 0 0", color: "var(--muted)", lineHeight: 1.45 }}>Private profile, no public name attached.</p>
              </div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Self assessment</span>
                <strong>Today</strong>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Energy</span>
                  <strong>Low</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Stress</span>
                  <strong>Medium</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Support need</span>
                  <strong>Steady</strong>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="About me">
          <Card>
            <p style={{ margin: 0, lineHeight: 1.5, color: "var(--muted)" }}>
              Quiet check-ins, private conversations, and a preference for low-pressure support.
            </p>
          </Card>
        </Section>

        <Section title="Settings">
          <div style={{ display: "grid", gap: 10 }}>
            <Row title="Setting" description="Notifications, language, and account controls" onClick={() => nav.push({ name: "settings" })} />
            <Row title="App Information" description="Privacy, policy, and support details" onClick={() => nav.push({ name: "appInformation" })} />
          </div>
        </Section>

        <Section title="Saved Bunny conversations">
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { title: "Bunny helped me slow down", description: "Saved yesterday" },
              { title: "Conversation about school pressure", description: "Saved this week" },
              { title: "A note to revisit before bed", description: "Saved last month" }
            ].map((item, index) => (
              <button
                key={item.title}
                type="button"
                className="phone-card"
                onClick={() => setSavedIndex(index)}
                style={{
                  display: "grid",
                  gap: 6,
                  textAlign: "left",
                  borderColor: savedIndex === index ? "var(--strong)" : "var(--line)",
                  background: savedIndex === index ? "rgba(0, 120, 255, 0.08)" : "var(--surface)"
                }}
              >
                <strong>{item.title}</strong>
                <span style={{ color: "var(--muted)" }}>{item.description}</span>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Saved tools">
          <div style={{ display: "grid", gap: 10 }}>
            <Row title="Share app" description="Send Soluna to a friend" onClick={() => goPlaceholder(nav, "Share app")} />
            <Row title="Bookmarks" description="Saved posts and resources" onClick={() => goPlaceholder(nav, "Bookmarks")} />
          </div>
        </Section>

        <Section title="Profile quick links">
          <div className="phone-card" style={{ display: "grid", gap: 10 }}>
            {profileSections.map((section) => (
              <div key={section.title} style={{ display: "grid", gap: 6 }}>
                <strong>
                  {section.title === "Setting"
                    ? "Account controls overview"
                    : section.title === "App Information"
                      ? "Policy links overview"
                      : section.title}
                </strong>
                <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.45 }}>{section.rows.join(" • ")}</p>
              </div>
            ))}
          </div>
        </Section>
      </PhoneScroll>
      <BottomNav activeRoute="profile" onNavigate={nav.goTab} />
    </PhonePage>
  );
}

export function SettingsPage({ nav }: SettingsPageProps) {
  return (
    <PhonePage>
      <PhoneHeader title="Settings" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section title="Notifications">
          <div style={{ display: "grid", gap: 10 }}>
            <Row title="Notification settings" description="Push alerts, reminders, and activity updates" onClick={() => goPlaceholder(nav, "Notification settings")} />
          </div>
        </Section>

        <Section title="Language">
          <Row title="Language settings" description="App language and text preferences" onClick={() => goPlaceholder(nav, "Language settings")} />
        </Section>

        <Section title="Account">
          <div style={{ display: "grid", gap: 10 }}>
            <Row title="Sign out" description="End this session on the device" onClick={() => goPlaceholder(nav, "Sign out")} />
            <Row title="Deactivate account" description="Temporarily close access to this profile" onClick={() => goPlaceholder(nav, "Deactivate account")} />
          </div>
        </Section>

        <Section title="Support">
          <Row title="Support and complaints" description="Get help, send feedback, or file a complaint" onClick={() => goPlaceholder(nav, "Support and complaints")} />
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}

export function AppInformationPage({ nav }: AppInformationPageProps) {
  return (
    <PhonePage>
      <PhoneHeader title="App Information" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section title="Information">
          <div style={{ display: "grid", gap: 10 }}>
            {appInformationRows.map((label) => (
              <Row key={label} title={label} description="Open a brief acknowledgement page" onClick={() => goPlaceholder(nav, label)} />
            ))}
          </div>
        </Section>

        <Section>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Bell size={18} />
              <div style={{ minWidth: 0 }}>
                <strong>External links use placeholders here</strong>
                <p style={{ margin: "4px 0 0", color: "var(--muted)", lineHeight: 1.45 }}>
                  This prototype keeps external destinations lightweight and local.
                </p>
              </div>
            </div>
          </Card>
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}
