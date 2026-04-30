import type { FeatureChapter } from "../../data/features";
import { PhoneFrame } from "../phone/PhoneFrame";
import type { CompareMode } from "./DemoShell";
import { BeforeVideo } from "./BeforeVideo";

type PhoneStageProps = {
  feature: FeatureChapter;
  mode: CompareMode;
  onModeChange: (mode: CompareMode) => void;
};

export function PhoneStage({ feature, mode, onModeChange }: PhoneStageProps) {
  return (
    <section className="phone-stage" aria-label="Prototype stage">
      <div className="compare-toggle" aria-label="Before and after control">
        <button className={mode === "before" ? "is-active" : ""} onClick={() => onModeChange("before")}>
          Before
        </button>
        <button className={mode === "after" ? "is-active" : ""} onClick={() => onModeChange("after")}>
          After
        </button>
      </div>
      <PhoneFrame>{mode === "before" ? <BeforeVideo feature={feature} /> : <div data-testid="after-prototype-slot">After prototype slot</div>}</PhoneFrame>
      <p className="stage-caption">Manual comparison control stays outside the phone frame.</p>
    </section>
  );
}
