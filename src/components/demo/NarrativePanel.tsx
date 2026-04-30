import type { FeatureChapter } from "../../data/features";

export function NarrativePanel({ feature }: { feature: FeatureChapter }) {
  return (
    <aside className="narrative-panel">
      <p className="eyebrow">{feature.eyebrow}</p>
      <h2>{feature.title}</h2>
      <p className="narrative-lede">{feature.problem}</p>
      <section>
        <h3>Key redesign moves</h3>
        <ul>
          {feature.redesign.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
