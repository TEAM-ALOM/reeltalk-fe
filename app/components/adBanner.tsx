"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
  backdrop_path: string;
}

export default function AdBanner({ title, id, backdrop_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div
      onClick={onClick}
      className="flex justify-center relative w-full h-[600px] text-white cursor-pointer mt-7"
    >
      <div className="absolute z-10 w-full h-full bg-slate-100 opacity-20 "></div>
      <Image
        src={backdrop_path || "/default-image.jpg"}
        alt={title}
        layout="fill"
        objectFit="fill"
        className="w-full h-full rounded-2xl"
      />

      <div className="absolute bottom-0 left-0 z-20 w-full p-5 rounded-b-lg">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm">2024 · Netflix · 스릴러/드라마/TV드라마</p>
      </div>
    </div>
  );
}
