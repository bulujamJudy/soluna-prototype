import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("DemoShell", () => {
  it("renders the three feature chapters", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Trust" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Community Engagement" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Design Accessibility" })).toBeInTheDocument();
  });

  it("manually toggles before and after outside the phone", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText("Replace with recorded before video: Trust friction demo")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "After" }));
    expect(screen.getByTestId("after-prototype-slot")).toBeInTheDocument();
  });

  it("updates narrative copy when feature changes", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Community Engagement" }));
    expect(screen.getByText(/sentence-level annotation reactions/i)).toBeInTheDocument();
    expect(screen.getByText("Replace with recorded before video: Community engagement friction demo")).toBeInTheDocument();
  });
});
