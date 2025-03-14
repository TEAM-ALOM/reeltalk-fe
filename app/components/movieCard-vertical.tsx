"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { makeImagePath } from "@/lib/utils";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
  isTVSeries: boolean;
}

export default function MovieCardVertical({
  title,
  id,
  poster_path,
  isTVSeries,
}: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    if (isTVSeries) {
      router.push(`/tv/${id}`);
    } else {
      router.push(`/movies-detail/${id}`);
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className="relative w-60 h-80 2xl:w-[300px] 2xl:h-[420px] flex-shrink-0 text-white cursor-pointer"
      whileHover={{ scale: 0.95 }}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden relative">
        <Image
          src={makeImagePath(poster_path) || "/default-image.jpg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full drop-shadow-md"
        />
      </div>
    </motion.div>
  );
}
