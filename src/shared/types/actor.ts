// 배우

type Actor = {
  id: number;
  name: string;
  image: string;
  description?: string;
  isMember?: boolean; // 로그인한 사용자의 경우 멤버십 가입 여부
};
