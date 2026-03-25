"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import TermsContent from "./TermsContent";

export default function PolicyDialog({
  open,
  onOpenChange,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: PolicyType | null;
}) {
  if (!type) return null;

  const getTitle = () => {
    switch (type) {
      case "service":
        return "서비스 이용약관";
      case "finance":
        return "전자금융거래 이용약관";
      case "privacy":
        return "개인정보 수집 및 이용";
      default:
        return "약관 및 정책";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col h-[80vh] w-[90%] max-w-[960]! gap-0 p-0 overflow-hidden">
        <DialogHeader className="flex-none p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">{getTitle()}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 pr-10">
            {type === "privacy" ? (
              <PrivacyPolicyContent />
            ) : (
              <TermsContent type={type === "finance" ? "finance" : "service"} />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
