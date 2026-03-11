interface ModalProps {
  message: string | null;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[400px] h-[225px] rounded-md bg-[#FFFFFF] border border-[#F1F1F4] shadow-md overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center justify-center px-8">
          <p className="text-[16px] font-semibold text-[#23222A]">{message}</p>
        </div>
        <div className="border-t border-[#F1F1F4] px-4 pb-2 pt-1">
        <button
            className="w-full py-3 rounded-lg text-[16px] font-semibold text-[#23222A] hover:bg-[#F1F1F4] active:bg-[#D5D5DD] transition-colors"
            onClick={onClose}
        >
            확인
        </button>
        </div>
      </div>
    </div>
  );
}