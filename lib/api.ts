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
  poster_path: string;
  title: string;
  vote_average: number; // ✅ `rating` 값을 여기에 매핑해야 함
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[]; // ✅ 장르 정보 포함
  overview: string;
};

export type MovieContent = {
  id: number;
  adult: boolean;
  country: string;
  overview: string;
  popularity: number;
  ratingCount: number;
  ratingSum: number;
  ratingAverage: number;
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  contentType: string;
  en_title: string;
  kor_title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;

  reviews: Review[];
  talks: any[];
};

export type Review = {
  id: number;
  content_id: number;
  user_id: number;
  image: {
    id: number;
    url: string;
  };
  overview: string;
  video_path: string;
  duration: string | null;
  title: string;
  like_count: number;
  hate_count: string;
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
      "http://15.164.226.119:8080/api/movies?sort=top-rated"
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

export async function fetchContentId(
  contentId: number
): Promise<MovieContent | null> {
  try {
    const response = await fetch(
      `http://15.164.226.119:8080/api/contents/${contentId}`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch content: ${response.statusText}`);

    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error("API 응답에 'result' 필드가 없음");
    }

    return data.result as MovieContent;
  } catch (error) {
    console.log(`Error fetching content ID ${contentId}:` + error);
    return null;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch("http://15.164.226.119:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "로그인 실패");
    }

    return data.result;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.message);
  }
}

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  try {
    const response = await fetch(
      "http://15.164.226.119:8080/api/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "회원가입 실패");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Register error:", error);
    throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}
