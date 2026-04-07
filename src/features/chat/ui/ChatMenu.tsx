"use client";

import { ChevronRight, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export function ChatMenu({ artistId }: { artistId: string | number }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleExit = () => {
    // 채팅방 나가기 클릭 시 이전 아티스트 페이지로 이동
    router.push(`/artists/${artistId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors">
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-4 bg-popover shadow-lg rounded-xl flex flex-col gap-4">
        {/* 상단 타이틀 - 사용자의 닉네임 표시 */}
        <DropdownMenuItem className="p-0 focus:bg-transparent">
          <div className="px-2 pt-2 pb-4 w-full">
            <h2 className="text-xl font-bold text-gray-900">{user?.nickname || "사용자"}님</h2>
          </div>
        </DropdownMenuItem>

        {/* 메뉴 리스트 */}
        <div className="flex flex-col">
          {/* 채팅방 이름 설정 */}
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <button className="w-full flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors group text-left outline-none cursor-pointer">
              <span className="text-lg font-semibold text-gray-800">채팅방 이름 설정</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </DropdownMenuItem>

          {/* 애칭 설정 */}
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <button className="w-full flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors group text-left outline-none cursor-pointer">
              <div className="flex flex-col gap-1 pr-2">
                <span className="text-lg font-semibold text-gray-800">애칭 설정</span>
                <p className="text-sm text-gray-400 leading-tight">ARTIST가 불러줄 애칭을 설정할 수 있습니다.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0" />
            </button>
          </DropdownMenuItem>

          {/* 채팅방 나가기 */}
          <div className="mt-2 pt-2 border-t border-slate-100">
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <button
                onClick={handleExit}
                className="w-full text-left px-2 py-3 hover:bg-red-50 rounded-lg transition-colors outline-none cursor-pointer"
              >
                <span className="text-lg font-medium text-red-500 hover:text-red-600 transition-colors">
                  채팅방 나가기
                </span>
              </button>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
