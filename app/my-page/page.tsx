import React from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";

export default function  MyPage() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            {/* 파란색 영역*/}
            <div className="w-full h-full min-h-[280px] lg:min-h-[280px] bg-[#64A4DB] flex flex-col justify-between">
                <div className="text-[#FFC107] lg:text-[30px] md:text-[28px] my-3 mx-5 font-semibold">My Page</div>
                <button className="lg:text-[20px] md:text-[15px] text-[#FFFFFF] underline decoration-1 my-3 mx-5 flex justify-end">리뷰 등록하기</button>
            </div>

            {/* 프로필 이미지 영역*/}
            <div className="border border-3 border-black absolute  min-h-[300px] w-full h-40 top-[60%] flex">
                {/*<Image src="/img/profile.png" alt="프로필 이미지" width={100} height={100} /> */}
                <div className="border border-3 border-black max-w-[300px] max-h-[300px] min-w-[50px] ml-[10%] min-h-[50px] w-[50vw] h-[50vw] rounded-full aspect-square"/>

                <div className="h-full w-full flex flex-col space-y-3 justify-end">
                    <div className="flex items-center border border-3 border-black items-center space-x-5">
                        <div className="text-[18px] font-semibold pl-7">리뷰어</div>
                        <div className="text-[38px] font-semibold text-[#1E88E5]">코헤트</div>
                    </div>
                    <div className="rounded-[70px] bg-[#E3F2FD] w-full min-h-[120px] p-7">
                        <div className="text-[15px] text-[#787878] font-semibold">한줄 소개</div>
                        <div className="text-[16px] font-semibold">안녕하세요 ! :)</div>
                    </div>
                </div>

                <div className="border border-3 border-black w-full h-full flex justify-end items-center">
                    <button className="px-5">
                        <FaPlus className="w-[33px] h-[33px] text-[#FFC107]"/>
                    </button>
                </div>
            </div>

            {/* 하얀색 영역*/}
            <div className="w-full h-full border border-3 border-black"></div>
        </main>
    )
}