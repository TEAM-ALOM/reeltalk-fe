export default function liveChat() {
    return (
        <main className="flex flex-col justify-center items-center w-full relative">
            <div className="w-[89%] bg-[#D9D9D9] my-5">
                <form className="w-full h-[954px] border border-3 border-black">
                    {/** 댓글보드 */}
                    <div>

                    </div>

                    {/** 입력 창 */}
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