import { useCallback, useEffect, useState } from "react";

export default function useParagonGlobal(paragonUserToken) {
  const [paragonReady, setParagonReady] = useState(false);

  const initParagon = useCallback(async () => {
    if (paragonUserToken) {
      await paragon.authenticate(
        process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID,
        paragonUserToken
      );
    }
    setParagonReady(true);
  }, [paragonUserToken]);

  useEffect(() => {
    if (typeof window !== "undefined" && !paragonReady) {
      if (window.paragon) {
        initParagon();
      } else {
        const paragonSrc = document.createElement("script");
        paragonSrc.src = "https://dieciocho-connect.paragonsandbox.com/ui/scripts/sdk.js";
        paragonSrc.onload = initParagon;
        document.body.appendChild(paragonSrc);
      }
    }
  }, [paragonReady, initParagon]);

  if (paragonReady && window.paragon) {
    return window.paragon;
  }
  return undefined;
}
