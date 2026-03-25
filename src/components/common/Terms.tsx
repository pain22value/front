import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

/**
 * TRUVE 통합 약관 컴포넌트
 * @description 서비스 이용약관 및 전자금융거래 이용약관 전체 텍스트 포함
 */
export default function TruveTermsComponent() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="flex flex-col items-center mb-10 text-center">
        <Badge variant="outline" className="mb-2 px-3 py-1 text-blue-600 border-blue-200 bg-blue-50">
          Official Policy
        </Badge>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          TRUVE <span className="text-blue-600">이용약관</span>
        </h1>
        <p className="mt-3 text-slate-500 max-w-2xl">
          TRUVE 서비스를 이용해 주셔서 감사합니다. 아래의 약관은 회원님께 제공되는 서비스의 이용 조건과 절차를 규정하고
          있습니다.
        </p>
      </div>

      <Tabs defaultValue="service" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-14 bg-slate-100/80 p-1 rounded-xl">
          <TabsTrigger
            value="service"
            className="text-base font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            서비스 이용약관
          </TabsTrigger>
          <TabsTrigger
            value="finance"
            className="text-base font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            전자금융거래 이용약관
          </TabsTrigger>
        </TabsList>

        {/* 1. 서비스 이용약관 영역 */}
        <TabsContent value="service">
          <Card className="border-slate-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-800">서비스 이용약관</CardTitle>
                  <CardDescription className="mt-1 font-medium">시행일: 2026년 03월 25일</CardDescription>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-slate-400 font-mono italic font-bold">TRUVE-SVC-2026</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px] px-8 py-10">
                <div className="space-y-12 text-[15px] leading-relaxed text-slate-600">
                  {/* 제1장 총칙 */}
                  <section>
                    <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                      제1장 총칙
                    </h2>
                    <div className="space-y-6 pl-3 border-l-2 border-slate-100">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제1조 (목적)</h3>
                        <p>
                          TRUVE(이하 &quot;회사&quot;)는 뮤지컬 및 공연 티켓팅, 아티스트-팬 연결, 공연 정보 제공, 관람평 작성 등
                          공연 문화 전반에 관한 종합 서비스(이하 &quot;서비스&quot;)를 제공합니다.
                        </p>
                        <p className="mt-2">
                          본 &apos;서비스 이용약관&apos;(이하 &quot;본 약관&quot;)은 회사가 제공하는 서비스에 공통적으로 적용되며, 이용자의
                          서비스 이용에 필요한 권리, 의무, 책임사항 및 이용 조건과 절차 등에 관한 기본적인 내용을 담고
                          있습니다. 이용자가 본 약관에 동의한 경우, 회사가 제공하는 서비스를 이용할 수 있습니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제2조 (용어의 정의)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {[
                            { t: "서비스", d: "온라인 앱/웹 기반 티켓 예매 및 공연 정보 제공 서비스" },
                            { t: "이용자", d: "서비스에 접속하는 회원 및 비회원" },
                            { t: "판매자", d: "티켓을 판매하는 공연 기획사 및 제작사" },
                            { t: "아티스트", d: "공연에 출연하는 배우, 가수, 연주자 등" },
                            { t: "관람평", d: "이용자가 작성하는 평점, 태그, 텍스트 리뷰" },
                            { t: "포인트", d: "결제 시 활용 가능한 가상의 데이터" },
                          ].map((item, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <span className="font-bold text-blue-700 text-sm">{item.t}</span>
                              <p className="text-xs mt-1 text-slate-500">{item.d}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-4 italic">
                          ※ 계정, 비밀번호, 게시물, 쿠폰 등 기타 용어 정의는 약관 전문의 내용을 따릅니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제3조 (약관의 효력 및 변경)</h3>
                        <p>
                          회사는 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경 시 7일 전(불리한 변경은
                          30일 전) 공지 및 이메일 개별 통지합니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator />

                  {/* 제2장 이용계약 */}
                  <section>
                    <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                      제2장 이용계약의 체결 및 회원정보
                    </h2>
                    <div className="space-y-6 pl-3 border-l-2 border-slate-100">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제5조 (이용계약의 성립)</h3>
                        <p>
                          이용계약은 가입신청자가 약관에 동의하고 가입 양식 기입 후 회사가 승인함으로써 체결됩니다.
                          휴대폰 본인인증을 요청할 수 있으며 미성년자는 법정대리인 동의가 필요합니다.
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-amber-900">
                        <h3 className="font-bold mb-1">제8조 (계정의 관리책임)</h3>
                        <p className="text-sm">
                          아이디, 비밀번호의 관리책임은 회원에게 있으며, 이를 타인에게 양도 내지 대여할 수 없습니다.
                          유출 시 즉시 비밀번호를 수정하고 회사에 알려야 합니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator />

                  {/* 제3장 서비스 이용 */}
                  <section>
                    <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                      제3장 서비스 이용
                    </h2>
                    <div className="space-y-6 pl-3 border-l-2 border-slate-100">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제11조 (예매 및 결제)</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>예매는 공연 시작 5시간 전까지 가능합니다.</li>
                          <li>좌석 선택 시 최대 7분 동안 임시 선점되며, 기간 내 미결제 시 해제됩니다.</li>
                          <li>예매 실패 시 취소표 빈자리 알림 설정 기능을 제공할 수 있습니다.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제13조 (관람평)</h3>
                        <p>
                          계정당 공연별 1건 작성이 가능하며, 저작권은 회원에게 있으나 회사는 홍보 목적으로 이를
                          이용/편집할 수 있습니다. 비방이나 상업광고물은 사전 통보 없이 삭제될 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator />

                  {/* 제6~8장 책임 및 기타 */}
                  <section>
                    <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                      제6장 ~ 제8장 책임 및 기타
                    </h2>
                    <div className="space-y-6 pl-3 border-l-2 border-slate-100">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 text-red-600">
                          제21조 (이용자의 의무 - 금지사항)
                        </h3>
                        <p className="text-sm">
                          매크로 사용, 자동 접속 프로그램, 크롤러를 이용한 데이터 수집, 티켓 재판매 목적의 구매 등
                          정상적인 서비스 운영을 방해하는 행위는 영구 이용정지 사유가 됩니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">제26조 (면책사항)</h3>
                        <p>
                          회사는 통신판매중개자로서 공연의 하자, 부실로 인한 책임은 판매자(기획사)에게 귀속되며 회사는
                          운영상 결함을 제외한 문제에 책임을 지지 않습니다.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. 전자금융거래 이용약관 영역 */}
        <TabsContent value="finance">
          <Card className="border-slate-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-blue-50/50 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">전자금융거래 이용약관</CardTitle>
                  <CardDescription className="mt-1 font-medium text-blue-700/70">안전한 결제 거래 지침</CardDescription>
                </div>
                <Badge className="bg-blue-600">Finance Safe</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px] px-8 py-10">
                <div className="space-y-12 text-[15px] leading-relaxed text-slate-600">
                  {/* 제1장 총칙 */}
                  <section>
                    <h2 className="text-lg font-bold text-blue-900 mb-6 border-b pb-2 border-blue-100">제1장 총칙</h2>
                    <div className="space-y-6 pl-2">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 italic">제1조 (목적)</h3>
                        <p>
                          본 약관은 회사가 제공하는 전자지급결제대행, 결제대금예치 및 선불전자지급수단 발행/관리
                          서비스에 대한 회사와 이용자 사이의 권리·의무 관계를 명확히 함을 목적으로 합니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 italic">제2조 (정의)</h3>
                        <p>
                          핵심 용어:{" "}
                          <span className="font-semibold">
                            전자금융거래, 전자지급수단, 접근매체(신용카드번호, 인증서 등), 거래지시, 오류
                          </span>{" "}
                          등은 전자금융거래법에 의거하여 정의됩니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 관리 책임 */}
                  <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      🔐 보안 및 사고 예방
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-sm text-blue-800">제6조 (접근매체의 관리)</h3>
                        <p className="text-sm">
                          이용자는 접근매체를 양도, 대여, 보관, 전달하거나 유통해서는 안 됩니다. 분실/도난 통지 접수 전
                          사고는 이용자 책임이 발생할 수 있으므로 주의가 필요합니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-blue-800">제13조 (회사의 책임)</h3>
                        <p className="text-sm">
                          회사는 접근매체의 위변조, 전송 과정의 사고, 정보통신망 침입 사고로 발생한 손해를 배상할 책임을
                          집니다. 다만, 이용자가 고의로 정보를 누설하거나 대여한 경우 책임이 제한됩니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 거래 확인 및 철회 */}
                  <section>
                    <h2 className="text-lg font-bold text-blue-900 mb-6 border-b pb-2 border-blue-100">
                      주요 거래 정책
                    </h2>
                    <div className="space-y-6 pl-2">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 italic">제7조 (거래내용의 확인)</h3>
                        <p>
                          회사는 &apos;마이페이지&apos; 또는 &apos;예매내역&apos;을 통해 1만원 초과 거래는 5년, 1만원 이하 거래는 1년 동안
                          내역을 보존하며 이용자가 확인할 수 있도록 합니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 italic">제10조 (거래지시의 철회)</h3>
                        <p>
                          이용자는 지급 효력이 발생하기 전까지(입금 기록 완료 전) 거래지시를 철회할 수 있습니다. 결제
                          완료 후에는 전자상거래법에 따라 환불 절차를 밟아야 합니다.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 italic">제19조 ~ 제21조 (결제대금예치서비스)</h3>
                        <p>
                          회사는 소비자가 재화 등을 공급받은 사실(공연 관람 등)을 확인한 후 대금을 판매자에게
                          지급함으로써 소비자의 안전을 도모합니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="pt-4 pb-8">
                    <div className="p-4 bg-blue-900 text-blue-50 rounded-lg text-xs">
                      <p className="font-bold mb-1">[안내] 분쟁처리 신청</p>
                      <p>
                        거래 관련 오류나 이의사항은 고객센터를 통해 15일 이내에 처리 결과를 통보받으실 수 있습니다.
                        (금융감독원 분쟁조정 신청 가능)
                      </p>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-200">
        <div className="text-sm text-slate-500">
          <p className="font-bold text-slate-900 mb-1">TRUVE 약관에 동의하시나요?</p>
          <p>회원가입 버튼을 클릭하면 위 약관 전체에 동의한 것으로 간주됩니다.</p>
        </div>
        <div className="flex gap-3">
          <p className="text-[10px] text-slate-400 max-w-[200px] text-right">
            본 서비스는 대한민국 법령 및 전자금융거래법을 준수합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
