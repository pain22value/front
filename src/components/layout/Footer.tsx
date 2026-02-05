import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto py-10">
        <Separator className="my-8" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-8">
          {/* 좌측 */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">truve</h2>
            <p className="text-sm">True Connection, True Fans.</p>
          </div>

          {/* 중앙 */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm ">
            <a href="#">서비스 소개</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">문의하기</a>
          </nav>

          {/* 우측 */}
          <div className="text-sm text-center md:text-right">© 2026 truve. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
