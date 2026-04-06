import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTicketingStore } from "../stores/useTicketingStore";

export default function useTicketing(showId: string | number) {
  const router = useRouter();
  const { clearTicketing, getIsValid } = useTicketingStore();
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false);

  const handleTicketing = () => {
    // 1. 이미 유효한 토큰이 있는지 확인
    if (getIsValid(showId)) {
      toast.success("이미 유효한 입장 토큰이 있습니다.");
      router.push(`/shows/${showId}/seat`);
      return;
    }

    // 2. 무효한 토큰이 있거나 처음인 경우, 초기화 후 대기열 모달 오픈
    clearTicketing();
    setIsWaitingModalOpen(true);
  };

  return {
    isWaitingModalOpen,
    setIsWaitingModalOpen,
    handleTicketing,
  };
}
