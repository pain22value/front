import AuthGuard from "@/shared/ui/AuthGuard";

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
