"use client";

import { useState } from "react";
import MembershipStepper from "@/features/artists/ui/membership/MembershipStepper";
import MembershipSelectStep from "@/features/artists/ui/membership/MembershipSelectStep";
import MembershipPaymentStep from "@/features/artists/ui/membership/MembershipPaymentStep";
import ArtistCarousel from "@/features/artists/ui/ArtistCarousel";
import ArtistProfile from "@/features/artists/ui/ArtistProfile";
import { ARTIST_LIST } from "@/shared/data/artists";
import MembershipSuccessStep from "./MembershipSuccessStep";

export default function ArtistMembershipSubscribe({ artistId, isSuccess }: { artistId: string; isSuccess?: boolean }) {
  const [currentStep, setCurrentStep] = useState(isSuccess ? 3 : 1);

  // URL 에서 전달받은 artistId를 숫자로 변환하여 찾아오는 구조 (fallback 포함)
  const currentArtist = ARTIST_LIST.find((a) => a.artistId === Number(artistId)) || ARTIST_LIST[0];

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

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
          <MembershipSuccessStep />
        </div>
      )}
    </div>
  );
}
