import Layout from "../components/Layout";
import styles from "../styles/Integrations.module.css";
import icons from "../icons";
import names from "../names";

export default function Integrations() {
  const integrations = ["slack"];

  return (
    <Layout title="Integrations">
      <div className={styles.container}>
        {integrations.map((integration) => (
          <div className={styles.row}>
            <img src={icons[integration]} />
            <p>{names[integration]}</p>
            <button>Enable</button>
          </div>
        ))}
        ``
      </div>
    </Layout>
  );
}
