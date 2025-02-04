import React from "react";

export default function ReviewsDetail() {
    return (
        <main className="flex flex-col justify-center items-center w-full px-4">
            
            {/* 리뷰 정보*/}
            <div className="w-full h-full max-w-[1600px] min-h-[300px] mt-10 flex flex-col border border-3 border-black">
                <div className="text-[30px] font-bold text-[#FFC107]">Review Talk</div>
                
                <div className="flex space-x-10">
                    {/* 리뷰 영상*/}
                    <div className="w-full lg:w-2/3 aspect-[2/3] max-h-[478px] max-w-[843px] h-auto border border-5 border-black rounded-[20px] flex items-center justify-center">리뷰 영상</div>

                    {/* 영상 소개 및 별점*/}
                    <div>
                        {/* 영상 소개 */}
                        <div>
                        <div>영상 소개</div>
                        <div className="w-full max-w-[450px] max-h-[253px] bg-[#D9D9D9]">hello</div>
                        </div>

                        {/* 별점 */}
                        <div>
                            <div>이 리뷰에 대한 별점을 남겨주세요.</div>
                            <div></div>
                        </div>
                        
                    </div>
                </div>
            </div>

             {/* 댓글*/}
             <div></div>
        </main>
    )
}