import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  HeartHandshake,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Video,
  FileText,
  Users,
  Wallet,
  CalendarRange,
  type LucideIcon
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { coaches, sessions } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";
import { BottomNav } from "../components/phone/BottomNav";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, ImageSlot, PhonePage, PhoneScroll, PrimaryButton, Section, SecondaryButton, StickyFooter } from "../components/phone/UiPrimitives";

type CoachNav = {
  push: (route: PrototypeRoute) => void;
  back: () => void;
  reset: (route: PrototypeRoute) => void;
  goTab?: (route: RouteName) => void;
};

type PageProps = {
  nav: CoachNav;
};

type FAQItem = {
  question: string;
  answer: string;
};

const coachHistory = [
  { date: "May 2", note: "Short check-in about school pressure." },
  { date: "Apr 25", note: "Practiced a reset for a rough family moment." }
];

const faqs: FAQItem[] = [
  {
    question: "What would a coaching session look like?",
    answer: "A coach starts by asking what has been on your mind, then helps you sort one useful next step. No perfect agenda required."
  },
  {
    question: "How do I book a session?",
    answer: "Browse coaches, choose a time that works, pick video or text, then review the details before confirming."
  },
  {
    question: "Is my conversation private?",
    answer: "Your data stays with Soluna. The service does not sell information or share it with third parties."
  },
  {
    question: "What is Drop-in Chat?",
    answer: "Drop-in Chat lets you join a short waiting room and connect with the next available coach without an appointment."
  },
  {
    question: "Can I cancel or reschedule?",
    answer: "Yes. You can manage upcoming sessions from My Sessions."
  },
  {
    question: "How do I choose the right coach?",
    answer: "Use focus areas, languages, pronouns, and availability to find someone who feels like a good fit. You can switch later."
  },
  {
    question: "What are the office hours?",
    answer: "Coaching is available from 9:00 AM to 10:00 PM. Bunny remains available after hours for reflection and resource guidance."
  }
];

const may2026Weeks = [
  ["", "", "", "", "1", "2", "3"],
  ["4", "5", "6", "7", "8", "9", "10"],
  ["11", "12", "13", "14", "15", "16", "17"],
  ["18", "19", "20", "21", "22", "23", "24"],
  ["25", "26", "27", "28", "29", "30", "31"]
];

function route(route: RouteName): PrototypeRoute {
  return { name: route };
}

function CoachAvatar({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "linear-gradient(180deg, #f3f4f6, #e5e7eb)",
        display: "grid",
        placeItems: "center",
        color: "#6b7280",
        fontSize: 12,
        fontWeight: 700
      }}
    >
      {name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")}
    </div>
  );
}

function MetaLine({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13 }}>
      <Icon size={14} />
      <span>{children}</span>
    </div>
  );
}

function PageFrame({ title, nav, left = "back", right = "bell", children, withBottomNav = false }: { title: string; nav: CoachNav; left?: "back" | "close" | "safety" | "none"; right?: "bell" | "none"; children: ReactNode; withBottomNav?: boolean }) {
  return (
    <PhonePage withBottomNav={withBottomNav}>
      <PhoneHeader title={title} left={left} right={right} onBack={nav.back} />
      <PhoneScroll>{children}</PhoneScroll>
      {withBottomNav ? <BottomNav activeRoute="coach" onNavigate={(routeName) => nav.goTab?.(routeName)} /> : null}
    </PhonePage>
  );
}

export function CoachPage({ nav }: PageProps) {
  return (
    <PageFrame title="Coach" nav={nav} left="none" withBottomNav>
      <Section>
        <Card>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "grid", gap: 4 }}>
                <strong>Drop-in support</strong>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>
                  A free, low-pressure place to check in when you do not want to wait for a full booking.
                </span>
              </div>
              <Sparkles size={18} />
            </div>
            <PrimaryButton onClick={() => nav.push(route("dropInChat"))}>Drop-in Chat</PrimaryButton>
          </div>
        </Card>
      </Section>

      <Section title="Free session">
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <MetaLine icon={CalendarRange}>One free starter session is ready whenever you want to book it.</MetaLine>
            <MetaLine icon={MessageCircleMore}>Pick a coach, join a waiting room, or learn how coaching works first.</MetaLine>
            <SecondaryButton onClick={() => nav.push(route("coachingQA"))}>How coaching works</SecondaryButton>
          </div>
        </Card>
      </Section>

      <Section title="Upcoming session">
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "grid", gap: 4 }}>
                <strong>{sessions[0].coach}</strong>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>{sessions[0].topic}</span>
              </div>
              <BadgeCheck size={18} />
            </div>
            <MetaLine icon={CalendarDays}>{sessions[0].date}</MetaLine>
            <MetaLine icon={Clock3}>{sessions[0].time}</MetaLine>
          </div>
        </Card>
      </Section>

      <Section
        title="Coaches"
        action={
          <SecondaryButton onClick={() => nav.push(route("coachList"))} style={{ minHeight: 36, padding: "0 12px" }}>
            Browse All Coaches
          </SecondaryButton>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          {coaches.map((coach) => (
            <Card key={coach.id}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <CoachAvatar name={coach.name} />
                  <div style={{ minWidth: 0, flex: 1, display: "grid", gap: 4 }}>
                    <strong>{coach.name}</strong>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{coach.label}</span>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{coach.credentials}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {coach.tags.map((tag) => (
                    <span key={tag} className="chip" style={{ pointerEvents: "none" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <SecondaryButton onClick={() => nav.push(route("coachProfile"))}>View profile</SecondaryButton>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Session history">
        <div style={{ display: "grid", gap: 10 }}>
          {coachHistory.map((item) => (
            <Card key={item.date}>
              <div style={{ display: "grid", gap: 6 }}>
                <strong>{item.date}</strong>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>{item.note}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}

export function DropInChatPage({ nav }: PageProps) {
  return (
    <PageFrame title="Drop-in Chat" nav={nav} left="back">
      <Section>
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "grid", gap: 4 }}>
                <strong>Waiting room is open soon</strong>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>A coach will join once you are in the queue.</span>
              </div>
              <HeartHandshake size={18} />
            </div>
            <MetaLine icon={Users}>Anonymous and low-pressure. You can leave any time.</MetaLine>
            <PrimaryButton onClick={() => nav.push(route("waitingRoom"))}>Join Waiting Room</PrimaryButton>
          </div>
        </Card>
      </Section>

      <Section title="What to expect">
        <Card>
          <div style={{ display: "grid", gap: 10 }}>
            <MetaLine icon={ShieldCheck}>You do not need the perfect words to start.</MetaLine>
            <MetaLine icon={FileText}>The coach will ask what feels most useful right now.</MetaLine>
            <MetaLine icon={Clock3}>Drop-ins are brief, practical, and easy to pause.</MetaLine>
          </div>
        </Card>
      </Section>
    </PageFrame>
  );
}

export function WaitingRoomPage({ nav }: PageProps) {
  return (
    <PageFrame title="Waiting Room" nav={nav} left="close">
      <Section>
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <strong>You're in the Waiting Room</strong>
            <MetaLine icon={Clock3}>Estimated wait: about 4 minutes</MetaLine>
            <MetaLine icon={Users}>2 people ahead of you</MetaLine>
            <div style={{ display: "flex", gap: 10 }}>
              <CoachAvatar name="Coach" />
              <div style={{ display: "grid", gap: 4 }}>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>A coach is preparing to join.</span>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>You can leave the queue and return to Coach at any time.</span>
              </div>
            </div>
            <SecondaryButton onClick={() => nav.reset(route("coach"))}>Leave Queue</SecondaryButton>
          </div>
        </Card>
      </Section>

      <Section title="Try this while you wait">
        <div style={{ display: "grid", gap: 10 }}>
          <Card>
            <MetaLine icon={Sparkles}>Name the one thing you want help with first.</MetaLine>
          </Card>
          <Card>
            <MetaLine icon={MessageCircleMore}>A short sentence is enough for the coach to start.</MetaLine>
          </Card>
        </div>
      </Section>
    </PageFrame>
  );
}

export function CoachListPage({ nav }: PageProps) {
  return (
    <PageFrame title="Find Your Coach" nav={nav} left="back">
      <Section title="Pick a coach">
        <div style={{ display: "grid", gap: 12 }}>
          {coaches.map((coach) => (
            <Card key={coach.id} onClick={() => nav.push(route("coachProfile"))}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <CoachAvatar name={coach.name} />
                  <div style={{ minWidth: 0, flex: 1, display: "grid", gap: 4 }}>
                    <strong>{coach.name}</strong>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{coach.pronouns}</span>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{coach.bio}</span>
                  </div>
                </div>
                <MetaLine icon={CalendarDays}>Next opening: {coach.availability}</MetaLine>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>Tap to open profile</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}

export function CoachingQAPage({ nav }: PageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const trustSections = [
    {
      title: "Who pays for this?",
      body:
        "This service is entirely free and funded by the state as a public mental health initiative for Californians aged 13-25. You do not need to provide insurance information or payment information. No ads, no data harvesting."
    },
    {
      title: "Who runs it?",
      body: "Soluna is operated by California Mental Health Services, a public health agency. This is a government-backed service."
    },
    {
      title: "Your privacy",
      body: "Your data stays with us. We do not sell information or share it with third parties."
    }
  ];

  return (
    <PageFrame title="About Coaching" nav={nav} left="back">
      <Section>
        <p className="subtle-copy">Common questions about scheduling and coaching sessions</p>
      </Section>

      <Section title="Trust signals">
        <div style={{ display: "grid", gap: 10 }}>
          {trustSections.map((section) => (
            <div key={section.title} className="info-block">
              <strong>{section.title}</strong>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="FAQ">
        <div style={{ display: "grid", gap: 10 }}>
          {faqs.map((item, index) => {
            const open = openFaq === index;
            return (
              <Card key={item.question}>
                <button
                  className="phone-row"
                  style={{ border: 0, padding: 0, background: "transparent" }}
                  onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                >
                  <span>
                    <strong>{item.question}</strong>
                    {open ? <small>{item.answer}</small> : <small>Tap to read more.</small>}
                  </span>
                  <ChevronDown size={18} style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 140ms ease" }} />
                </button>
              </Card>
            );
          })}
        </div>
      </Section>
    </PageFrame>
  );
}

export function CoachProfilePage({ nav }: PageProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const coach = coaches[0];

  return (
    <PageFrame title="Coach Profile" nav={nav} left="back">
      <Section>
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <ImageSlot label="Coach avatar" />
                <div style={{ display: "grid", gap: 4 }}>
                  <strong>{coach.name}</strong>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{coach.credentials}</span>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{coach.pronouns}</span>
                </div>
              </div>
              <SecondaryButton onClick={() => setBookmarked((current) => !current)} aria-label={bookmarked ? "Remove bookmark" : "Bookmark coach"} style={{ minHeight: 36, width: 44, padding: 0 }}>
                {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </SecondaryButton>
            </div>

            <p style={{ margin: 0, color: "var(--text)", lineHeight: 1.5 }}>{coach.bio}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {coach.tags.map((tag) => (
                <span key={tag} className="chip" style={{ pointerEvents: "none" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Focus">
        <div style={{ display: "grid", gap: 10 }}>
          <Card>
            <MetaLine icon={GraduationCap}>Training: counseling graduate and youth mental health focus.</MetaLine>
          </Card>
          <Card>
            <MetaLine icon={BadgeCheck}>Certificates: CCPA certification, youth support workshops, active listening practice.</MetaLine>
          </Card>
        </div>
      </Section>

      <Section title="How I work">
        <Card>
          <div style={{ display: "grid", gap: 10 }}>
            <MetaLine icon={MessageCircleMore}>Practical conversations, clear next steps, and calm pacing.</MetaLine>
            <MetaLine icon={ShieldCheck}>You can bring the messy version. The session will still make sense.</MetaLine>
          </div>
        </Card>
      </Section>

      <StickyFooter>
        <PrimaryButton onClick={() => nav.push(route("schedule"))}>Check Availability</PrimaryButton>
      </StickyFooter>
    </PageFrame>
  );
}

export function SchedulePage({ nav }: PageProps) {
  const [selectedDay, setSelectedDay] = useState("30");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"];

  return (
    <PageFrame title="Schedule" nav={nav} left="back">
      <Section>
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <strong>May 2026</strong>
              <CalendarDays size={18} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, fontSize: 11, color: "var(--muted)" }}>
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={`${day}-${index}`} style={{ textAlign: "center" }}>
                  {day}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
              {may2026Weeks.flatMap((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const active = day === selectedDay;
                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}-${day || "blank"}`}
                      onClick={() => day && setSelectedDay(day)}
                      disabled={!day}
                      style={{
                        minHeight: 38,
                        borderRadius: 12,
                        border: "1px solid var(--line)",
                        background: active ? "var(--strong)" : "var(--surface)",
                        color: active ? "#fff" : day ? "var(--text)" : "transparent",
                        opacity: day ? 1 : 0.35
                      }}
                    >
                      {day}
                    </button>
                  );
                })
              )}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>Selected May {selectedDay}, 2026</div>
          </div>
        </Card>
      </Section>

      <Section title="Time">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
          {times.map((time) => (
            <button
              key={time}
              className={selectedTime === time ? "chip is-active" : "chip"}
              onClick={() => setSelectedTime(time)}
              style={{ minHeight: 44 }}
            >
              {time}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>Selected time: {selectedTime}</div>
      </Section>

      <StickyFooter>
        <PrimaryButton onClick={() => nav.push(route("sessionFormat"))}>Continue</PrimaryButton>
      </StickyFooter>
    </PageFrame>
  );
}

export function SessionFormatPage({ nav }: PageProps) {
  const [format, setFormat] = useState<"video" | "text">("video");
  const [notes, setNotes] = useState("");

  return (
    <PageFrame title="How would you like to connect?" nav={nav} left="back">
      <Section title="Choose one">
        <div style={{ display: "grid", gap: 10 }}>
          <button
            aria-label="Video"
            className={format === "video" ? "phone-card" : "phone-card"}
            onClick={() => setFormat("video")}
            style={{
              textAlign: "left",
              borderColor: format === "video" ? "var(--strong)" : "var(--line)",
              background: format === "video" ? "#f8fafc" : "var(--surface)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
              <div style={{ display: "grid", gap: 6 }}>
                <strong>Video</strong>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>Face-to-face over a secure call.</span>
              </div>
              <Video size={18} />
            </div>
          </button>

          <button
            aria-label="Text"
            className={format === "text" ? "phone-card" : "phone-card"}
            onClick={() => setFormat("text")}
            style={{
              textAlign: "left",
              borderColor: format === "text" ? "var(--strong)" : "var(--line)",
              background: format === "text" ? "#f8fafc" : "var(--surface)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
              <div style={{ display: "grid", gap: 6 }}>
                <strong>Text</strong>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>Chat through the session at a steady pace.</span>
              </div>
              <FileText size={18} />
            </div>
          </button>
        </div>
      </Section>

      <Section title="Notes for the coach">
        <Card>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            placeholder="Anything you want the coach to know before the session?"
            style={{
              width: "100%",
              border: 0,
              outline: "none",
              resize: "vertical",
              background: "transparent"
            }}
          />
        </Card>
      </Section>

      <StickyFooter>
        <PrimaryButton onClick={() => nav.push(route("bookingReview"))}>Review & Confirm</PrimaryButton>
      </StickyFooter>
    </PageFrame>
  );
}

export function BookingReviewPage({ nav }: PageProps) {
  const [fundingOpen, setFundingOpen] = useState(false);

  return (
    <PageFrame title="Confirm Booking" nav={nav} left="back">
      <Section title="Review">
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <MetaLine icon={CheckCircle2}>Coach: Dr. Sarah Chen</MetaLine>
            <MetaLine icon={CalendarDays}>May 30, 2026 at 11:00 AM</MetaLine>
            <MetaLine icon={Video}>Video session</MetaLine>
          </div>
        </Card>
      </Section>

      <Section title="Trust and cost">
        <div style={{ display: "grid", gap: 10 }}>
          <Card>
            <div style={{ display: "grid", gap: 10 }}>
              <MetaLine icon={ShieldCheck}>Private session details stay inside the app.</MetaLine>
              <MetaLine icon={Wallet}>No charge today. This session is covered by your plan.</MetaLine>
              <MetaLine icon={Clock3}>You can reschedule or cancel from My Sessions.</MetaLine>
            </div>
          </Card>

          <Card>
            <button
              className="phone-row"
              style={{ border: 0, padding: 0, background: "transparent" }}
              onClick={() => setFundingOpen((current) => !current)}
            >
              <span>
                <strong>How is the service free?</strong>
                <small>{fundingOpen ? "Expanded funding details are shown below." : "Tap to see how this visit is funded."}</small>
              </span>
              <ChevronDown size={18} style={{ transform: fundingOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 140ms ease" }} />
            </button>
            {fundingOpen ? (
              <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.5 }}>
                This service is entirely free and funded by the state as a public mental health initiative for Californians aged 13-25. You do not need to provide insurance information or payment information.
              </p>
            ) : null}
          </Card>
        </div>
      </Section>

      <StickyFooter>
        <PrimaryButton onClick={() => nav.push(route("bookingSuccess"))}>Confirm the Session</PrimaryButton>
      </StickyFooter>
    </PageFrame>
  );
}

export function BookingSuccessPage({ nav }: PageProps) {
  return (
    <PageFrame title="Booking Confirmed!" nav={nav} left="close">
      <Section>
        <Card>
          <div style={{ display: "grid", gap: 12 }}>
            <CheckCircle2 size={28} />
            <strong>Your session is booked</strong>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>May 30, 2026 at 11:00 AM with Dr. Sarah Chen.</span>
          </div>
        </Card>
      </Section>

      <Section title="Next steps">
        <div style={{ display: "grid", gap: 10 }}>
          <SecondaryButton onClick={() => nav.push(route("mySessions"))}>Go to My Sessions</SecondaryButton>
          <SecondaryButton onClick={() => nav.goTab?.("coach")}>Back to Coach</SecondaryButton>
        </div>
      </Section>
    </PageFrame>
  );
}

export function MySessionsPage({ nav }: PageProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const upcoming = useMemo(
    () => [
      { title: "Dr. Sarah Chen", time: "May 30, 2026 · 11:00 AM", status: "Video" },
      { title: "Jordan Lee", time: "Jun 5, 2026 · 2:00 PM", status: "Text" }
    ],
    []
  );
  const past = useMemo(
    () => [
      { title: "Dr. Sarah Chen", time: "Apr 25, 2026 · 9:00 AM", status: "Finished" },
      { title: "Emma Rodriguez", time: "Apr 11, 2026 · 2:00 PM", status: "Finished" }
    ],
    []
  );

  const items = tab === "upcoming" ? upcoming : past;

  return (
    <PageFrame title="My Sessions" nav={nav} left="back">
      <Section>
        <div style={{ display: "inline-flex", gap: 4, padding: 4, border: "1px solid var(--line)", borderRadius: 999, background: "var(--surface-muted)" }}>
          <button className={tab === "upcoming" ? "chip is-active" : "chip"} onClick={() => setTab("upcoming")}>
            Upcoming
          </button>
          <button className={tab === "past" ? "chip is-active" : "chip"} onClick={() => setTab("past")}>
            Past
          </button>
        </div>
      </Section>

      <Section title={tab === "upcoming" ? "Upcoming" : "Past"}>
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((item) => (
            <Card key={`${item.title}-${item.time}`}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                  <div style={{ display: "grid", gap: 4 }}>
                    <strong>{item.title}</strong>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{item.time}</span>
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{item.status}</span>
                </div>
                {tab === "upcoming" ? (
                  <div style={{ display: "grid", gap: 8 }}>
                    <SecondaryButton>Reschedule</SecondaryButton>
                    <SecondaryButton>Cancel</SecondaryButton>
                  </div>
                ) : (
                  <MetaLine icon={CheckCircle2}>Completed and ready to revisit if you want another session.</MetaLine>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}
