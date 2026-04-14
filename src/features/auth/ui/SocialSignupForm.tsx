"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderSpinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { authService } from "@/features/auth/services/authService";
import { SocialSignupFormValues, socialSignupSchema } from "@/shared/schemas/authSchema";

export default function SocialSignupForm() {
  const router = useRouter();
  const { socialSignupData, socialSignupComplete, setSocialSignupData, signupTerms, setSignupTerms } = useAuthStore();
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    watch,
  } = useForm<SocialSignupFormValues>({
    resolver: zodResolver(socialSignupSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      verificationCode: "",
      nickname: "",
    },
  });

  const nicknameValue = watch("nickname");
  const verificationCodeValue = watch("verificationCode");
  const isInputFilled = !!nicknameValue && !!verificationCodeValue;

  /* ================= 소셜 데이터 및 약관 동의 확인 ================= */
  useEffect(() => {
    if (!socialSignupData) {
      toast.error("소셜 로그인 정보가 없습니다.");
      router.replace("/signin");
      return;
    }

    const currentTerms = useAuthStore.getState().signupTerms;
    if (!currentTerms) {
      toast.error("약관 동의가 필요합니다.");
      router.replace("/signup/terms");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  /* ================= 인증코드 발송 ================= */
  const handleSendVerification = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!socialSignupData?.email) return;

    try {
      setIsSendingVerification(true);
      await authService.sendVerificationCode(socialSignupData.email);
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
    if (!socialSignupData?.email) return;
    const code = getValues("verificationCode");
    if (!code) return;

    setIsVerifying(true);
    try {
      await authService.verifyEmail(socialSignupData.email, code);
      setIsVerified(true);
      toast.success("인증되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "인증번호가 올바르지 않습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  /* ================= 소셜 회원가입 완료 ================= */
  const onSubmit = async (data: SocialSignupFormValues) => {
    if (!socialSignupData) {
      toast.error("소셜 로그인 정보가 없습니다.");
      return;
    }

    if (!signupTerms) {
      toast.error("약관 동의가 필요합니다.");
      router.push("/signup/terms");
      return;
    }

    try {
      await socialSignupComplete({
        registrationToken: socialSignupData.registrationToken,
        email: socialSignupData.email,
        nickname: data.nickname,
        serviceTermsAgreed: signupTerms.serviceTermsAgreed,
        electronicFinanceTermsAgreed: signupTerms.electronicFinanceTermsAgreed,
        privacyCollectionAgreed: signupTerms.privacyCollectionAgreed,
        marketingInfoAgreed: signupTerms.marketingInfoAgreed,
        over14Agreed: signupTerms.over14Agreed,
      });
      toast.success("회원가입이 완료되었습니다.");
      setSocialSignupData(null);
      setSignupTerms(null);
      router.replace("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  if (!socialSignupData) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-[400px] space-y-6">
      <h1 className="text-center text-2xl font-bold">회원가입</h1>

      {/* ================= 이메일 ================= */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground font-medium">이메일</Label>
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input value={socialSignupData.email} disabled />
            {isVerified && <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />}
          </div>
          {!isVerified && (
            <Button
              type="button"
              variant="secondary"
              className="shrink-0 bg-red-500 hover:bg-red-600 text-white"
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

      {/* ================= 닉네임 ================= */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground font-medium">닉네임</Label>
        <Input {...register("nickname")} aria-invalid={!!errors.nickname} />
        <p className="text-xs text-muted-foreground">원하는 닉네임을 설정해 보세요. (1~32자, 특수문자 사용 불가)</p>
        {errors.nickname && <p className="text-sm text-destructive">{errors.nickname.message}</p>}
      </div>

      {/* ================= 가입 버튼 ================= */}
      <Button
        type="submit"
        className={`w-full h-11 ${isInputFilled ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
        disabled={!isVerified || isSubmitting}
        variant="secondary"
      >
        {isSubmitting ? "가입 중..." : "가입하기"}
      </Button>
    </form>
  );
}
