import React from "react";
import { StarIcon } from "../components/icons";

export default function ReviewsDetail() {
    return (
        <main className="flex flex-col justify-center items-center w-full px-8">
            
            {/* 리뷰 정보*/}
            <div className="w-full h-full max-w-[1600px] min-h-[300px] lg:min-h-[500px] border border-3 border-black mt-6 flex flex-col lg:flex-col p-5 space-y-1">
                <div className="text-[30px] font-bold text-[#FFC107]">Review Talk</div>
                
                <div className="w-full h-full flex space-x-10 p-4">
                    
                    <div className="w-full h-full lg:w-3/4 aspect-[2/3] max-h-[470px] max-w-[840px]">
                        {/* 리뷰 영상*/}
                        <div className="w-full h-full border border-5 border-black rounded-[20px] flex items-center justify-center">리뷰 영상</div>
                        {/* 리뷰어*/}
                        <div className="w-full flex justify-end px-3 py-1 space-x-3">
                            <span className="text-[17px] font-bold">리뷰어</span>
                            <span className="text-[17px] font-bold bg-[#E3F2FD] w-[90px] h-full flex justify-center items-center rounded-[80px]">코헤트</span>
                            
                        </div>
                    </div>
                        
                    {/* 영상 소개 및 별점*/}  
                    <div className="w-[40%] flex flex-col justify-center items-center">
                        {/* 영상 소개 */}
                        <div className="w-full">
                            <div className="text-[#1E88E5] text-[20px]">영상 소개</div>
                            <div className="w-full min-h-[253px] bg-[#D9D9D9] p-3 text-[16px]">뮤지컬 영화 역사를 바꿀 대작의 등장!</div>
                        </div>

                        {/* 별점 */}
                        <div className="w-full min-h-[120px] flex flex-col justify-center items-center">
                            <div className="text-[17px] text-[#575757]">이 리뷰에 대한 별점을 남겨주세요.</div>
                            <div className="m-2 flex space-x-1">
                                <StarIcon color="#D9D9D9" size="27px"/>
                                <StarIcon color="#D9D9D9" size="27px"/>
                                <StarIcon color="#D9D9D9" size="27px"/>
                                <StarIcon color="#D9D9D9" size="27px"/>
                                <StarIcon color="#D9D9D9" size="27px"/>
                            </div>
                        </div>
                        
                    </div>

                </div>
                
            </div>

             {/* 댓글*/}
             <div className="w-full h-full max-w-[1600px] min-h-[920px] lg:min-h-[920px] border border-3 border-black my-6 flex">

             </div>
        </main>
    )
}