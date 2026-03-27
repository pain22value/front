import { useQuery } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/authService";
import { profileService } from "@/features/my/services/profileService";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
// import { usePathname } from "next/navigation";

export const useAuthQuery = () => {
  const { signout, refresh } = useAuthStore();
  // const pathname = usePathname();

  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["auth", "refresh"],
    queryFn: () => refresh(),
    // enabled: !!pathname && !pathname.startsWith("/oauth/callback"), // OAuth 콜백 페이지에서는 토큰 갱신 요청을 보내지 않음
    retry: false, // 인증 실패 시 재시도 하지 않음
    // refetchOnWindowFocus: true, // 브라우저 포커스 시 토큰 갱신 시도
    refetchOnWindowFocus: (query) => query.state.status !== "error", // 로그인 실패 상태면 포커스 시 재요청 안함
    staleTime: 1000 * 60 * 5, // 5분 동안은 캐시된 데이터 사용 (불필요한 요청 방지)
  });

  // 토큰 갱신 실패 시 로그아웃 처리
  useEffect(() => {
    if (isError) {
      const err = error as AxiosError;
      // 401 에러(인증 실패)인 경우에만 로그아웃 처리
      if (err.response?.status === 401) {
        signout();
      } else {
        toast.error("서버 연결 실패", { description: "서버가 비활성화 상태이거나 네트워크 문제일 수 있습니다." });
      }
    }
  }, [isError, error, signout]);

  return { data, isSuccess, isError, isLoading };
};
