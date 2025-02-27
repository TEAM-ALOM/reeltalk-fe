"use client";

import { useEffect, useState } from "react";
import MovieCardVertical from "../components/movieCard-vertical";
import StarRating from "../components/StarRating";
import ReviewCardHorizontal from "../components/reviewCard-horizontal";
import { getTopRatedMovies, Movie } from "@/lib/api";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Movie[]>([]);

  useEffect(() => {
    getTopRatedMovies().then((data) => {
      setMovies(data);
      setReviews(data); // 현재 테스트용으로 movies 데이터를 reviews로 사용 중
    });
  }, []);

  return (
    <main className="px-10">
      <div className="flex flex-col space-y-3 mt-10 w-full mb-20">
        {/* 🎬 영화 목록 */}
        {movies.map((movie) => (
          <div key={movie.id} className="flex w-full">
            {/* 왼쪽 영화 포스터 */}
            <div className="w-1/5 min-w-[180px]">
              <MovieCardVertical
                title={movie.title}
                id={movie.id}
                poster_path={movie.poster_path}
                isTVSeries={false}
              />
            </div>

            {/* 오른쪽 컨텐츠 */}
            <div className="flex flex-col justify-between w-4/5 py-4">
              {/* 제목 및 평점 컨테이너 */}
              <div className="flex justify-between items-center px-2 ">
                <span className="text-3xl font-medium 2xl:text-5xl">
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
