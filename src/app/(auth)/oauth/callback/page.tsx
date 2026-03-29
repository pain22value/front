"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery";

export default function OAuthCallbackPage() {
  const router = useRouter();
  // useAuthQuery를 통해 로그인 상태 확인 (AuthProvider에서 이미 실행 중인 쿼리 상태를 공유받음)
  const { isSuccess, isError } = useAuthQuery();

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    } else if (isError) {
      router.replace("/signin");
    }
  }, [isSuccess, isError, router]);

  // 로딩 중이거나 리다이렉트 대기 중일 때 항상 스피너 표시 (깜빡임 방지)
  return (
    <main className="oauth-callback-page">
      <section>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <span className="text-lg font-medium text-muted-foreground">로그인 처리 중입니다...</span>
        </div>
      </section>
    </main>
  );
}
