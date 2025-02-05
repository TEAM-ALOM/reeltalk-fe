import AdBanner from "../components/adBanner";
import MovieCardVertical from "../components/movieCard-vertical";

export const metadata = {
  title: "Home",
};

type Movie = {
  id: string;
  poster_path: string;
  title: string;
};

async function getMovies(): Promise<Movie[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL went wrong");
  }
  return fetch(apiUrl).then((response) => response.json());
}
export default async function Home() {
  const movies = await getMovies();

  // 첫 6개의 영화 가져오기
  const topMovies = movies.slice(0, 8);

  return (
    <div className="flex flex-col space-y-10">
      {topMovies.length > 0 && (
        <AdBanner
          key={topMovies[0].id}
          id={topMovies[0].id}
          poster_path={topMovies[0].poster_path}
          title={topMovies[0].title}
        />
      )}

      <span className="font-serif text-xl font-light pl-10">Top 리뷰 순</span>

      {/* 가로 스크롤 컨테이너 */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-10 pb-10">
        {topMovies.map((movie) => (
          <MovieCardVertical
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
          />
        ))}
      </div>
    </div>
  );
}
