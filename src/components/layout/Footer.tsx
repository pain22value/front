import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="w-full pl-20">
      <div className="mx-auto py-10">
        <Separator className="my-8" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-8">
          {/* 좌측 */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">truve</h2>
            <p className="text-sm">True Connection, True Fans.</p>
          </div>

          {/* 중앙 */}
          <nav className="flex flex-wrap items-center justify-center text-sm">
            <Button asChild variant="link">
              <Link href="/terms/service-term" target="_blank">
                서비스 소개
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/terms/service-term" target="_blank">
                서비스 이용약관
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/terms/finance-term" target="_blank">
                전자금융거래 이용약관
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/privacy-policy" target="_blank">
                개인정보 처리방침
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/terms/service-term" target="_blank">
                문의하기
              </Link>
            </Button>
          </nav>

          {/* 우측 */}
          <div className="text-sm text-center md:text-right">© 2026 truve. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
