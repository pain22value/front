import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowScheduleTap from "./ShowScheduleTap";
import ShowReviewTab from "./ShowReviewTab";
import ShowInfoTab from "./ShowInfoTab";

export function ShowDetailTabs({ show }: { show: ShowDetail }) {
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
      label: `관람후기 (999+)`,
      content: <ShowReviewTab />,
    },
  ];

  return (
    <Tabs defaultValue="review" className="w-full ">
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
