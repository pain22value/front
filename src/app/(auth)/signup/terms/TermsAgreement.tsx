"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsAgreement() {
  const router = useRouter();
  const { setSignupTerms } = useAuthStore();

  const [agreed, setAgreed] = useState({
    service: false,
    finance: false,
    privacy: false,
    marketing: false,
    age: false,
  });

  // 개별 항목이 모두 체크되면 자동으로 전체동의로 파생
  const isAllChecked = useMemo(
    () => agreed.service && agreed.finance && agreed.privacy && agreed.marketing && agreed.age,
    [agreed],
  );

  // 전체 동의
  const handleAllAgree = (checked: boolean) => {
    setAgreed({
      service: checked,
      finance: checked,
      privacy: checked,
      marketing: checked,
      age: checked,
    });
  };

  // 개별 동의
  const handleSingleAgree = (key: keyof typeof agreed, checked: boolean) => {
    setAgreed((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  // 가입하기 클릭
  const handleSubmit = () => {
    const { service, finance, privacy, marketing, age } = agreed;

    // 필수 항목 체크
    if (!service || !finance || !privacy || !age) {
      alert("필수 약관에 모두 동의해야 합니다.");
      return;
    }

    setSignupTerms({
      serviceTermsAgreed: service,
      electronicFinanceTermsAgreed: finance,
      privacyCollectionAgreed: privacy,
      marketingInfoAgreed: marketing,
      over14Agreed: age,
    });

    router.push("/signup");
  };

  return (
    <div className="w-full max-w-[500px] mx-auto flex items-center justify-center">
      <Card className="w-full border-none shadow-none bg-transparent">
        <CardContent className="px-0">
          <div className="text-center my-8">
            <h1 className="text-2xl font-bold leading-snug text-gray-900 dark:text-zinc-100">
              약관에 동의하고 <br /> 본인 인증을 진행해 주세요
            </h1>
          </div>

          <div className="space-y-6 flex-1">
            {/* 전체 동의 */}
            <div className="flex items-center space-x-3 py-2">
              <Checkbox
                id="all"
                checked={isAllChecked}
                onCheckedChange={(checked) => handleAllAgree(Boolean(checked))}
                className="w-6 h-6 border-gray-300 dark:border-zinc-700 data-[state=checked]:bg-blue-500"
              />
              <label htmlFor="all" className="text-lg font-bold cursor-pointer text-gray-900 dark:text-zinc-100">
                전체 동의
              </label>
            </div>

            <Separator className="bg-gray-100 dark:bg-zinc-800" />

            <div className="space-y-5">
              <TermItem
                label="서비스 이용약관 동의 (필수)"
                checked={agreed.service}
                onChange={(checked) => handleSingleAgree("service", Boolean(checked))}
              />
              <TermItem
                label="전자금융거래 이용약관 동의 (필수)"
                checked={agreed.finance}
                onChange={(checked) => handleSingleAgree("finance", Boolean(checked))}
              />
              <TermItem
                label="개인정보 수집 및 이용 동의 (필수)"
                checked={agreed.privacy}
                onChange={(checked) => handleSingleAgree("privacy", Boolean(checked))}
              />

              <Separator className="bg-gray-50 dark:bg-zinc-800/50" />

              <TermItem
                label="마케팅 정보 수신 동의 (선택)"
                showArrow={false}
                checked={agreed.marketing}
                onChange={(checked) => handleSingleAgree("marketing", Boolean(checked))}
              />
              <TermItem
                label="만 14세 이상입니다. (필수)"
                showArrow={false}
                checked={agreed.age}
                onChange={(checked) => handleSingleAgree("age", Boolean(checked))}
              />
            </div>
          </div>

          <div className="mt-10">
            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-lg font-bold bg-[#ff4d55] hover:bg-[#e6454d] text-white rounded-md border-none"
            >
              가입하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 개별 약관 아이템
function TermItem({
  label,
  showArrow = true,
  checked,
  onChange,
}: {
  label: string;
  showArrow?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => onChange(Boolean(checked))}
          className="w-6 h-6 border-gray-300 dark:border-zinc-700"
        />
        <span className="text-base text-gray-800 dark:text-zinc-300 font-medium cursor-pointer">{label}</span>
      </div>
      {showArrow && <ChevronRight className="w-5 h-5 text-gray-400 dark:text-zinc-600 cursor-pointer" />}
    </div>
  );
}
