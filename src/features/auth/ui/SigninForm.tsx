"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import { SigninFormValues, signinSchema } from "@/shared/schemas/authSchema";

export default function SigninForm() {
  const router = useRouter();
  const signin = useAuthStore((state) => state.signin);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isInputFilled = !!emailValue && !!passwordValue;

  const onSubmit = async (data: SigninFormValues) => {
    try {
      await signin(data);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="w-full max-w-[400] mx-auto flex items-center justify-center">
      <Card className="w-full border-none shadow-none bg-transparent!">
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">로그인</h1>
            <small>
              <p>TRUVE로 로그인 하기</p>
              <p>이메일과 비밀번호를 입력하세요.</p>
            </small>
          </div>

          {/* 폼 로그인 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-1">
              <div className="relative">
                <Input
                  {...register("email")}
                  placeholder="techup@gmail.com"
                  className="h-12"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 3C13.8661 3 17 6.1339 17 10C17 13.8661 13.8661 17 10 17C6.1339 17 3 13.8661 3 10C3 6.1339 6.1339 3 10 3ZM10 4.40039C6.9123 4.40039 4.39942 6.9123 4.39941 10C4.39941 13.0877 6.9123 15.5996 10 15.5996C13.0877 15.5996 15.5996 13.0877 15.5996 10C15.5996 6.91234 13.0877 4.40045 10 4.40039ZM10 12.0996C10.3863 12.0997 10.7001 12.4135 10.7002 12.7998C10.7002 13.1861 10.3863 13.4999 10 13.5C9.61368 13.4999 9.2998 13.1861 9.2998 12.7998C9.29991 12.4136 9.61374 12.0997 10 12.0996ZM10 6.5C10.3863 6.50011 10.7002 6.81386 10.7002 7.2002V10.7002C10.7001 11.0864 10.3862 11.4003 10 11.4004C9.61374 11.4003 9.29991 11.0864 9.2998 10.7002V7.2002C9.29981 6.81386 9.61368 6.50009 10 6.5Z"
                        fill="#F93E4B"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="비밀번호 입력하기"
                  className="h-12"
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 3C13.8661 3 17 6.1339 17 10C17 13.8661 13.8661 17 10 17C6.1339 17 3 13.8661 3 10C3 6.1339 6.1339 3 10 3ZM10 4.40039C6.9123 4.40039 4.39942 6.9123 4.39941 10C4.39941 13.0877 6.9123 15.5996 10 15.5996C13.0877 15.5996 15.5996 13.0877 15.5996 10C15.5996 6.91234 13.0877 4.40045 10 4.40039ZM10 12.0996C10.3863 12.0997 10.7001 12.4135 10.7002 12.7998C10.7002 13.1861 10.3863 13.4999 10 13.5C9.61368 13.4999 9.2998 13.1861 9.2998 12.7998C9.29991 12.4136 9.61374 12.0997 10 12.0996ZM10 6.5C10.3863 6.50011 10.7002 6.81386 10.7002 7.2002V10.7002C10.7001 11.0864 10.3862 11.4003 10 11.4004C9.61374 11.4003 9.29991 11.0864 9.2998 10.7002V7.2002C9.29981 6.81386 9.61368 6.50009 10 6.5Z"
                        fill="#F93E4B"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              className={`w-full h-12 font-semibold ${isInputFilled ? "bg-red-500! hover:bg-red-600! text-white! border-none!" : ""}`}
              disabled={isSubmitting}
              variant={"outline"}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </Button>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </form>

          {/* 중간의 링크부분 */}
          <div className="flex items-center justify-between text-sm">
            <Link href="/reset">비밀번호 재설정</Link>
            <Link href="/signup/terms">회원가입 하기</Link>
          </div>

          {/* 소셜 로그인 */}
          <SocialLogin />
        </CardContent>
      </Card>
    </div>
  );
}
