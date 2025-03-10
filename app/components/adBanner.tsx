"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IMovieProps {
  movies: {
    id: string | number;
    title: string;
    poster_path?: string;
    backdrop_path?: string;
    backdropPath?: string; // API 응답 형식에 맞게 추가
    posterPath?: string; // API 응답 형식에 맞게 추가
    release_date?: string;
    releaseDate?: string; // API 응답 형식에 맞게 추가
    genres?: { id: number; name: string }[];
  }[];
}

export default function AdBanner({ movies }: IMovieProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5초마다 다음 영화로 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies || movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];

  // 백드롭 경로 처리 (다양한 형식 지원)
  const getImageUrl = (path?: string): string => {
    if (!path) return "/default-image.jpg";

    // 이미 완전한 URL인 경우 (http 또는 https로 시작)
    if (path.startsWith("http")) {
      return path;
    }

    // 상대 경로인 경우 (슬래시로 시작)
    if (path.startsWith("/")) {
      // TMDB API 형식인 경우
      if (
        path.includes(".jpg") ||
        path.includes(".png") ||
        path.includes(".jpeg")
      ) {
        return `https://image.tmdb.org/t/p/original${path}`;
      }
      // 다른 형식의 상대 경로인 경우
      return path;
    }

    // 그 외의 경우 (파일명만 있는 경우 등)
    return `https://image.tmdb.org/t/p/original/${path}`;
  };

  // 백드롭 이미지 URL 결정
  const backdropPath = getImageUrl(
    currentMovie.backdrop_path || currentMovie.backdropPath
  );

  // 출시 연도 추출
  const releaseYear = currentMovie.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : currentMovie.releaseDate
    ? new Date(currentMovie.releaseDate).getFullYear()
    : "미정";

  // 장르 문자열 생성
  const genreString =
    currentMovie.genres && currentMovie.genres.length > 0
      ? currentMovie.genres.map((genre) => genre.name).join("/")
      : "장르 정보 없음";

  const handleClick = () => {
    router.push(`/movies/${currentMovie.id}`);
  };

  return (
    <div className="relative w-full h-[600px] mt-7 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClick}
          className="flex justify-center relative w-full h-full text-white cursor-pointer"
        >
          <div className="absolute z-10 w-full h-full bg-gradient-to-t from-black/70 to-transparent"></div>
          <Image
            src={backdropPath}
            alt={currentMovie.title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-2xl"
            priority
          />

          <div className="absolute bottom-0 left-0 z-20 w-full p-8 rounded-b-lg">
            <h2 className="text-4xl font-bold mb-2">{currentMovie.title}</h2>
            <p className="text-lg">
              {releaseYear} · {genreString}
            </p>
          </div>

          {/* 슬라이드 인디케이터 */}
          <div className="absolute bottom-4 right-4 z-30 flex space-x-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
