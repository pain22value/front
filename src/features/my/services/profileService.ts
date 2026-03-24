import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 닉네임 변경
const updateNickname = async (body: UpdateNicknameRequest): Promise<string | null> => {
  const { data } = await api.patch<ApiResponse<string>>(ENDPOINTS.PROFILE.NICKNAME, body);
  return data.data;
};

// 마케팅 정보 수신 동의 변경
const updateMarketingConsent = async (body: UpdateMarketingConsentRequest): Promise<string | null> => {
  const { data } = await api.patch<ApiResponse<string>>(ENDPOINTS.PROFILE.MARKETING_CONSENT, body);
  return data.data;
};

// 이메일 알림 수신 동의 변경
const updateEmailNotification = async (body: UpdateEmailNotificationRequest): Promise<string | null> => {
  const { data } = await api.patch<ApiResponse<string>>(ENDPOINTS.PROFILE.EMAIL_NOTIFICATION, body);
  return data.data;
};

export const profileService = {
  updateNickname,
  updateMarketingConsent,
  updateEmailNotification,
};
