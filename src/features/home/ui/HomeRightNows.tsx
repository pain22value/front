"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import useHomeShows from "../hooks/useHomeShows";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeRightNows() {
  const [order, setOrder] = useState<ShowsOrder>("DAILY_BOOKING");
  const [region, setRegion] = useState<ShowsRegion>("ALL");

  const { data, isLoading } = useHomeShows(order, region, 1, 12);
  const displayShows = data?.shows && data.shows.length > 0 ? data.shows : [];

  return (
    <section className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">지금 예매 가능</h1>
        <Link href="/shows/now" className="ml-auto text-sm font-medium text-muted-foreground hover:text-foreground">
          전체보기
        </Link>
      </div>

      <div className="flex gap-3 -mt-4">
        <Select
          value={order}
          onValueChange={(value) => {
            setOrder(value as ShowsOrder);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAILY_BOOKING">인기순</SelectItem>
            <SelectItem value="RECENTLY_ADDED">최신순</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={region}
          onValueChange={(value) => {
            setRegion(value as ShowsRegion);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">전국</SelectItem>
            <SelectItem value="SEOUL">서울</SelectItem>
            <SelectItem value="BUSAN">부산</SelectItem>
            <SelectItem value="DAEGU">대구</SelectItem>
            <SelectItem value="INCHEON">인천</SelectItem>
            <SelectItem value="GWANGJU">광주</SelectItem>
            <SelectItem value="DAEJEON">대전</SelectItem>
            <SelectItem value="ULSAN">울산</SelectItem>
            <SelectItem value="GYEONGGI">경기</SelectItem>
            <SelectItem value="GANGWON">강원</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <CarouselSkeleton />
      ) : (
        <BaseCarousel
          items={displayShows || []}
          itemsPerView={6}
          loop
          align="start"
          showButtonsOnHover
          showPagination={false}
          autoplay
          stopOnInteraction={false}
          stopOnMouseEnter
          renderItem={(show: Show) => (
            <Link href={`/shows/${show.showId}`}>
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="p-0 space-y-3">
                  <div className="relative aspect-3/4 overflow-hidden rounded-xl">
                    <Image
                      src={show.posterUrl}
                      alt={show.showTitle}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{show.showTitle}</p>
                    <p className="text-xs text-muted-foreground">{show.venueName}</p>
                    <p className="text-xs text-muted-foreground">{show.date}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        />
      )}
    </section>
  );
}

function CarouselSkeleton() {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-3/4 w-full rounded-xl" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </section>
  );
}
