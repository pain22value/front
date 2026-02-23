import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ShowReviewNotice() {
  return (
    <Card className="bg-muted/50 border-none py-0!">
      <CardContent className="flex gap-3 p-6 text-sm text-muted-foreground">
        <div className="leading-relaxed">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle />
            <p className="font-semibold text-foreground ">꼭 읽어주세요.</p>
          </div>
          <p>게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.</p>
          <p>
            특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가
            있으므로 게시를 삼가 주시기 바랍니다.
          </p>
          <p>
            사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 truve 관람평 작성 권한이 제한됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
