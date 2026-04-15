"use client";

import { useEffect } from "react";
import { useArtistMembershipStore } from "@/features/artists/stores/useArtistMembershipStore";
import MembershipStepper from "@/features/artists/ui/membership/MembershipStepper";
import MembershipSelectStep from "@/features/artists/ui/membership/MembershipSelectStep";
import MembershipPaymentStep from "@/features/artists/ui/membership/MembershipPaymentStep";
import ArtistCarousel from "@/features/artists/ui/ArtistCarousel";
import ArtistProfile from "@/features/artists/ui/ArtistProfile";
import { useArtistDetail } from "@/features/artists/hooks/useArtist";
import { Skeleton } from "@/components/ui/skeleton";
import MembershipSuccessStep from "./MembershipSuccessStep";

export default function ArtistMembershipSubscribe({
  artistId,
  searchParams,
}: {
  artistId: string;
  searchParams: { success?: string; paymentKey?: string; orderId?: string; amount?: string };
}) {
  const { currentStep, setStep, setPaymentInfo, reset } = useArtistMembershipStore();

  const isSuccessRedirect = searchParams.success === "true";
  const { paymentKey, orderId, amount } = searchParams;

  // 마운트 시 초기화 및 상태 동기화
  useEffect(() => {
    if (isSuccessRedirect) {
      // 1. 토스 리다이렉트 성공 시: URL 파라미터 동기화 후 3단계(완료/승인)로 바로 이동
      setPaymentInfo({
        paymentKey: paymentKey || "",
        orderId: orderId || "",
        amount: amount ? Number(amount) : 5000,
      });
      setStep(3);
    } else {
      // 2. 신규 진입 시 (리다이렉트가 아닐 때): 항상 초기화하여 1단계부터 시작
      reset();
    }
  }, [isSuccessRedirect, paymentKey, orderId, amount, reset, setPaymentInfo, setStep]); // artistId 변경 시에는 reset 호출 안 함 (구독 중 아님)

  // 실제 API에서 아티스트 상세 정보 조회
  const { data: currentArtist, isLoading: isArtistLoading } = useArtistDetail(artistId);

  const handleNextStep = () => setStep(Math.min(currentStep + 1, 3) as 1 | 2 | 3);
  const handlePrevStep = () => setStep(Math.max(currentStep - 1, 1) as 1 | 2 | 3);

  return (
    <div>
      <MembershipStepper currentStep={currentStep} />

      {currentStep === 1 && (
        <div>
          {isArtistLoading ? (
            // ArtistProfile 레이아웃과 동일한 스켈레톤
            <div className="mb-6 p-6 flex flex-col sm:flex-row gap-6">
              <Skeleton className="w-32 h-40 rounded-xl shrink-0 mx-auto sm:mx-0" />
              <div className="flex flex-col justify-center gap-3 w-full">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : (
            currentArtist && <ArtistProfile artist={currentArtist.artist} />
          )}
          <MembershipSelectStep artistId={artistId} onNext={handleNextStep} />
          <ArtistCarousel />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          {isArtistLoading ? (
            <div className="mb-6 p-6 flex flex-col sm:flex-row gap-6">
              <Skeleton className="w-32 h-40 rounded-xl shrink-0 mx-auto sm:mx-0" />
              <div className="flex flex-col justify-center gap-3 w-full">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : (
            currentArtist && (
              <MembershipPaymentStep onPrev={handlePrevStep} onNext={handleNextStep} artist={currentArtist.artist} />
            )
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <MembershipSuccessStep artistId={artistId} />
        </div>
      )}
    </div>
  );
}
