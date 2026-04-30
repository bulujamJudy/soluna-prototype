import { useState } from "react";
import { features } from "../../data/features";
import type { FeatureId } from "../../prototype/routeTypes";
import { NarrativePanel } from "./NarrativePanel";
import { PhoneStage } from "./PhoneStage";

export type CompareMode = "before" | "after";

export function DemoShell() {
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>("trust");
  const [mode, setMode] = useState<CompareMode>("before");
  const activeFeature = features.find((feature) => feature.id === activeFeatureId) ?? features[0];

  return (
    <main className="demo-shell">
      <section className="demo-topbar" aria-label="Soluna prototype navigation">
        <div>
          <p className="eyebrow">Soluna 2.0 Redesign</p>
          <h1>Interactive case-study prototype</h1>
        </div>
        <div className="feature-tabs" aria-label="Feature chapters">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={feature.id === activeFeatureId ? "is-active" : ""}
              onClick={() => {
                setActiveFeatureId(feature.id);
                setMode("before");
              }}
            >
              {feature.title}
            </button>
          ))}
        </div>
      </section>
      <section className="demo-layout">
        <NarrativePanel feature={activeFeature} />
        <PhoneStage feature={activeFeature} mode={mode} onModeChange={setMode} />
      </section>
    </main>
  );
}
