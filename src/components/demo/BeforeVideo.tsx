import type { FeatureChapter } from "../../data/features";

export function BeforeVideo({ feature }: { feature: FeatureChapter }) {
  return (
    <div className="before-video" aria-label={`${feature.title} before screenshot`}>
      <img 
        src={feature.beforeVideoSrc} 
        alt={feature.beforeVideoLabel} 
        style={{ 
          width: "100%", 
          height: "auto", 
          borderRadius: 8, 
          objectFit: "contain",
          display: "block"
        }} 
      />
    </div>
  );
}
