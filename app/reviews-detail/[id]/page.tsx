"use client";

import React, { useEffect, useState } from "react";
import { AiFillTrademarkCircle } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaThumbsUp } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { AllReviews, fetchContentId, fetchReviews, MovieContent, MovieTest, testMovies } from "@/lib/api";
import { unknown } from "zod";

export default function ReviewsDetail() {
    const searchParams = useSearchParams();
    const contentId = searchParams.get("contentId");
    const reviewId = searchParams.get("reviewId");
    
    const [movies, setMovies] = useState<MovieTest[]>([]);
    const [movieDetail, setMovieDetail] = useState<MovieContent | unknown>(unknown);
    const [reviews, setReviews] = useState<AllReviews[]>([]);
    const [selectedReview, setSelectedReview] = useState<AllReviews | unknown>(unknown);

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!contentId) {
            console.error("contentId가 없음");
            return;
        }

       fetchReviews(Number(contentId)).then((reviewList) => {
        if (reviewList)
            setReviews(reviewList);

        const review = reviewList?.find(re => re.reviewId === Number(reviewId));
        setSelectedReview(review || unknown);
       });

       console.log(selectedReview);
    }, [contentId, reviewId]);

    const handleMore = (href: string) => {
        if (path !== href) {
            router.push(href);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center w-full px-8">
            
            {/* 리뷰 정보*/}
            <div className="w-full h-full max-w-[1600px] min-h-[300px] lg:min-h-[500px] mt-6 flex flex-col lg:flex-col p-5 space-y-1">
                <div className="text-[30px] ml-4 font-bold text-[#FFC107]">Review Talk</div>
                
                <div className="w-full h-full flex space-x-10 p-4">
                    
                    <div className="w-full h-full lg:w-3/4 aspect-[2/3] max-h-[470px] max-w-[840px]">
                        {/* 리뷰 영상*/}
                        <img 
                        src=""
                                             
                        alt="리뷰 영상"
                        className="w-full h-full border border-5 border-black rounded-[20px] flex items-center justify-center"
                        />
                        {/* 리뷰어*/}
                        <div className="w-full flex justify-end px-3 py-1 space-x-3">
                            <span className="text-[17px] font-bold">리뷰어</span>
                            <span className="text-[17px] font-bold bg-[#E3F2FD] w-[90px] h-full flex justify-center items-center rounded-[80px]">
                                코헤트
                                <AiFillTrademarkCircle className="w-4 h-4 text-[#C977FF]"/>
                            </span>
                            
                        </div>
                    </div>
                        
                    {/* 영상 소개 및 별점*/}  
                    <div className="w-[40%] flex flex-col justify-center items-center">
                        {/* 영상 소개 */}
                        <div className="w-full">
                            <div className="text-[#1E88E5] text-[20px]">영상 소개</div>
                            <div className="w-full min-h-[253px] bg-[#D9D9D9] p-3 text-[16px]">
                                {movieDetail?.overview || "설명없음"}
                            </div>
                        </div>

                        {/* 좋아요 싫어요 */}
                        <div className="w-full min-h-[120px] flex justify-center items-center">
                            <button className="w-[90px] h-[90px] border border-3 border-black rounded-full m-8 flex justify-center items-center bg-[#E3F2FD]">
                                <FaThumbsUp className="w-9 h-9 text-[#1E88E5]"/>
                            </button>
                            <button className="w-[90px] h-[90px] border border-3 border-black rounded-full m-8 flex justify-center items-center bg-[#E3F2FD]">
                                <FaShareAlt className="w-9 h-9 text-[#1E88E5]"/>
                            </button>
                        </div>
                        
                    </div>

                </div>
                
            </div>

             {/* 댓글*/}
             <div className="w-full h-full max-w-[1600px] min-h-[260px] lg:min-h-[260px] my-6 grid grid-rows-[auto_1fr] gap-1">
                <div className="w-full flex justify-between">
                    <span className="text-[20px]">댓글</span>
                    <button onClick={() => handleMore("/comment-more")} className="text-[17px] bg-[#E3F2FD] w-[80px] h-full flex justify-center items-center rounded-[80px]">more+</button>
                </div>
                <div className="w-full bg-[#D9D9D9]">
                    <form className="w-full h-full flew-grow grid grid-rows-[1fr_auto] gap-4">
                        <div className="w-full"></div>
                        <div className="w-full h-[60px] flex items-end space-x-4 my-2">
                            <input
                            type="text"
                            className="w-full max-w-[90%] h-full border border-none rounded-[30px] text-[16px] bg-[#EDEDED] mx-2"
                            />
                            <button className="h-full lg:w-[8%] border rounded-[30px] bg-[#FFC107] lg:text-[24px] md:text-[18px] mx-1">
                            입력
                            </button>
                        </div>
                    </form>
                </div>
             </div>
        </main>
    )
}