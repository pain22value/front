import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import useArtistMembershipPayment from "../../hooks/useArtistMembershipPayment";
import { Star, MessageCircle, RotateCcw, Loader2 } from "lucide-react";
import { useArtistMembershipStore } from "@/features/artists/stores/useArtistMembershipStore";

export default function MembershipSelectStep({ artistId, onNext }: { artistId: string; onNext?: () => void }) {
  const { mutate: preparePayment, isPending } = useArtistMembershipPayment();
  const { setPaymentInfo } = useArtistMembershipStore();

  const handleJoinClick = () => {
    preparePayment(
      {
        artistId,
        body: {
          paymentMethod: "TOSS_PAY",
          termsAgreed: true,
          privacyAgreed: true,
          autoPaymentAgreed: true,
        },
      },
      {
        onSuccess: (data) => {
          // 결제 준비 정보를 스토어에 저장 (특히 backend에서 생성된 orderId)
          setPaymentInfo({
            orderId: data.orderId,
            amount: data.amount,
          });
          onNext?.();
        },
        onError: (err: AxiosError<ApiResponse<unknown>>) => {
          console.error("멤버십 결제 준비 오류:", err);
          alert(err?.response?.data?.message || "멤버십 결제 준비 중 오류가 발생했습니다.");
        },
      },
    );
  };

  return (
    <Card className="w-full mx-auto shadow-none">
      <CardHeader className="space-y-6">
        <h3 className="text-red-500 text-2xl font-bold">월간 멤버십</h3>
        <div className="text-3xl font-bold">
          5,000원 <span className="text-lg font-normal text-gray-500">/월</span>
        </div>

        <div className="space-y-4 py-4">
          <FeatureItem
            icon={<Star size={20} />}
            title="독점 콘텐츠 무제한 이용"
            desc="멤버십 전용 사진, 영상, 비하인드 스토리를 제한 없이 감상"
          />
          <FeatureItem
            icon={<MessageCircle size={20} />}
            title="아티스트와 실시간 채팅"
            desc="멤버십 회원 전용 채팅방에서 아티스트와 직접 소통"
          />
          <FeatureItem
            icon={<RotateCcw size={20} />}
            title="언제든 해지 가능"
            desc="자동 결제되며, 해지는 언제든 가능"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 border-t pt-6">
        <AgreementItem label="(필수) 멤버십 이용약관 동의" />
        <AgreementItem label="(필수) 개인정보 수집 및 이용 동의" />
        <AgreementItem label="(필수) 월 5,000원 자동결제 동의" />
        <p className="text-xs text-gray-400 cursor-pointer hover:underline mt-2">개인정보 제 3자 제공 안내 &gt;</p>
      </CardContent>

      <CardFooter className="flex gap-4 justify-between pt-6">
        <Button variant="ghost" className="flex-1 text-gray-500 py-6">
          취소
        </Button>
        <Button
          onClick={handleJoinClick}
          disabled={isPending}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-6 text-lg"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "멤버십 가입하기"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// 내부 보조 컴포넌트들
function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 text-gray-400">{icon}</div>
      <div>
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
    </div>
  );
}

function AgreementItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md">
      <div className="flex items-center space-x-3">
        <Checkbox id={label} />
        <label
          htmlFor={label}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      <span className="text-gray-400 text-sm">&gt;</span>
    </div>
  );
}
