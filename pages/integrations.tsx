import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import useParagonGlobal from "../hooks/useParagonGlobal";
import styles from "../styles/Integrations.module.css";

export default function Integrations({ paragonUserToken }) {
  const paragon = useParagonGlobal(paragonUserToken);

  // Get all integrations for this Paragon project to render their names and icons
  const [integrations, setIntegrations] = useState(
    paragon?.getIntegrationMetadata() || []
  );

  // Listen for account state changes
  useEffect(() => {
    const listener = () => {
      setIntegrations(paragon?.getIntegrationMetadata() || []);
    };
    listener();
    paragon?.subscribe("onIntegrationInstall", listener);
    paragon?.subscribe("onIntegrationUninstall", listener);
    return () => {
      paragon?.unsubscribe("onIntegrationInstall", listener);
      paragon?.unsubscribe("onIntegrationUninstall", listener);
    };
  }, [paragon]);

  const user = paragon?.getUser();

  // Conditionally install/uninstall based on current state
  const onClickIntegration = useCallback((type) => {
    if (user?.authenticated) {
      const integrationEnabled = user.integrations[type]?.enabled;
      if (integrationEnabled) {
        paragon!.uninstallIntegration(type);
      } else {
        paragon!.installIntegration(type);
      }
    }
  }, [user]);

  return (
    <Layout title="Integrations">
      <div className={styles.container}>
        {user?.authenticated ? (
          integrations.map((integration) => {
            const integrationEnabled =
              user.integrations[integration.type]?.enabled;

            return (
              <div key={integration.type} className={styles.row}>
                <img src={integration.icon} style={{ maxWidth: "30px" }} />
                <p>{integration.name}</p>
                <button
                  onClick={() => onClickIntegration(integration.type)}
                >
                  {integrationEnabled ? "Uninstall" : "Install"}
                </button>
              </div>
            );
          })
        ) : (
          <div className={styles.row}>Waiting for user to authenticate...</div>
        )}
      </div>
    </Layout>
  );
}
