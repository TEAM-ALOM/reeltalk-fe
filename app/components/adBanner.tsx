"use client";

import { useRouter } from "next/navigation";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}

export default function AdBanner({ title, id, poster_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div
      onClick={onClick}
      className="relative w-screen h-72 px-10 mt-16 text-white cursor-pointer"
    >
      {/* 이미지 영역 */}
      <div className="w-full h-full rounded-lg overflow-hidden relative">
        <img
          src={poster_path}
          alt={title}
          className="w-full h-full object-cover drop-shadow-md"
        />

        {/* 오버레이 (검은색 반투명 배경) */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-5">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          {/* 추가 정보 */}
          <p className="text-sm text-black">
            2024 · Netflix · 스릴러/드라마/TV드라마
          </p>
        </div>
      </div>
    </div>
  );
}
