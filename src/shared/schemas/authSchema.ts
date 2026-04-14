import { object, string, z } from "zod";

export const signinSchema = object({
  email: string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 형식이 아닙니다."),
  password: string().min(1, "비밀번호를 입력해주세요.").max(32, "비밀번호는 32자 이하이어야 합니다."),
});

export const signupSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일을 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(32, "비밀번호는 32자 이하입니다.")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/, "영문, 숫자, 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string(),
    nickname: z
      .string()
      .min(1, "닉네임을 입력해주세요.")
      .max(32, "닉네임은 32자 이하입니다.")
      .regex(/^[a-zA-Z0-9가-힣]+$/, "특수문자는 사용할 수 없습니다."),
    verificationCode: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export const resetPasswordSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일을 입력해주세요."),
    verificationCode: z.string().min(1, "인증코드를 입력해주세요.").length(6, "인증코드는 6자리여야 합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(32, "비밀번호는 32자 이하입니다.")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/, "영문, 숫자, 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export const socialSignupSchema = z.object({
  verificationCode: z.string().optional(),
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요.")
    .max(32, "닉네임은 32자 이하입니다.")
    .regex(/^[a-zA-Z0-9가-힣]+$/, "특수문자는 사용할 수 없습니다."),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
export type SigninFormValues = z.infer<typeof signinSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type SocialSignupFormValues = z.infer<typeof socialSignupSchema>;
