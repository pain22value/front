"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActorSectionSkeleton() {
  return (
    <div className="w-full">
      {/* Hero Section Skeleton */}
      <section className="relative w-full pl-20 bg-black text-white rounded-b-4xl overflow-hidden pt-10">
        <section className="max-w-[1200] mx-auto">
          <div className="relative max-w-[500] min-h-[300] ml-auto aspect-square">
            <Skeleton className="absolute bottom-0 right-0 w-full h-[90%] bg-zinc-800 rounded-2xl" />
          </div>
        </section>
        <section className="w-full max-w-[1200] mx-auto absolute bottom-0 left-20 right-0 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 py-6 font-geist">
            <Skeleton className="h-10 w-48 bg-zinc-800" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-40 rounded-md bg-zinc-800" />
              <Skeleton className="size-8 rounded-full bg-zinc-800" />
            </div>
          </div>
        </section>
      </section>

      {/* Main Content Skeleton */}
      <section className="pl-20">
        <section className="max-w-[1200] mx-auto px-4 py-8 space-y-12">
          {/* Notice & Live Chat Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-64 rounded-2xl border border-muted bg-muted/5 p-6 space-y-4">
              <Skeleton className="h-8 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="h-64 rounded-2xl border border-muted bg-muted/5 p-6 space-y-4">
              <Skeleton className="h-8 w-32" />
              <div className="flex-1" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Show List Section */}
          <div className="space-y-12">
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-3/4 w-full rounded-2xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
