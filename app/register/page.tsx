import { Sansita } from "next/font/google";

const sansita = Sansita({
  weight: ["800", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export default function Register() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-ReelTalk_LightBlue">
        <span
          className={`ml-5 mr-10 text-3xl italic font-bold text-ReelTalk_DeepBlue ${sansita.className}`}
        >
          ReelTalk
        </span>
      </div>
    </main>
  );
}
