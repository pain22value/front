import AuthGuard from "@/shared/ui/AuthGuard";

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
