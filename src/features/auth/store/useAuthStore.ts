// 인증상태를 브라우저 로컬스토리지에 저장 (개발환경)

import { authService } from "@/features/auth/services/authService";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  user: string | null;
  // user: User | null;
  signup: (signupRequest: SignupRequest) => Promise<void>;
  signin: (signinRequest: SigninRequest) => Promise<void>;
  signout: () => Promise<void>;
  setAuth: (accessToken: string, user: string) => void;
  // setAuth: (accessToken: string, user: User) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      accessToken: null,
      user: null,
      signup: async (signupRequest) => {
        try {
          await authService.signup(signupRequest);
        } catch (error: unknown) {
          throw new Error(
            error instanceof Error
              ? error.message
              : "회원가입에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
          );
        }
      },
      signin: async (signinRequest) => {
        try {
          const { accessToken } = await authService.signin(signinRequest);
          set({ accessToken, user: accessToken });
        } catch (error: unknown) {
          set({ accessToken: null, user: null });
          throw new Error(
            error instanceof Error
              ? error.message
              : "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
          );
        }
      },
      signout: async () => {
        try {
          await authService.signout();
        } catch (error: unknown) {
          console.error("서버 로그아웃 요청에 실패했습니다:", error);
        } finally {
          // set({ accessToken: null, user: null });
        }
      },
      setAuth: (accessToken, user) => set({ accessToken, user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// // 인증상태를 주스탄트 인메모리에 저장 (배포환경)

// import { authService } from "@/services/authService";
// import { create } from "zustand";

// interface AuthState {
//   accessToken: string | null;
//   user: User | null;
//   signin: (signinRequest: SigninRequest) => Promise<void>;
//   signout: () => Promise<void>;
//   setAuth: (accessToken: string, user: User) => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: null,
//   user: null,
//   signin: async (signinRequest) => {
//     try {
//       const { accessToken, user } = await authService.signin(signinRequest);
//       set({ accessToken, user });
//     } catch (error: unknown) {
//       let errorMessage = "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
//       if (error instanceof Error) errorMessage = error.message;
//       set({ accessToken: null, user: null });
//       console.error(errorMessage);
//       throw new Error(errorMessage);
//     }
//   },
//   signout: async () => {
//     try {
//       await authService.signout();
//     } catch (error) {
//       console.error("서버 로그아웃 요청에 실패했습니다:", error);
//     } finally {
//       set({ accessToken: null, user: null });
//     }
//   },
//   setAuth: (accessToken, user) => set({ accessToken, user }),
// }));
