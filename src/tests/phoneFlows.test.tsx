import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SolunaPrototype } from "../prototype/SolunaPrototype";

describe("SolunaPrototype", () => {
  it("renders the requested start route", () => {
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    expect(screen.getByRole("heading", { name: "Coach" })).toBeInTheDocument();
  });

  it("navigates between bottom tabs", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    await user.click(screen.getByRole("button", { name: /Community/i }));
    expect(screen.getByRole("heading", { name: "Community" })).toBeInTheDocument();
  });

  it("shows replacement content for unbuilt destinations", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "placeholder", title: "Mini Game Practice" }} />);
    expect(screen.getByText("Mini Game Practice")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Go back" }));
    expect(screen.getByText("Mini Game Practice")).toBeInTheDocument();
  });
});

describe("accessibility chapter flows", () => {
  it("keeps the safety entry on all four main tab pages", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);

    expect(screen.getByRole("button", { name: "Open safety" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Coach" }));
    expect(screen.getByRole("button", { name: "Open safety" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Community" }));
    expect(screen.getByRole("button", { name: "Open safety" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Profile" }));
    expect(screen.getByRole("button", { name: "Open safety" })).toBeInTheDocument();
  });

  it("uses matched icons for the practice shortcuts", () => {
    render(<SolunaPrototype startRoute={{ name: "home" }} />);

    const iconNames = Array.from(document.querySelectorAll("[data-practice-icon]")).map((node) => node.getAttribute("data-practice-icon"));
    expect(new Set(iconNames).size).toBeGreaterThan(4);
    expect(iconNames).toEqual(expect.arrayContaining(["target", "smile", "heart", "layout", "message", "wind", "pen"]));
  });

  it("marks a reading card done after the article is opened", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);

    await user.click(screen.getByText("Grounding when thoughts run fast"));
    expect(screen.getByText("Grounding when thoughts run fast")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Go back" }));

    expect(screen.getByLabelText("Grounding when thoughts run fast read")).toBeInTheDocument();
    expect(screen.getByLabelText("2 of 3 articles read")).toBeInTheDocument();
  });

  it("opens safety and local services from home", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    await user.click(screen.getByRole("button", { name: "Open safety" }));
    expect(screen.getByRole("heading", { name: "Safety" })).toBeInTheDocument();
    await user.click(screen.getByText("Local services"));
    expect(screen.getByRole("heading", { name: "Local Services" })).toBeInTheDocument();
  });

  it("starts and summarizes a bunny conversation", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    await user.type(screen.getByPlaceholderText(/share your thought/i), "I feel awake and worried");
    await user.click(screen.getByRole("button", { name: "Send to bunny" }));
    expect(screen.getByRole("heading", { name: "Talk to Bunny" })).toBeInTheDocument();
    expect(screen.getByText("Space bunny is happy to listen to you.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Signal tracker/i })).toBeInTheDocument();
    expect(screen.getByText("Concerned")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "End conversation" }));
    expect(screen.getByRole("heading", { name: "Conversation Summary" })).toBeInTheDocument();
  });

  it("explains Bunny and updates expression and signal status", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "bunnyChat" }} />);

    await user.click(screen.getByRole("button", { name: "Open Bunny info" }));
    expect(screen.getByRole("dialog", { name: "What Bunny does" })).toHaveTextContent(/not clinical care/i);
    expect(screen.getByRole("dialog", { name: "What Bunny does" })).toHaveTextContent(/does not diagnose/i);
    expect(screen.getByRole("dialog", { name: "What Bunny does" })).toHaveTextContent(/use your data/i);

    await user.type(screen.getByLabelText("Type a message"), "I feel stress");
    expect(screen.getByText("Space bunny is listening.")).toBeInTheDocument();
    expect(screen.getByText("Concerned")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(screen.getByText("Space bunny is thinking.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Type a message"), "I might hurt myself");
    expect(screen.getByText("Space bunny is worry about you.")).toBeInTheDocument();
    expect(screen.getByText("Suggest safety resources")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Signal tracker/i }));
    expect(screen.getByText(/Red/)).toBeInTheDocument();
  });
});

describe("trust chapter coach flows", () => {
  it("opens the selected coach profile instead of always showing Sarah", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coachList" }} />);

    await user.click(screen.getByText("Jordan Lee"));

    expect(screen.getByRole("heading", { name: "Coach Profile" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Jordan Lee" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Dr. Sarah Chen" })).not.toBeInTheDocument();
  });

  it("updates available times when the selected date changes", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "schedule", params: { coachId: "jordan" } }} />);

    expect(screen.getByRole("button", { name: "2:00 PM" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "9:00 AM" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "29" }));

    expect(screen.getByRole("button", { name: "9:30 AM" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "3:30 PM" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "2:00 PM" })).not.toBeInTheDocument();
  });

  it("carries coach, schedule, and format choices into booking review", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coachList" }} />);

    await user.click(screen.getByText("Emma Rodriguez"));
    await user.click(screen.getByRole("button", { name: /Check Availability/i }));
    await user.click(screen.getByRole("button", { name: "25" }));
    await user.click(screen.getByRole("button", { name: "4:00 PM" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Text" }));
    await user.click(screen.getByRole("button", { name: "Review & Confirm" }));

    expect(screen.getByText("Coach: Emma Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("May 25, 2026 at 4:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Text session")).toBeInTheDocument();
  });

  it("shows FAQ answers without nested button chrome or tap-to-read copy", () => {
    render(<SolunaPrototype startRoute={{ name: "coachingQA" }} />);

    expect(screen.queryByText("Trust signals")).not.toBeInTheDocument();
    expect(screen.queryByText("Tap to read more.")).not.toBeInTheDocument();
    expect(screen.getByText(/A coach starts by asking what has been on your mind/i)).toBeInTheDocument();
  });

  it("opens funding details from the whole card without nested row chrome", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "bookingReview", params: { coachId: "emma", day: "25", time: "1:00 PM", format: "text" } }} />);

    await user.click(screen.getByText("How is the service free?"));

    expect(screen.getByText(/state as a public mental health initiative/i)).toBeInTheDocument();
    expect(document.querySelector(".funding-card .phone-row")).not.toBeInTheDocument();
    expect(screen.queryByText("Expanded funding details are shown below.")).not.toBeInTheDocument();
  });

  it("books a mocked session through the trust path", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    await user.click(screen.getByRole("button", { name: /Browse All Coaches/i }));
    expect(screen.getByRole("heading", { name: "Find Your Coach" })).toBeInTheDocument();
    await user.click(screen.getByText("Dr. Sarah Chen"));
    expect(screen.getByRole("heading", { name: "Coach Profile" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Check Availability/i }));
    await user.click(screen.getByRole("button", { name: "30" }));
    await user.click(screen.getByRole("button", { name: "11:00 AM" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Text" }));
    await user.click(screen.getByRole("button", { name: "Review & Confirm" }));
    await user.click(screen.getByRole("button", { name: /How is the service free/i }));
    expect(screen.getByText(/state as a public mental health initiative/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm the Session" }));
    expect(screen.getByRole("heading", { name: "Booking Confirmed!" })).toBeInTheDocument();
  });

  it("joins and leaves drop-in waiting room", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    await user.click(screen.getByText("Drop-in Chat"));
    await user.click(screen.getByRole("button", { name: "Join Waiting Room" }));
    expect(screen.getByText("You're in the Waiting Room")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Leave Queue" }));
    expect(screen.getByRole("heading", { name: "Coach" })).toBeInTheDocument();
  });
});

describe("community chapter flows", () => {
  it("votes in the poll and shows results", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "community" }} />);
    await user.click(screen.getByText("tap to vote"));
    await user.click(screen.getByLabelText("Feeling misunderstood"));
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByText(/Your choice/i)).toBeInTheDocument();
    expect(screen.getByText(/29 responses/i)).toBeInTheDocument();
  });

  it("adds sentence-level support on a post", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "community" }} />);
    await user.click(screen.getByText("I wrote a long post and still felt alone"));
    await user.click(screen.getByText(/nobody responded/i));
    await user.click(screen.getByRole("button", { name: "I hear this" }));
    expect(screen.getByText("1 annotation reaction")).toBeInTheDocument();
  });
});

describe("profile and remaining destinations", () => {
  it("opens settings and app information subpages", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "profile" }} />);
    await user.click(screen.getByText("Setting"));
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Go back" }));
    await user.click(screen.getByText("App Information"));
    expect(screen.getByRole("heading", { name: "App Information" })).toBeInTheDocument();
  });
});
