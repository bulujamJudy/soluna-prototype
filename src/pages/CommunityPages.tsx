import { Bookmark, ChevronDown, ChevronRight, ChevronUp, Heart, HeartHandshake, MessageCircle, Pin, Plus, Search, ShieldAlert, Smile, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "../components/phone/BottomNav";
import { Chip, PhonePage, PhoneScroll, PrimaryButton, SecondaryButton, Section, TextInput } from "../components/phone/UiPrimitives";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { communityPosts, poll } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";

type PageNav = {
  push: (route: PrototypeRoute) => void;
  back: () => void;
  reset: (route: PrototypeRoute) => void;
  goTab: (route: RouteName) => void;
};

type CommunityPageProps = { nav: PageNav };
type PollPageProps = { nav: PageNav };
type PostDetailPageProps = { nav: PageNav };

type PostState = {
  bookmarked: boolean;
  reacted: boolean;
  reactionCount: number;
};

const topicList = ["All", ...Array.from(new Set(communityPosts.map((post) => post.topic)))];
const responseBreakdown = [11, 7, 6, 5];

function percent(value: number, total: number) {
  return Math.round((value / total) * 100);
}

export function CommunityPage({ nav }: CommunityPageProps) {
  const [activeTopic, setActiveTopic] = useState("All");
  const [search, setSearch] = useState("");
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [postState, setPostState] = useState<Record<string, PostState>>(
    () =>
      Object.fromEntries(
        communityPosts.map((post) => [
          post.id,
          {
            bookmarked: false,
            reacted: false,
            reactionCount: post.reactions
          }
        ])
      ) as Record<string, PostState>
  );

  const visiblePosts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return communityPosts.filter((post) => {
      const topicMatch = activeTopic === "All" || post.topic === activeTopic;
      const searchMatch =
        term.length === 0 ||
        post.title.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.topic.toLowerCase().includes(term) ||
        post.sentences.some((sentence) => sentence.toLowerCase().includes(term));
      return topicMatch && searchMatch;
    });
  }, [activeTopic, search]);

  const openPost = (postId: string) => nav.push({ name: "postDetail", params: { postId } });

  const toggleReaction = (postId: string) => {
    setPostState((current) => {
      const entry = current[postId];
      return {
        ...current,
        [postId]: {
          ...entry,
          reacted: !entry.reacted,
          reactionCount: entry.reacted ? Math.max(0, entry.reactionCount - 1) : entry.reactionCount + 1
        }
      };
    });
  };

  const toggleBookmark = (postId: string) => {
    setPostState((current) => ({
      ...current,
      [postId]: {
        ...current[postId],
        bookmarked: !current[postId].bookmarked
      }
    }));
  };

  return (
    <PhonePage withBottomNav>
      <PhoneHeader
        title="Community"
        left="safety"
        onSafety={() => nav.push({ name: "safety" })}
        onNotifications={() => nav.push({ name: "placeholder", title: "Notifications" })}
      />
      <PhoneScroll>
        <Section>
          <div className="phone-card" style={{ display: "grid", gap: 10 }}>
            <div className="poll-banner-header">
              <span className="poll-label">
                <ShieldAlert size={18} />
                <span>
                  <strong>Poll</strong>
                  <small>Ongoing: ending in 3 days</small>
                </span>
              </span>
              <span className="poll-status">You haven't voted yet</span>
            </div>
            <h3 style={{ margin: 0 }}>{poll.question}</h3>
            <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>{poll.responses} responses so far</span>
              <SecondaryButton onClick={() => nav.push({ name: "poll" })}>tap to vote</SecondaryButton>
            </div>
          </div>
        </Section>

        <Section>
          <div className="search-post-row">
            <label className="search-field">
              <Search size={16} />
            <TextInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search posts, topics, or people" />
            </label>
            <PrimaryButton onClick={() => nav.push({ name: "placeholder", title: "Create Post" })}>
              <Plus size={16} />
              <span>Post</span>
            </PrimaryButton>
          </div>
        </Section>

        <Section
          title="Suggested topics"
          action={
            <SecondaryButton type="button" onClick={() => nav.push({ name: "placeholder", title: "My Activity" })}>
              My activity
              <ChevronRight size={14} />
            </SecondaryButton>
          }
        >
          <div className="h-scroll" aria-label="Community topics">
            {topicList.map((topic) => (
              <Chip key={topic} active={topic === activeTopic} onClick={() => setActiveTopic(topic)}>
                {topic}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="Pinned post">
          <div className="phone-card" style={{ display: "grid", gap: pinnedOpen ? 12 : 0 }}>
            <button
              type="button"
              onClick={() => setPinnedOpen((current) => !current)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                border: 0,
                padding: 0,
                background: "transparent",
                color: "inherit",
                textAlign: "left"
	              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <Pin size={16} />
                <span>
                  <strong>Welcome to Forums!</strong>
                  <small style={{ display: "block", marginTop: 4, color: "var(--muted)" }}>
                    ForumsTeam
                  </small>
                </span>
              </span>
              {pinnedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {pinnedOpen ? (
              <div style={{ color: "var(--muted)", lineHeight: 1.45 }}>
                Keep things kind, short, and safe enough to skim. You can respond with reactions when writing a full comment feels too heavy.
              </div>
            ) : null}
          </div>
        </Section>

        <Section title="Posts">
          <div style={{ display: "grid", gap: 12 }}>
            {visiblePosts.length ? (
              visiblePosts.map((post) => {
                const state = postState[post.id];
                return (
                  <div
                    key={post.id}
                    className="phone-card"
                    style={{ display: "grid", gap: 12, cursor: "pointer" }}
                    onClick={() => openPost(post.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openPost(post.id);
                      }
                    }}
	                  >
	                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
                        <div className="avatar-dot" aria-hidden="true">{post.author.slice(0, 1)}</div>
                        <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <strong>{post.author}</strong>
                          <span style={{ color: "var(--muted)" }}>{post.timestamp}</span>
                        </div>
                        <h3 style={{ margin: "6px 0 0" }}>{post.title}</h3>
                        </div>
                      </div>
                      <Bookmark size={18} fill={state.bookmarked ? "currentColor" : "none"} />
                    </div>
                    <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.45 }}>{post.sentences[0]}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--muted)" }}>
                        <span><MessageCircle size={14} /> {post.comments}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div className="reaction-stack" aria-label={`${state.reactionCount} reactions`}>
                          <Heart size={13} />
                          <HeartHandshake size={13} />
                          <Smile size={13} />
                          <Sun size={13} />
                          <span>{state.reactionCount}</span>
                        </div>
                        <SecondaryButton
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleReaction(post.id);
                          }}
	                          aria-pressed={state.reacted}
                        >
                          <Heart size={16} fill={state.reacted ? "currentColor" : "none"} />
                          <span style={{ marginLeft: 6 }}>{state.reacted ? "Reacted" : "React"}</span>
                        </SecondaryButton>
                        <SecondaryButton
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleBookmark(post.id);
                          }}
                          aria-pressed={state.bookmarked}
                        >
                          <Bookmark size={16} fill={state.bookmarked ? "currentColor" : "none"} />
                        </SecondaryButton>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="phone-card" style={{ color: "var(--muted)" }}>
                No posts match this search yet.
              </div>
            )}
          </div>
        </Section>
      </PhoneScroll>
      <BottomNav activeRoute="community" onNavigate={nav.goTab} />
    </PhonePage>
  );
}

export function PollPage({ nav }: PollPageProps) {
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const totalResponses = poll.responses;

  return (
    <PhonePage>
      <PhoneHeader title="Poll" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section>
          <div className="phone-card" style={{ display: "grid", gap: 10 }}>
            <strong>Weekly check-in</strong>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.45 }}>{poll.question}</p>
          </div>
        </Section>

        <Section title="Choices">
          <div style={{ display: "grid", gap: 10 }}>
            {poll.options.map((option, index) => {
              const isSelected = choice === option;
              const count = responseBreakdown[index];
              const showResult = submitted;
              const choicePercent = percent(count, totalResponses);
              return (
                <button
                  key={option}
                  type="button"
                  aria-label={option}
                  onClick={() => setChoice(option)}
                  className="phone-card"
                  style={{
                    display: "grid",
                    gap: 8,
                    borderColor: isSelected ? "var(--strong)" : "var(--line)",
                    background: isSelected ? "rgba(0, 120, 255, 0.08)" : "var(--surface)",
                    textAlign: "left"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          border: `2px solid ${isSelected ? "var(--strong)" : "var(--line)"}`,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        aria-hidden="true"
                      >
                        {isSelected ? <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--strong)" }} /> : null}
                      </span>
                      <strong>{option}</strong>
                    </span>
                    {showResult ? <strong>{choicePercent}%</strong> : null}
                  </div>
                  {showResult ? (
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        background: "rgba(0, 0, 0, 0.08)",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width: `${choicePercent}%`,
                          height: "100%",
                          borderRadius: 999,
                          background: isSelected ? "var(--strong)" : "rgba(0, 120, 255, 0.38)"
                        }}
                      />
                    </div>
                  ) : null}
                  {showResult ? <span style={{ color: "var(--muted)" }}>{count} votes</span> : null}
                </button>
              );
            })}
          </div>
        </Section>

        {submitted ? (
          <Section>
            <div className="phone-card" style={{ display: "grid", gap: 6 }}>
              <strong>29 responses</strong>
              <p style={{ margin: 0, color: "var(--muted)" }}>Your choice: {choice}</p>
            </div>
          </Section>
        ) : null}
      </PhoneScroll>
      <div className="sticky-footer">
        <PrimaryButton disabled={!choice || submitted} onClick={() => setSubmitted(true)}>
          {submitted ? "Submitted" : "Submit"}
        </PrimaryButton>
      </div>
    </PhonePage>
  );
}

export function PostDetailPage({ nav }: PostDetailPageProps) {
  const routeParams = (nav as PageNav & { route?: { params?: Record<string, string> } }).route?.params;
  const post = communityPosts.find((entry) => entry.id === routeParams?.postId) ?? communityPosts[0];
  const [activeSentence, setActiveSentence] = useState(0);
  const [annotationCount, setAnnotationCount] = useState(0);

  const selectSentence = (index: number) => setActiveSentence(index);
  const hearThis = () => setAnnotationCount(1);

  return (
    <PhonePage>
      <PhoneHeader title="Post" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section>
          <div className="phone-card" style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <strong>{post.author}</strong>
                  <span style={{ color: "var(--muted)" }}>{post.timestamp}</span>
                </div>
                <h3 style={{ margin: "6px 0 0" }}>{post.title}</h3>
              </div>
              <span className="chip is-active" style={{ pointerEvents: "none" }}>
                {post.topic}
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, color: "var(--muted)", flexWrap: "wrap" }}>
              <span>{post.comments} comments</span>
              <span>{post.reactions} reactions</span>
              <span>{post.sentences.length} sentences</span>
            </div>
          </div>
        </Section>

        <Section title="Post text">
          <div style={{ display: "grid", gap: 10 }}>
            {post.sentences.map((sentence, index) => {
              const isActive = index === activeSentence;
              const annotated = isActive && annotationCount > 0;
              return (
                <div
                  key={sentence}
                  className="phone-card"
                  style={{
                    display: "grid",
                    gap: 10,
                    borderColor: isActive ? "var(--strong)" : "var(--line)",
                    background: isActive ? "rgba(0, 120, 255, 0.08)" : "var(--surface)"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => selectSentence(index)}
                    style={{
                      border: 0,
                      padding: 0,
                      background: "transparent",
                      color: "inherit",
                      textAlign: "left",
                      lineHeight: 1.5
                    }}
                  >
                    {sentence}
                  </button>
                  {isActive ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <SecondaryButton onClick={hearThis}>
                        <MessageCircle size={16} />
                        <span style={{ marginLeft: 6 }}>I hear this</span>
                      </SecondaryButton>
                      {annotated ? <strong>1 annotation reaction</strong> : <span style={{ color: "var(--muted)" }}>Select this sentence</span>}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Section>

        <Section>
          <div className="phone-card" style={{ display: "grid", gap: 6 }}>
            <strong>Annotation summary</strong>
            <p style={{ margin: 0, color: "var(--muted)" }}>
              {annotationCount > 0 ? "1 annotation reaction recorded on the selected sentence." : "No annotations yet."}
            </p>
          </div>
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}
