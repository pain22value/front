"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authService } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

const signupFormSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 형식이 아닙니다."),
    password: z.string().min(2, "비밀번호는 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호를 재확인해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    birthdate: z.string().length(6, "생년월일 6자리를 입력해주세요."),
    gender: z.string().min(1, "성별을 선택해주세요."),
    verificationCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function SignupForm2() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      birthdate: "",
      gender: "",
      verificationCode: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { email, password, name } = data;
      await signup({ email, password, name });
      toast.success("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.push("/signin");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "서버와의 통신 중 문제가 발생했습니다.";
      toast.error(errorMessage);
    }
  };

  const handleSendVerification = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = getValues("email");
    const isEmailValid = await trigger("email");

    if (!isEmailValid) return;

    try {
      await authService.sendVerificationCode(email);
      setIsVerificationSent(true);
      setIsVerified(false);
      toast.success("인증코드가 발송되었습니다.");
    } catch (err) {
      console.error(err);
      toast.error("인증코드 발송에 실패했습니다.");
    }
  };

  const handleVerify = async () => {
    const email = getValues("email");
    const code = getValues("verificationCode");
    if (!code) return;

    try {
      await authService.verifyEmail(email, code);
      setIsVerified(true);
      toast.success("인증되었습니다.");
    } catch (err) {
      console.error(err);
      toast.error("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div
      className="w-full max-w-[350] mx-auto flex items-center justify-center 
      border/ border-dashed"
    >
      <Card className="w-full border-none shadow-none bg-transparent">
        <CardContent className="space-y-6 p-0">
          <h1 className="text-center text-2xl font-bold text-white">회원가입</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-muted-foreground">이메일</Label>
              <div className="flex gap-2">
                <Input {...register("email")} placeholder="이메일" />
                <Button variant="outline" className="shrink-0" onClick={handleSendVerification} type="button">
                  인증코드 받기
                </Button>
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative w-full">
                  <Input
                    {...register("verificationCode")}
                    disabled={!isVerificationSent || isVerified}
                    placeholder="인증코드를 입력하세요"
                  />
                  {isVerified && <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />}
                </div>
                {isVerificationSent && !isVerified && (
                  <Button type="button" variant="outline" onClick={handleVerify} className="shrink-0">
                    인증확인
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">비밀번호</Label>
              <Input type="password" {...register("password")} />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">비밀번호 재확인</Label>
              <Input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">이름</Label>
              <Input {...register("name")} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">성별</Label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="성별을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="female">여성</SelectItem>
                      <SelectItem value="none">선택 안 함</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">생년월일</Label>
              <Input {...register("birthdate")} placeholder="6자로 입력해주세요." maxLength={6} />
              {errors.birthdate && <p className="text-red-500 text-xs">{errors.birthdate.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? "가입 중..." : "가입하기"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
