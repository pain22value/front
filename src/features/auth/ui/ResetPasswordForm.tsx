"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderSpinner } from "@/components/ui/spinner";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/shared/schemas/authSchema";
import { authService } from "@/features/auth/services/authService";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
    watch,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      verificationCode: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");
  const verificationCodeValue = watch("verificationCode");

  const isInputFilled =
    !!emailValue && !!verificationCodeValue && !!passwordValue && !!passwordConfirmValue && isVerified;

  const isEmailInputValid = !!emailValue && !errors.email;

  /* ================= password 교차 검증 보완 ================= */
  useEffect(() => {
    if (passwordConfirmValue) {
      trigger("passwordConfirm");
    }
  }, [passwordValue, passwordConfirmValue, trigger]);

  /* ================= 타이머 ================= */
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isVerified]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remain = seconds % 60;
    return `${minutes}:${remain.toString().padStart(2, "0")}`;
  };

  /* ================= 인증코드 발송 ================= */
  const handleSendVerification = async (e: React.MouseEvent) => {
    e.preventDefault();

    const email = getValues("email");
    const isEmailValid = await trigger("email");
    if (!isEmailValid) return;

    try {
      setIsSendingVerification(true);
      await authService.sendVerificationCode(email); // reset 전용 API
      setIsVerificationSent(true);
      setIsVerified(false);
      setTimeLeft(180);
      toast.success("인증코드가 발송되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "인증코드 발송에 실패했습니다.");
    } finally {
      setIsSendingVerification(false);
    }
  };

  /* ================= 인증코드 확인 ================= */
  const handleVerify = async () => {
    const email = getValues("email");
    const code = getValues("verificationCode");
    if (!code) return;

    try {
      setIsVerifying(true);
      await authService.verifyEmail(email, code);
      setIsVerified(true);
      toast.success("인증되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "인증번호가 올바르지 않습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  /* ================= 비밀번호 재설정 ================= */
  const onSubmit = async () => {
    try {
      // 주석 해제하여 실제 API 호출
      // await authService.resetPassword(data);

      toast.success("비밀번호가 성공적으로 변경되었습니다.");

      // 3. 성공 시 로그인 페이지로 이동
      router.push("/signin");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-[400px] space-y-6">
      <h1 className="text-center text-2xl font-bold">비밀번호 재설정</h1>

      {/* ================= 이메일 ================= */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground font-medium">이메일</Label>

        <div className="flex gap-2">
          <div className="relative w-full">
            <Input {...register("email")} disabled={isVerified} aria-invalid={!!errors.email} />
            {isVerified && <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />}
          </div>

          {!isVerified && (
            <Button
              type="button"
              variant="secondary"
              className={`shrink-0 ${isEmailInputValid ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
              onClick={handleSendVerification}
              disabled={isSendingVerification}
            >
              {isSendingVerification ? (
                <>
                  발송중
                  <LoaderSpinner className="animate-spin ml-2" />
                </>
              ) : (
                "인증코드 받기"
              )}
            </Button>
          )}
        </div>

        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}

        {/* ================= 인증코드 영역 ================= */}
        {isVerificationSent && (
          <div className="flex gap-2">
            <div className="relative w-full">
              <Input
                {...register("verificationCode")}
                disabled={isVerified}
                placeholder="인증코드를 입력하세요"
                aria-invalid={!!errors.verificationCode}
              />
              {isVerified ? (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-sm font-medium">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>

            {!isVerified && (
              <Button
                type="button"
                variant="outline"
                onClick={handleVerify}
                className="shrink-0"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    확인중
                    <LoaderSpinner className="animate-spin ml-2" />
                  </>
                ) : (
                  "인증코드 확인"
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ================= 새 비밀번호 ================= */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground font-medium">새 비밀번호</Label>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="pr-10"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-muted-foreground">영문, 숫자, 특수문자 포함 8~32자</p>

        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      {/* ================= 비밀번호 확인 ================= */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground font-medium">비밀번호 확인</Label>

        <div className="relative">
          <Input
            type={showPasswordConfirm ? "text" : "password"}
            {...register("passwordConfirm")}
            className="pr-10"
            aria-invalid={!!errors.passwordConfirm}
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {errors.passwordConfirm && <p className="text-sm text-destructive">{errors.passwordConfirm.message}</p>}
      </div>

      {/* ================= 변경 버튼 ================= */}
      <Button
        type="submit"
        variant="secondary"
        className={`w-full h-11 ${isInputFilled ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
        disabled={isSubmitting || !isVerified}
      >
        {isSubmitting ? "변경 중..." : "비밀번호 변경"}
      </Button>
    </form>
  );
}
