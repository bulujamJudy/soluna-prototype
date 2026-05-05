import { useState } from "react";
import { Check, Lock, MoreHorizontal, Play, Send, Sparkles, X } from "lucide-react";
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

const featuredPracticeCards = practiceCards.slice(0, 2);
const exerciseCards = ["Values", "Startboard", "Let it Out", "Breathwork", "Free Write"];

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
          <Card className="widget-card">
            <div className="inline-between">
              <span>
                <strong>Add a Soluna widget</strong>
                <small>Your daily movement, within reach</small>
              </span>
              <X size={18} aria-label="Dismiss widget suggestion" />
            </div>
            <SecondaryButton type="button" onClick={() => openPlaceholder(nav, "Explore widget")}>
              Explore widget
            </SecondaryButton>
          </Card>
        </Section>

        <Section title="Space Bunny Buddy">
          <Card className="bunny-card" onClick={cycleBunnyDialogue}>
            <div className="bunny-stage">
              <div className="bunny-bubble">{bunnyDialogues[bunnyLine]}</div>
              <img 
                src="/bunny.png" 
                alt="Space Bunny" 
                style={{ width: 150, height: 150, objectFit: "contain" }} 
              />
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
              placeholder="Share your thought with Space Bunny"
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
            {featuredPracticeCards.map((practice) => (
              <Card key={practice} onClick={() => openPlaceholder(nav, `${practice} practice`)}>
                <div className="practice-card-content">
                  <Sparkles size={18} />
                  <strong>{practice}</strong>
                </div>
              </Card>
            ))}
          </div>
          <div className="h-scroll exercise-rail" aria-label="Exercise shortcuts">
            {exerciseCards.map((exercise) => (
              <Card key={exercise} className="exercise-card" onClick={() => openPlaceholder(nav, `${exercise} practice`)}>
                <div className="practice-card-content">
                  <Sparkles size={15} />
                  <strong>{exercise}</strong>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <h3 className="topics-week-title">Topics of the week</h3>
          <Card className="weekly-progress-card">
            <strong>Sleep Awareness</strong>
            <div className="weekly-task-row">
              <span>Read 3 articles</span>
              <div className="mini-progress" aria-label={`${blogCards.filter((article) => article.read).length} of ${blogCards.length} articles read`}>
                <span style={{ width: `${(blogCards.filter((article) => article.read).length / blogCards.length) * 100}%` }} />
                <strong>1/3</strong>
              </div>
            </div>
            <div className="weekly-task-row">
              <span>Join the poll</span>
              <div className="mini-progress" aria-label="1 of 1 poll tasks completed">
                <span style={{ width: "100%" }} />
                <strong className="is-on-progress-fill">1/1</strong>
              </div>
            </div>
          </Card>
          <div className="h-scroll card-rail article-rail">
            {blogCards
              .slice()
              .sort((a, b) => Number(a.read) - Number(b.read))
              .map((article) => (
              <Card key={article.id} className="article-card" onClick={() => openPlaceholder(nav, article.title)}>
                <div className="article-card-content">
                  <div className="article-card-controls" aria-hidden="true">
                    <span className={article.read ? "article-status-dot is-finished" : "article-status-dot"}>
                      {article.read ? <Check size={18} /> : null}
                    </span>
                    <MoreHorizontal size={18} />
                  </div>
                  <ImageSlot label={`Replace with actual image: ${article.title} article illustration`} />
                  <div className="article-card-copy">
                    <span className="article-title-row">
                      <Lock size={16} />
                      <strong>{article.title}</strong>
                    </span>
                    <small className="article-meta-row">
                      <Play size={14} />
                      <span>{article.type}</span>
                    </small>
                    <small>{article.readTime}</small>
                  </div>
                  {article.read ? <span className="chip">Read</span> : null}
                </div>
              </Card>
              ))}
          </div>
          <SecondaryButton type="button" className="see-all-blog-button" onClick={() => nav.push({ name: "library" })}>
            See all Blog
          </SecondaryButton>
        </Section>
      </PhoneScroll>
      <BottomNav activeRoute="home" onNavigate={(routeName) => nav.goTab?.(routeName)} />
    </PhonePage>
  );
}
