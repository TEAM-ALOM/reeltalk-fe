"use client";

import { useEffect, useState } from "react";
import AdBanner from "../components/adBanner";
import { makeImagePath } from "@/lib/utils";

type Movie = {
  id: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
};
async function getMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      "https://ead8-115-91-214-4.ngrok-free.app/movies"
    );

    console.log("✅ Response Status:", response.status);
    console.log("✅ Response Headers:", response.headers.get("content-type"));

    // JSON 응답인지 확인
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("❌ API did not return JSON! Check the API response.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Fetch Error:", error);
    return [];
  }
}

export default function TopReview() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
      console.log(data);
    });
  }, []);
  return <div></div>;
}
