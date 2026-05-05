import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  HeartHandshake,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Video,
  FileText,
  Users,
  Wallet,
  ChevronRight,
  type LucideIcon
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { coaches, sessions } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";
import { BottomNav } from "../components/phone/BottomNav";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, PhonePage, PhoneScroll, PrimaryButton, Section, SecondaryButton, StickyFooter } from "../components/phone/UiPrimitives";

type CoachNav = {
  route?: PrototypeRoute;
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

function PageFrame({
  title,
  nav,
  left = "back",
  right = "bell",
  children,
  withBottomNav = false,
  onBack
}: {
  title: string;
  nav: CoachNav;
  left?: "back" | "close" | "safety" | "none";
  right?: "bell" | "none";
  children: ReactNode;
  withBottomNav?: boolean;
  onBack?: () => void;
}) {
  return (
    <PhonePage withBottomNav={withBottomNav}>
      <PhoneHeader title={title} left={left} right={right} onBack={onBack ?? nav.back} />
      <PhoneScroll>{children}</PhoneScroll>
      {withBottomNav ? <BottomNav activeRoute="coach" onNavigate={(routeName) => nav.goTab?.(routeName)} /> : null}
    </PhonePage>
  );
}

export function CoachPage({ nav }: PageProps) {
  const coachRows = [
    {
      label: "Your Regular Coach",
      name: "Emma Rodriguez",
      languages: "En · Cn · Es",
      tags: ["Family", "Relationships"],
      icon: "avatar"
    },
    {
      label: "Most Matched New Coach",
      name: "Michael Torres",
      languages: "En · Es",
      tags: ["Self-Esteem", "Confidence"],
      icon: "star",
      emphasized: true
    },
    {
      label: "Recent Available Coach",
      name: "Dr. Sarah Chen",
      languages: "En · Cn",
      tags: ["Anxiety", "Stress"],
      icon: "sparkles"
    }
  ];

  return (
    <PageFrame title="Chat with a Coach" nav={nav} left="none" withBottomNav>
      <h1 className="sr-only">Coach</h1>
      <button className="coach-dropin-row" onClick={() => nav.push(route("dropInChat"))}>
        <span className="coach-icon-tile">
          <MessageCircleMore size={22} />
        </span>
        <span className="coach-row-copy">
          <strong>Drop-in Chat</strong>
          <small>Join the waiting room and talk with the next available coach</small>
          <span className="coach-status-line">
            <span className="status-dot" />
            <span>Open</span>
            <span>·</span>
            <span>1 person in line</span>
          </span>
        </span>
        <ChevronRight size={20} />
      </button>

      <Section>
        <div className="coach-booking-hero">
          <div className="coach-hero-art" aria-hidden="true">
            <span className="coach-window coach-window-main" />
            <span className="coach-window coach-window-small" />
          </div>
          <h3>Book a Free Session</h3>
          <p>Book free sessions with caring coaches who understand you. Free, forever.</p>
          <small>Office Hours: 9:00 AM - 10:00 PM</small>
          <PrimaryButton onClick={() => nav.push(route("coachList"))}>Browse All Coaches</PrimaryButton>
          <button className="coach-learn-more" onClick={() => nav.push(route("coachingQA"))}>
            Learn more about Coaching
          </button>
        </div>
      </Section>

      <button className="coach-line-card" onClick={() => nav.push(route("mySessions"))}>
        <span className="coach-icon-tile is-strong">
          <CalendarDays size={22} />
        </span>
        <span className="coach-row-copy">
          <strong>Upcoming Session</strong>
          <small>{sessions[0].coach} · Feb 26 at 3:00 PM</small>
        </span>
        <ChevronRight size={20} />
      </button>

      <div className="coach-list-card">
        {coachRows.map((coach) => (
          <button key={coach.label} className="coach-list-row" onClick={() => nav.push(route("coachProfile"))}>
            <span className="coach-icon-tile">
              {coach.icon === "star" ? <Sparkles size={22} /> : coach.icon === "sparkles" ? <Sparkles size={22} /> : null}
            </span>
            <span className="coach-row-copy">
              <strong>{coach.label}</strong>
              <small>{coach.name} <span>|</span> {coach.languages}</small>
              <span className="coach-tag-row">
                {coach.tags.map((tag) => (
                  <span key={tag} className={coach.emphasized ? "coach-tag is-strong" : "coach-tag"}>{tag}</span>
                ))}
              </span>
            </span>
            <ChevronRight size={20} />
          </button>
        ))}
      </div>

      <button className="coach-history-row" onClick={() => nav.push({ name: "mySessions", params: { tab: "past" } })}>
        <strong>Session History</strong>
        <ChevronRight size={20} />
      </button>
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
  const coachInitials = coach.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <PageFrame title="Coach Profile" nav={nav} left="back">
      <div className="coach-profile-page">
      <section className="coach-profile-hero">
        <SecondaryButton onClick={() => setBookmarked((current) => !current)} aria-label={bookmarked ? "Remove bookmark" : "Bookmark coach"} className="coach-profile-bookmark">
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </SecondaryButton>
        <div className="coach-profile-avatar" aria-hidden="true">{coachInitials}</div>
        <h3>{coach.name}</h3>
        <p>{coach.pronouns}</p>
        <div className="coach-profile-meta">
          <span>Hispanic/Latina</span>
          <span>English</span>
          <span>Mandarin</span>
          <span>Spanish</span>
          <span>30-40</span>
        </div>
        <p className="coach-next-available">Next available: Thursday 10:00am</p>
      </section>

      <section className="coach-profile-summary">
        <Card className="coach-bio-card">
          I help students navigate stress, big transitions, and figuring out what comes next. My approach is warm and conversational — I believe the best breakthroughs happen when you feel comfortable being yourself.
        </Card>
        <h3 className="coach-profile-label">Specializes in</h3>
        <div className="coach-specialty-row">
          {["Academic stress", "Life transitions", "Identity", "Family", "Relationships", "Self-Esteem", "Confidence"].map((tag, index) => (
            <span key={tag} className={index < 3 ? "coach-specialty-chip is-matched" : "coach-specialty-chip"}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="coach-profile-credentials">
        <h3>Certificates</h3>
        <ul>
          <li>Licensed Clinical Social Worker (LCSW)</li>
          <li>Certified Family Therapist</li>
          <li>Trauma-Informed Care Certification</li>
        </ul>
        <h3>Education</h3>
        <ul>
          <li>Master of Social Work (MSW), University of California, Los Angeles</li>
          <li>Bachelor of Arts in Psychology, Stanford University</li>
        </ul>
      </section>

      <section className="coach-availability-cta">
        <div className="coach-session-callout">
          <MetaLine icon={Clock3}>30 minutes</MetaLine>
          <MetaLine icon={MessageCircleMore}>Video call or text chat — your choice</MetaLine>
          <MetaLine icon={Wallet}>Free · No insurance needed</MetaLine>
        </div>
      </section>
      <StickyFooter>
        <PrimaryButton onClick={() => nav.push(route("schedule"))}>Check Availability</PrimaryButton>
      </StickyFooter>
      </div>
    </PageFrame>
  );
}

export function SchedulePage({ nav }: PageProps) {
  const disabledDays = new Set(["1", "2", "3", "4", "5", "6", "12", "19", "23"]);
  const disabledTimes = new Set(["10:00 AM"]);
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
                  const disabled = !day || disabledDays.has(day);
                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}-${day || "blank"}`}
                      onClick={() => day && !disabled && setSelectedDay(day)}
                      disabled={disabled}
                      style={{
                        minHeight: 38,
                        borderRadius: 12,
                        border: "1px solid var(--line)",
                        background: active ? "var(--strong)" : "var(--surface)",
                        color: active ? "#fff" : day ? "var(--text)" : "transparent",
                        opacity: disabled ? 0.35 : 1,
                        cursor: disabled ? "not-allowed" : "pointer"
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
          {times.map((time) => {
            const disabled = disabledTimes.has(time);
            return (
              <button
                key={time}
                className={selectedTime === time ? "chip is-active" : "chip"}
                onClick={() => !disabled && setSelectedTime(time)}
                disabled={disabled}
                style={{ minHeight: 44, opacity: disabled ? 0.35 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
              >
                {time}
              </button>
            );
          })}
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
        <Card className="booking-review-card">
          <CoachAvatar name="Dr. Sarah Chen" />
          <div className="booking-review-details">
            <MetaLine icon={CheckCircle2}>Coach: Dr. Sarah Chen</MetaLine>
            <MetaLine icon={CalendarDays}>May 30, 2026 at 11:00 AM</MetaLine>
            <MetaLine icon={Video}>Video session</MetaLine>
          </div>
        </Card>
      </Section>

      <Section title="What to expect from your chat">
        <div style={{ display: "grid", gap: 10 }}>
          <Card className="booking-expect-card">
            <ol className="booking-expect-list">
              <li>Chats are up to 45 minutes long.</li>
              <li>This is an AI-free zone. You'll connect with a real human with real care.</li>
              <li>Soluna coaches can listen, help you set goals, and offer insights when you're feeling stuck.</li>
            </ol>
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
      <section className="booking-success-hero">
        <div className="booking-success-message">
          <CheckCircle2 size={34} />
          <h3>Your session is booked</h3>
          <p>May 30, 2026 at 11:00 AM with Dr. Sarah Chen.</p>
        </div>
      </section>

      <Section>
        <div className="booking-success-actions">
          <SecondaryButton onClick={() => nav.push(route("mySessions"))}>Go to My Sessions</SecondaryButton>
          <SecondaryButton className="ghost-link-button" onClick={() => nav.goTab?.("coach")}>Back to Coach</SecondaryButton>
        </div>
      </Section>
    </PageFrame>
  );
}

export function MySessionsPage({ nav }: PageProps) {
  const initialTab = nav.route?.params?.tab === "past" ? "past" : "upcoming";
  const [tab, setTab] = useState<"upcoming" | "past">(initialTab);
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
    <PageFrame title="My Sessions" nav={nav} left="back" onBack={() => nav.reset(route("coach"))}>
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
