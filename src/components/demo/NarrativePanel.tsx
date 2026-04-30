import type { FeatureChapter } from "../../data/features";

export function NarrativePanel({ feature }: { feature: FeatureChapter }) {
  return (
    <aside className="narrative-panel">
      <p className="eyebrow">{feature.eyebrow}</p>
      <h2>{feature.title}</h2>
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
