"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { SignupSchema, signupSchema } from "@/shared/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupSchema) => {
    try {
      const { email, password, name } = data;
      await signup({ email, password, name });
      router.push("/signin");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="w-full max-w-[350] mx-auto flex items-center justify-center">
      <Card className="w-full border-none shadow-none bg-transparent">
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">회원가입</h1>
            <small>
              <p>TRUVE로 회원가입 하기</p>
              <p>정보를 입력하세요.</p>
            </small>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-1">
              <Input {...register("email")} placeholder="이메일" className="h-12" aria-invalid={!!errors.email} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Input {...register("name")} placeholder="이름" className="h-12" aria-invalid={!!errors.name} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <Input
                {...register("password")}
                type="password"
                placeholder="비밀번호"
                className="h-12"
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <div className="space-y-1">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="비밀번호 확인"
                className="h-12"
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 font-semibold" disabled={isSubmitting} variant={"outline"}>
              {isSubmitting ? "가입 중..." : "회원가입"}
            </Button>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </form>

          <div className="flex items-center justify-center text-sm">
            <span className="text-muted-foreground mr-2">이미 계정이 있으신가요?</span>
            <Link href="/signin" className="underline">
              로그인 하기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
