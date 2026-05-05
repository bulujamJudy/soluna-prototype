import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SolunaPrototype } from "../prototype/SolunaPrototype";

describe("high-fi main workflow visual constraints", () => {
  it("keeps the app redesign off green tones", () => {
    const css = readFileSync(join(process.cwd(), "src/styles.css"), "utf8").toLowerCase();
    expect(css).not.toContain("#4ade80");
    expect(css).not.toContain("green");
    expect(css).not.toContain("mint");
    expect(css).not.toContain("teal");
  });

  it("renders the phone app without removing the main workflow entry points", () => {
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    expect(screen.getByText("Add a Soluna widget")).toBeInTheDocument();
    expect(screen.getByText("Mental health practice")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Coach/i })).toBeInTheDocument();
  });

  it("keeps the Home practice and topics workflow visible", () => {
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    expect(screen.getByText("Your daily movement, within reach")).toBeInTheDocument();
    expect(screen.getByText("Space Bunny Buddy")).toBeInTheDocument();
    expect(screen.getByText("Topics of the week")).toBeInTheDocument();
    expect(screen.getByText("Sleep Awareness")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /See all Blog/i })).toBeInTheDocument();
  });

  it("keeps coach landing links routed to the requested destinations", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coach" }} />);
    await user.click(screen.getByRole("button", { name: /Upcoming Session/i }));
    expect(screen.getByRole("heading", { name: "My Sessions" })).toBeInTheDocument();
  });

  it("keeps coach profile identity and availability visible", () => {
    render(<SolunaPrototype startRoute={{ name: "coachProfile" }} />);
    expect(screen.getByText("Dr. Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("she/her")).toBeInTheDocument();
    expect(screen.getByText(/Hispanic\/Latina/i)).toBeInTheDocument();
    expect(screen.getByText(/Next available/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Check Availability/i })).toBeInTheDocument();
  });

  it("keeps the booking path complete through success and my sessions", async () => {
    const user = userEvent.setup();
    render(<SolunaPrototype startRoute={{ name: "coachProfile" }} />);
    await user.click(screen.getByRole("button", { name: /Check Availability/i }));
    expect(screen.getByRole("heading", { name: "Schedule" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "30" }));
    await user.click(screen.getByRole("button", { name: "11:00 AM" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Review & Confirm" }));
    expect(screen.getByRole("heading", { name: "Confirm Booking" })).toBeInTheDocument();
    expect(screen.getByText("What to expect from your chat")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm the Session" }));
    expect(screen.getByRole("heading", { name: "Booking Confirmed!" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Go to My Sessions/i }));
    expect(screen.getByRole("heading", { name: "My Sessions" })).toBeInTheDocument();
  });
});
