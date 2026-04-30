import { BookOpen, Clock3, Sparkles } from "lucide-react";
import { blogCards } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, PhonePage, PhoneScroll, Section } from "../components/phone/UiPrimitives";

type PageNav = {
  push(route: PrototypeRoute): void;
  back(): void;
  reset(route: PrototypeRoute): void;
  goTab?(route: RouteName): void;
  route?: PrototypeRoute;
};

const topicCards = [
  { title: "Sleep", blurb: "Short reads for winding down.", tag: "Quiet" },
  { title: "Stress", blurb: "Simple ways to make the day smaller.", tag: "Reset" },
  { title: "Grounding", blurb: "Quick prompts for when your thoughts speed up.", tag: "Focus" }
];

function openPlaceholder(nav: PageNav, title: string) {
  nav.push({ name: "placeholder", title });
}

export function LibraryPage({ nav }: { nav: PageNav }) {
  const readCount = blogCards.filter((article) => article.read).length;

  return (
    <PhonePage>
      <PhoneHeader title="Library" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section title="Read progress">
          <Card>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
              <span>
                <p className="eyebrow">For you</p>
                <strong>
                  {readCount} of {blogCards.length} read
                </strong>
                <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                  Articles here are light, concrete, and easy to open from a small moment.
                </small>
              </span>
              <Clock3 size={18} />
            </div>
            <div
              aria-hidden="true"
              style={{
                height: 8,
                marginTop: 12,
                borderRadius: 999,
                background: "rgba(148,163,184,.18)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${(readCount / blogCards.length) * 100}%`,
                  height: "100%",
                  background: "var(--strong)"
                }}
              />
            </div>
          </Card>
        </Section>

        <Section title="Topics">
          <div style={{ display: "grid", gap: 10 }}>
            {topicCards.map((topic) => (
              <Card key={topic.title} onClick={() => openPlaceholder(nav, topic.title)}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
                  <span>
                    <strong>{topic.title}</strong>
                    <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                      {topic.blurb}
                    </small>
                  </span>
                  <span className="chip is-active">{topic.tag}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="For you">
          <div style={{ display: "grid", gap: 10 }}>
            {blogCards.map((article) => (
              <Card key={article.id} onClick={() => openPlaceholder(nav, article.title)}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
                  <span>
                    <strong>{article.title}</strong>
                    <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                      {article.type} · {article.readTime}
                    </small>
                  </span>
                  {article.read ? <Sparkles size={18} /> : <BookOpen size={18} />}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}
