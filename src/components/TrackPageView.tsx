"use client";

import { useEffect } from "react";
import { trackEvent } from "@/data/site";

export default function TrackPageView({
  eventName,
  payload,
}: {
  eventName: string;
  payload?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(eventName, payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
