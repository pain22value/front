"use client";

import { useState } from "react";
import MembershipStepper from "@/features/actors/ui/membership/MembershipStepper";
import MembershipSelectStep from "@/features/actors/ui/membership/MembershipSelectStep";
import MembershipPaymentStep from "@/features/actors/ui/membership/MembershipPaymentStep";
import ArtistCarousel from "@/features/actors/ui/membership/ArtistCarousel";
import MembershipActorProfile from "@/features/actors/ui/membership/MembershipActorProfile";
import { actors } from "@/shared/data/actors";
import MembershipCompleteStep from "./MembershipCompleteStep";

export default function ActorMembershipSubscribeSection({ actorId }: { actorId: string }) {
  const [currentStep, setCurrentStep] = useState(1);

  // URL 에서 전달받은 actorId를 숫자로 변환하여 찾아오는 구조 (fallback 포함)
  const currentActor = actors.find((a) => a.id === Number(actorId)) || actors[0];

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="max-w-[850] mx-auto">
      <MembershipStepper currentStep={currentStep} />

      <div className="mt-8">
        {currentStep === 1 && (
          <div>
            <MembershipActorProfile actor={currentActor} />
            <MembershipSelectStep onNext={handleNextStep} />
            <ArtistCarousel />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <MembershipPaymentStep onPrev={handlePrevStep} onNext={handleNextStep} actor={currentActor} />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <MembershipCompleteStep onPrev={handlePrevStep} />
          </div>
        )}
      </div>
    </section>
  );
}
