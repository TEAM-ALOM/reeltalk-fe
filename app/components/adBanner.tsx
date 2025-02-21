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
      className="relative w-screen max-w-screen-xl h-[480px] mt-16 text-white cursor-pointer mx-auto"
    >
      <div className="w-full h-full absolute z-10 bg-slate-100 opacity-20"></div>
      <Image
        src={backdrop_path || "/default-image.jpg"}
        alt={title}
        layout="fill"
        objectFit="fill"
        className="w-full h-full rounded-lg"
      />

      <div className="absolute bottom-0 left-0 w-full z-20 p-5 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm">2024 · Netflix · 스릴러/드라마/TV드라마</p>
      </div>
    </div>
  );
}
