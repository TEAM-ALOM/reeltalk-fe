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
  name: string;
};

// 시리즈로 변경해야 해서 다 수정해야함
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
    `${MOVIE_BASE_PATH}/tv/popular?api_key=${API_KEY}`
  );
  const data = await response.json();

  return data.results;
}

export default function Movies() {
  const [tvs, setTvs] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((data) => {
      setTvs(data);
      setReviews(data); // 현재 테스트용으로 movies 데이터를 reviews로 사용 중
    });
  }, []);

  return (
    <main className="px-10">
      <div className="flex flex-col space-y-10 mt-10 w-full">
        {/* Tv 시리즈 목록 */}
        {tvs.map((tv) => (
          <div key={tv.id} className="flex w-full">
            {/* 왼쪽 영화 포스터 */}
            <div className="w-1/4 min-w-[180px]">
              <MovieCardVertical
                title={tv.name}
                id={tv.id}
                poster_path={tv.poster_path}
                isTVSeries={true}
              />
            </div>

            {/* 오른쪽 컨텐츠 */}
            <div className="flex flex-col justify-between w-3/4 py-4">
              {/* 제목 및 평점 컨테이너 */}
              <div className="flex justify-between items-center px-2">
                <span className="text-xl font-bold 2xl:text-2xl">
                  {tv.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 2xl:text-2xl">평점</span>
                  <span className="text-lg font-semibold 2xl:text-2xl">
                    {tv.vote_average.toFixed(1)}
                  </span>
                  <StarRating rating={tv.vote_average} />
                </div>
              </div>

              {/* 리뷰 영상 가로형 */}
              <div className="relative flex pb-3 pl-2 space-x-4 group">
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
