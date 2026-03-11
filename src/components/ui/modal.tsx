interface ModalProps {
  message: string | null;
  subMessage?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function Modal({ message, subMessage, onClose, onConfirm, confirmLabel = "확인", cancelLabel = "취소" }: ModalProps) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[400px] h-[225px] rounded-md bg-[#FFFFFF] border border-[#F1F1F4] shadow-md overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-2">
          <p className="text-[16px] font-semibold text-[#23222A]">{message}</p>
          {subMessage && <p className="text-[14px] font-normal text-[#515062]">{subMessage}</p>}
        </div>
        <div className="border-t border-[#F1F1F4] px-4 pb-2 pt-1">
          {onConfirm ? (
            // 취소 / 이동 버튼 두 개
            <div className="flex gap-2">
              <button
                className="flex-1 py-3 rounded-lg text-[16px] font-semibold text-[#23222A] hover:bg-[#F1F1F4] active:bg-[#D5D5DD] transition-colors"
                onClick={onClose}
              >
                {cancelLabel}
              </button>
              <button
                className="flex-1 py-3 rounded-lg text-[16px] font-semibold text-white bg-[#F93E4B] hover:bg-[#FD8C94] active:bg-[#CB0614] transition-colors"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          ) : (
            // 확인 버튼 하나
            <button
              className="w-full py-3 rounded-lg text-[16px] font-semibold text-[#23222A] hover:bg-[#F1F1F4] active:bg-[#D5D5DD] transition-colors"
              onClick={onClose}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}