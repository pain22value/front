"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActorSectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-muted/10 rounded-3xl">
        <Skeleton className="size-32 md:size-40 rounded-full" />
        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-2 flex flex-col items-center md:items-start">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="md:col-span-2 h-44 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
      </div>
      <div className="space-y-12">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-3/4 w-full rounded-xl" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
