import React from "react";
import Image from "next/image";

export default function CommentMore() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            <div className="w-[89%] mt-10 text-ReelTalk_Yellow font-bold text-[20px]">댓글+</div>
            <div className="w-[89%] bg-[#D9D9D9] my-5">
                    <form className="w-full h-[892px] flew-grow grid grid-rows-[1fr_auto] gap-4">
                        {/** 댓글 보드 */}
                        <div className="w-full flex flex-col p-3 overflow-y-auto whitespace-nowrap">
                            {[1,2,4,5,6,7,8,9].map((index) => (
                                <div className="w-full h-full flex">
                                    <div>
                                    <Image 
                                    src={"/icons/profile.jpg"}
                                    alt="Profile"
                                    width={50}
                                    height={50}
                                    className="border rounded-full border-white bg-[white] m-3 aspect-square"
                                    />
                                    </div>
                                    
                                    <div className="flex flex-col m-3">
                                        
                                        {/* 댓글 박스*/}
                                        <div className="relative bg-white text-black p-4 rounded-lg border max-w-xs flex flex-col">
                                            <p className="text-[14px] text-[#1E88E5]">영화 리뷰</p>
                                            {/* 댓글 랜더링*/}
                                            <div className="text-[14px]">
                                            오늘 보고 왔는데 진짜 너무 좋았어요..
                                            </div>
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 bg-white rotate-45"></div>
                                    
                                    </div>

                                    {/* 좋아요*/}
                                    <button className="w-[74px] h-[26px] bg-white border rounded-[10px] my-1">
                                        <span>👍</span>
                                        <span>1,800</span>
                                    </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/** 입력 창 */}
                        <div className="w-full h-[60px] flex items-end space-x-4 my-2 px-3">
                            <input
                            type="text"
                            className="w-full max-w-[90%] h-full border border-none rounded-[30px] text-[16px] bg-[#EDEDED]"
                            />
                            <button className="h-full lg:w-[8%] border rounded-[30px] bg-[#FFC107] lg:text-[24px] md:text-[15px]">
                            입력
                            </button>
                        </div>
                    </form>
                </div>
        </main>
    )
}