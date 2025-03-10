export type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  name: string; // 시리즈용 name
  release_date: string;
  genres: { id: number; name: string }[];
};

export type MovieTest = {
  id: string;
  poster_path?: string;
  posterPath?: string; // 백엔드 API 응답 형식
  title: string;
  vote_average?: number;
  rating?: number; // 백엔드 API 응답 형식
  backdrop_path?: string;
  backdropPath?: string; // 백엔드 API 응답 형식
  release_date?: string;
  releaseDate?: string; // 백엔드 API 응답 형식
  genres: { id: number; name: string }[];
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
  talks: unknown[];
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

export type AuthResponse = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

// 토큰 저장 함수
export function saveTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

// 토큰 가져오기 함수
export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
}

// 토큰 삭제 함수 (로그아웃)
export function removeTokens(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

// 로그인 상태 확인 함수
export function isLoggedIn(): boolean {
  return !!getAccessToken();
}

// 사용자 정보 저장
export function saveUserInfo(username: string): void {
  localStorage.setItem("username", username);
}

// 사용자 정보 가져오기
export function getUserInfo(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("username");
  }
  return null;
}

// 사용자 정보 삭제
export function removeUserInfo(): void {
  localStorage.removeItem("username");
}

// API 요청 시 사용할 기본 설정
interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

// API 요청 유틸리티 함수
export async function fetchApi<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = false, headers = {}, ...restOptions } = options;

  // 기본 헤더 설정
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  // 인증이 필요한 경우에만 토큰 추가
  if (requireAuth) {
    const token = getAccessToken();
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    console.log(`API 요청: ${url}`, {
      method: options.method || "GET",
      requireAuth,
      headers: defaultHeaders,
    });

    const response = await fetch(url, {
      headers: defaultHeaders,
      credentials: options.credentials || "omit", // 기본값은 쿠키 제외
      ...restOptions,
    });

    const data = await response.json();
    console.log(`API 응답: ${url}`, {
      status: response.status,
      ok: response.ok,
      data: data,
    });

    if (!response.ok) {
      const errorMessage = data.message || `API 요청 실패: ${response.status}`;
      console.error(`API 오류: ${url}`, errorMessage);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API 요청 오류: ${url}`, error);
    throw error;
  }
}

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  try {
    // fetchApi 유틸리티 함수 사용 (인증 불필요)
    await fetchApi("http://15.164.226.119:8080/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      requireAuth: false, // 명시적으로 인증 불필요 표시
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Register error:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    console.log("로그인 시도:", { email, password: "***" }); // 디버깅용 로그 추가

    // 직접 fetch 호출로 변경하여 문제 해결
    const response = await fetch("http://15.164.226.119:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, // 이메일로 로그인
        password,
      }),
      credentials: "include", // 쿠키 포함 설정
    });

    const data = await response.json();
    console.log("로그인 응답:", data); // 응답 확인용 로그

    if (!response.ok) {
      throw new Error(data.message || "로그인 실패");
    }

    // 응답 구조 확인 및 처리
    if (!data.result) {
      throw new Error("서버 응답 형식이 올바르지 않습니다");
    }

    // 토큰 저장
    if (data.result.accessToken && data.result.refreshToken) {
      saveTokens(data.result.accessToken, data.result.refreshToken);
      saveUserInfo(data.result.username || email); // 응답에 username이 없을 경우 입력값 사용
    } else {
      console.warn("토큰 정보가 응답에 포함되지 않았습니다:", data);
    }

    return data.result;
  } catch (error: unknown) {
    console.error("Login error:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
