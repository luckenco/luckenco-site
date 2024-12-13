interface FathomTrackEventData {
  _value: number;
}

interface Fathom {
  trackEvent: (eventName: string, data?: FathomTrackEventData) => void;
}

declare global {
  interface Window {
    fathom: Fathom;
  }
}

export {};
