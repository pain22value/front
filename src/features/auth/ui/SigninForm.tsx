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
import { signinSchema } from "@/shared/schemas/schemas";

export default function SigninForm() {
  const router = useRouter();
  const signin = useAuthStore((state) => state.signin);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninRequest) => {
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
          {/* 탑레벨 네비게이션 요청이 아님 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-1">
              <Input
                {...register("email")}
                placeholder="이메일 입력하기"
                className="h-12"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Input
                {...register("password")}
                type="password"
                placeholder="비밀번호 입력하기"
                className="h-12"
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full h-12 font-semibold" disabled={isSubmitting} variant={"outline"}>
              {isSubmitting ? "로그인 중..." : "로그인 하기"}
            </Button>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </form>

          {/* 중간의 링크부분 */}
          <div className="flex items-center justify-between text-sm">
            <Link href="/forgot">아이디/비밀번호 찾기</Link>
            <Link href="/signup">회원가입 하기</Link>
          </div>

          {/* 소셜 로그인 */}
          <SocialLogin />
        </CardContent>
      </Card>
    </div>
  );
}
