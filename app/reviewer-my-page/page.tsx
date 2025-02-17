import React from "react";
import { FaPlus } from "react-icons/fa6";
import { AiFillTrademarkCircle } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import Image from "next/image";

export default function ReviewerMyPage() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            {/* 파란색 영역*/}
            <div className="w-full h-full min-h-[280px] lg:min-h-[280px] bg-[#64A4DB] flex flex-col justify-between relative">
               
            </div>
            {/* 프로필 이미지 영역*/}
            <div className="absolute min-h-[300px] w-full h-40 top-[17%] grid grid-cols-[90%_10%] z-10 md:px-5 sm:px-5">
                
                <div className="w-full h-full grid lg:grid-cols-2 md:grid-cols-1 md:place-items-center">
                    {/*<Image src="/img/profile.png" alt="프로필 이미지" width={100} height={100} /> */}
                    {/* 프로필*/}
                    <Image 
                    src={"/img/profile.png"}
                    alt="Profile"
                    width={350}
                    height={350}
                    className="border border-black border-3 max-w-[350px] max-h-[350px] lg:min-w-[350px] lg:min-h-[350px] md:min-h-[300px] md:min-w-[300px] sm:min-h-[250px] sm:min-w-[250px] ml-[15%] min-h-[350px] w-[15vw] h-[15vw] rounded-full aspect-square self-start flex-grow-0"
                    />

                    {/* 리뷰어 및 한줄소개*/}
                    <div className="h-full w-full grid grid-rows-[1fr_auto_auto]">
                        <div></div>
                        <div className="flex items-center items-center space-x-2 mb-2">
                            <div className="text-[18px] font-semibold pl-7">리뷰어</div>
                            <div className="text-[38px] font-semibold text-[#1E88E5]">코헤트</div>
                            <AiFillTrademarkCircle className="w-6 h-6"/>
                        </div>
                        <div className="rounded-[70px] bg-[#E3F2FD] w-full min-h-[120px] p-7 flex-grow">
                            <div className="text-[15px] text-[#787878] font-semibold">한줄 소개</div>
                            <div className="text-[16px] font-semibold">안녕하세요 ! :)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하얀색 영역*/}
            <div className="w-full lg:pt-[230px] md:pt-[400px] md:px-5 sm:pt-[400px] flex flex-col gap-4">

                {/* Best Review*/}
                <div className="w-full min-h-[250px] flex flex-col mb-8">
                    <div className="text-[#1E88E5] text-[20px] px-[5%]">Best Review</div>
                    <div className="w-full h-full py-2 flex justify-center items-center gap-10">
                        <div className="lg:w-[425px] lg:h-[250px] md:w-[300px] md:h-[200px] sm:w-[180px] sm:h-[130px] bg-[#CDC8C8] border rounded-[20px]"></div>
                        <div className="lg:w-[425px] lg:h-[250px] md:w-[300px] md:h-[200px] sm:w-[180px] sm:h-[130px] bg-[#CDC8C8] border rounded-[20px]"></div>
                        <div className="lg:w-[425px] lg:h-[250px] md:w-[300px] md:h-[200px] sm:w-[180px] sm:h-[130px] bg-[#CDC8C8] border rounded-[20px]"></div>
                    </div>
                </div>
            </div>

        </main>
    )
}