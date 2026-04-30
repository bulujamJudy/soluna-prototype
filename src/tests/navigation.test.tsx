import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrototypeNavigation } from "../prototype/usePrototypeNavigation";

describe("usePrototypeNavigation", () => {
  it("starts at the requested route", () => {
    const { result } = renderHook(() => usePrototypeNavigation({ name: "coach" }));
    expect(result.current.route.name).toBe("coach");
  });

  it("pushes routes and returns with back", () => {
    const { result } = renderHook(() => usePrototypeNavigation({ name: "home" }));
    act(() => result.current.push({ name: "safety" }));
    act(() => result.current.push({ name: "crisis" }));
    expect(result.current.route.name).toBe("crisis");
    act(() => result.current.back());
    expect(result.current.route.name).toBe("safety");
  });

  it("resets history when feature start route changes", () => {
    const { result } = renderHook(() => usePrototypeNavigation({ name: "home" }));
    act(() => result.current.push({ name: "safety" }));
    act(() => result.current.reset({ name: "community" }));
    expect(result.current.route.name).toBe("community");
    act(() => result.current.back());
    expect(result.current.route.name).toBe("community");
  });
});
