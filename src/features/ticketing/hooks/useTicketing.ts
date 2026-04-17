import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTicketingStore } from "../stores/useTicketingStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function useTicketing(showId: string | number) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { clearTicketing, getIsValid, hasValidAdmissionToken, setScheduleId } = useTicketingStore();
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false);

  const handleTicketing = (scheduleId: number) => {
    // 0. 로그인 여부 확인
    if (!user) {
      toast.error("로그인이 필요한 서비스입니다.");
      router.push("/signin");
      return;
    }

    // 1. 이미 유효한 토큰이 있는지 확인
    if (getIsValid(showId, scheduleId)) {
      toast.success("이미 유효한 입장 토큰이 있습니다.");
      router.push(`/shows/${scheduleId}/seat`);
      return;
    }

    // 2. 유효한 admission token은 있지만 AI challenge가 아직 완료되지 않은 경우
    if (!hasValidAdmissionToken(showId, scheduleId)) {
      clearTicketing();
    }
    setScheduleId(scheduleId);
    setIsWaitingModalOpen(true);
  };


  return {
    isWaitingModalOpen,
    setIsWaitingModalOpen,
    handleTicketing,
  };
}
