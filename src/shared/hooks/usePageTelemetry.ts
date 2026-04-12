import { useEffect } from "react";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";

export const usePageTelemetry = (stage: PageStage) => {
  const { startTracking, stopTracking, setPageStage } = useTelemetryStore();

  useEffect(() => {
    setPageStage(stage);
    startTracking();

    return () => stopTracking();
  }, [stage, setPageStage, startTracking, stopTracking]);
};
