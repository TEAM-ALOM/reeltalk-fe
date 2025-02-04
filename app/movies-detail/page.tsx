import { StarIcon } from "../components/icons";

export default function MoviesDetail() {

    return (
        <main className="flex flex-col justify-center items-center w-full px-4">

            {/* 영화 상세 정보*/}
            <div className="w-full h-full max-w-[1600px] min-h-[300px] lg:min-h-[500px] border border-3 border-black mt-6 flex flex-col lg:flex-row space-x-10 pl-6 lg:px-16">
                {/* 영화 포스터*/}
                <div className="w-full lg:w-1/3 aspect-[2/3] max-h-[500px] max-w-[370px] h-auto border border-5 border-black flex items-center justify-center">영화 포스터</div>

                {/* 영화 정보*/}
                <div className="w-full lg:w-2/3 flex flex-col ml-0 lg:ml-6 space-y-3">

                    <div className="flex flex-col lg:flex-row justify-between w-full border">
                        {/* 제목 및 장르*/}
                        <div>
                            <div className="text-[36px] font-bold">위키드</div>
                            <div className="text-[36px] font-bold">Wicked: Part One</div>
                            <div className="text-[#898989] text-[14px]">2024.판타지/뮤지컬/모험/액션/가족/로맨스/음악.미국</div>
                        </div>
                    
                    
                        {/* 평점 */}
                        <div className="flex items-baseline space-x-3 mt-4 lg:mt-0 lg:self-end">
                            <div className="text-[18px]">평점</div>
                            <div className="text-[36px]">4.0</div>
                            <div className="h-50 w-50">
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
                        <span>출연진</span>
                        <div className="flex space-x-12 my-3 overflow-x-auto whitespace-nowrap">

                            {/*출연진 정보 동적 렌더링*/}
                            <div className="flex space-x-3"> 
                                {/*출연진 이미지, img로 바꿀 예정*/}
                                <div className="bg-[#CDC8C8] w-[60px] h-[60px] border rounded-full"></div>
                                {/*역할 및 이름*/}
                                <div className="flex flex-col justify-center">
                                    <span className="text-[16px]">감독</span>
                                    <span className="text-[18px]">존 추</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* 리뷰 talk*/}
            <div className="w-full max-w-[1500px] mt-6 flex flex-col border border-3 border-black">
                <div className="w-full flex justify-between">
                    <span className="text-[#FFC107] text-[18px]">Review Talk</span>
                    <button className="bg-[#E3F2FD] border rounded-[20px] text-[21px] w-[100px] h-[30px] text-[#787878] flex justify-center items-center">more+</button>
                </div>

                {/* 리뷰 영상들*/}
                <div className=" my-3">
                    {/*리뷰 영상 동적 렌더링*/}
                    <div className="max-w-[454px] max-h-[250px] h-[250px] bg-[#CDC8C8] border rounded-[20px]">리뷰영상</div>
                </div>
            </div>

            {/* 실시간 talk*/}
            <div className="w-full max-w-[1500px] mt-6 flex flex-col items-start border border-3 border-black">
                <div className="text-[#FFC107] text-[18px]">실시간Talk</div>
                <div className="w-full min-h-[620px] max-w-[1500px] bg-[#D9D9D9] flex flex-col items-center justify-end my-3"> 
                    <form>
                        <div></div>
                        <input type="text" className="border border rounded-[30px] w-[1350px] h-[75px] m-3"></input>
                        <button className="border rounded-[30px] bg-[#FFC107] w-[100px] h-[75px]">입력</button>                
                    </form>
                </div>
            </div>
        </main>
    );
}