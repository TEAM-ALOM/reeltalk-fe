"use client"

import { fetchContentId, MovieContent, MovieTest, testMovies } from "@/lib/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import StarRating from "../components/StarRating";


export default function ReviewTalkMore() {
    const [movies, setMovies] = useState<MovieTest[]>([]);
    const [movieDetail, setMovieDetail] = useState<MovieContent | null>(null);

    const path = usePathname();
    
    const searchParams = useSearchParams();
    const contentId = searchParams.get("contentId");

    console.log(contentId);


    useEffect(() => {
        if (!contentId) {
            console.error("contentId가 없음");
            return;
        }

        testMovies().then((data)=> {
            setMovies(data);

            fetchContentId(Number(contentId)).then((detail) => {
                console.log("받아온 데이터: ", detail);
                setMovieDetail(detail);
            }).catch(error => {
                console.log("fetchContentId 에러: ", error);
            });
        })
    }, [contentId]);
    // 의존성 배열 -> contentId가 바뀔 때만 실행
    // 아니면 무한요청됨

    return (
        <main className="flex flex-col justify-center items-center w-full px-10">

            {/* 영화 정보*/}
            <div className="w-full h-full max-w-[1600px] min-h-[300px] lg:min-h-[300px] mt-6 flex flex-col space-y-6 lg:flex-col p-5 px-12">
                <div className="text-ReelTalk_Yellow text-[33px] font-bold">Review Talk</div>
                <div className="w-full h-full flex gap-10">
                    <img 
                    src={movieDetail?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                        : ""
                    }
                    alt="영화 포스터"
                    className="border rounded-[10px] w-[175px] h-[200px]"
                    />
                    <div className="w-full min-h-[168px] flex flex-col justify-between">
                        {/* 제목*/}
                        <div className="flex flex-col">
                            <span className="text-[28px] font-bold">{movieDetail?.kor_title || "한글 제목 없음"}</span>
                            <span className="text-[28px] font-bold">{movieDetail?.en_title || "영어 제목 없음"}</span>
                            <span className="text-[18px] text-[#898989]">{movieDetail?.genres?.map((g) => g.name).join(" /") || "장르 없음"}</span>
                        </div>
                        
                         {/* 평점*/}
                        <div className="flex items-baseline gap-2">
                            <span className="text-[18px]">평점</span>
                            <span className="text-[36px]">{movieDetail?.ratingAverage}</span>
                            <div className="mx-2 flex">
                                <StarRating rating={movieDetail?.ratingAverage ?? 0} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* 영화 카드*/}
             <div className="w-full lg:min-w-screen-lg md:min-w-screen-md sm:min-w-screen-sm h-full min-h-[300px] lg:min-h-[600px] max-h-[600px] border-t border-t-2 border-[#DBDBDB] grid grid-cols-3 gap-5 my-5 py-5 place-items-center overflow-y-auto whitespace-nowrap scrollbar-hide px-12">
                {movieDetail?.reviews.map((index) => (
                    <img 
                    src={index?.image?.url}
                    className="lg:min-w-[454px] lg:min-h-[252px] md:min-w-[280px] md:min-h-[150px] sm:min-w-[200px] sm:min-h-[152px] bg-[#CDC8C8] border rounded-[20px] hover:cursor-pointer"
                    onClick={() => window.open(index?.video_path, "_blank")}
                    />
                ))}
             </div>
        </main>
    )
}