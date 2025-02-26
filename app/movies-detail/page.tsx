"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoStarSharp } from "react-icons/io5";

export default function MoviesDetail() {
  const router = useRouter();
  const path = usePathname();

  const handleReviewDetail = (href:string) => {
    if (path !== href)
      router.push(href);
  };

  return (
    <main className="flex flex-col justify-center items-center w-full px-4">
      {/* 영화 상세 정보*/}
      <div className="w-full h-full max-w-screen-xl min-h-[300px] lg:min-h-[500px] mt-6 grid sm:grid-rows-2 sm:grid-cols-1 lg:grid-rows-1 lg:grid-cols-[auto_1fr] gap-7">
        {/* 영화 포스터*/}
        <div className="w-full lg:w-[350px] lg:h-[500px] sm:aspect-[1/3] flex items-center justify-center 

        border border-black border-3">

          <img
            src=""
            alt="영화 포스터"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 영화 정보*/}
        <div className="w-full flex flex-col space-y-3">
          <div className="w-full flex flex-col lg:flex-row justify-between">
            {/* 제목 및 장르*/}
            <div className="flex flex-col">
              <div className="text-[36px] md:text-[36px] font-bold">
                위키드
              </div>
              <div className="text-[36px] md:text-[36px] font-bold">
                Wicked: Part One
              </div>
              <div className="text-[#898989] text-[14px] md:text-[14px]">
                2024.판타지/뮤지컬/모험/액션/가족/로맨스/음악.미국
              </div>
            </div>

            {/* 평점 */}
            <div className="flex items-baseline space-x-3 mt-4 lg:mt-0 lg:self-end">
              <div className="text-[18px]">평점</div>
              <div className="text-[36px] md:text-[36px]">4.0</div>
              <div className="h-50 w-50 flex">
                <IoStarSharp className="text-[#FFC107] w-8 h-8"/>
                <IoStarSharp className="text-[#FFC107] w-8 h-8"/>
                <IoStarSharp className="text-[#FFC107] w-8 h-8"/>
                <IoStarSharp className="text-[#FFC107] w-8 h-8"/>
                <IoStarSharp className="text-[#D9D9D9] w-8 h-8"/>
              </div>
            </div>
          </div>

          {/* 영화 설명 박스 */}
          <div className="bg-[#DBDBDB] w-[100%] h-auto min-h-[150px] lg:min-h-[244px] border rounded-[10px] p-4 mt-4">
            <span>영화 설명...</span>
          </div>

          {/* 출연진 */}
          <div>
            <span className="text-[16px]">출연진</span>
            <div className="flex space-x-12 md:space-x-10 my-3 overflow-x-auto whitespace-nowrap scrollbar-hide">

              {/*출연진 정보 동적 렌더링*/}
              {[1,2,3,4].map((index) => (
                <div 
                className="flex space-x-3 items-center"
                key={index}
                >
                    {/*출연진 이미지, img로 바꿀 예정*/}
                    <div className="bg-[#CDC8C8] w-16 h-16 md:w-20 md:h-20 border rounded-full"></div>
                    {/*역할 및 이름*/}
                    <div className="flex flex-col justify-center">
                        <span className="text-[16px] md:text-[16px]">엘파바 역</span>
                        <span className="text-[18px] md:text-[16px]">신시아 에리보</span>
                    </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* 리뷰 talk*/}
      <div className="w-full max-w-screen-xl min-h-[300px] lg:min-h-[290px] mt-6 grid grid-rows-[auto_1fr]">
        <div className="w-full flex justify-between">
          <span className="text-[#FFC107] text-[24px]">Review Talk</span>
          <button 
          onClick={() => handleReviewDetail("/reviews-detail")}
          className="bg-[#E3F2FD] border rounded-[20px] text-[19.5px] md:text-[19.5px] w-[100px] h-[30px] text-[#787878] flex justify-center items-center">
            more+
          </button>
        </div>

        {/* 리뷰 영상들*/}
        <div className="w-full flex justify-between space-x-10 overflow-x-auto whitespace-nowrap scrollbar-hide">

          {/*리뷰 영상 동적 렌더링*/}
          {[1,2,3].map((index) => (
            <div 
            key={index}
            className="flex aspect-[500/250] w-[90%] h-full md:max-w-[70%] lg:w-[450px] bg-[#CDC8C8] border rounded-[20px] flex items-center justify-center"
            >
            <video
            className="w-full h-full object-cover"
            src=""
            >
            </video>
          </div>
          ))}

        </div>
      </div>

      {/* 실시간 talk*/}
      <div className="w-full h-full max-w-screen-xl min-h-[300px] lg:min-h-[600px]  my-6 space-y-3">
      <div className="w-full flex justify-between">
          <span className="text-[#FFC107] text-[24px]">실시간Talk</span>
          <button className="bg-[#E3F2FD] border rounded-[20px] text-[21px] md:text-[21px] w-[100px] h-[30px] text-[#787878] flex justify-center items-center">
            more+
          </button>
        </div>

        <div className="w-full min-h-[620px] lg:min-h-[630px] bg-[#D9D9D9] flex flex-col items-stretch justify-stretch">
          <form className="w-full h-full flew-grow grid grid-rows-[5fr_1fr] gap-4">
            <div className="w-full"></div>
            <div className="w-full flex items-baseline">
              <input
                type="text"
                className="w-full max-w-[90%] h-[75px] border rounded-[30px] m-3 text-[16px] bg-[#EDEDED]"
              />
              <button className="h-[75px] lg:w-[8%] border rounded-[30px] bg-[#FFC107] m-3 text-[24px]">
                입력
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}