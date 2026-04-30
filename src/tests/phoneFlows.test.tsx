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
    await user.click(screen.getByRole("button", { name: "End conversation" }));
    expect(screen.getByRole("heading", { name: "Conversation Summary" })).toBeInTheDocument();
  });
});

describe("trust chapter coach flows", () => {
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
