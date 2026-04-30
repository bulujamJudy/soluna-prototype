import { describe, expect, it } from "vitest";
import { features } from "../data/features";
import { coaches, communityPosts, crisisResources, localServices, poll, profileSections } from "../data/mockContent";

describe("feature metadata", () => {
  it("defines exactly the three approved feature chapters", () => {
    expect(features.map((feature) => feature.id)).toEqual(["trust", "community", "accessibility"]);
  });

  it("maps every feature to a before video replacement label and after start route", () => {
    for (const feature of features) {
      expect(feature.beforeVideoLabel).toContain("Replace with recorded before video");
      expect(feature.afterStartRoute.name).toMatch(/home|coach|community/);
      expect(feature.problem.length).toBeGreaterThan(80);
      expect(feature.prototypePath.length).toBeGreaterThan(2);
    }
  });
});

describe("mock content", () => {
  it("contains enough data to render the major prototype sections", () => {
    expect(coaches.length).toBeGreaterThanOrEqual(3);
    expect(communityPosts.length).toBeGreaterThanOrEqual(3);
    expect(crisisResources.length).toBeGreaterThanOrEqual(4);
    expect(localServices.length).toBeGreaterThanOrEqual(3);
    expect(poll.options.length).toBe(4);
    expect(profileSections.length).toBeGreaterThanOrEqual(4);
  });
});
