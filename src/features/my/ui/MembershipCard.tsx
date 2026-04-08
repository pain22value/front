"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModalStore } from "@/shared/stores/modalStore";

export default function MembershipCard({
  name,
  imageUrl,
  joinDate,
  nextPaymentDate,
  daysLeft,
  price,
}: {
  name: string;
  imageUrl: string;
  joinDate: string;
  nextPaymentDate: string;
  daysLeft: string;
  price: string;
}) {
  const { openConfirm, openAlert } = useModalStore();

  const handleCancelClick = () => {
    openConfirm({
      title: (
        <>
          구독일이 아직 15일 남았어요
          <br />
          정말 지금 해지하시겠어요?
        </>
      ),
      description: <>지금 해지하더라도 남은 기간 동안은 혜택을 이용할 수 있어요.</>,
      confirmLabel: "해지하기",
      onConfirm: () => {
        // TODO: 해지 API 호출
        openAlert({
          icon: <CheckCircle2 className="w-16 h-16 text-teal-500" />,
          title: "멤버십 해지가 완료되었습니다.",
          description: "남은 구독 기간 동안 멤버십 혜택을 이용할 수 있어요.",
          confirmText: "확인",
        });
      },
    });
  };

  return (
    <Card className="w-full p-4 border-t-[3px] border-t-zinc-500 shadow-lg overflow-hidden">
      <CardContent className="flex flex-col md:flex-row gap-4 p-0">
        {/* 프로필 섹션 */}
        <div className="flex items-start/ self-start gap-4 flex-1">
          <Avatar className="size-25 cursor-pointer">
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Badge
              variant="outline"
              className="rounded-md  bg-teal-50 text-teal-600 border-teal-500 px-3 py-1 hover:bg-teal-50 font-bold"
            >
              멤버십 가입중
            </Badge>
            <h2 className="text-2xl font-bold">{name}</h2>
            <div className="flex items-center text-muted-foreground text-sm">
              <CalendarDays className="w-4 h-4 mr-1" />
              가입일: {joinDate}
            </div>
          </div>
        </div>

        {/* 결제 정보 섹션 */}
        <div className="flex flex-col w-full md:max-w-[297px]">
          {/* 결제 정보 카드 */}
          <Card className="rounded-xl border-none bg-slate-50 shadow-none p-0">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-slate-500 font-medium">다음 결제일</span>
                <Badge variant="secondary" className="border border-slate-200 text-slate-800 font-normal rounded-md">
                  {daysLeft}
                </Badge>
              </div>
              <div className="text-lg font-semibold text-slate-900 tracking-tight">{nextPaymentDate}</div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="text-slate-500">월 결제</span>
                <span className="font-bold text-slate-900">{price}</span>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full rounded-lg text-md font-medium border-slate-200 mt-3">
            아티스트 페이지 바로가기
          </Button>
          <Button variant="link" className="text-sm text-red-500 hover:underline" onClick={handleCancelClick}>
            멤버십 해지하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
