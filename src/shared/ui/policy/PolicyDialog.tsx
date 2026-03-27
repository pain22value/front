"use client";

import CommonDialog from "../CommonDialog";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
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
    <CommonDialog open={open} onOpenChange={onOpenChange} title={getTitle()}>
      <div className="p-0">
        {type === "privacy" ? (
          <PrivacyPolicyContent />
        ) : (
          <TermsContent type={type === "finance" ? "finance" : "service"} />
        )}
      </div>
    </CommonDialog>
  );
}
