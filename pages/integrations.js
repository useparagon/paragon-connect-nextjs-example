import { paragon } from '@useparagon/connect';
import Layout from "../components/Layout";
import useParagon from "../hooks/useParagon";
import styles from "../styles/Integrations.module.css";

export default function Integrations({ paragonUserToken }) {
  const { user } = useParagon(paragonUserToken);

  return (
    <Layout title="Integrations">
      <div className={styles.container}>
        {paragon.getIntegrationMetadata().map((integration) => {
          // Check the user state if this integration is enabled for the user
          const integrationEnabled =
            user.authenticated && user.integrations[integration.type]?.enabled;

          return (
            <div key={integration.type} className={styles.row}>
              <img src={integration.icon} style={{ maxWidth: "30px" }} />
              <p>{integration.name}</p>

              {/* When clicked, display the Connect Portal for this integration */}
              <button onClick={() => paragon.connect(integration.type)}>
                {integrationEnabled ? "Manage" : "Enable"}
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
