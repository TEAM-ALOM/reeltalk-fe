import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
      {/* 404 제목 */}
      <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">길을 잃으셨나요?</h2>
      <p className="text-lg text-gray-400 mb-6">
        찾으려는 페이지가 존재하지 않습니다. ReelTalk에서 새로운 영화를
        탐색해보세요! 🎬
      </p>

      {/* 홈으로 가기 버튼 */}
      <Link
        href="/"
        className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
      >
        홈으로 돌아가기
      </Link>

      {/* 문의 안내 */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-gray-400 text-sm">
        <p>
          문제가 지속되면{" "}
          <span className="text-yellow-300 font-semibold">ReelTalk</span> 팀에
          문의해 주세요.
        </p>
        <p className="mt-1">
          이메일:{" "}
          <a
            href="mailto:support@reeltalk.com"
            className="text-yellow-400 hover:underline"
          >
            support@reeltalk.com
          </a>
        </p>
      </div>
    </div>
  );
}
