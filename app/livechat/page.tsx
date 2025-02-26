import Image from "next/image"

export default function liveChat() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            <div className="w-[89%] bg-[#D9D9D9] my-5 border rounded-[20px] overflow-y-auto">

                <div className="sticky top-0 w-full h-[60px] bg-[#1E88E5] bg-opacity-50 rounded-[20px] z-20 text-[22px] text-white font-bold flex items-center pl-5">
                        실시간 Talk
                </div>

                <form className="w-full h-[954px] flex flex-col justify-between">

                    {/** 댓글보드 */}
                    <div className="w-full">
                    {[1,2,4,5,6,7,8,9,10,11,12,13,14,15].map((index) => (
                                <div className="w-full flex">
                                    <div className="">
                                    <Image 
                                    src={"/icons/profile.jpg"}
                                    alt="Profile"
                                    width={50}
                                    height={50}
                                    className="border rounded-full bg-[white] m-3"
                                    />
                                    </div>
                                    
                                    <div className="flex flex-col m-3">
                                        
                                        {/* 댓글 박스*/}
                                        <div className="relative bg-white text-black p-4 rounded-[25px] border max-w-xs flex flex-col">
                                            {/* 댓글 랜더링*/}
                                            <div className="text-[14px]">
                                            오늘 보고 왔는데 진짜 너무 좋았어요..
                                            </div>
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-6 h-6 bg-white rotate-45"></div>
                                    
                                    </div>

                                    
                                    </div>
                                </div>
                            ))}
                    </div>
                </form>

                {/** 입력 창 */}
                <div className="absolute bottom-0 w-[89%] flex items-center space-x-3 px-3 bg-white border-none py-2 z-20 bg-opacity-0 mb-5">
                    <input
                    type="text"
                    className="w-[93%] min-h-[50px] px-4 border-none rounded-[30px] text-[16px] bg-[#EDEDED] focus:outline-none"
                    />
                    <button className="h-[50px] w-[70px] border rounded-[30px] bg-[#FFC107] text-[16px]">
                    입력
                    </button>
                </div>
            </div>
        </main>
    )
}