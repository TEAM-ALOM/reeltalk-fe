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

      console.log(reviews[0]);
    });
  }, []);

  return (
    <main>
      <div className="w-full flex flex-col justify-center">
        {/* 페이지 제목 컨테이너 */}
        <div className="flex w-full justify-start mt-10 ml-10">
          <span className="text-ReelTalk_Yellow text-3xl">TOP 리뷰</span>
        </div>

        {/* Top2 리뷰 컨테이너 */}
        <div className="flex justify-around w-full h-full mt-10 px-16">
          {reviews.slice(0, 2).map((review) => (
            <ReviewCardHorizontal
              key={review.id}
              width={540}
              height={320}
              {...review}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
