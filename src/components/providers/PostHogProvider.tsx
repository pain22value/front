"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// 🚨 PostHog 일시중단 - 사용 재개 시 아래 주석 해제
/* if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_TOKEN || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "always",
    capture_pageview: false,
    debug: false,
    opt_out_capturing_by_default: true,
  });
} */

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // 🚨 PostHog 일시중단 - PHProvider 대신 Fragment로 대체
  // return <PHProvider client={posthog}>{children}</PHProvider>;
  return <>{children}</>;
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
      // 🚨 PostHog 일시중단 - 재개 시 주석 해제
      // posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}
