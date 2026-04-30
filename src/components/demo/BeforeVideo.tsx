import type { FeatureChapter } from "../../data/features";

export function BeforeVideo({ feature }: { feature: FeatureChapter }) {
  return (
    <div className="before-video" aria-label={`${feature.title} before video replacement`}>
      <div className="video-box">
        <p>{feature.beforeVideoLabel}</p>
        <span>{feature.beforeVideoSrc}</span>
      </div>
    </div>
  );
}
