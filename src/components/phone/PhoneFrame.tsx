import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone-frame" aria-label="Interactive phone frame">
      <div className="phone-sensor" aria-hidden="true" />
      <div className="phone-screen">{children}</div>
    </div>
  );
}
