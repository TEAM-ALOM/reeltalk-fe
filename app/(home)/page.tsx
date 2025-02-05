"use client";

import { useRef, useState, useEffect } from "react";
import AdBanner from "../components/adBanner";
import MovieCardVertical from "../components/movieCard-vertical";

type Movie = {
  id: string;
  poster_path: string;
  title: string;
};

async function getMovies(): Promise<Movie[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL went wrong");
  }
  return fetch(apiUrl).then((response) => response.json());
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  const topMovies = movies.slice(0, 8);

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
    <div className="flex flex-col space-y-10">
      {topMovies.length > 0 && (
        <AdBanner
          key={topMovies[0].id}
          id={topMovies[0].id}
          poster_path={topMovies[0].poster_path}
          title={topMovies[0].title}
        />
      )}

      <span className="pl-10 font-serif text-xl font-light">Top 리뷰 순</span>

      {/* 가로 스크롤 컨테이너 */}
      <div className="relative flex pb-10 pl-10 space-x-4 group">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth"
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <MovieCardVertical key={movie.id} {...movie} />
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
