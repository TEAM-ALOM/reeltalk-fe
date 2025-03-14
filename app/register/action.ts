"use server";

import { registerUser } from "@/lib/api";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

function checkUsername(username: string) {
  return !username.includes("admin");
}

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required",
      })

      .toLowerCase()
      .trim()
      .transform((username) => `${username}🇰🇷`)
      .refine(checkUsername, "Username cannot contain 'admin'"),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  }) //아래의 refine은 form 전체에 대한 refine임을 주의 confirm_password에 붙은 게 아님
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

type FormState = {
  fieldErrors?: {
    email?: string[];
    username?: string[];
    password?: string[];
    confirm_password?: string[];
  };
  formErrors?: string[];
  success?: boolean;
};

export async function createAccount(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await registerUser(data.email, data.username, data.password);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { formErrors: [error.message] };
    }
    return { formErrors: ["알 수 없는 오류가 발생했습니다."] };
  }
}
