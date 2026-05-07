import { ArrowLeft, Bell, CircleHelp, ShieldAlert, X } from "lucide-react";

type PhoneHeaderProps = {
  title: string;
  left?: "back" | "close" | "safety" | "none";
  right?: "bell" | "help" | "none";
  onBack?: () => void;
  onSafety?: () => void;
  onNotifications?: () => void;
};

export function PhoneHeader({ title, left = "back", right = "bell", onBack, onSafety, onNotifications }: PhoneHeaderProps) {
  const rightLabel = right === "help" ? "Open Bunny info" : "Open notifications";

  return (
    <header className="phone-header">
      <button
        aria-label={left === "safety" ? "Open safety" : "Go back"}
        className="icon-button"
        onClick={left === "safety" ? onSafety : onBack}
        disabled={left === "none"}
      >
        {left === "safety" ? <ShieldAlert size={18} /> : left === "close" ? <X size={18} /> : left === "none" ? null : <ArrowLeft size={18} />}
      </button>
      <h2>{title}</h2>
      <button aria-label={rightLabel} className="icon-button" onClick={onNotifications} disabled={right === "none"}>
        {right === "bell" ? <Bell size={18} /> : right === "help" ? <CircleHelp size={18} /> : null}
      </button>
    </header>
  );
}
