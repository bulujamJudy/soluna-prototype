import { useEffect } from "react";
import { BottomNav } from "../components/phone/BottomNav";
import { PhoneHeader } from "../components/phone/PhoneHeader";
import { Card, PhonePage, PhoneScroll } from "../components/phone/UiPrimitives";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { routeLabels, tabRoutes } from "./routeConfig";
import type { PrototypeRoute } from "./routeTypes";
import { usePrototypeNavigation } from "./usePrototypeNavigation";

function BasicTabPage({ title }: { title: string }) {
  return (
    <>
      <PhoneHeader title={title} left={title === "Home" || title === "Community" ? "safety" : "none"} />
      <PhoneScroll>
        <Card>
          <h3>Prototype section</h3>
          <p>{title} layout will be filled in the page-group tasks.</p>
        </Card>
      </PhoneScroll>
    </>
  );
}

export function SolunaPrototype({ startRoute }: { startRoute: PrototypeRoute }) {
  const nav = usePrototypeNavigation(startRoute);

  useEffect(() => {
    nav.reset(startRoute);
  }, [startRoute.name]);

  const isTab = tabRoutes.includes(nav.route.name);
  const title = nav.route.title ?? routeLabels[nav.route.name];

  if (nav.route.name === "placeholder") {
    return <PlaceholderPage title={title} onBack={nav.back} />;
  }

  return (
    <PhonePage withBottomNav={isTab}>
      <BasicTabPage title={title} />
      {isTab ? <BottomNav activeRoute={nav.route.name} onNavigate={nav.goTab} /> : null}
    </PhonePage>
  );
}
