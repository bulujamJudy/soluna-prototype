import { useState } from "react";
import { MapPinned, PhoneCall, ShieldAlert } from "lucide-react";
import { crisisResources, localServiceCategories, localServices } from "../data/mockContent";
import type { PrototypeRoute, RouteName } from "../prototype/routeTypes";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, Chip, PhonePage, PhoneScroll, PrimaryButton, Row, Section, SecondaryButton } from "../components/phone/UiPrimitives";

type PageNav = {
  push(route: PrototypeRoute): void;
  back(): void;
  reset(route: PrototypeRoute): void;
  goTab?(route: RouteName): void;
  route?: PrototypeRoute;
};

function openPlaceholder(nav: PageNav, title: string) {
  nav.push({ name: "placeholder", title });
}

export function SafetyPage({ nav }: { nav: PageNav }) {
  return (
    <PhonePage>
      <PhoneHeader title="Safety" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section title="Immediate help">
          <div style={{ display: "grid", gap: 10 }}>
            <Row title="Urgent support" description="Open crisis resources now" onClick={() => nav.push({ name: "crisis" })} />
            <Row title="Local services" description="Find nearby support" onClick={() => nav.push({ name: "localServices" })} />
          </div>
        </Section>

        <Section title="Quick actions">
          <Card>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
              <span>
                <strong>Safety plan</strong>
                <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                  Keep a short list of people, places, and steps that help you steady out.
                </small>
              </span>
              <ShieldAlert size={18} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <SecondaryButton type="button" onClick={() => openPlaceholder(nav, "Safety plan")}>
                Open
              </SecondaryButton>
              <PrimaryButton type="button" onClick={() => nav.push({ name: "crisis" })}>
                Crisis support
              </PrimaryButton>
            </div>
          </Card>
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}

export function CrisisPage({ nav }: { nav: PageNav }) {
  const [acknowledged, setAcknowledged] = useState<{ name: string; number: string } | null>(null);

  return (
    <PhonePage>
      <PhoneHeader title="Crisis Support" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section title="Numbers to call">
          <Card>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
              <span>
                <p className="eyebrow">Prototype note</p>
                <strong>We will not place a call</strong>
                <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                  Tapping a number only shows a confirmation inside the prototype.
                </small>
              </span>
              <PhoneCall size={18} />
            </div>
          </Card>
        </Section>

        {acknowledged ? (
          <Section title="Acknowledgement">
            <Card>
              <strong>{acknowledged.name}</strong>
              <p style={{ marginBottom: 0 }}>
                You tapped {acknowledged.number}. This prototype shows a non-dialing acknowledgement and does not connect a call.
              </p>
            </Card>
          </Section>
        ) : null}

        <Section title="Resources">
          <div style={{ display: "grid", gap: 10 }}>
            {crisisResources.map((resource) => (
              <Card key={resource.name}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
                  <span>
                    <strong>{resource.name}</strong>
                    <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                      {resource.description}
                    </small>
                  </span>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setAcknowledged({ name: resource.name, number: resource.number })}
                  >
                    {resource.number}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}

const serviceSubcategories: Record<string, string[]> = {
  Food: ["Meals", "Pantries", "Groceries"],
  Housing: ["Shelter", "Rent help", "Youth beds"],
  Goods: ["Clothes", "Hygiene", "Supplies"],
  Transit: ["Bus passes", "Rides", "Parking"],
  Health: ["Clinics", "Wellness", "Medication"],
  Money: ["Benefits", "Cash aid", "Budgeting"],
  Care: ["Child care", "Family support", "Peer care"],
  Education: ["Tutoring", "GED", "Enrollment"],
  Work: ["Job search", "Resume", "Training"],
  Legal: ["ID help", "Tenant rights", "Benefits appeals"],
  "Crisis Text": ["Text support", "After hours", "Private"],
  "Call 911": ["Immediate danger", "Medical", "Police/Fire"]
};

const markerPositions = [
  { id: "food", top: "22%", left: "24%" },
  { id: "housing", top: "54%", left: "58%" },
  { id: "legal", top: "74%", left: "34%" }
];

export function LocalServicesPage({ nav }: { nav: PageNav }) {
  const [activeCategory, setActiveCategory] = useState(localServiceCategories[0]);
  const [selectedServiceId, setSelectedServiceId] = useState(localServices[0].id);

  const activeSubcategories = serviceSubcategories[activeCategory] ?? ["Nearby", "Walk-in", "Open today"];
  const selectedService = localServices.find((service) => service.id === selectedServiceId) ?? localServices[0];

  return (
    <PhonePage>
      <PhoneHeader title="Local Services" left="back" right="none" onBack={nav.back} />
      <PhoneScroll>
        <Section title="Filter">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {localServiceCategories.map((category) => (
              <Chip key={category} active={category === activeCategory} onClick={() => setActiveCategory(category)}>
                {category}
              </Chip>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {activeSubcategories.map((tag) => (
              <span key={tag} className="chip is-active">
                {tag}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Map">
          <div
            aria-label="Service map placeholder"
            style={{
              position: "relative",
              height: 220,
              border: "1px solid var(--line)",
              borderRadius: 16,
              background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.22) 1px, transparent 1px)",
                backgroundSize: "28px 28px"
              }}
            />
            {markerPositions.map((marker) => {
              const service = localServices.find((item) => item.id === marker.id);
              if (!service) return null;
              const isSelected = selectedServiceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  className={isSelected ? "secondary-button" : "chip"}
                  style={{
                    position: "absolute",
                    top: marker.top,
                    left: marker.left,
                    transform: "translate(-50%, -50%)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    minHeight: 0,
                    padding: "6px 10px"
                  }}
                  onClick={() => setSelectedServiceId(service.id)}
                >
                  <MapPinned size={14} />
                  {service.category}
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Selected service">
          <Card>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
              <span>
                <strong>{selectedService.title}</strong>
                <small style={{ display: "block", marginTop: 4, color: "var(--muted)", lineHeight: 1.35 }}>
                  {selectedService.category} · {selectedService.distance}
                </small>
              </span>
              <SecondaryButton type="button" onClick={() => openPlaceholder(nav, selectedService.title)}>
                Open
              </SecondaryButton>
            </div>
            <p style={{ marginBottom: 0 }}>{selectedService.address}</p>
          </Card>
        </Section>
      </PhoneScroll>
    </PhonePage>
  );
}
