"use client";

import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthQuery();

  return <>{children}</>;
}
