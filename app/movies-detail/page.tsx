import { StarIcon } from "../components/icons";
import React from "react";

export default function MoviesDetail() {

    return (
        <main className="flex flex-col justify-center items-center w-full px-4">

            {/* 영화 상세 정보*/}
            <div className="w-full h-full max-w-screen-xl min-h-[300px] lg:min-h-[500px] border border-3 border-black mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                {/* 영화 포스터*/}
                <div className="w-full aspect-[2/3] max-h-[500px] border border-5 border-black flex items-center justify-center">
                <img src="" alt="영화 포스터" className="w-full h-full object-cover" />
                </div>

                {/* 영화 정보*/}
                <div className="flex flex-col space-y-3">

                    <div className="flex flex-col lg:flex-row justify-between w-full border">
                        {/* 제목 및 장르*/}
                        <div>
                            <div className="text-[36px] md:text-[36px] font-bold">위키드 3</div>
                            <div className="text-[36px] md:text-[36px] font-bold">Wicked: Part One</div>
                            <div className="text-[#898989] text-[14px] md:text-[14px]">2024.판타지/뮤지컬/모험/액션/가족/로맨스/음악.미국</div>
                        </div>
                    
                    
                        {/* 평점 */}
                        <div className="flex items-baseline space-x-3 mt-4 lg:mt-0 lg:self-end">
                            <div className="text-[18px]">평점</div>
                            <div className="text-[36px] md:text-[36px]">4.0</div>
                            <div className="h-50 w-50 flex">
                                <StarIcon color="#FFC107" size="25px"/>
                                <StarIcon color="#FFC107" size="25px"/>
                                <StarIcon color="#FFC107" size="25px"/>
                                <StarIcon color="#FFC107" size="25px"/>
                                <StarIcon color="#D9D9D9" size="25px"/>
                            </div>
                        </div>
                    </div>

                    {/* 영화 설명 박스 */}
                    <div className="bg-[#DBDBDB] h-auto min-h-[150px] lg:min-h-[244px] border rounded-[10px] p-4 mt-4">
                        <span>영화 설명...</span>
                    </div>

                    {/* 출연진 */}
                    <div>
                        <span className="text-[16px]">출연진</span>
                        <div className="flex space-x-12 md:space-x-12 my-3 overflow-x-auto whitespace-nowrap">

                            {/*출연진 정보 동적 렌더링*/}
                            <div className="flex space-x-3 items-center"> 
                                {/*출연진 이미지, img로 바꿀 예정*/}
                                <div className="bg-[#CDC8C8] w-16 h-16 md:w-20 md:h-20 border rounded-full"></div>
                                {/*역할 및 이름*/}
                                <div className="flex flex-col justify-center">
                                    <span className="text-[16px] md:text-[16px]">감독</span>
                                    <span className="text-[18px] md:text-[16px]">존 추</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* 리뷰 talk*/}
            <div className="w-full h-full max-w-screen-xl min-h-[300px] lg:min-h-[290px] border border-3 border-black mt-6">
                <div className="w-full flex justify-between">
                    <span className="text-[#FFC107] text-[18px]">Review Talk</span>
                    <button className="bg-[#E3F2FD] border rounded-[20px] text-[21px] md:text-[21px] w-[100px] h-[30px] text-[#787878] flex justify-center items-center">more+</button>
                </div>

                {/* 리뷰 영상들*/}
                <div className="my-3">
                    {/*리뷰 영상 동적 렌더링*/}
                    <div className="max-w-[454px] max-h-[250px] h-[250px] bg-[#CDC8C8] border rounded-[20px] flex items-center justify-center">리뷰영상</div>
                    
                </div>
            </div>

            {/* 실시간 talk*/}
            <div className="w-full h-full max-w-screen-xl min-h-[300px] lg:min-h-[620px] border border-3 border-black my-6 space-y-3">
                <div className="text-[#FFC107] text-[18px] font-bold">실시간Talk</div>

                <div className="w-full min-h-[620px] lg:min-h-[630px] bg-[#D9D9D9] flex flex-col items-stretch justify-stretch"> 
                    <form className="w-full h-full flew-grow grid grid-rows-[5fr_1fr] gap-4">
                        <div className="w-full"></div>
                        <div className="w-full flex items-baseline">
                            <input type="text" className="w-full max-w-[90%] h-[75px] border rounded-[30px] m-3 text-[16px] bg-[#EDEDED]" />
                            <button className="h-[75px] lg:w-[8%] border rounded-[30px] bg-[#FFC107] m-3">입력</button>   
                        </div>            
                    </form>
                </div>
            </div>
        </main>
    );
}