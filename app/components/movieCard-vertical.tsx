"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}

export default function MovieCardVertical({
  title,
  id,
  poster_path,
}: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <motion.div
      onClick={onClick}
      className="relative w-56 h-80 flex-shrink-0 text-white cursor-pointer"
      whileHover={{ scale: 0.95 }}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden relative">
        <Image
          src={poster_path || "/default-image.jpg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full drop-shadow-md"
        />
      </div>
    </motion.div>
  );
}
