"use client";

import { useAuthQuery } from "@/hooks/useAuthQuery";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthQuery();

  return <>{children}</>;
}
