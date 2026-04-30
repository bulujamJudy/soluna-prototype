import type { FeatureChapter } from "../../data/features";
import { SolunaPrototype } from "../../prototype/SolunaPrototype";
import { PhoneFrame } from "../phone/PhoneFrame";
import type { CompareMode } from "./DemoShell";
import { BeforeVideo } from "./BeforeVideo";

type PhoneStageProps = {
  feature: FeatureChapter;
  mode: CompareMode;
};

export function PhoneStage({ feature, mode }: PhoneStageProps) {
  return (
    <section className="phone-stage" aria-label="Prototype stage">
      <PhoneFrame>
        {mode === "before" ? (
          <BeforeVideo feature={feature} />
        ) : (
          <div data-testid="after-prototype-slot" className="after-prototype-slot">
            <SolunaPrototype startRoute={feature.afterStartRoute} />
          </div>
        )}
      </PhoneFrame>
    </section>
  );
}
