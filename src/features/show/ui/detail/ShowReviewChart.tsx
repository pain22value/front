"use client";

import { useMemo } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useReviewMeta } from "../../hooks/useReviews";

const EMPTY_LEFT = [
  { subject: "무대연출", value: 0 },
  { subject: "넘버", value: 0 },
  { subject: "안무", value: 0 },
  { subject: "배우연기", value: 0 },
  { subject: "스토리", value: 0 },
];

const EMPTY_RIGHT = [
  { subject: "몰입감", value: 0 },
  { subject: "텐션", value: 0 },
  { subject: "카타르시스", value: 0 },
  { subject: "즐거움", value: 0 },
  { subject: "감동", value: 0 },
];

export default function ShowReviewChart({ showId }: { showId: number }) {
  const { data, isLoading } = useReviewMeta(showId);


  const dataLeft = useMemo(() => {
    if (!data?.charmPointScores || data.charmPointScores.length === 0) return EMPTY_LEFT;
    return data.charmPointScores.map((score) => ({ subject: score.label, value: score.score }));
  }, [data]);

  const dataRight = useMemo(() => {
    if (!data?.emotionPointScores || data.emotionPointScores.length === 0) return EMPTY_RIGHT;
    return data.emotionPointScores.map((score) => ({ subject: score.label, value: score.score }));
  }, [data]);

  if (isLoading) return null;

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
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
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
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
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
