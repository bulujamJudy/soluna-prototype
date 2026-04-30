import { BookOpenText, MessageCircleHeart, ShieldCheck, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { features } from "../../data/features";
import type { FeatureId } from "../../prototype/routeTypes";
import { NarrativePanel } from "./NarrativePanel";
import { PhoneStage } from "./PhoneStage";

export type CompareMode = "before" | "after";

const featureIcons = {
  trust: ShieldCheck,
  community: MessageCircleHeart,
  accessibility: BookOpenText
} satisfies Record<FeatureId, LucideIcon>;

export function DemoShell() {
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>("trust");
  const [mode, setMode] = useState<CompareMode>("before");
  const activeFeature = features.find((feature) => feature.id === activeFeatureId) ?? features[0];

  return (
    <main className="demo-shell">
      <section className="demo-layout">
        <section className="demo-intro" aria-label="Soluna prototype overview">
          <h1>Soluna 2.0 Redesign</h1>
          <p>
            Interactive case-study prototype for exploring three redesigned moments through a
            before-after phone demo.
          </p>
        </section>
        <NarrativePanel feature={activeFeature} />
        <div className="device-column">
          <PhoneStage feature={activeFeature} mode={mode} />
          <div className="demo-dock" aria-label="Demo controls">
            <div className="feature-tabs" aria-label="Feature chapters">
              {features.map((feature) => {
                const FeatureIcon = featureIcons[feature.id];

                return (
                  <button
                    key={feature.id}
                    className={feature.id === activeFeatureId ? "is-active" : ""}
                    aria-label={feature.title}
                    title={feature.title}
                    onClick={() => {
                      setActiveFeatureId(feature.id);
                      setMode("before");
                    }}
                  >
                    <FeatureIcon aria-hidden="true" size={20} strokeWidth={2.25} />
                  </button>
                );
              })}
            </div>
            <div className="compare-toggle" aria-label="Before and after control">
              <button className={mode === "before" ? "is-active" : ""} onClick={() => setMode("before")}>
                Before
              </button>
              <button className={mode === "after" ? "is-active" : ""} onClick={() => setMode("after")}>
                After
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
