"use client";

import { useModalStore } from "@/shared/stores/modalStore";
import ConfirmModal from "./ConfirmModal";
import AlertModal from "./AlertModal";

/**
 * 전역 모달 렌더러
 * layout.tsx의 <Providers> 안에 한 번만 추가하면
 * 앱 어디서든 useModalStore()로 모달을 열 수 있습니다.
 */
export default function ModalRoot() {
  const { confirm, alert, closeConfirm, closeAlert } = useModalStore();

  return (
    <>
      {confirm && (
        <ConfirmModal
          open={confirm.open}
          title={confirm.title}
          description={confirm.description}
          confirmLabel={confirm.confirmLabel}
          onOpenChange={closeConfirm}
          onConfirm={() => {
            closeConfirm(); // UI 닫기
            confirm.onConfirm(); // 비즈니스 콜백 (e.g. showAlert 호출)
          }}
          onCancel={() => {
            closeConfirm(); // UI 닫기
            confirm.onCancel?.(); // 비즈니스 콜백
          }}
        />
      )}

      {alert && (
        <AlertModal
          open={alert.open}
          title={alert.title}
          description={alert.description}
          icon={alert.icon}
          confirmText={alert.confirmText}
          onConfirm={() => {
            closeAlert(); // UI 닫기
            alert.onConfirm?.(); // 비즈니스 콜백
          }}
        />
      )}
    </>
  );
}
