"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { makeImagePath } from "@/lib/utils";

interface IReviewProps {
  title: string;
  id: string;
  backdrop_path: string;
  isTop2?: boolean;
  rank?: number;
}

export default function ReviewCardHorizontal({
  title,
  id,
  backdrop_path,
  isTop2,
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
      className={`relative flex-shrink-0 text-white cursor-pointer ${
        isTop2
          ? "w-[500px] h-[300px] 2xl:w-[670px] 2xl:h-[400px]"
          : "w-[340px] h-56 2xl:w-[440px] 2xl:h-[270px]"
      }`}
      whileHover={{ scale: 0.95 }}
    >
      {rankBadge && (
        <div className="absolute z-10 left-5">
          <Image src={rankBadge} alt={`${rank}위`} width={50} height={50} />
        </div>
      )}

      <div className="relative w-full h-full overflow-hidden rounded-3xl">
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
