// 환경 변수 상수 선언
export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const MOVIE_BASE_PATH = process.env.NEXT_PUBLIC_API_URL_MOVIE;
export const API_KEY = process.env.NEXT_PUBLIC_API_URL_KEY;

// 환경 변수 유효성 검사
if (!SERVER_BASE_URL) {
  console.error("Server_Base_URL 환경 변수가 설정되지 않았습니다.");
}

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
  backdropPath: string;
  overview: string;
  popularity: number;
  rating: number;
  poster_path: string;
  releaseDate: string;
  title: string;

  genres: {
    id: number;
    name: string;
  }[];

  reviews: {
    id: number;
    contentId: number;
    userId: number;

    image: {
      id: number;
      url: string;
    };

    overview: string;
    videoPath: string;
    duration: number | null;
    title: string;
    likeCount: number;
    hateCount: number;
  }[];
};

export type DetailedMovie = MovieContent & {
  createdAt: string;
  updatedAt: string;
  country: string;
  ratingCount: number;
  ratingSum: number;
  ratingAverage: number;
  runtime: number;
  tagline: string;
  contentType: string;
  numberOfSeasons: number | null;
  numberOfEpisodes: number | null;
  en_title: string;
  kor_title: string;
  talks: unknown[];
};

export type UserId = {
  user_id: number;
  username: string;
  description: null;
  email: string;
  image_url: null;
  best_reviews: BestRecentReviews[];
  recent_reviews: BestRecentReviews[];
};

export type AllReviews = {
  reviewId: number;
  title: string;
  authorId: number;
  author: string;
  overview: string;
  videoPath: string;
  publishedAt: string;
  thumbnail: string;
  likeCount: number;
  hateCount: number;
};

export type BestRecentReviews = {
  id: number;
  title: string;
  username: string;
  user_id: number;
  overview: string;
  video_path: string;
  published_at: string;
  duration: null;
  thumbnail: string;
  like_count: number;
  hate_count: number;
};

export async function fetchReviewCount() {
  try {
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    const res = await fetch(`${SERVER_BASE_URL}api/reviews/count`);
    if (!res.ok) throw new Error("Failed to fetch review count");
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching review count:", error);
    return 0;
  }
}

export async function getTopRatedMovies(): Promise<Movie[]> {
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
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    const response = await fetch(`${SERVER_BASE_URL}api/movies?sort=top-rated`);

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
): Promise<DetailedMovie | null> {
  try {
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    const response = await fetch(`${SERVER_BASE_URL}api/contents/${contentId}`);

    if (!response.ok)
      throw new Error(`Failed to fetch content: ${response.statusText}`);

    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error("API 응답에 'result' 필드가 없음");
    }

    return data.result as DetailedMovie;
  } catch (error) {
    console.log(`Error fetching content ID ${contentId}:` + error);
    return null;
  }
}

export async function fetchReviews(
  contentId: number
): Promise<AllReviews[] | null> {
  try {
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    const response = await fetch(
      `${SERVER_BASE_URL}api/reviews?contentId=${contentId}`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch content : ${response.statusText}`);

    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error("API 응답에 'result' 필드가 없음");
    }

    return data.result as AllReviews[];
  } catch (error) {
    console.log(`Error fetching content ID ${contentId}: ` + error);
    return null;
  }
}

export async function fetchUserId(userId: number): Promise<UserId | null> {
  try {
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    const response = await fetch(`${SERVER_BASE_URL}api/mypage/${userId}`);

    if (!response.ok)
      throw new Error(`Failed to fetch content : ${response.statusText}`);

    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error("API 응답에 'result' 필드가 없음");
    }

    return data.result as UserId;
  } catch (error) {
    console.log(`Error fetching content ID ${userId}: ` + error);
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
  removeUserId();
  removeUserInfo();
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

// 사용자 ID 저장
export function saveUserId(userId: number): void {
  localStorage.setItem("userId", userId.toString());
}

// 사용자 ID 가져오기
export function getUserId(): number | null {
  if (typeof window !== "undefined") {
    const userIdStr = localStorage.getItem("userId");
    if (userIdStr) {
      return parseInt(userIdStr, 10);
    }
  }
  return null;
}

// 사용자 ID 삭제
export function removeUserId(): void {
  localStorage.removeItem("userId");
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
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    // fetchApi 유틸리티 함수 사용 (인증 불필요)
    await fetchApi(`${SERVER_BASE_URL}api/users/signup`, {
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
    if (!SERVER_BASE_URL) {
      throw new Error("SERVER_BASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    console.log("로그인 시도:", { email, password: "***" }); // 디버깅용 로그 추가

    // 직접 fetch 호출로 변경하여 문제 해결
    const response = await fetch(`${SERVER_BASE_URL}api/users/login`, {
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

      // 사용자 ID 저장 (응답에 userId가 있는 경우)
      if (data.result.userId) {
        saveUserId(data.result.userId);
      }
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
