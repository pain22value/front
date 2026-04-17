import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="w-full pl-20">
      <div className="mx-auto py-10">
        <Separator className="my-8" />

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between px-8">
          {/* 좌측 */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">truve</h2>
            <p className="text-sm text-muted-foreground">True Connection, True Fans.</p>
          </div>

          {/* 중앙 */}
          <nav className="flex flex-wrap items-center justify-start gap-y-2 text-sm md:justify-center">
            <Button asChild variant="link" className="px-2 h-auto text-muted-foreground hover:text-foreground no-underline hover:underline">
              <Link href="/terms/service-term" target="_blank">
                서비스 소개
              </Link>
            </Button>
            <div className="w-px h-3 bg-muted-foreground/30 shrink-0 mx-1" />
            <Button asChild variant="link" className="px-2 h-auto text-muted-foreground hover:text-foreground no-underline hover:underline">
              <Link href="/terms/service-term" target="_blank">
                서비스 이용약관
              </Link>
            </Button>
            <div className="w-px h-3 bg-muted-foreground/30 shrink-0 mx-1" />
            <Button asChild variant="link" className="px-2 h-auto text-muted-foreground hover:text-foreground no-underline hover:underline">
              <Link href="/terms/finance-term" target="_blank">
                전자금융거래 이용약관
              </Link>
            </Button>
            <div className="w-px h-3 bg-muted-foreground/30 shrink-0 mx-1" />
            <Button asChild variant="link" className="px-2 h-auto text-muted-foreground hover:text-foreground no-underline hover:underline">
              <Link href="/privacy-policy" target="_blank">
                개인정보 처리방침
              </Link>
            </Button>
            <div className="w-px h-3 bg-muted-foreground/30 shrink-0 mx-1" />
            <Button asChild variant="link" className="px-2 h-auto text-muted-foreground hover:text-foreground no-underline hover:underline">
              <Link href="/terms/service-term" target="_blank">
                문의하기
              </Link>
            </Button>
          </nav>

          {/* 우측 */}
          <div className="text-xs text-muted-foreground text-left md:text-right pt-2 md:pt-0">
            © 2026 truve. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
