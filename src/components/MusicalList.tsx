"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { musicals } from "@/shared/data/musicals";

export function MusicalList() {
  return (
    <section className="space-y-6">
      {/* 필터 영역 */}
      <div className="flex gap-3">
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seoul">서울</SelectItem>
            <SelectItem value="busan">부산</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {musicals.map((musical) => (
          <Card key={musical.id} className="border-0 bg-transparent shadow-none">
            <CardContent className="p-0 space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={musical.image}
                  alt={musical.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold">{musical.title}</p>
                <p className="text-xs text-muted-foreground">{musical.venue}</p>
                <p className="text-xs text-muted-foreground">{musical.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
