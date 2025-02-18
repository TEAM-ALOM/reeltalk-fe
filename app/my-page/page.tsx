import React from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { AiFillTrademarkCircle } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";

export default function MyPage() {
  return (
    <main className="flex flex-col justify-center items-center w-full relative">
      {/* 파란색 영역*/}
      <div className="w-full h-full min-h-[280px] lg:min-h-[280px] bg-[#64A4DB] flex flex-col justify-between relative">
        <div className="text-[#FFC107] lg:text-[30px] md:text-[28px] my-3 mx-5 font-semibold px-3">
          My Page
        </div>
        <button className="lg:text-[20px] md:text-[15px] text-[#FFFFFF] underline decoration-1 my-3 mx-5 flex justify-end">
          리뷰 등록하기
        </button>
      </div>
      {/* 프로필 이미지 영역*/}
      <div className="absolute min-h-[350px] w-full h-40 top-[10%] grid grid-cols-[90%_10%] z-10">
        <div className="w-full h-full grid lg:grid-cols-2 md:grid-cols-1 md:place-items-center">
          {/*<Image src="/img/profile.png" alt="프로필 이미지" width={100} height={100} /> */}
          {/* 프로필*/}
          <div className="self-start flex-grow-0 ml-[15%] w-[350px] h-[350px] max-w-[350px] max-h-[350px] lg:min-w-[350px] lg:min-h-[350px] md:min-h-[300px] md:min-w-[300px] sm:min-h-[250px] sm:min-w-[250px] min-h-[350px]">
            <Image
              src={"/icons/profile.jpg"}
              alt="Profile"
              width={350}
              height={350}
              className="border border-black border-3 rounded-full aspect-square "
            />
          </div>

          {/* 리뷰어 및 한줄소개*/}
          <div className="h-full w-full grid grid-rows-[1fr_auto_auto] pb-12">
            <div></div>
            <div className="flex items-center items-center space-x-2">
              <div className="text-[18px] font-semibold pl-7">리뷰어</div>
              <div className="text-[38px] font-semibold text-[#1E88E5]">
                코헤트
              </div>
              <AiFillTrademarkCircle className="w-6 h-6" />
            </div>
            <div className="rounded-[70px] bg-[#E3F2FD] w-full min-h-[120px] p-7 flex-grow">
              <div className="text-[15px] text-[#787878] font-semibold">
                한줄 소개
              </div>
              <div className="text-[16px] font-semibold">안녕하세요 ! :)</div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-end items-center md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2">
          <button className="px-5">
            <FaPlus className="w-[33px] h-[33px] text-[#FFC107]" />
          </button>
        </div>
      </div>

      {/* 하얀색 영역*/}
      <div className="w-full lg:pt-[280px] md:pt-[400px] sm:pt-[400px] flex flex-col gap-4">
        {/* Best Review*/}
        <div className="w-full min-h-[250px] flex flex-col">
          <div className="text-[#1E88E5] text-[20px] px-[5.5%]">
            Best Review
          </div>
          <div className="w-full h-full py-2 flex justify-center items-center gap-10">
            <div className="lg:w-[425px] lg:h-[250px] md:w-[300px] md:h-[200px] sm:w-[180px] sm:h-[130px] bg-[#CDC8C8] border rounded-[20px]"></div>
            <div className="lg:w-[425px] lg:h-[250px] md:w-[300px] md:h-[200px] sm:w-[180px] sm:h-[130px] bg-[#CDC8C8] border rounded-[20px]"></div>
            <div className="lg:w-[425px] lg:h-[250px] md:w-[300px] md:h-[200px] sm:w-[180px] sm:h-[130px] bg-[#CDC8C8] border rounded-[20px]"></div>
          </div>
        </div>

        {/* 도전과제*/}
        <div className="w-full min-h-[150px] grid grid-rows-[auto_1fr]">
          <div className="px-[5.5%] flex justify-between">
            <span className="text-[#1E88E5] text-[20px]">도전 과제</span>
            <button className="w-[70px] h-[25px] bg-[#E3F2FD] border rounded-[20px] flex justify-center items-center">
              more+
            </button>
          </div>
          <div className="w-full h-full pt-2 left-[50%] flex justify-center items-center">
            <div className="w-[89.5%] h-full bg-[#CDC8C8] flex items-center">
              <GiSevenPointedStar className="w-[70px] h-[70px] text-[#FFC107] mx-5" />
              <div className="flex flex-col text-[14px] font-semibold justify-center">
                <span>2024 상반기</span>
                <span>리뷰어 Top 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* 누적 리뷰*/}
        <div className="w-full min-h-[550px] mt-10">
          <div className="px-[5.5%] flex justify-between">
            <span className="text-[#1E88E5] text-[20px]">누적 리뷰</span>
            <button className="w-[70px] h-[25px] bg-[#E3F2FD] border rounded-[20px] flex justify-center items-center">
              more+
            </button>
          </div>

          <div className="w-full h-full pt-2 left-[50%] flex flex-col pl-[4.5%]">
            <div className="grid grid-rows-2 grid-flow-col overflow-x-auto whitespace-nowrap scrollbar-hide">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div className="space-x-3 items-center" key={index}>
                  <div className="w-[450px] h-[250px] bg-[#CDC8C8] border rounded-[20px] m-3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
