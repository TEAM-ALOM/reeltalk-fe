"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
      className="relative w-screen max-w-screen-xl h-96 mt-16 text-white cursor-pointer mx-auto"
    >
      <Image
        src={poster_path || "/default-image.jpg"}
        alt={title}
        layout="fill"
        objectFit="fill"
        className="w-full h-full filter blur-[2px] brightness-75 rounded-lg"
      />

      {/* 텍스트 오버레이 */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm">2024 · Netflix · 스릴러/드라마/TV드라마</p>
      </div>
    </div>
  );
}
