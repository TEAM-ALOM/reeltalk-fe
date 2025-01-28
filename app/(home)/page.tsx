import styles from "../styles/home.module.css";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  return <div className={styles.container}></div>;
}
