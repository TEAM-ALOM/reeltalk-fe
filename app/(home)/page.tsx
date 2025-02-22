"use client";

import { useRef, useState, useEffect } from "react";
import AdBanner from "../components/adBanner";
import MovieCardVertical from "../components/movieCard-vertical";
import { Inter } from "next/font/google";
import { makeImagePath } from "@/lib/utils";

const inter = Inter({
  weight: ["500", "400", "300"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

type Movie = {
  id: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
      console.log(data);
    });
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col ">
      {movies.length > 0 && (
        <AdBanner
          key={movies[0].id}
          id={movies[0].id}
          poster_path={movies[0].poster_path}
          title={movies[0].title}
          backdrop_path={makeImagePath(movies[0].backdrop_path)}
        />
      )}

      <span
        className={`pl-10 text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal`}
      >
        Top 리뷰 순
      </span>

      {/* 가로 스크롤 컨테이너 */}
      <div className="relative  flex pb-10 pl-10 pr-5 space-x-4 group">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth"
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <MovieCardVertical key={movie.id} {...movie} isTVSeries={false} />
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＜
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＞
          </button>
        )}
      </div>
    </div>
  );
}
