"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModalStore } from "@/shared/stores/modalStore";

import { useRouter } from "next/navigation";
import useCancelMembershipMutation from "@/features/my/hooks/useCancelMembershipMutation";

export default function MembershipCard({
  membershipId,
  artistId,
  name,
  imageUrl,
  joinDate,
  nextPaymentDate,
  daysLeft,
  price,
}: {
  membershipId: number;
  artistId: number;
  name: string;
  imageUrl: string;
  joinDate: string;
  nextPaymentDate: string;
  daysLeft: string;
  price: string;
}) {
  const router = useRouter();
  const { openConfirm, openAlert } = useModalStore();
  const { mutate: cancelMembership } = useCancelMembershipMutation();

  const handleArtistClick = () => {
    router.push(`/artists/${artistId}`);
  };

  const handleCancelClick = () => {
    openConfirm({
      title: (
        <>
          구독일이 아직 {daysLeft}
          <br />
          정말 지금 해지하시겠어요?
        </>
      ),
      description: <>지금 해지하더라도 남은 기간 동안은 혜택을 이용할 수 있어요.</>,
      confirmLabel: "해지하기",
      onConfirm: () => {
        cancelMembership(membershipId, {
          onSuccess: () => {
            openAlert({
              icon: <CheckCircle2 className="w-16 h-16 text-teal-500" />,
              title: "멤버십 해지가 완료되었습니다.",
              description: "남은 구독 기간 동안 멤버십 혜택을 이용할 수 있어요.",
              confirmText: "확인",
            });
          },
        });
      },
    });
  };

  return (
    <Card className="w-full p-4 border-t-[3px] border-t-muted-foreground/40 shadow-lg overflow-hidden">
      <CardContent className="flex flex-col md:flex-row gap-4 p-0">
        {/* 프로필 섹션 */}
        <div className="flex items-start/ self-start gap-4 flex-1">
          <Avatar className="size-25 cursor-pointer" onClick={handleArtistClick}>
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Badge
              variant="outline"
              className="rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/50 px-3 py-1 font-bold"
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
          <Card className="rounded-xl border-none bg-muted/50 shadow-none p-0">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground font-medium">다음 결제일</span>
                <Badge variant="secondary" className="border border-border text-foreground font-normal rounded-md">
                  {daysLeft}
                </Badge>
              </div>
              <div className="text-lg font-semibold text-foreground tracking-tight">{nextPaymentDate}</div>
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="text-muted-foreground">월 결제</span>
                <span className="font-bold text-foreground">{price}</span>
              </div>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            className="w-full rounded-lg text-md font-medium border-border mt-3"
            onClick={handleArtistClick}
          >
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
