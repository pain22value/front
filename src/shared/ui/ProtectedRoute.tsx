"use client";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery";

/**
 * 로그인한 사용자만 접근할 수 있는 페이지를 위한 가드 컴포넌트
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken, user } = useAuthStore();
  const { isLoading } = useAuthQuery();
  const router = useRouter();

  useEffect(() => {
    // 1. 토큰 갱신 시도가 완료되었고 (isLoading=false)
    // 2. 여전히 액세스 토큰이나 사용자 정보가 없는 경우에만 이동
    if (!isLoading && (!accessToken || !user)) {
      router.replace("/signin");
    }
  }, [isLoading, accessToken, user, router]);

  // 세션 복구 중일 때는 로딩 표시 (깜빡임 방지)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // 인증이 확인된 경우에만 하위 콘텐츠 렌더링
  if (accessToken && user) {
    return <>{children}</>;
  }

  // 권한이 없는 경우(이동 중)에는 아무것도 렌더링하지 않음
  return null;
}
