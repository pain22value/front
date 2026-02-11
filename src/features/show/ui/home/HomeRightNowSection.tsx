"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { rightNowShows } from "@/shared/data/shows";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import Link from "next/link";

export default function HomeRightNowSection() {
  return (
    <section className="max-w-[1200] mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">지금 예매 가능</h1>
        <Link href="/shows" className="ml-auto text-sm font-medium text-muted-foreground hover:text-foreground">
          전체보기
        </Link>
      </div>

      <div className="flex gap-3 -mt-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seoul">서울</SelectItem>
            <SelectItem value="busan">부산</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BaseCarousel
        items={rightNowShows}
        itemsPerView={6}
        loop
        align="start"
        showButtonsOnHover
        showPagination={false}
        renderItem={(item) => (
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-0 space-y-3">
              {/* 포스터 */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* 텍스트 */}
              <div className="space-y-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.venue}</p>
                <p className="text-xs text-muted-foreground">{item.period}</p>
              </div>
            </CardContent>
          </Card>
        )}
      />
    </section>
  );
}
