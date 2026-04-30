import { useCallback, useMemo, useState } from "react";
import type { PrototypeRoute, RouteName } from "./routeTypes";
import { tabRoutes } from "./routeConfig";

export function usePrototypeNavigation(initialRoute: PrototypeRoute) {
  const [history, setHistory] = useState<PrototypeRoute[]>([initialRoute]);

  const route = history[history.length - 1];

  const push = useCallback((nextRoute: PrototypeRoute) => {
    setHistory((current) => [...current, nextRoute]);
  }, []);

  const replace = useCallback((nextRoute: PrototypeRoute) => {
    setHistory((current) => [...current.slice(0, -1), nextRoute]);
  }, []);

  const reset = useCallback((nextRoute: PrototypeRoute) => {
    setHistory([nextRoute]);
  }, []);

  const back = useCallback(() => {
    setHistory((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);

  const goTab = useCallback((name: RouteName) => {
    if (tabRoutes.includes(name)) {
      setHistory([{ name }]);
    }
  }, []);

  return useMemo(
    () => ({ route, canGoBack: history.length > 1, push, replace, reset, back, goTab }),
    [back, goTab, history.length, push, replace, reset, route]
  );
}
