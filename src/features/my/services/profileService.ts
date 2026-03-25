import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 내 정보 조회
const getMyInfo = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>(ENDPOINTS.PROFILE.ME);
  if (!data.data) throw new Error("내 정보를 불러올 수 없습니다.");
  return data.data;
};

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

// 회원 탈퇴
const withdraw = async (): Promise<string | null> => {
  const { data } = await api.delete<ApiResponse<string>>(ENDPOINTS.PROFILE.ME);
  return data.data;
};

export const profileService = {
  getMyInfo,
  updateNickname,
  updateMarketingConsent,
  updateEmailNotification,
  withdraw,
};
