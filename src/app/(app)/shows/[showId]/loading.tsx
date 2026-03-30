import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="show-detail-page">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(550px,1fr)_300px] gap-0 md:gap-8">
          <div className="col-span-[100%] md:col-span-[65%] space-y-20">
            {/* ShowDetailCard Skeleton */}
            <div className="flex gap-8">
              <Skeleton className="min-w-[250px] aspect-3/4 rounded-md" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <div className="pt-8 space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-60" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
            
            {/* Tabs Skeleton */}
            <div className="space-y-4">
              <div className="flex gap-4 border-b">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
          
          <aside className="hidden md:block sticky top-[calc(var(--header-height)+2.5rem)] self-start">
            <div className="border p-4 rounded-2xl space-y-4 w-[300px]">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
