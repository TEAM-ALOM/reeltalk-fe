"use client"

import { fetchContentId, MovieContent, MovieTest, testMovies } from "@/lib/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";


export default function ReviewTalkMore() {
    const [movies, setMovies] = useState<MovieTest[]>([]);
    const [movieDetail, setMovieDetail] = useState<MovieContent | null>(null);

    const path = usePathname();
    
    const searchParams = useSearchParams();
    const contentId = searchParams.get("contentId");
    console.log(contentId);


    useEffect(() => {
        if (!contentId) return;

        testMovies().then((data)=> {
            setMovies(data);

            fetchContentId(Number(contentId)).then((detail) => {
                setMovieDetail(detail);
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
                    <div className="bg-[#CDCDC8] border rounded-[10px] w-[127px] h-[163px]"/>
                    <div className="w-full min-h-[168px] flex flex-col justify-between">
                        {/* 제목*/}
                        <div className="flex flex-col">
                            <span className="text-[24px] font-bold">{movieDetail?.kor_title || "한글 제목 없음"}</span>
                            <span className="text-[24px] font-bold">{movieDetail?.en_title || "영어 제목 없음"}</span>
                            <span className="text-[14px] text-[#898989]">2024. 판타지/뮤지컬/모험/액션/가족/로맨스/음악. 미국</span>
                        </div>
                        
                         {/* 평점*/}
                        <div className="flex items-baseline gap-2">
                            <span className="text-[18px]">평점</span>
                            <span className="text-[36px]">4.0</span>
                            <div className="mx-2 flex">
                                <IoStarSharp className="text-ReelTalk_Yellow w-8 h-8"/>
                                <IoStarSharp className="text-ReelTalk_Yellow w-8 h-8"/>
                                <IoStarSharp className="text-ReelTalk_Yellow w-8 h-8"/>
                                <IoStarSharp className="text-ReelTalk_Yellow w-8 h-8"/>
                                <IoStarSharp className="text-[#D9D9D9] w-8 h-8"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* 영화 카드*/}
             <div className="w-full lg:min-w-screen-lg md:min-w-screen-md sm:min-w-screen-sm h-full min-h-[300px] lg:min-h-[600px] max-h-[600px] border-t border-t-2 border-[#DBDBDB] grid grid-cols-3 gap-5 my-5 py-5 place-items-center overflow-y-auto whitespace-nowrap scrollbar-hide">
                {[1,2,3,4,5,6,7,8,9].map((index) => (
                    <div key={index} className="lg:min-w-[454px] lg:min-h-[252px] md:min-w-[280px] md:min-h-[150px] sm:min-w-[200px] sm:min-h-[152px] bg-[#CDC8C8] border rounded-[20px]"></div>
                ))}
             </div>
        </main>
    )
}