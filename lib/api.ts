export type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  name: string; // 시리즈용 name
};

export async function fetchReviewCount() {
  try {
    const response = await fetch("https://api.reeltalk.com/reviews/count"); // API 주소에 맞게 수정해야함 만들어야 할 듯
    if (!response.ok) throw new Error("Failed to fetch review count");
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching review count:", error);
    return 0;
  }
}

export async function getMovies(): Promise<Movie[]> {
  const MOVIE_BASE_PATH = process.env.NEXT_PUBLIC_API_URL_MOVIE;
  const API_KEY = process.env.NEXT_PUBLIC_API_URL_KEY;

  if (!MOVIE_BASE_PATH) {
    throw new Error("MOVIE_BASE_PATH went wrong");
  }

  if (!API_KEY) {
    throw new Error("API_KEY went wrong");
  }

  const response = await fetch(
    `${MOVIE_BASE_PATH}/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();

  return data.results;
}

export async function getSeries(): Promise<Movie[]> {
  const MOVIE_BASE_PATH = process.env.NEXT_PUBLIC_API_URL_MOVIE;
  const API_KEY = process.env.NEXT_PUBLIC_API_URL_KEY;

  if (!MOVIE_BASE_PATH) {
    throw new Error("MOVIE_BASE_PATH went wrong");
  }

  if (!API_KEY) {
    throw new Error("API_KEY went wrong");
  }

  const response = await fetch(
    `${MOVIE_BASE_PATH}/tv/popular?api_key=${API_KEY}`
  );
  const data = await response.json();

  return data.results;
}
