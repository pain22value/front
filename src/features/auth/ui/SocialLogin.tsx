"use client";

import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/shared/api/endpoints";

export default function SocialLogin() {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">간편 로그인 하기</p>

      {/* Kakao */}
      <Button
        asChild
        className="
          h-12 w-full
          bg-[#FEE500] text-black
          hover:bg-[#FEE500]/90
          font-semibold
        "
      >
        <a href={`/api${ENDPOINTS.OAUTH.KAKAO}`} className="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.9899 3C6.45796 3 2 6.5461 2 10.9027C2 13.7396 3.90476 16.232 6.74164 17.6302C6.53901 18.4205 5.9919 20.4671 5.87032 20.8926C5.72847 21.4397 6.07295 21.4195 6.29584 21.2776C6.47821 21.156 9.03141 19.4134 10.1459 18.6636C10.7538 18.7447 11.3617 18.8055 12.0101 18.8055C17.542 18.8055 22 15.2594 22 10.9027C22 6.52584 17.5218 3 11.9899 3Z"
              fill="black"
            />
          </svg>
          카카오 로그인
        </a>
      </Button>

      {/* Naver */}
      <Button
        asChild
        className="
          h-12 w-full
          bg-[#03C75A] text-white
          hover:bg-[#03C75A]/90
          font-semibold
        "
      >
        <a href={`/api${ENDPOINTS.OAUTH.NAVER}`} className="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.8485 12.5988L8.917 3.5H4V20.5H9.15152V11.4012L15.083 20.5H20V3.5H14.8485V12.5988Z"
              fill="white"
            />
          </svg>
          네이버 로그인
        </a>
      </Button>

      {/* Google */}
      <Button
        asChild
        variant="outline"
        className="
          h-12 w-full
          border border-neutral-300
          bg-black text-white
          hover:bg-neutral-900
          font-semibold
        "
      >
        <a href={`/api${ENDPOINTS.OAUTH.GOOGLE}`} className="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.8 12.2271C21.8 11.518 21.7363 10.8362 21.6182 10.1816H12.2V14.0498H17.5818C17.35 15.2998 16.6454 16.3589 15.5863 17.068V19.5771H18.8181C20.7091 17.8362 21.8 15.2726 21.8 12.2271Z"
              fill="#4285F4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.2001 22.0004C14.9001 22.0004 17.1637 21.105 18.8182 19.5777L15.5864 17.0686C14.691 17.6686 13.5455 18.0231 12.2001 18.0231C9.5955 18.0231 7.39095 16.264 6.60459 13.9004H3.26367V16.4913C4.90913 19.7595 8.29096 22.0004 12.2001 22.0004Z"
              fill="#0F9D58"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.60451 13.8997C6.40451 13.2997 6.29087 12.6588 6.29087 11.9997C6.29087 11.3406 6.40451 10.6997 6.60451 10.0997V7.50879H3.26359C2.58632 8.85879 2.19995 10.3861 2.19995 11.9997C2.19995 13.6133 2.58632 15.1406 3.26359 16.4906L6.60451 13.8997Z"
              fill="#F4B400"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.2001 5.97728C13.6682 5.97728 14.9864 6.48183 16.0228 7.47274L18.891 4.60455C17.1592 2.99091 14.8955 2 12.2001 2C8.29096 2 4.90913 4.24091 3.26367 7.5091L6.60459 10.1C7.39095 7.73638 9.5955 5.97728 12.2001 5.97728Z"
              fill="#DB4437"
            />
          </svg>
          Google 로그인
        </a>
      </Button>
    </div>
  );
}
