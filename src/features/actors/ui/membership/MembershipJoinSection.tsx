import React from "react";
import { Star, MessageSquare, Check, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function MembershipJoinSection() {
  return (
    <section className="w-full max-w-md mx-auto p-4 flex flex-col gap-4 bg-zinc-950 min-h-screen font-sans">
      {/* 아티스트 프로필 요약 섹션 */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-20 h-20 bg-zinc-100 rounded-lg shrink-0 overflow-hidden">
            <Image
              width={800}
              height={800}
              src="/actor-profile.jpg"
              alt="고은성"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">고은성</h2>
              <span className="text-[12px] font-medium text-zinc-400">뮤지컬 배우</span>
            </div>
            <p className="text-[11px] leading-[1.4] text-zinc-500 line-clamp-2">
              활동 작품: 뮤지컬 (한복 입은 남자)(2025), 뮤지컬 (멤피스) - 성남(2025), 뮤지컬 데스노트(2025)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 가입 상세 정보 및 결제 섹션 */}
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="pt-8 pb-4 px-6">
          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-400">월간 멤버십</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-red-500 tracking-tight">5,000원</span>
              <span className="text-zinc-400 text-sm font-medium">/월</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-4 space-y-7">
          {/* 멤버십 혜택 설명 */}
          <div className="space-y-5">
            <BenefitItem
              icon={<Star className="w-5 h-5" />}
              title="독점 콘텐츠 무제한 이용"
              description="멤버십 전용 사진, 영상, 비하인드 스토리를 제한 없이 감상"
            />
            <BenefitItem
              icon={<MessageSquare className="w-5 h-5" />}
              title="아티스트와 실시간 채팅"
              description="멤버십 회원 전용 채팅방에서 아티스트와 직접 소통"
            />
            <BenefitItem
              icon={<Check className="w-5 h-5" />}
              title="언제든 해지 가능"
              description="자동 결제되며, 해지는 언제든 가능"
            />
          </div>

          <Separator className="bg-zinc-100" />

          {/* 약관 및 동의 사항 */}
          <div className="space-y-4">
            <AgreementRow label="(필수) 멤버십 이용약관 동의" />
            <AgreementRow label="(필수) 개인정보 수집 및 이용 동의" />
            <AgreementRow label="(필수) 월 5,000원 자동결제 동의" />

            <div className="flex justify-between items-center py-1 cursor-pointer group">
              <span className="text-[12px] text-zinc-400 underline underline-offset-4 group-hover:text-zinc-600 transition-colors">
                개인정보 제 3자 제공 안내
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-300" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-2 flex gap-3">
          <Button variant="ghost" className="flex-1 text-zinc-400 font-bold hover:bg-zinc-50">
            취소
          </Button>
          <Button className="flex-[2.5] bg-red-500 hover:bg-red-600 text-white font-bold h-12 rounded-md">
            멤버십 가입하기
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

/**
 * 컴포넌트 내 가독성을 위한 서브 컴포넌트: 혜택 아이템
 */
function BenefitItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-zinc-300 shrink-0 mt-0.5">{icon}</div>
      <div className="space-y-0.5">
        <h4 className="text-[14.5px] font-bold text-zinc-800 tracking-tight">{title}</h4>
        <p className="text-[12px] text-zinc-400 leading-snug">{description}</p>
      </div>
    </div>
  );
}

/**
 * 컴포넌트 내 가독성을 위한 서브 컴포넌트: 약관 동의 행
 */
function AgreementRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-3">
        <Checkbox className="w-5 h-5 border-zinc-200 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" />
        <span className="text-[13.5px] text-zinc-600 font-medium tracking-tight group-hover:text-zinc-900 transition-colors">
          {label}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-300" />
    </div>
  );
}
