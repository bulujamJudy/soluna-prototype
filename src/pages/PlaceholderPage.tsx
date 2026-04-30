import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, PhonePage, PhoneScroll } from "../components/phone/UiPrimitives";

export function PlaceholderPage({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <PhonePage>
      <PhoneHeader title={title} left="close" right="none" onBack={onBack} />
      <PhoneScroll>
        <Card>
          <h3>Content placeholder</h3>
          <p>This is a low-fidelity destination for the prototype. Replace this with detailed content when the flow is expanded.</p>
        </Card>
      </PhoneScroll>
    </PhonePage>
  );
}
