"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowScheduleTap from "./ShowScheduleTap";
import ShowReviewTab from "./ShowReviewTab";
import ShowInfoTab from "./ShowInfoTab";
import { useReviews } from "../../hooks/useReviews";

export function ShowDetailTabs({ show }: { show: ShowDetail }) {
  const { data } = useReviews(show.showId, 1);
  const reviewCount = data?.totalCount ?? 0;

  const tabs = [
    {
      value: "info",
      label: "공연정보",
      content: <ShowInfoTab show={show} />,
    },
    {
      value: "casting",
      label: "캐스팅일정",
      content: <ShowScheduleTap />,
    },
    {
      value: "review",
      label: `관람후기 (${reviewCount})`,
      content: <ShowReviewTab />,
    },
  ];

  return (
    <Tabs defaultValue="info" className="w-full ">
      <div className="w-full border-b">
        <TabsList variant="line" className="px-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
