"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  customerKey: string; // 비회원이면 ANONYMOUS 가능
  successPath?: string; // 기본 /payments/success
  failPath?: string; // 기본 /payments/fail
  customerEmail?: string;
  customerName?: string;
  customerMobilePhone?: string;
};
export type RequestTossPaymentPayload = {
  amountValue: number;
  orderId: string;
  orderName: string;
  method?: "CARD"; // 지금은 CARD만 쓴다고 가정(필요하면 확장)
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

      await payment.requestPayment({
        method,
        amount,
        orderId,
        orderName,
        successUrl: `${window.location.origin}${successPath}`,
        failUrl: `${window.location.origin}${failPath}`,
        customerEmail,
        customerName,
        customerMobilePhone,
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    },
    [
      payment,
      successPath,
      failPath,
      customerEmail,
      customerName,
      customerMobilePhone,
    ],
  );

  return { isReady, error, requestPayment };
}
