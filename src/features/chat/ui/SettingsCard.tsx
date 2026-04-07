import { ChevronRight } from "lucide-react";

export default function SettingsCard() {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
        {/* 상단 타이틀 */}
        <h2 className="text-xl font-bold text-gray-900 px-1">김관우님</h2>

        {/* 메뉴 리스트 */}
        <div className="flex flex-col gap-4">
          {/* 채팅방 이름 설정 */}
          <button className="flex items-center justify-between w-full group py-2 px-1 text-left">
            <span className="text-lg font-semibold text-gray-800">채팅방 이름 설정</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>

          {/* 애칭 설정 */}
          <button className="flex items-center justify-between w-full group py-2 px-1 text-left">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-gray-800">애칭 설정</span>
              <p className="text-sm text-gray-400 leading-tight">ARTIST가 불러줄 애칭을 설정할 수 있습니다.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>

          {/* 채팅방 나가기 */}
          <button className="flex items-center w-full py-4 px-1 text-left">
            <span className="text-lg font-medium text-gray-400 hover:text-red-400 transition-colors">
              채팅방 나가기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
