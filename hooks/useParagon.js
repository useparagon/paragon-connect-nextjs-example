import { useCallback, useEffect, useState } from "react";
import { paragon } from "@useparagon/qa-connect";

export default function useParagon(paragonUserToken) {
  const [user, setUser] = useState(paragon.getUser());
  const [error, setError] = useState();

  const listener = useCallback(() => {
    const authedUser = paragon.getUser();
    if (authedUser.authenticated) {
      setUser({ ...authedUser });
    }
  }, []);

  // Listen for account state changes
  useEffect(() => {
    paragon.subscribe("onIntegrationInstall", listener);
    paragon.subscribe("onIntegrationUninstall", listener);
    return () => {
      paragon.unsubscribe("onIntegrationInstall", listener);
      paragon.unsubscribe("onIntegrationUninstall", listener);
    };
  }, []);

  useEffect(() => {
    if (!error && !user.authenticated) {
      paragon
        .authenticate(
          process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID,
          paragonUserToken
        )
        .then(() => {
          const authedUser = paragon.getUser();
          if (authedUser.authenticated) {
            setUser(authedUser);
          }
        })
        .catch(setError);
    }
  }, [error, user]);

  return { paragon, user, error, listener };
}
