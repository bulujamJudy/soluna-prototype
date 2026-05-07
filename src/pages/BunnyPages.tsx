import { useState } from "react";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, PhonePage, PhoneScroll, PrimaryButton, SecondaryButton, StickyFooter, TextInput } from "../components/phone/UiPrimitives";

type PageNav = {
  push(route: PrototypeRoute): void;
  back(): void;
  reset(route: PrototypeRoute): void;
  goTab?(route: RouteName): void;
  route?: PrototypeRoute;
};

type ChatMessage = {
  speaker: "user" | "bunny";
  text: string;
};

function reflectiveReply(messageCount: number, input: string) {
  const replies = [
    "That sounds like a lot to hold. What part feels most important right now?",
    "I hear the pressure in that. What would feel a little kinder to ask of yourself?",
    "You do not need to solve everything at once. What is the smallest next step you can see?",
    "That makes sense. What would help this feel 5% easier tonight?"
  ];

  const keyword = input.toLowerCase();
  if (keyword.includes("worried") || keyword.includes("anx")) {
    return "I am hearing worry in that. What part feels most active right now?";
  }
  if (keyword.includes("alone") || keyword.includes("lonely")) {
    return "Feeling alone can be heavy. Who feels safest to reach toward, even a little?";
  }
  return replies[messageCount % replies.length];
}

function goHome(nav: PageNav) {
  if (nav.goTab) {
    nav.goTab("home");
    return;
  }
  nav.reset({ name: "home" });
}

function getSignalLevel(text: string): "green" | "yellow" | "red" {
  const value = text.toLowerCase();
  if (/(hurt myself|suicide|kill myself|self harm|unsafe|danger)/.test(value)) return "red";
  if (/(worried|anx|alone|lonely|stress|pressure|panic|scared|overwhelmed)/.test(value)) return "yellow";
  return "green";
}

function getSignalCopy(signal: "green" | "yellow" | "red") {
  if (signal === "red") return "Suggest safety resources";
  if (signal === "yellow") return "Concerned";
  return "Steady";
}

export function BunnyChatPage({ nav }: { nav: PageNav }) {
  const draft = nav.route?.params?.draft?.trim() ?? "";
  const [input, setInput] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [bunnyMood, setBunnyMood] = useState<"happy" | "listening" | "thinking">("happy");
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    draft
      ? [
          { speaker: "user", text: draft },
          { speaker: "bunny", text: reflectiveReply(0, draft) }
        ]
      : [{ speaker: "bunny", text: "I am here. What feels worth saying first?" }]
  );
  const lastUserMessage = [...messages].reverse().find((message) => message.speaker === "user")?.text ?? "";
  const signal = getSignalLevel(`${lastUserMessage} ${input}`);
  const bunnyExpression =
    signal === "red"
      ? "Space bunny is worry about you."
      : input.trim()
        ? "Space bunny is listening."
        : bunnyMood === "thinking"
          ? "Space bunny is thinking."
          : "Space bunny is happy to listen to you.";

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { speaker: "user", text: trimmed },
      { speaker: "bunny", text: reflectiveReply(current.length, trimmed) }
    ]);
    setBunnyMood("thinking");
    setInput("");
  };

  const endConversation = () => {
    const lastUserMessage = [...messages].reverse().find((message) => message.speaker === "user")?.text ?? "";
    nav.push({
      name: "bunnySummary",
      params: {
        count: String(messages.length),
        last: lastUserMessage
      }
    });
  };

  return (
    <PhonePage>
      <PhoneHeader title="Talk to Bunny" left="back" right="help" onBack={nav.back} onNotifications={() => setHelpOpen((current) => !current)} />
      {helpOpen ? (
        <div className="bunny-help-popover" role="dialog" aria-label="What Bunny does">
          <strong>What Bunny does</strong>
          <p>Bunny is not clinical care. It does not diagnose you or use your data to judge you.</p>
          <p>Bunny listens, reflects patterns, and guides you toward understanding your own emotions.</p>
        </div>
      ) : null}
      <PhoneScroll>
        <section className="bunny-companion-space" aria-label="Space Bunny companion">
          <div className="bunny-space-sky" aria-hidden="true">
            <span className="bunny-space-sun" />
            <span className="bunny-space-hill bunny-space-hill-back" />
            <span className="bunny-space-hill bunny-space-hill-front" />
            <span className="bunny-space-flower bunny-space-flower-left" />
            <span className="bunny-space-flower bunny-space-flower-right" />
          </div>
          <img src="/bunny.png" alt="Space Bunny" className="bunny-space-character" />
          <div className="bunny-expression-card" aria-live="polite">
            {bunnyExpression}
          </div>
        </section>

        <button className="signal-tracker-card" type="button" onClick={() => setTrackerOpen((current) => !current)}>
          <span className="signal-tracker-header">
            <span>
              <strong>Signal tracker</strong>
              <small>Not diagnostic. A gentle read on the conversation tone.</small>
            </span>
            <span className={`signal-pill is-${signal}`}>{getSignalCopy(signal)}</span>
            <ChevronDown size={18} className={trackerOpen ? "is-open" : ""} />
          </span>
          {trackerOpen ? (
            <span className="signal-tracker-body">
              <span><strong>Green</strong> means Bunny is simply listening.</span>
              <span><strong>Yellow</strong> means Bunny noticed concern and may slow the pace.</span>
              <span><strong>Red</strong> means Bunny will suggest safety resources.</span>
            </span>
          ) : null}
        </button>

        <section style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {messages.map((message, index) => (
            <div
              key={`${message.speaker}-${index}-${message.text.slice(0, 8)}`}
              style={{
                display: "flex",
                justifyContent: message.speaker === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={{
                  maxWidth: "86%",
                  padding: "12px 14px",
                  borderRadius: 16,
                  border: "1px solid var(--line)",
                  background: message.speaker === "user" ? "var(--strong)" : "var(--surface)",
                  color: message.speaker === "user" ? "white" : "var(--text)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  {message.speaker === "user" ? (
                    <MessageCircle size={14} />
                  ) : (
                    <img src="/bunny-avatar.png" alt="Bunny avatar" className="bunny-message-avatar" />
                  )}
                  <strong>{message.speaker === "user" ? "You" : "Bunny"}</strong>
                </div>
                <p style={{ marginBottom: 0, lineHeight: 1.45 }}>{message.text}</p>
              </div>
            </div>
          ))}
        </section>

        <StickyFooter>
          <form
            className="bunny-footer-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <TextInput value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a message" aria-label="Type a message" />
            <PrimaryButton type="submit" disabled={!input.trim()} className="bunny-send-button">
              Send
            </PrimaryButton>
          </form>
          <SecondaryButton type="button" onClick={endConversation} style={{ width: "100%" }}>
            End conversation
          </SecondaryButton>
        </StickyFooter>
      </PhoneScroll>
    </PhonePage>
  );
}

export function BunnySummaryPage({ nav }: { nav: PageNav }) {
  const count = nav.route?.params?.count ?? "a few";
  const last = nav.route?.params?.last ?? "you were carrying a lot and wanted one calmer next step";

  return (
    <PhonePage>
      <PhoneHeader title="Conversation Summary" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Card>
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
            <span>
              <p className="eyebrow">Emotional journey</p>
              <strong>{count} turn summary</strong>
              <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                You moved from naming what was heavy toward one manageable next step.
              </small>
            </span>
            <ArrowRight size={18} />
          </div>
        </Card>

        <section style={{ display: "grid", gap: 10, marginTop: 12 }}>
          <Card>
            <strong>What stood out</strong>
            <p style={{ marginBottom: 0, marginTop: 6 }}>
              The last thing you shared was: {last}. Bunny would treat that as a clue for what deserves care, not as a diagnosis.
            </p>
          </Card>
          <Card>
            <strong>Insights</strong>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
              <li>You were looking for a steadier first step.</li>
              <li>Small language felt easier than a full solution.</li>
              <li>Support worked best when it stayed concrete and kind.</li>
            </ul>
          </Card>
          <Card>
            <strong>Next steps</strong>
            <ol className="next-step-list">
              <li><span>Check the library for a short read</span></li>
              <li><span>Open Safety if the feeling grows sharper</span></li>
              <li><span>Try one practice card for a reset</span></li>
            </ol>
          </Card>
        </section>

        <StickyFooter>
          <PrimaryButton type="button" onClick={() => goHome(nav)} style={{ width: "100%" }}>
            Back to home
          </PrimaryButton>
        </StickyFooter>
      </PhoneScroll>
    </PhonePage>
  );
}
