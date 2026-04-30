import { useState } from "react";
import { ArrowRight, Bell, Send, Sparkles } from "lucide-react";
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
  "It's 3 a.m. now, I'm here with you.",
  "How are you feeling right now? I can listen to you.",
  "Your coach session is tomorrow. Want help naming one thing to bring?",
  "There is a new poll if sharing feels easier than writing."
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
        title="Soluna 2.0"
        left="safety"
        onSafety={() => nav.push({ name: "safety" })}
        onNotifications={() => openPlaceholder(nav, "Notifications")}
      />
      <PhoneScroll>
        <Section>
          <Card>
            <div className="inline-between">
              <span>
                <p className="eyebrow">Widget suggestion</p>
                <strong>Add a Soluna widget</strong>
                <small>Keep Bunny, safety, and upcoming coach reminders one tap away.</small>
              </span>
              <Bell size={18} />
            </div>
          </Card>
        </Section>

        <Section title="Space Bunny Buddy">
          <Card onClick={cycleBunnyDialogue}>
            <div className="bunny-stage">
              <div className="bunny-bubble">{bunnyDialogues[bunnyLine]}</div>
              <ImageSlot label="Replace with actual image: Space Bunny illustration" />
            </div>
          </Card>

          <form
            className="bunny-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              sendToBunny();
            }}
          >
            <TextInput
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type in to share your thought with Space Bunny"
              aria-label="Share your thought"
            />
            <PrimaryButton type="submit" aria-label="Send to bunny" disabled={!draft.trim()}>
              <Send size={16} />
              <span>Send</span>
            </PrimaryButton>
          </form>
        </Section>

        <Section title="Mental health practice">
          <div className="h-scroll card-rail">
            {practiceCards.map((practice) => (
              <Card key={practice} onClick={() => openPlaceholder(nav, `${practice} practice`)}>
                <div className="practice-card-content">
                  <Sparkles size={18} />
                  <strong>{practice}</strong>
                  <ArrowRight size={16} />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          title="Blog library"
          action={
            <SecondaryButton type="button" onClick={() => nav.push({ name: "library" })}>
              See all
            </SecondaryButton>
          }
        >
          <Card>
            <div className="inline-between">
              <span>
                <p className="eyebrow">Topics of the week</p>
                <strong>{blogCards.filter((article) => article.read).length}/{blogCards.length} read</strong>
              </span>
              <Sparkles size={18} />
            </div>
            <div className="mini-progress" aria-hidden="true">
              <span style={{ width: `${(blogCards.filter((article) => article.read).length / blogCards.length) * 100}%` }} />
            </div>
          </Card>
          <div className="h-scroll card-rail">
            {blogCards
              .slice()
              .sort((a, b) => Number(a.read) - Number(b.read))
              .map((article) => (
              <Card key={article.id} onClick={() => openPlaceholder(nav, article.title)}>
                <div className="article-card-content">
                  <ImageSlot label={`Replace with actual image: ${article.title} article illustration`} />
                  <strong>{article.title}</strong>
                  <small>{article.type} · {article.readTime}</small>
                  {article.read ? <span className="chip">Read</span> : null}
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
