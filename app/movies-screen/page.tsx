"use client";
import { useState } from "react";

export default function MoviesScreen() {

    return (
        <main className="flex flex-col justify-center items-center space-y-12 bg-white">
            {/* 광고 자리 */}
            <div className="bg-[#D9D9D9] w-[calc(100vw-40px)] h-[120px] mt-[60px]">광고</div>

            {/* 영화 개봉순 나열열 */}
            <div className="w-[calc(100vw-40px)] h-10 border border-3 border-red-500">
                <span className="">영화 개봉 순</span>
            </div>
        </main>
    );
}