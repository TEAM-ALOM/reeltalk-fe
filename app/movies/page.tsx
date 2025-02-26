"use client";

import { useEffect, useState } from "react";
import MovieCardVertical from "../components/movieCard-vertical";
import StarRating from "../components/StarRating";
import ReviewCardHorizontal from "../components/reviewCard-horizontal";

type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
};

async function getMovies(): Promise<Movie[]> {
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

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
      setReviews(data); // 현재 테스트용으로 movies 데이터를 reviews로 사용 중
    });
  }, []);

  return (
    <main className="px-10">
      <div className="flex flex-col space-y-10 mt-10 w-full mb-20">
        {/* 🎬 영화 목록 */}
        {movies.map((movie) => (
          <div key={movie.id} className="flex w-full">
            {/* 왼쪽 영화 포스터 */}
            <div className="w-1/4 min-w-[180px]">
              <MovieCardVertical
                title={movie.title}
                id={movie.id}
                poster_path={movie.poster_path}
                isTVSeries={false}
              />
            </div>

            {/* 오른쪽 컨텐츠 */}
            <div className="flex flex-col justify-between w-3/4 py-4">
              {/* 제목 및 평점 컨테이너 */}
              <div className="flex justify-between items-center px-2 ">
                <span className="text-xl font-bold 2xl:text-2xl">
                  {movie.title}
                </span>
                <div className="flex items-center space-x-2 2xl:text-2xl">
                  <span className="text-gray-600">평점</span>
                  <span className="text-lg font-semibold 2xl:text-2xl">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <StarRating rating={movie.vote_average} />
                </div>
              </div>

              {/* 리뷰 영상 가로형 */}
              <div className="relative flex pb-3 pl-2 space-x-4 group ">
                <div className="flex gap-4 overflow-x-auto scroll-smooth">
                  {reviews.map((review) => (
                    <ReviewCardHorizontal key={review.id} {...review} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
