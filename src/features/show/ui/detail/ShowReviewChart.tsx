"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const dataLeft = [
  { subject: "몰입감", value: 4 },
  { subject: "연출", value: 2 },
  { subject: "스토리", value: 5 },
  { subject: "음악", value: 3 },
  { subject: "배우", value: 4 },
];

const dataRight = [
  { subject: "몰입감", value: 4 },
  { subject: "연출", value: 3 },
  { subject: "스토리", value: 4 },
  { subject: "음악", value: 4 },
  { subject: "배우", value: 3 },
];

export default function ShowReviewChart() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">관람 포인트</h2>
      <Separator className="h-1! bg-foreground" />
      <Card className="border-none shadow-none">
        <CardContent className="p-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* 왼쪽 차트 */}
            <div className="h-[320]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dataLeft} className="outline-none! focus:outline-none!">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 오른쪽 차트 */}
            <div className="h-[320]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dataRight}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
