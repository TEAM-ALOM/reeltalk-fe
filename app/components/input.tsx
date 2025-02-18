import { InputHTMLAttributes } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface InputProps {
  name: string;
  errors?: string[];
  text: string;
  icon?: JSX.Element; // 아이콘 추가
}

export default function Input({
  name,
  errors = [],
  text,
  icon,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="self-start pl-1 font-semibold text-ReelTalk_DeepBlue">
        {text}
      </label>

      <div className="relative w-full">
        {/* 아이콘 (입력 필드 내부 왼쪽) */}
        {icon && (
          <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
            {icon}
          </div>
        )}

        {/* 입력 필드 */}
        <input
          name={name}
          className={`w-full h-12 px-10 py-4 transition bg-white border-none rounded-2xl focus:outline-none focus:ring-4 placeholder:text-neutral-400 
            ${
              errors.length > 0
                ? "ring-red-500"
                : "focus:ring-ReelTalk_DeepBlue"
            }`}
          {...rest}
        />

        {/* 에러 메시지 아이콘 */}
        {errors.length > 0 && (
          <div className="absolute inset-y-0 flex items-center right-3">
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* 에러 메시지 출력 */}
      {errors.length > 0 && (
        <span className="ml-3 text-sm font-medium text-red-500">
          {errors[0]}
        </span>
      )}
    </div>
  );
}
