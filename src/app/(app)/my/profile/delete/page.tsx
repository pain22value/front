"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function AccountDeletePage() {
  const [confirmText, setConfirmText] = useState("");
  const router = useRouter();
  const isValid = confirmText === "truve 탈퇴";

  const noticeSections = [
    {
      title: "계정 관련",
      content:
        "TRUVE 서비스 탈퇴 시 계정 정보의 복구는 불가하며, 동일 계정으로는 탈퇴일로부터 7일 이후에 재가입이 가능합니다. 재가입 시 탈퇴 전 계정 정보는 복구되지 않습니다.",
    },
    {
      title: "활동 이력 관련",
      content: [
        "탈퇴 시 닉네임, 프로필, 아티스트 팔로잉 내역, 알림 설정 등 서비스 활동 이력은 모두 삭제되며 복구가 불가합니다.",
        "작성한 관람평은 삭제되지 않으며, 작성자명이 '알 수 없음'으로 표시된 상태로 유지됩니다. 탈퇴 전 삭제를 원하시는 경우 직접 삭제해주시기 바랍니다.",
      ],
    },
    {
      title: "라이브채팅 관련",
      content: [
        "탈퇴 시 라이브채팅 이용 내역 및 채팅 기록은 모두 삭제되며 복구가 불가합니다.",
        "미사용 이용권의 환불을 원하시는 경우, 원활한 처리를 위해 탈퇴 전 환불을 신청해주시기 바랍니다. 단, 구매 후 7일이 경과한 이용권은 미사용 상태이더라도 환불이 불가합니다.",
      ],
    },
    {
      title: "예매 관련",
      content: [
        "이용이 완료되지 않은 예매 내역이 있는 경우 탈퇴가 제한됩니다. 탈퇴를 원하시는 경우 예매를 취소하신 후 진행해주시기 바랍니다.",
        "탈퇴 후에는 서비스 내에서 과거 예매 내역의 확인이 불가합니다. 필요한 경우 탈퇴 전에 예매 내역을 별도로 보관해주시기 바랍니다.",
      ],
    },
    {
      title: "멤버십 관련",
      content: [
        "유효기간이 남아있는 멤버십을 보유한 경우 탈퇴가 제한됩니다. 탈퇴를 원하시는 경우 멤버십을 해지하신 후 진행해주시기 바랍니다.",
        "탈퇴 시 멤버십 및 혜택은 즉시 소멸되며 복구가 불가합니다.",
        "멤버십 가입 후 7일 이내 미사용 상태인 경우 환불이 가능합니다. 원활한 처리를 위해 탈퇴 전 환불을 신청해주시기 바랍니다.",
        "멤버십 선예매를 통해 이미 티켓을 구매하신 경우, 탈퇴 후 공연 현장에서 본인 확인이 어려울 수 있으니 유의하시기 바랍니다.",
        "재가입 시에도 이전 멤버십 등급 및 혜택은 복원되지 않습니다.",
      ],
    },
    {
      title: "환불 관련",
      content:
        "환불 대상인 예매 내역이 있는 경우, 원활한 처리를 위해 탈퇴 전 환불을 신청해주시기 바랍니다. 탈퇴 후에는 서비스 내 환불 신청이 불가합니다.",
    },
    {
      title: "포인트 및 쿠폰 관련",
      content: [
        "보유하고 있는 포인트는 탈퇴 시 모두 소멸되며 복구가 불가합니다.",
        "보유하고 있는 쿠폰은 탈퇴 시 모두 소멸되며 복구가 불가합니다.",
        "재가입 시에도 소멸된 포인트 및 쿠폰은 복원되지 않습니다.",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-3xl px-6 py-16 space-y-10">
        {/* 페이지 타이틀 */}
        <div>
          <h1 className="text-3xl font-bold">계정 탈퇴</h1>
        </div>

        {/* 사용자 정보 */}
        <div className="flex items-center w-full max-w-4xl p-4 bg-[#f1f3f5] rounded-xl shadow-sm">
          {/* 아바타 영역 */}
          <div className="flex items-center justify-center w-12 h-12 bg-[#84849a] rounded-full mr-4">
            <span className="text-white text-lg font-bold">김</span>
          </div>

          {/* 이름 영역 */}
          <div className="flex items-baseline">
            <h2 className="text-2xl font-bold text-[#1a1a1b] tracking-tight">김관우</h2>
            <span className="ml-1 text-2xl font-bold text-[#1a1a1b]">님</span>
          </div>
        </div>

        {/* 유의사항 섹션 */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-red-600">계정 탈퇴 유의 사항</h2>

          <div className="grid gap-6">
            {noticeSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                  {Array.isArray(section.content) ? (
                    section.content.map((item, i) => <p key={i}>• {item}</p>)
                  ) : (
                    <p>• {section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 확인 입력 */}
        <div className="space-y-4">
          <p className="text-sm text-red-500 font-bold">
            위 유의 사항을 충분히 숙지하고 동의하신다면, 아래 문구를 직접 입력해주세요.
          </p>

          {/* 이미지의 핑크색 강조 박스 재현 */}
          <p
            aria-label="입력 예시: truve 탈퇴"
            className="flex items-center h-14 w-full rounded-md px-3 py-2 bg-red-50 text-red-500 text-sm select-none"
          >
            truve 탈퇴
          </p>
          <Input
            placeholder="truve 탈퇴"
            className="h-14 bg-gray-50 border-none text-gray-500 text-lg focus-visible:ring-1 focus-visible:ring-gray-200"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 pt-4 pb-20">
          {/* 뒤로가기 (좌측 버튼) */}
          <Button variant="ghost" className="flex-1 h-14 text-lg font-medium" onClick={() => router.back()}>
            뒤로가기
          </Button>

          {/* 탈퇴하기 (우측 버튼) */}
          <Button
            disabled={!isValid}
            variant="destructive"
            className="flex-1 h-14 border-none text-lg font-medium shadow-none disabled:bg-muted disabled:text-muted-foreground"
          >
            truve 탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
