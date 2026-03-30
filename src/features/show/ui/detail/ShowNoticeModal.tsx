"use client";

import CommonDialog from "@/shared/ui/CommonDialog";
import ShowNoticeContent from "./ShowNoticeContent";

export default function ShowNoticeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <CommonDialog open={open} onOpenChange={onOpenChange} title="공연 안내">
      <ShowNoticeContent />
    </CommonDialog>
  );
}
