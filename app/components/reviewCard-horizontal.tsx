"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { makeImagePath } from "@/lib/utils";

interface IReviewProps {
  title: string;
  id: string;
  backdrop_path: string;
  width?: number;
  height?: number;
  rank?: number;
}

export default function ReviewCardHorizontal({
  title,
  id,
  backdrop_path,
  width = 320,
  height = 208,
  rank,
}: IReviewProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/reviews/${id}`);
  };

  const rankBadge =
    rank === 1
      ? "/icons/1st_Badge.png" // 1위 배지
      : rank === 2
      ? "/icons/2nd_Badge.png" // 2위 배지
      : null;

  return (
    <motion.div
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex-shrink-0 text-white cursor-pointer"
      whileHover={{ scale: 0.95 }}
    >
      {rankBadge && (
        <div className="absolute left-5 z-10">
          <Image src={rankBadge} alt={`${rank}위`} width={50} height={50} />
        </div>
      )}

      <div className="w-full h-full rounded-3xl overflow-hidden relative">
        <Image
          src={makeImagePath(backdrop_path) || "/icons/Apple_logo_white.png"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full drop-shadow-md"
        />
      </div>
    </motion.div>
  );
}
