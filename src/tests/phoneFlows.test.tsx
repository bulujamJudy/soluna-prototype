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
