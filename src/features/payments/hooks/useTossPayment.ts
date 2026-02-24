"use client";

import { useCallback, useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

type Money = {
  currency: "KRW";
  value: number;
};

type TossPayment = Awaited<
  ReturnType<Awaited<ReturnType<typeof loadTossPayments>>["payment"]>
>;

type UseTossPaymentArgs = {
  clientKey: string;
  customerKey: string;
  successPath?: string;
  failPath?: string;
  customerEmail?: string;
  customerName?: string;
  customerMobilePhone?: string;
};

// 토스 SDK v2 method 명과 1:1 매핑
export type PayMethod = "CARD" | "VIRTUAL_ACCOUNT";

export type RequestTossPaymentPayload = {
  amountValue: number;
  orderId: string;
  orderName: string;
  method?: PayMethod;
};

export function useTossPayment({
  clientKey,
  customerKey,
  successPath = "/payments/success",
  failPath = "/payments/fail",
  customerEmail = "customer123@gmail.com",
  customerName = "김토스",
  customerMobilePhone = "01012341234",
}: UseTossPaymentArgs) {
  const [payment, setPayment] = useState<TossPayment | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        setError(null);
        setIsReady(false);

        const tossPayments = await loadTossPayments(clientKey);
        const p = tossPayments.payment({ customerKey });

        if (!mounted) return;
        setPayment(p);
        setIsReady(true);
      } catch (e) {
        const err =
          e instanceof Error ? e : new Error("TossPayments init error");
        if (!mounted) return;
        setError(err);
        setPayment(null);
        setIsReady(false);
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, [clientKey, customerKey]);

  const requestPayment = useCallback(
    async ({
      amountValue,
      orderId,
      orderName,
      method = "CARD",
    }: RequestTossPaymentPayload) => {
      if (!payment) return;

      const amount: Money = { currency: "KRW", value: amountValue };
      const commonParams = {
        amount,
        orderId,
        orderName,
        successUrl: `${window.location.origin}${successPath}`,
        failUrl: `${window.location.origin}${failPath}`,
        customerEmail,
        customerName,
        customerMobilePhone,
      };

      if (method === "VIRTUAL_ACCOUNT") {
        await payment.requestPayment({
          method,
          ...commonParams,
          virtualAccount: {
            cashReceipt: { type: "소득공제" },
            useEscrow: false,
            validHours: 24,
          },
        });
      } else {
        // CARD: 카드 + 간편결제(토스페이, 카카오페이 등) 통합창
        await payment.requestPayment({
          method,
          ...commonParams,
          card: {
            useEscrow: false,
            flowMode: "DEFAULT", // DEFAULT = 통합창에서 카드/간편결제 모두 선택 가능
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      }
    },
    [payment, successPath, failPath, customerEmail, customerName, customerMobilePhone],
  );

  return { isReady, error, requestPayment };
}