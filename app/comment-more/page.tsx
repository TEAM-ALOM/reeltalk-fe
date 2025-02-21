import React from "react";

export default function CommentMore() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            <div className="w-[89%] mt-10 text-ReelTalk_Yellow font-bold text-[20px]">댓글+</div>
            <div className="w-[89%] bg-[#D9D9D9] my-5">
                    <form className="w-full h-[892px] flew-grow grid grid-rows-[1fr_auto] gap-4">
                        <div className="w-full"></div>
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