"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { makeImagePath } from "@/lib/utils";

interface IReviewProps {
  title: string;
  id: string;
  backdrop_path: string;
}

export default function ReviewCardHorizontal({
  title,
  id,
  backdrop_path,
}: IReviewProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/reviews/${id}`);
  };

  return (
    <motion.div
      onClick={onClick}
      className="relative w-80 h-52 flex-shrink-0 text-white cursor-pointer"
      whileHover={{ scale: 0.95 }}
    >
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
