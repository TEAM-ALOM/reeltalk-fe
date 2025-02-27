"use client";

import { useRef, useState, useEffect } from "react";
import AdBanner from "../components/adBanner";
import MovieCardVertical from "../components/movieCard-vertical";
import { Inter } from "next/font/google";
import { makeImagePath } from "@/lib/utils";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  Movie,
} from "@/lib/api";
import StarRating from "../components/StarRating";
import { StarIcon } from "@heroicons/react/24/solid";

const inter = Inter({
  weight: ["500", "400", "300"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export default function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTopRatedMovies().then((data) => {
      setTopRatedMovies(data);
    });
    getNowPlayingMovies().then((data) => {
      setNowPlayingMovies(data);
    });
    getUpcomingMovies().then((data) => {
      setUpcomingMovies(data);
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
    <div className="flex flex-col items-center px-7">
      {topRatedMovies.length > 0 && (
        <AdBanner
          key={topRatedMovies[0].id}
          id={topRatedMovies[0].id}
          poster_path={topRatedMovies[0].poster_path}
          title={topRatedMovies[0].title}
          backdrop_path={makeImagePath(topRatedMovies[0].backdrop_path)}
        />
      )}

      <span
        className={`text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal  self-start`}
      >
        영화 별점 순
      </span>

      {/* 가로 스크롤 컨테이너 */}
      <div className="relative flex pb-10 space-x-4 group w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth w-full  px-10"
          onScroll={handleScroll}
        >
          {topRatedMovies.map((movie) => (
            <div key={movie.id}>
              <MovieCardVertical key={movie.id} {...movie} isTVSeries={false} />
              <div className="flex items-center space-x-2 2xl:text-2xl ml-4">
                <StarIcon className=" text-ReelTalk_Yellow size-6" />
                <span className="text-lg font-semibold 2xl:text-2xl text-gray-500">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
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
      <span
        className={`text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal  self-start`}
      >
        현재 상영 중
      </span>
      {/* 가로 스크롤 컨테이너 */}
      <div className="relative flex pb-10 space-x-4 group w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth w-full  px-10"
          onScroll={handleScroll}
        >
          {nowPlayingMovies.map((movie) => (
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
      <span
        className={`text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal  self-start`}
      >
        개봉 예정작
      </span>
      {/* 가로 스크롤 컨테이너 */}
      <div className="relative flex pb-10 space-x-4 group w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth w-full  px-10"
          onScroll={handleScroll}
        >
          {upcomingMovies.map((movie) => (
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
