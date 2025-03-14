type StarRatingProps = {
  rating: number;
  maxStars?: number;
};

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const filledStars = Math.floor(rating / 2); // 가득 찬 별 개수
  const hasHalfStar = rating % 2 >= 1; // 반개 별 여부
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex space-x-1 ">
      {/* 가득 찬 별 */}
      {Array(filledStars)
        .fill(0)
        .map((_, i) => (
          <FullStar key={`full-${i}`} />
        ))}

      {/* 반쪽 별 */}
      {hasHalfStar && <HalfStar />}

      {/* 빈 별 */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <EmptyStar key={`empty-${i}`} />
        ))}
    </div>
  );
}

// 가득 찬 별
const FullStar = () => (
  <svg
    className="w-7 h-7 text-yellow-400"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// 반쪽 별
const HalfStar = () => (
  <svg className="w-7 h-7 text-yellow-400" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="gray" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGrad)"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
);

// 빈 별
const EmptyStar = () => (
  <svg
    className="w-7 h-7 text-gray-300"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
