type ConfirmModalState = {
  open: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

type AlertModalState = {
  open: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
};

type ModalStore = {
  confirm: ConfirmModalState | null;
  alert: AlertModalState | null;
  openConfirm: (options: Omit<ConfirmModalState, "open">) => void;
  openAlert: (options: Omit<AlertModalState, "open">) => void;
  closeConfirm: () => void;
  closeAlert: () => void;
  closeAll: () => void;
};
