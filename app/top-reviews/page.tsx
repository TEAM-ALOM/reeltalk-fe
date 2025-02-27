"use client";

import { useEffect, useState } from "react";
import ReviewCardHorizontal from "../components/reviewCard-horizontal";
import { getTopRatedMovies, Movie } from "@/lib/api";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Movie[]>([]);

  useEffect(() => {
    getTopRatedMovies().then((data) => {
      setMovies(data);
      setReviews(data); // 현재 테스트용으로 movies 데이터를 reviews로 사용 중

      console.log(reviews[0]);
    });
  }, []);

  return (
    <main>
      <div className="w-full flex flex-col justify-center xl:px-32 2xl:px-40 mb-20">
        {/* 페이지 제목 컨테이너 */}
        <div className="flex w-full justify-start mt-10 ml-10">
          <span className="text-ReelTalk_Yellow text-3xl">TOP 리뷰</span>
        </div>

        {/* Top2 리뷰 컨테이너 */}
        <div className="flex justify-between w-full h-full mt-10 px-20">
          {reviews.slice(0, 2).map((review, index) => (
            <div key={review.id}>
              <ReviewCardHorizontal
                key={review.id}
                isTop2={index < 2}
                rank={index + 1}
                {...review}
              />
              {/* top2 영상 하단 정보 컨테이너 */}
              <div className="w-full px-3 mt-2 flex justify-between items-center text-xl">
                <div className="flex font-semibold items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 text-ReelTalk_Yellow"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                  <span className="ml-3">1234</span>
                </div>
                <div className="flex items-center font-semibold">
                  <span>리뷰어</span>
                  <div className="bg-ReelTalk_LightBlue rounded-2xl p-2 ml-2 flex">
                    <span>코헤트</span>
                    <span className="bg-[#C977FF] rounded-full text-white ml-1 flex items-center justify-center w-6 h-6 text-sm">
                      R
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 그 외 리뷰 리스트 (2번 인덱스부터) */}
        <div className="flex justify-center w-full mt-10 ">
          <div className="grid grid-cols-3 gap-12 ">
            {reviews.slice(2).map((review) => (
              <ReviewCardHorizontal
                isTop2={false}
                key={review.id}
                {...review}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
