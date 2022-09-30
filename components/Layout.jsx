import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";

const Layout = ({ children, title }) => {
  const router = useRouter();

  return (
    <div className="page">
      <header className={styles.header}>
        <p>TaskLab</p>
        <p style={{ fontWeight: 500, textAlign: "center" }}>{title}</p>
        {router.asPath !== "/integrations" ? (
          <Link href="/integrations">
            <a className={styles.gotoIntegrations}>View integrations</a>
          </Link>
        ) : (
          <Link href="/tasks">
            <a className={styles.gotoIntegrations}>Back to tasks</a>
          </Link>
        )}
      </header>
      {children}
    </div>
  );
};

export default Layout;
