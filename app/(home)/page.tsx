"use client";

import { useRef, useState, useEffect } from "react";
import AdBanner from "../components/adBanner";
import MovieCardVertical from "../components/movieCard-vertical";
import { Inter } from "next/font/google";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  testMovies,
  Movie,
  MovieTest,
} from "@/lib/api";
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
  const [featuredMovies, setFeaturedMovies] = useState<MovieTest[]>([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const nowPlayingRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);

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

    testMovies().then((data) => {
      const featured = data.slice(0, 5);
      setFeaturedMovies(featured);
    });
  }, []);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      if (ref === scrollContainerRef) {
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
      }
    }
  };

  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const bannerMovies =
    featuredMovies.length > 0
      ? featuredMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          backdropPath: movie.backdropPath,
          poster_path: movie.poster_path,
          posterPath: movie.posterPath,
          release_date: movie.release_date,
          releaseDate: movie.releaseDate,
          genres: movie.genres,
        }))
      : topRatedMovies.slice(0, 5).map((movie) => ({
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          genres: movie.genres,
        }));

  console.log("배너 영화 데이터:", bannerMovies);

  return (
    <div className="flex flex-col items-center px-28">
      {bannerMovies.length > 0 && <AdBanner movies={bannerMovies} />}

      <span
        className={`text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal self-start`}
      >
        영화 별점 순
      </span>

      <div className="relative flex w-full pb-10 space-x-4 overflow-hidden group">
        <div
          ref={scrollContainerRef}
          className="flex w-full gap-4 overflow-x-auto scroll-smooth"
          onScroll={() => handleScroll(scrollContainerRef)}
        >
          {topRatedMovies.map((movie) => (
            <div key={movie.id}>
              <MovieCardVertical key={movie.id} {...movie} isTVSeries={false} />
              <div className="flex items-center space-x-2 2xl:text-2xl">
                <StarIcon className="text-ReelTalk_Yellow size-6" />
                <span className="text-lg font-semibold text-gray-500 2xl:text-2xl">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll("left", scrollContainerRef)}
            className="absolute left-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＜
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right", scrollContainerRef)}
            className="absolute right-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＞
          </button>
        )}
      </div>

      <span
        className={`text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal self-start`}
      >
        현재 상영 중
      </span>
      <div className="relative flex w-full pb-10 space-x-4 overflow-hidden group">
        <div
          ref={nowPlayingRef}
          className="flex w-full gap-4 overflow-x-auto scroll-smooth"
          onScroll={() => handleScroll(nowPlayingRef)}
        >
          {nowPlayingMovies.map((movie) => (
            <MovieCardVertical key={movie.id} {...movie} isTVSeries={false} />
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll("left", nowPlayingRef)}
            className="absolute left-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＜
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right", nowPlayingRef)}
            className="absolute right-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＞
          </button>
        )}
      </div>

      <span
        className={`text-2xl my-6 text-ReelTalk_Yellow ${inter.className} font-normal self-start`}
      >
        개봉 예정작
      </span>
      <div className="relative flex w-full pb-10 space-x-4 overflow-hidden group">
        <div
          ref={upcomingRef}
          className="flex w-full gap-4 overflow-x-auto scroll-smooth"
          onScroll={() => handleScroll(upcomingRef)}
        >
          {upcomingMovies.map((movie) => (
            <MovieCardVertical key={movie.id} {...movie} isTVSeries={false} />
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll("left", upcomingRef)}
            className="absolute left-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＜
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right", upcomingRef)}
            className="absolute right-0 p-2 text-lg font-semibold text-gray-300 -translate-y-1/2 bg-white rounded-full opacity-0 top-1/2 group-hover:opacity-80"
          >
            ＞
          </button>
        )}
      </div>
    </div>
  );
}
