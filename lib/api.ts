export type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  name: string; // 시리즈용 name
  release_date: string;
  genres: { id: number; name: string }[]; // ✅ 장르 정보 포함
  overview: string;
};

export type MovieTest = {
  id: string;
  adult: boolean,
  poster_path: string;
  title: string;
  vote_average: number; // ✅ `rating` 값을 여기에 매핑해야 함
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[]; // ✅ 장르 정보 포함
  overview: string;

  reviews: {
    createdAt: string,
    updatedAt: string,
    id: number,

    content: {
      createdAt: string,
      updatedAt: string,
      id: string,
      adult: boolean,
      country: string,
      overview: string,
      popularity: number,
      ratingCount: number,
      ratingSum: number,
      ratingAverage: number,
      genres: {id: string, name: string}[],
      runtime: number,
      en_title: string,
      kor_title: string,
      backdrop_path: string,
      poster_path: string,
      release_date: string,
    },

    user: {
      id: number,
      email: string,
      password: string,
      createdAt: string,
      updatedAt: string,
      role: string,
    },

    image: {
      id: number,
      url: string,
    },

    overview: string,
    videoPath: string,
    duration: null,
    title: string,
    reviewLikes: [],
    comments: [],
    likeCount: number,
    hateCount: number,
  }[],
};

export async function fetchReviewCount() {
  try {
    const res = await fetch("https://api.reeltalk.com/reviews/count"); // API 주소에 맞게 수정
    if (!res.ok) throw new Error("Failed to fetch review count");
    const data = await res.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching review count:", error);
    return 0;
  }
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const MOVIE_BASE_PATH = process.env.NEXT_PUBLIC_API_URL_MOVIE;
  const API_KEY = process.env.NEXT_PUBLIC_API_URL_KEY;

  if (!MOVIE_BASE_PATH) {
    throw new Error("MOVIE_BASE_PATH went wrong");
  }

  if (!API_KEY) {
    throw new Error("API_KEY went wrong");
  }

  const response = await fetch(
    `${MOVIE_BASE_PATH}/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();

  return data.results;
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
  const MOVIE_BASE_PATH = process.env.NEXT_PUBLIC_API_URL_MOVIE;
  const API_KEY = process.env.NEXT_PUBLIC_API_URL_KEY;

  if (!MOVIE_BASE_PATH) {
    throw new Error("MOVIE_BASE_PATH went wrong");
  }

  if (!API_KEY) {
    throw new Error("API_KEY went wrong");
  }

  const response = await fetch(
    `${MOVIE_BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  );
  const data = await response.json();

  return data.results;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const MOVIE_BASE_PATH = process.env.NEXT_PUBLIC_API_URL_MOVIE;
  const API_KEY = process.env.NEXT_PUBLIC_API_URL_KEY;

  if (!MOVIE_BASE_PATH) {
    throw new Error("MOVIE_BASE_PATH went wrong");
  }

  if (!API_KEY) {
    throw new Error("API_KEY went wrong");
  }

  const response = await fetch(
    `${MOVIE_BASE_PATH}/movie/upcoming?api_key=${API_KEY}`
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

export async function testMovies(): Promise<MovieTest[]> {
  try {
    const response = await fetch(
      "http://15.164.226.119:8080/api/movies?sort=releaseDate"
    );

    if (!response.ok)
      throw new Error(`Failed to fetch movies: ${response.statusText}`);

    const data = await response.json();
    console.log(data);
    console.log("API 응답 데이터:", data); // ✅ API 응답을 콘솔에 출력

    if (!data.result) throw new Error("API 응답에 'result' 필드가 없음");

    return data.result || []; // ✅ `result`가 없으면 빈 배열 반환
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // ✅ 오류 발생 시 빈 배열 반환
  }
}