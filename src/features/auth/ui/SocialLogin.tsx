"use client";

import { Button } from "@/components/ui/button";

export default function SocialLogin() {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-sm">간편 로그인 하기</p>
      <Button asChild variant="outline" className="w-full h-12">
        <a href="/api/oauth2/authorization/google">
          <span className="mr-2 text-blue-500 font-bold">G</span>
          구글로 시작하기
        </a>
      </Button>
      <Button asChild variant="outline" className="w-full h-12">
        <a href="/api/oauth2/authorization/kakao">
          <span className="mr-2">💬</span>
          카카오로 시작하기
        </a>
      </Button>
      <Button asChild variant="outline" className="w-full h-12">
        <a href="/api/oauth2/authorization/naver">
          <span className="mr-2 text-green-500 font-bold">N</span>
          네이버로 시작하기
        </a>
      </Button>
    </div>
  );
}
