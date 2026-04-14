"use client";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import SignupForm from "./SignupForm";
import SocialSignupForm from "./SocialSignupForm";

export default function SignupContainer() {
  const { socialSignupData } = useAuthStore();

  if (socialSignupData) {
    return <SocialSignupForm />;
  }

  return <SignupForm />;
}
