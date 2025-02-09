import React from "react";

export default function  MyPage() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            {/* 파란색 영역*/}
            <div className="w-full h-full min-h-[280px] lg:min-h-[280px] bg-[#64A4DB] flex flex-col justify-between">
                <div className="text-[#FFC107] lg:text-[30px] md:text-[28px] my-3 mx-5 font-semibold">My Page</div>
                <button className="lg:text-[20px] md:text-[15px] text-[#FFFFFF] underline decoration-1 my-3 mx-5 flex justify-end">리뷰 등록하기</button>
            </div>

            {/* 프로필 이미지 영역*/}
            <div className="border border-3 border-black absolute lg:w-[1050px] min-h-[280px] md:w-[510px] sm:w-[260px] h-40 left-[12%] top-[60%] flex">
                <img className="border border-3 border-black w-[25%] h-full" src="/img/profile.png" alt="프로필 이미지"/>
                <div className="border border-3 border-black h-full"></div>
            </div>

            {/* 하얀색 영역*/}
            <div className="w-full h-full border border-3 border-black"></div>
        </main>
    )
}