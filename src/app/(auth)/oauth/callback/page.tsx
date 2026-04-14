"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { setSocialSignupData } = useAuthStore();

  // status가 'login-success'인 경우에만 토큰 갱신(refresh)을 시도합니다.
  // 신규 가입('sign-up-required')인 경우에는 불필요한 요청을 보내지 않습니다.
  const { isSuccess, isError, isLoading } = useAuthQuery(status === "login-success");

  useEffect(() => {
    console.log(`[OAuthCallback] status: ${status}, isSuccess: ${isSuccess}, isError: ${isError}`);

    // 1. 신규 회원 가입이 필요한 경우
    if (status === "sign-up-required") {
      console.log("[OAuthCallback] 신규 회원 감지 - 추가 정보 입력 페이지로 이동합니다.");
      const provider = searchParams.get("provider");
      const email = searchParams.get("email");
      const registrationToken = searchParams.get("registrationToken");

      if (provider && email && registrationToken) {
        setSocialSignupData({ provider, email, registrationToken });
        router.replace("/signup");
        return;
      }
    }

    // 2. 로그인 성공 시 처리 (useAuthQuery의 결과 활용)
    if (status === "login-success") {
      if (isSuccess) {
        console.log("[OAuthCallback] 로그인 성공 - 홈으로 이동합니다.");
        router.replace("/");
      } else if (isError) {
        console.error(
          "[OAuthCallback] 로그인 성공 상태이나 토큰 갱신에 실패했습니다. 쿠키 설정을 확인하세요.",
        );
        router.replace("/signin");
      }
      return;
    }

    // 3. 예외 상황 처리 (status가 없거나 예상치 못한 경우)
    if (isSuccess) {
      router.replace("/");
    } else if (isError) {
      router.replace("/signin");
    }
  }, [isSuccess, isError, router, searchParams, setSocialSignupData, status]);

  return (
    <main className="oauth-callback-page">
      <section>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <span className="text-lg font-medium text-muted-foreground">
            로그인 처리 중입니다... {isLoading ? "(통신 중)" : ""}
          </span>
        </div>
      </section>
    </main>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense>
      <OAuthCallbackContent />
    </Suspense>
  );
}
