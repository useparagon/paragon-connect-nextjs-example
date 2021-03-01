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
        <p style={{ fontWeight: 500 }}>{title}</p>
        <img src="https://pbs.twimg.com/profile_images/1166852405327101957/lf0QNniz.jpg" />
      </header>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={router.asPath === "/" ? styles.active : ""}>Tasks</a>
        </Link>
        <Link href="/integrations">
          <a className={router.asPath === "/integrations" ? styles.active : ""}>Integrations</a>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
