export default function MoviesDetail() {

    return (
        <main className="flex flex-col justify-center items-center">

            {/* 영화 상세 정보*/}
            <div className="w-full h-* border border-3 border-black mt-[25px] flex justify-between pl-[80px] pr-[80px]">
                {/* 영화 포스터*/}
                <div className="w-[500px] h-[500px] bg-black"></div>

                {/* 영화 정보*/}
                <div className="w-full h-[320px] ml-[50px] border border-3 border-red">

                    <div>
                        {/* 제목 및 장르*/}
                        <div>
                            <div className="text-[36px] font-bold">위키드</div>
                            <div className="text-[36px] font-bold">Wicked: Part One</div>
                            <div className="text-[#898989] text-[14px]">2024.판타지/뮤지컬/모험/액션/가족/로맨스/음악.미국</div>
                        </div>
                    
                    
                        {/* 평점 */}
                        <div></div>
                    </div>

                    {/* 영화 설명 박스 */}
                    <div></div>

                    {/* 출연진 */}
                    <div></div>
                </div>
            </div>

            {/* 리뷰 talk*/}
            <div>

            </div>

            {/* 실시간 talk*/}
            <div>
 
            </div>
        </main>
    );
}