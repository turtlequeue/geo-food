import { useState, useEffect } from "react";

const loadScript = (apiKey: string) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.addEventListener("load", resolve);

    script.src = `https://maps.googleapis.com/maps/api/js?v=3.40&key=${apiKey}`;
    script.id = "google-map-script";

    document.body.appendChild(script);
  });

let loadScriptPromise: Promise<void>;

export const useGoogleApi = (apiKey: string) => {
  const [loaded, setLoaded] = useState(false);
  const [k, setK] = useState(1);

  const google =
    typeof window !== "undefined" ? (window as any).google : undefined;

  useEffect(() => {
    (loadScriptPromise = loadScriptPromise || loadScript(apiKey)).then(() => {
      setLoaded(true);
    });
  }, [apiKey]);

  useEffect(() => {
    if (!loaded) return;

    if (google) return;

    const cancel = requestAnimationFrame(() => setK((k) => k + 1));

    return () => cancelAnimationFrame(cancel);
  }, [k, loaded]);

  return google;
};
