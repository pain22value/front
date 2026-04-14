import { useMutation, useQuery } from "@tanstack/react-query";
import { profileService } from "@/features/my/services/profileService";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { toast } from "sonner";
import { useState, useMemo } from "react";

// 내 정보 조회 훅
export function useMyInfo() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: () => profileService.getMyInfo(),
  });
}

// 닉네임 변경 훅
export function useUpdateNickname() {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: (body: UpdateNicknameRequest) => profileService.updateNickname(body),
    onSuccess: (_, variables: UpdateNicknameRequest) => {
      // 성공시 스토어 상태 업데이트
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, nickname: variables.nickname });
      }
      toast.success("닉네임이 성공적으로 변경되었습니다.");
    },
    onError: () => {
      toast.error("닉네임 변경에 실패했습니다.");
    },
  });
}

// 마케팅 정보 수신 동의 변경 훅
export function useUpdateMarketingConsent() {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: (body: UpdateMarketingConsentRequest) => profileService.updateMarketingConsent(body),
    onSuccess: (_, variables: UpdateMarketingConsentRequest) => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, marketingInfoAgreed: variables.marketingInfoAgreed });
      }
      toast.success(`마케팅 수신 동의가 ${variables.marketingInfoAgreed ? "설정" : "해제"}되었습니다.`);
    },
  });
}

// 이메일 알림 수신 동의 변경 훅
export function useUpdateEmailNotification() {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: (body: UpdateEmailNotificationRequest) => profileService.updateEmailNotification(body),
    onSuccess: (_, variables: UpdateEmailNotificationRequest) => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, emailNotificationAgreed: variables.emailNotificationAgreed });
      }
      toast.success(`이메일 알림 수신이 ${variables.emailNotificationAgreed ? "설정" : "해제"}되었습니다.`);
    },
  });
}

// 프로필 관리 통합 훅
export function useProfile() {
  const { user: storeUser } = useAuthStore();

  // 백엔드 문제로 인한 임시 데이터 처리
  const user = useMemo(
    () =>
      storeUser || {
        email: "abc*****@gmail.com",
        nickname: "김관우",
        marketingInfoAgreed: true,
        emailNotificationAgreed: true,
      },
    [storeUser],
  );

  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [isNicknameChangeOpen, setIsNicknameChangeOpen] = useState(false);

  // 약관 모달 상태
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const openPolicy = (type: PolicyType) => {
    setSelectedPolicy(type);
    setIsPolicyOpen(true);
  };

  // 마케팅/이메일 수신 상태
  const [marketingChecked, setMarketingChecked] = useState(user?.marketingInfoAgreed ?? false);
  const [emailNotifChecked, setEmailNotifChecked] = useState(user?.emailNotificationAgreed ?? false);

  // 유저 정보 변경 시 로컬 상태 동기화 (setState-in-effect 방지를 위해 렌더 단계에서 처리)
  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    setMarketingChecked(user.marketingInfoAgreed);
    setEmailNotifChecked(user.emailNotificationAgreed);
  }

  const { mutate: updateNickname } = useUpdateNickname();
  const { mutate: updateMarketing } = useUpdateMarketingConsent();
  const { mutate: updateEmailNotif } = useUpdateEmailNotification();

  // 핸들러
  const handleMarketingChange = (checked: boolean) => {
    setMarketingChecked(checked);
    updateMarketing(
      { marketingInfoAgreed: checked },
      { onError: () => setMarketingChecked(!checked) }, // 실패 시 롤백
    );
  };

  const handleEmailNotifChange = (checked: boolean) => {
    setEmailNotifChecked(checked);
    updateEmailNotif(
      { emailNotificationAgreed: checked },
      { onError: () => setEmailNotifChecked(!checked) }, // 실패 시 롤백
    );
  };

  const handleNicknameSubmit = (nickname: string) => {
    updateNickname({ nickname });
    setIsNicknameChangeOpen(false);
  };

  return {
    user,
    states: {
      isPasswordChangeOpen,
      isNicknameChangeOpen,
      selectedPolicy,
      isPolicyOpen,
      marketingChecked,
      emailNotifChecked,
    },
    actions: {
      setIsPasswordChangeOpen,
      setIsNicknameChangeOpen,
      setSelectedPolicy,
      setIsPolicyOpen,
      openPolicy,
      handleMarketingChange,
      handleEmailNotifChange,
      handleNicknameSubmit,
    },
  };
}

// 회원 탈퇴 훅
export function useWithdraw() {
  const { signout } = useAuthStore();
  return useMutation({
    mutationFn: () => profileService.withdraw(),
    onSuccess: () => {
      signout();
      toast.success("회원 탈퇴가 완료되었습니다.");
    },
    onError: () => {
      toast.error("회원 탈퇴에 실패했습니다.");
    },
  });
}
