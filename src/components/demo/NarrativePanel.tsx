import type { FeatureChapter } from "../../data/features";

export function NarrativePanel({ feature, featureLabel }: { feature: FeatureChapter; featureLabel?: string }) {
  return (
    <aside className="narrative-panel">
      <p className="feature-kicker">{feature.eyebrow}</p>
      <h2>{featureLabel ?? feature.title}</h2>
      <section>
        <h3>Problem</h3>
        <p>{feature.problem}</p>
      </section>
      <section>
        <h3>Insight</h3>
        <p>{feature.insight}</p>
      </section>
      <section>
        <h3>Redesign Response</h3>
        <ul>
          {feature.redesign.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Prototype Path</h3>
        <p>{feature.prototypePath.join(" -> ")}</p>
      </section>
    </aside>
  );
}
