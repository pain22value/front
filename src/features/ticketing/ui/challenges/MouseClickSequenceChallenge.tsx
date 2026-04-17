"use client";

import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./MouseClickSequenceChallenge.module.css";
import type { MouseEventRecord } from "./types";

type ClickTarget = {
  id: number;
  x: number;
  y: number;
  r: number;
};

type MouseClickSequenceChallengeProps = {
  config: Record<string, unknown>;
  value: number[];
  onChange: Dispatch<SetStateAction<number[]>>;
  events: MouseEventRecord[];
  setEvents: Dispatch<SetStateAction<MouseEventRecord[]>>;
};

const isTarget = (value: unknown): value is ClickTarget =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as ClickTarget).id === "number" &&
  typeof (value as ClickTarget).x === "number" &&
  typeof (value as ClickTarget).y === "number" &&
  typeof (value as ClickTarget).r === "number";

export default function MouseClickSequenceChallenge({
  config,
  value,
  onChange,
  events,
  setEvents,
}: MouseClickSequenceChallengeProps) {
  const [isShaking, setIsShaking] = useState(false);
  const width = Number(config.width ?? 360);
  const height = Number(config.height ?? 220);
  const targets = Array.isArray(config.targets) ? config.targets.filter(isTarget) : [];
  const sequence = Array.isArray(config.sequence) ? config.sequence.filter((item): item is number => typeof item === "number") : [];

  const progressText = useMemo(() => `진행: ${value.length} / ${sequence.length}`, [sequence.length, value.length]);

  const logEvent = useCallback((type: string, event: React.PointerEvent<HTMLDivElement>, button: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setEvents((prev) => [
      ...prev,
      {
        type,
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top),
        timestamp: Date.now(),
        button,
      },
    ]);
  }, [setEvents]);

  const handleTargetClick = (targetId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const board = event.currentTarget.closest("[data-clickseq-board]") as HTMLDivElement | null;
    if (board) {
      const rect = board.getBoundingClientRect();
      setEvents((prev) => [
        ...prev,
        {
          type: "click",
          x: Math.round(event.clientX - rect.left),
          y: Math.round(event.clientY - rect.top),
          timestamp: Date.now(),
          button: event.button,
        },
      ]);
    }
    const expected = sequence[value.length];
    if (targetId !== expected) {
      onChange([]);
      setIsShaking(false);
      window.setTimeout(() => setIsShaking(true), 0);
      window.setTimeout(() => setIsShaking(false), 220);
      return;
    }
    onChange((prev) => [...prev, targetId]);
  };

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Puzzle Bot Detection</div>
        <div className={styles.title}>순서 클릭 퍼즐</div>
        <div className={styles.subtitle}>원을 1번부터 순서대로 클릭하세요. 틀리면 처음부터 다시 시작됩니다.</div>
      </div>

      <div className={styles.hint}>🎯 표시된 숫자를 안내된 순서대로 눌러 사람임을 증명하세요.</div>

      <div className={styles.wrapper}>
        <div className={styles.labels}>
          <span className={styles.badge}>순서: {sequence.join(" → ")}</span>
          <span className={`${styles.badge} ${styles.progress}`}>{progressText}</span>
        </div>

        <div
          className={`${styles.board} ${isShaking ? styles.shake : ""}`}
          style={{ width, height }}
          data-clickseq-board="true"
          onPointerMove={(event) => logEvent("mousemove", event, event.button)}
          onPointerDown={(event) => logEvent("mousedown", event, event.button)}
          onPointerUp={(event) => logEvent("mouseup", event, event.button)}
        >
          {targets.map((target) => {
            const isDone = value.includes(target.id);
            return (
              <button
                key={target.id}
                type="button"
                className={`${styles.target} ${isDone ? styles.done : ""}`}
                style={{
                  width: target.r * 2,
                  height: target.r * 2,
                  left: target.x - target.r,
                  top: target.y - target.r,
                }}
                onClick={(event) => handleTargetClick(target.id, event)}
              >
                {target.id}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.caption}>올바른 순서를 끝까지 클릭한 뒤 제출하세요.</div>
        <div className={styles.meta}>
          <span className={styles.dot} />
          기록된 마우스 이벤트 {events.length}개
        </div>
      </div>
    </div>
  );
}
