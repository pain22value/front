"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// 브라우저 환경(window)에서만 PostHog를 초기화합니다.
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_TOKEN || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "always", // 유저 프로필 생성 설정
    capture_pageview: false, // 단일 페이지 애플리케이션(SPA)의 정확한 측정을 위해 수동으로 트래킹합니다.
    debug: true, // 개발 단계에서 전송 로그를 확인하기 위해 디버그 모드를 활성화합니다.
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}

/**
 * 페이지 이동 시 자동으로 페이지뷰 이벤트를 PostHog로 전송하는 컴포넌트입니다.
 */
export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 경로(pathname)나 쿼리 파라미터(searchParams)가 변경될 때마다 호출됩니다.
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }
      // $pageview 이벤트를 현재 URL 정보와 함께 전송합니다.
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
