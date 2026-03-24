import { useMutation } from "@tanstack/react-query";
import { profileService } from "@/features/my/services/profileService";

// 닉네임 변경 훅
export function useUpdateNickname() {
  return useMutation({
    mutationFn: (body: UpdateNicknameRequest) => profileService.updateNickname(body),
  });
}

// 마케팅 정보 수신 동의 변경 훅
export function useUpdateMarketingConsent() {
  return useMutation({
    mutationFn: (body: UpdateMarketingConsentRequest) => profileService.updateMarketingConsent(body),
  });
}

// 이메일 알림 수신 동의 변경 훅
export function useUpdateEmailNotification() {
  return useMutation({
    mutationFn: (body: UpdateEmailNotificationRequest) => profileService.updateEmailNotification(body),
  });
}
