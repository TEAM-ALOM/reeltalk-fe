import React from "react";
import { IoStarSharp } from "react-icons/io5";

export default function ReviewsDetail() {
    return (
        <main className="flex flex-col justify-center items-center w-full px-8">
            
            {/* 리뷰 정보*/}
            <div className="w-full h-full max-w-[1600px] min-h-[300px] lg:min-h-[500px] mt-6 flex flex-col lg:flex-col p-5 space-y-1">
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
                            <div></div>
                            <div></div>
                        </div>
                        
                    </div>

                </div>
                
            </div>

             {/* 댓글*/}
             <div className="w-full h-full max-w-[1600px] min-h-[260px] lg:min-h-[260px] my-6 grid grid-rows-[auto_1fr] gap-1">
                <div className="w-full flex justify-between">
                    <span>댓글</span>
                    <button className="text-[17px] bg-[#E3F2FD] w-[80px] h-full flex justify-center items-center rounded-[80px]">more+</button>
                </div>
                <div className="w-full bg-[#D9D9D9]">
                    <form className="w-full h-full flew-grow grid grid-rows-[1fr_auto] gap-4">
                        <div className="w-full"></div>
                        <div className="w-full h-[60px] flex items-end space-x-4 my-2">
                            <input
                            type="text"
                            className="w-full max-w-[90%] h-full border border-none rounded-[30px] text-[16px] bg-[#EDEDED]"
                            />
                            <button className="h-full lg:w-[8%] border rounded-[30px] bg-[#FFC107] lg:text-[24px] md:text-[18px]">
                            입력
                            </button>
                        </div>
                    </form>
                </div>
             </div>
        </main>
    )
}