import { Scada } from "next/font/google";
import Link from "next/link";

const scada = Scada({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export default function ReviewUpload() {
  return (
    <main className="w-screen h-screen px-10 ">
      <div className="flex flex-col items-start w-full h-full gap-3 my-10">
        <span className={`text-ReelTalk_Yellow text-4xl ${scada.className}`}>
          Upload
        </span>
        <form className="flex flex-col gap-10">
          {/* 이미지 업로드 컨테이너 */}
          <div className="flex flex-col gap-6 mt-20">
            <div className="flex w-[680px] justify-between px-2 text-xl text-ReelTalk_DeepBlue">
              <span>이미지 업로드</span>
              <span>+</span>
            </div>
            <div className="w-[680px] min-w-96 h-[390px] bg-stone-200 rounded-3xl"></div>
          </div>
          {/* 영상 불러오기 컨테이너 */}
          <div className="flex flex-col w-full gap-6 ">
            <div className="flex justify-between w-full px-2 text-xl text-ReelTalk_DeepBlue">
              <span>영상 불러오기</span>
              <Link href={"https://www.youtube.com/?hl=ko&gl=KR&app=desktop"}>
                유튜브로 이동하기
              </Link>
            </div>
            <div className="w-[944px] min-w-96 h-[37px] bg-stone-200 rounded-3xl"></div>
          </div>
          {/* 영상 소개 컨테이너 */}
          <div className="flex flex-col w-full gap-6 ">
            <div className="flex justify-between w-full px-2 text-xl text-ReelTalk_DeepBlue">
              <span>영상 소개</span>
            </div>
            <div className="w-[944px] min-w-96 h-[146px] bg-stone-200 rounded-3xl"></div>
          </div>
        </form>
      </div>
    </main>
  );
}
