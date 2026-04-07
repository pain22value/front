import { MessageSquare } from "lucide-react";

export default function ChatIndexPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-500 bg-slate-50/30">
      <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
      <p className="text-lg font-medium">채팅방을 선택해주세요</p>
      <p className="text-sm mt-2 opacity-70">진행 중인 라이브 채팅을 왼쪽에서 선택하세요.</p>
    </div>
  );
}
