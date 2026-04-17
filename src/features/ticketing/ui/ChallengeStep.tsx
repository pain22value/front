"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useJudgeChallenge, useStartChallenge } from "../hooks/useChallenge";
import { useTicketingStore } from "../stores/useTicketingStore";
import { DEMO_CHALLENGE_RISK_LEVEL } from "../config";
import MouseSliderChallenge from "./challenges/MouseSliderChallenge";
import MouseClickSequenceChallenge from "./challenges/MouseClickSequenceChallenge";
import MousePathTraceChallenge from "./challenges/MousePathTraceChallenge";
import VqaIllusionChallenge from "./challenges/VqaIllusionChallenge";
import type { MouseEventRecord, PathPoint } from "./challenges/types";
import type {
  ChallengeJudgeResponse,
  ChallengeRiskLevel,
} from "../services/challengeService";

type ChallengeStepProps = {
  showId: string | number;
  scheduleId: string | number;
  onComplete: () => void;
  onBlocked: () => void;
};

const toImageSrc = (value: unknown) => {
  if (typeof value !== "string" || !value) return "";
  if (value.startsWith("data:image")) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `data:image/png;base64,${value}`;
};

function VqaImageChallengeView({
  config,
  value,
  onChange,
}: {
  config: Record<string, unknown>;
  value: string;
  onChange: (value: string) => void;
}) {
  const question =
    typeof config.question === "string" ? config.question : "질문이 없습니다.";
  const placeholder =
    typeof (config.answer_schema as Record<string, unknown> | undefined)
      ?.placeholder === "string"
      ? String((config.answer_schema as Record<string, unknown>).placeholder)
      : "정답을 입력하세요";
  const imageSrc = toImageSrc(config.image_data);
  const hasImage = imageSrc.length > 0;

  return (
    <Card className="p-5 rounded-2xl">
      <div className="flex flex-col gap-4">
        <p className="font-medium">이미지 VQA</p>
        <div className="rounded-2xl border bg-muted p-3">
          {hasImage ? (
            <img
              src={imageSrc}
              alt="vqa"
              className="w-full rounded-xl object-contain"
            />
          ) : (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-6 text-sm text-destructive">
              이미지를 불러오지 못했습니다. 다시 시도해 주세요.
            </div>
          )}
        </div>
        <div className="text-sm font-medium">{question}</div>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
    </Card>
  );
}

export default function ChallengeStep({
  showId,
  scheduleId,
  onComplete,
  onBlocked,
}: ChallengeStepProps) {
  const { user } = useAuthStore();
  const {
    challengeFlowSessionId,
    challengeModule,
    challengeType,
    challengeConfig,
    challengeComplete,
    setChallengeState,
    setChallengeComplete,
    setChallengeBlocked,
    hasValidAdmissionToken,
  } = useTicketingStore();
  const { mutateAsync: startChallenge, isPending: isStarting } =
    useStartChallenge();
  const { mutateAsync: judgeChallenge, isPending: isJudging } =
    useJudgeChallenge();

  const [textAnswer, setTextAnswer] = useState("");
  const [sliderOffset, setSliderOffset] = useState(0);
  const [clickSequenceAnswer, setClickSequenceAnswer] = useState<number[]>([]);
  const [pathTracePoints, setPathTracePoints] = useState<PathPoint[]>([]);
  const [mouseEvents, setMouseEvents] = useState<MouseEventRecord[]>([]);

  const resetLocalInputs = useCallback(() => {
    setTextAnswer("");
    setSliderOffset(0);
    setClickSequenceAnswer([]);
    setPathTracePoints([]);
    setMouseEvents([]);
  }, []);

  const activeConfig = useMemo(
    () =>
      challengeConfig && typeof challengeConfig === "object"
        ? challengeConfig
        : null,
    [challengeConfig],
  );
  const isMouseChallenge =
    challengeType === "slider" ||
    challengeType === "clickseq" ||
    challengeType === "pathtrace_v2";
  const expectedClickSequenceLength = useMemo(() => {
    if (!activeConfig || !Array.isArray(activeConfig.sequence)) return 0;
    return activeConfig.sequence.filter(
      (item): item is number => typeof item === "number",
    ).length;
  }, [activeConfig]);
  const hasVqaImage = useMemo(() => {
    if (!activeConfig) return false;
    return toImageSrc(activeConfig.image_data).length > 0;
  }, [activeConfig]);

  const handleJudgeResult = useCallback(
    (result: ChallengeJudgeResponse) => {
      if (result.blocked) {
        setChallengeBlocked(true);
        toast.error("AI 확인이 2회 실패하여 다시 대기열에 입장해야 합니다.");
        onBlocked();
        return;
      }

      if (result.flow_complete) {
        setChallengeComplete(true);
        toast.success("AI 확인이 완료되었습니다.");
        onComplete();
        return;
      }

      if (!result.next_puzzle_type || !result.next_puzzle_config) {
        console.error("다음 challenge payload 누락:", result);
        toast.error("다음 AI 확인 단계를 불러오지 못했습니다.");
        return;
      }

      setChallengeState({
        flowSessionId: challengeFlowSessionId,
        module: result.module ?? challengeModule,
        challengeType: result.next_puzzle_type,
        challengeConfig: result.next_puzzle_config,
      });
      resetLocalInputs();
    },
    [
      challengeFlowSessionId,
      challengeModule,
      onBlocked,
      onComplete,
      resetLocalInputs,
      setChallengeBlocked,
      setChallengeComplete,
      setChallengeState,
    ],
  );

  useEffect(() => {
    if (!hasValidAdmissionToken(showId, scheduleId) || challengeComplete)
      return;
    if (challengeFlowSessionId && challengeType && activeConfig) return;

    const userKey = user?.email ?? user?.nickname ?? "anonymous-user";
    startChallenge({
      performance_id: String(showId),
      user_key: userKey,
      risk_level: DEMO_CHALLENGE_RISK_LEVEL,
    })
      .then((data) => {
        resetLocalInputs();
        setChallengeState({
          flowSessionId: data.flow_session_id,
          module: null,
          challengeType: data.puzzle_type,
          challengeConfig: data.puzzle_config,
        });
      })
      .catch((error) => {
        console.error("challenge/start 실패:", error);
        toast.error("AI 확인 단계를 시작하지 못했습니다.");
      });
  }, [
    activeConfig,
    challengeComplete,
    challengeFlowSessionId,
    challengeType,
    hasValidAdmissionToken,
    scheduleId,
    setChallengeState,
    showId,
    startChallenge,
    user?.email,
    user?.nickname,
    resetLocalInputs,
  ]);

  const canSubmit = (() => {
    switch (challengeType) {
      case "slider":
        return mouseEvents.length > 0;
      case "clickseq":
        return (
          expectedClickSequenceLength > 0 &&
          clickSequenceAnswer.length === expectedClickSequenceLength
        );
      case "pathtrace_v2":
        return pathTracePoints.length > 0;
      case "vqa-image":
        return hasVqaImage && textAnswer.trim().length > 0;
      case "vqa-illusion":
        return false;
      default:
        return false;
    }
  })();

  const handleSubmit = async () => {
    if (!challengeFlowSessionId || !challengeType) return;

    const answer = (() => {
      switch (challengeType) {
        case "slider":
          return { offset_x: Math.round(sliderOffset) };
        case "clickseq":
          return { sequence: clickSequenceAnswer };
        case "pathtrace_v2":
          return { points: pathTracePoints.slice(0, 800) };
        case "vqa-image":
          return { text: textAnswer.trim() };
        default:
          return {};
      }
    })();

    try {
      const result = await judgeChallenge({
        flow_session_id: challengeFlowSessionId,
        answer,
        events: isMouseChallenge ? mouseEvents : [],
      });
      handleJudgeResult(result);
    } catch (error) {
      console.error("challenge/judge 실패:", error);
      toast.error("AI 확인 단계 제출에 실패했습니다.");
    }
  };

  const handleIllusionResult = useCallback(
    async ({
      answerIndex,
      blocked,
    }: {
      answerIndex: number;
      blocked: boolean;
      passed: boolean;
    }) => {
      if (!challengeFlowSessionId) return;

      try {
        const result = await judgeChallenge({
          flow_session_id: challengeFlowSessionId,
          answer: {
            answer_index: answerIndex,
            blocked,
          },
          events: [],
        });
        handleJudgeResult(result);
      } catch (error) {
        console.error("illusion challenge/judge 실패:", error);
        toast.error("착시 이미지 확인 단계 제출에 실패했습니다.");
      }
    },
    [challengeFlowSessionId, handleJudgeResult, judgeChallenge],
  );

  if (isStarting && !challengeType) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        AI 확인 단계를 준비하고 있습니다...
      </div>
    );
  }

  if (!challengeType || !activeConfig) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        AI 확인 단계를 불러오지 못했습니다.
      </div>
    );
  }

  if (challengeType === "vqa-illusion") {
    return (
      <VqaIllusionChallenge
        config={activeConfig}
        onResult={handleIllusionResult}
        isPending={isJudging}
      />
    );
  }

  return (
    <div className="p-6 space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">AI 확인 단계</h2>
        <p className="text-sm text-muted-foreground">
          통과하면 좌석 선택 화면으로 이동합니다.
        </p>
      </div>

      {challengeType === "slider" ? (
        <MouseSliderChallenge
          config={activeConfig}
          offset={sliderOffset}
          setOffset={setSliderOffset}
          events={mouseEvents}
          setEvents={setMouseEvents}
        />
      ) : null}

      {challengeType === "clickseq" ? (
        <MouseClickSequenceChallenge
          config={activeConfig}
          value={clickSequenceAnswer}
          onChange={setClickSequenceAnswer}
          events={mouseEvents}
          setEvents={setMouseEvents}
        />
      ) : null}

      {challengeType === "pathtrace_v2" ? (
        <MousePathTraceChallenge
          config={activeConfig}
          points={pathTracePoints}
          setPoints={setPathTracePoints}
          events={mouseEvents}
          setEvents={setMouseEvents}
        />
      ) : null}

      {challengeType === "vqa-image" ? (
        <VqaImageChallengeView
          config={activeConfig}
          value={textAnswer}
          onChange={setTextAnswer}
        />
      ) : null}
      <Button
        className="w-full h-12 text-base"
        onClick={handleSubmit}
        disabled={!canSubmit || isJudging}
      >
        {isJudging ? "제출 중..." : "확인 완료"}
      </Button>
    </div>
  );
}
