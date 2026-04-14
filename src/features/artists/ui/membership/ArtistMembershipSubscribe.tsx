"use client";

import { useEffect } from "react";
import { useArtistMembershipStore } from "@/features/artists/stores/useArtistMembershipStore";
import MembershipStepper from "@/features/artists/ui/membership/MembershipStepper";
import MembershipSelectStep from "@/features/artists/ui/membership/MembershipSelectStep";
import MembershipPaymentStep from "@/features/artists/ui/membership/MembershipPaymentStep";
import ArtistCarousel from "@/features/artists/ui/ArtistCarousel";
import ArtistProfile from "@/features/artists/ui/ArtistProfile";
import { ARTIST_LIST } from "@/shared/data/artists";
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

  // URL 에서 전달받은 artistId를 숫자로 변환하여 찾아오는 구조 (fallback 포함)
  const currentArtist = ARTIST_LIST.find((a) => a.artistId === Number(artistId)) || ARTIST_LIST[0];

  const handleNextStep = () => setStep(Math.min(currentStep + 1, 3) as 1 | 2 | 3);
  const handlePrevStep = () => setStep(Math.max(currentStep - 1, 1) as 1 | 2 | 3);

  return (
    <div>
      <MembershipStepper currentStep={currentStep} />

      {currentStep === 1 && (
        <div>
          <ArtistProfile artist={currentArtist} />
          <MembershipSelectStep artistId={artistId} onNext={handleNextStep} />
          <ArtistCarousel />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <MembershipPaymentStep onPrev={handlePrevStep} onNext={handleNextStep} artist={currentArtist} />
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
