import { ChevronRight } from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function PhonePage({ children, withBottomNav = false }: { children: ReactNode; withBottomNav?: boolean }) {
  return <div className={withBottomNav ? "phone-page with-bottom-nav" : "phone-page"}>{children}</div>;
}

export function PhoneScroll({ children }: { children: ReactNode }) {
  return <div className="phone-scroll">{children}</div>;
}

export function Section({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="phone-section">
      {(title || action) && (
        <div className="section-heading">
          {title ? <h3>{title}</h3> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag className={`phone-card ${className}`} onClick={onClick}>
      {children}
    </Tag>
  );
}

export function Row({ title, description, onClick }: { title: string; description?: string; onClick?: () => void }) {
  return (
    <button className="phone-row" onClick={onClick}>
      <span>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <ChevronRight size={18} />
    </button>
  );
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button className={active ? "chip is-active" : "chip"} onClick={onClick}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`primary-button ${props.className ?? ""}`} />;
}

export function SecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`secondary-button ${props.className ?? ""}`} />;
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`text-input ${props.className ?? ""}`} />;
}

export function ImageSlot({ label = "Replace with actual image" }: { label?: string }) {
  return (
    <div className="image-slot" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return <div className="sticky-footer">{children}</div>;
}
