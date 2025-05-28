import { useCallback, useEffect, useState } from "react";
import { paragon, SDK_EVENT } from "@useparagon/connect";

if (typeof window !== "undefined") {
  window.paragon = paragon;
}

function decodeJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload =
      typeof window === "undefined"
        ? Buffer.from(base64Payload, "base64").toString("utf8")
        : atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return {};
  }
}

const REFRESH_BUFFER_MS = 60 * 1000; // refresh one minute before token expiry

export default function useParagon(initialToken) {
  const [paragonUserToken, setParagonUserToken] = useState(initialToken);
  const [user, setUser] = useState(paragon.getUser());
  const [error, setError] = useState();

  const updateUser = useCallback(() => {
    const authedUser = paragon.getUser();
    if (authedUser.authenticated) {
      setUser({ ...authedUser });
    }
  }, []);

  // Listen for account state changes
  useEffect(() => {
    paragon.subscribe(SDK_EVENT.ON_INTEGRATION_INSTALL, updateUser);
    paragon.subscribe("onIntegrationUninstall", updateUser);
    return () => {
      paragon.unsubscribe("onIntegrationInstall", updateUser);
      paragon.unsubscribe("onIntegrationUninstall", updateUser);
    };
  }, []);

  // Authenticate with the current token
  useEffect(() => {
    if (!error && paragonUserToken) {
      paragon
        .authenticate(
          process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID,
          paragonUserToken,
        )
        .then(() => {
          const authedUser = paragon.getUser();
          if (authedUser.authenticated) {
            setUser(authedUser);
          }
        })
        .catch(setError);
    }
  }, [error, paragonUserToken]);

  // Refresh the token before it expires
  useEffect(() => {
    if (!paragonUserToken || typeof window === "undefined") return;
    const payload = decodeJwt(paragonUserToken);
    if (!payload.exp) return;

    async function refresh() {
      try {
        const resp = await fetch("/api/paragon-token");
        if (resp.ok) {
          const data = await resp.json();
          setParagonUserToken(data.paragonUserToken);
        }
      } catch (e) {
        console.error("Failed to refresh Paragon token", e);
      }
    }

    const refreshTime = payload.exp * 1000 - Date.now() - REFRESH_BUFFER_MS;
    const timer = setTimeout(refresh, Math.max(refreshTime, 0));
    return () => clearTimeout(timer);
  }, [paragonUserToken]);

  return {
    paragon,
    user,
    error,
    updateUser,
  };
}
