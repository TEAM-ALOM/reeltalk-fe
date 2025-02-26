"use client";

import { MovieTest, testMovies } from "@/lib/api";
import { useEffect, useState } from "react";
import MovieCardVertical from "../components/movieCard-vertical";

export default function TestPage() {
  const [movies, setMovies] = useState<MovieTest[]>([]);
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    testMovies().then((data) => {
      setMovies(data);
      console.log(data);
      setLoading(false); // ✅ 로딩 완료
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // ✅ 데이터가 없으면 로딩 메시지 표시
  }

  if (!movies || movies.length === 0) {
    return <p>No movies found</p>; // ✅ movies가 없을 때 안전하게 처리
  }

  return (
    <div className="h-screen w-screen mb-20 bg-slate-500">
      <h1>{movies[0]?.title ?? "No title available"}</h1> {/* ✅ 안전한 접근 */}
      {movies.slice(0, 2).map((movie) => (
        <div key={movie.id}>
          <MovieCardVertical
            title={movie.title}
            id={movie.id}
            poster_path={movie.poster_path}
            isTVSeries={false}
          />
        </div>
      ))}
    </div>
  );
}
