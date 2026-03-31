"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArtistLiveChat() {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <h3 className="font-bold mb-4">라이브 채팅</h3>
        <div className="bg-foreground text-background p-3 rounded-lg mb-4 text-sm">안녕하세요 😊</div>
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white border-none">라이브 채팅 시작하기</Button>
      </CardContent>
    </Card>
  );
}
