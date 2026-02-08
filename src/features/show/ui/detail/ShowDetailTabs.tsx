import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface ShowDetailTabsProps {
  tabs: {
    value: string;
    label: string;
    content?: ReactNode;
  }[];
}

export function ShowDetailTabs({ tabs }: ShowDetailTabsProps) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="w-full ">
      <div className="w-full border-b">
        <TabsList variant="line" className="px-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* 탭 컨텐츠 영역: Tabs 컴포넌트가 내부 상태에 따라 value가 일치하는 TabsContent만 렌더링합니다. */}
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
