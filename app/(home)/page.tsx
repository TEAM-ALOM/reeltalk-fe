import AdBanner from "../components/adBanner";
import styles from "../styles/home.module.css";

export const metadata = {
  title: "Home",
};

async function getMovies() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  return fetch(apiUrl).then((response) => response.json());
}

export default async function Home() {
  const movies = await getMovies();

  // 첫 번째 영화만 가져오기
  const firstMovie = movies.length > 0 ? movies[0] : null;

  return (
    <div className={styles.container}>
      {firstMovie && (
        <AdBanner
          key={firstMovie.id}
          id={firstMovie.id}
          poster_path={firstMovie.poster_path}
          title={firstMovie.title}
        />
      )}
    </div>
  );
}
