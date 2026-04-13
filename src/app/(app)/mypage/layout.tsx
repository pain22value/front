import AuthGuard from "@/shared/ui/AuthGuard";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
