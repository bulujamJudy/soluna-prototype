import { useState } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { blogCards, practiceCards } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";
import { BottomNav } from "../components/phone/BottomNav";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, ImageSlot, PhonePage, PhoneScroll, PrimaryButton, Section, SecondaryButton, TextInput } from "../components/phone/UiPrimitives";

type PageNav = {
  push(route: PrototypeRoute): void;
  back(): void;
  reset(route: PrototypeRoute): void;
  goTab?(route: RouteName): void;
  route?: PrototypeRoute;
};

const bunnyDialogues = [
  "I can stay with this for a moment. What feels loudest right now?",
  "That makes sense to carry. What would be easiest to name next?",
  "You do not need a perfect answer yet. What would help by tonight?",
  "I am hearing a lot at once. What part feels most important to sort first?"
];

function openPlaceholder(nav: PageNav, title: string) {
  nav.push({ name: "placeholder", title });
}

export function HomePage({ nav }: { nav: PageNav }) {
  const [bunnyLine, setBunnyLine] = useState(0);
  const [draft, setDraft] = useState(nav.route?.params?.draft ?? "");

  const cycleBunnyDialogue = () => {
    setBunnyLine((current) => (current + 1) % bunnyDialogues.length);
  };

  const sendToBunny = () => {
    nav.push({
      name: "bunnyChat",
      params: draft.trim() ? { draft: draft.trim() } : undefined
    });
    setDraft("");
  };

  return (
    <PhonePage withBottomNav>
      <PhoneHeader
        title="Home"
        left="safety"
        onSafety={() => nav.push({ name: "safety" })}
        onNotifications={() => openPlaceholder(nav, "Notifications")}
      />
      <PhoneScroll>
        <Section
          title="Today"
          action={
            <SecondaryButton type="button" onClick={() => nav.push({ name: "library" })}>
              See all
            </SecondaryButton>
          }
        >
          <Card>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
              <div>
              <p className="eyebrow">Focus widget</p>
              <h3>Gentle check-in</h3>
              <p>Bunny can help sort the first thought, a useful resource, or a calmer next step.</p>
              </div>
              <Sparkles size={18} />
            </div>
          </Card>
        </Section>

        <Section title="Space Bunny">
          <Card onClick={cycleBunnyDialogue}>
            <ImageSlot label="Space Bunny image placeholder" />
            <div style={{ marginTop: 12 }}>
              <p className="eyebrow">Tap Bunny</p>
              <h3>Reflective prompt</h3>
              <p>{bunnyDialogues[bunnyLine]}</p>
            </div>
          </Card>

          <form
            style={{ display: "grid", gap: 10, marginTop: 10 }}
            onSubmit={(event) => {
              event.preventDefault();
              sendToBunny();
            }}
          >
            <TextInput
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Share your thought..."
              aria-label="Share your thought"
            />
            <PrimaryButton type="submit" aria-label="Send to bunny" disabled={!draft.trim()}>
              Send to bunny
            </PrimaryButton>
          </form>
        </Section>

        <Section title="Practice">
          <div style={{ display: "grid", gap: 10 }}>
            {practiceCards.map((practice) => (
              <Card key={practice} onClick={() => openPlaceholder(nav, `${practice} practice`)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <strong>{practice}</strong>
                  <ArrowRight size={16} />
                </div>
                <p>Open a low-effort practice for this moment.</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Read next">
          <div style={{ display: "grid", gap: 10 }}>
            {blogCards.map((article) => (
              <Card key={article.id} onClick={() => openPlaceholder(nav, article.title)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span>
                    <strong>{article.title}</strong>
                    <small>
                      {article.type} · {article.readTime}
                    </small>
                  </span>
                  {article.read ? <span className="pill">Read</span> : <MessageCircle size={16} />}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </PhoneScroll>
      <BottomNav activeRoute="home" onNavigate={(routeName) => nav.goTab?.(routeName)} />
    </PhonePage>
  );
}
