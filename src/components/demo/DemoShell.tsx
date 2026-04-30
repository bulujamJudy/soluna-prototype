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
