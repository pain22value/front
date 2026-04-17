"use client";

import { useCallback, useEffect, useMemo, useRef, type Dispatch, type SetStateAction } from "react";
import styles from "./MouseSliderChallenge.module.css";
import type { MouseEventRecord } from "./types";

type MouseSliderChallengeProps = {
  config: Record<string, unknown>;
  offset: number;
  setOffset: (value: number) => void;
  events: MouseEventRecord[];
  setEvents: Dispatch<SetStateAction<MouseEventRecord[]>>;
};

const toImageSrc = (value: unknown) => {
  if (typeof value !== "string" || !value) return "";
  if (value.startsWith("data:image")) return value;
  return `data:image/png;base64,${value}`;
};

export default function MouseSliderChallenge({
  config,
  offset,
  setOffset,
  events,
  setEvents,
}: MouseSliderChallengeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ dragging: false, startClient: 0, startOffset: 0 });

  const imageWidth = Number(config.image_width ?? 300);
  const imageHeight = Number(config.image_height ?? 150);
  const pieceWidth = Number(config.piece_width ?? 50);
  const maxOffset = Math.max(imageWidth - pieceWidth, 0);
  const progressPercent = useMemo(
    () => (maxOffset <= 0 ? 0 : Number(((offset / maxOffset) * 100).toFixed(1))),
    [maxOffset, offset],
  );
  const background = toImageSrc(config.background);
  const piece = toImageSrc(config.piece);

  const logEvent = useCallback((type: string, clientX: number, clientY: number, button: number) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    setEvents((prev) => [
      ...prev,
      {
        type,
        x: Math.round(clientX - rect.left),
        y: Math.round(clientY - rect.top),
        timestamp: Date.now(),
        button,
      },
    ]);
  }, [setEvents]);

  const setClampedOffset = useCallback((nextOffset: number) => {
    setOffset(Math.max(0, Math.min(Math.round(nextOffset), maxOffset)));
  }, [maxOffset, setOffset]);

  const startDrag = useCallback((event: React.PointerEvent<HTMLImageElement | HTMLDivElement>) => {
    dragStateRef.current = {
      dragging: true,
      startClient: event.clientX,
      startOffset: offset,
    };
    logEvent("mousedown", event.clientX, event.clientY, event.button);
    event.preventDefault();
  }, [logEvent, offset]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!dragStateRef.current.dragging) return;
      const delta = event.clientX - dragStateRef.current.startClient;
      setClampedOffset(dragStateRef.current.startOffset + delta);
      logEvent("mousemove", event.clientX, event.clientY, event.button);
    };

    const handleUp = (event: PointerEvent) => {
      if (!dragStateRef.current.dragging) return;
      dragStateRef.current.dragging = false;
      logEvent("mouseup", event.clientX, event.clientY, event.button);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [logEvent, setClampedOffset]);

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Puzzle Bot Detection</div>
        <div className={styles.title}>슬라이더 퍼즐</div>
        <div className={styles.subtitle}>퍼즐 조각을 오른쪽으로 드래그해서 빈 자리를 채워주세요.</div>
      </div>

      <div className={styles.hint}>🔲 조각을 오른쪽으로 드래그하여 빈 자리를 채우세요.</div>

      <div className={styles.puzzleContainer}>
        <div ref={wrapperRef} className={styles.sliderWrapper} style={{ width: imageWidth }}>
          {background ? (
            <img
              src={background}
              alt="slider background"
              className={styles.sliderBgImg}
              style={{ width: imageWidth, height: imageHeight }}
              draggable={false}
            />
          ) : null}

          {piece ? (
            <img
              src={piece}
              alt="slider piece"
              className={styles.sliderPieceOverlay}
              style={{ left: offset, width: pieceWidth, height: imageHeight }}
              onPointerDown={startDrag}
              draggable={false}
            />
          ) : null}

          <div
            className={styles.sliderTrackBar}
            style={{
              width: imageWidth,
              background: `linear-gradient(to right, #03c75a ${progressPercent}%, #e0e4ea ${progressPercent}%)`,
            }}
          >
            <div className={styles.sliderKnob} style={{ left: offset, width: pieceWidth }} onPointerDown={startDrag}>
              →
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.caption}>드래그 거리: {Math.round(offset)}px</div>
        <div className={styles.meta}>
          <span className={styles.dot} />
          기록된 마우스 이벤트 {events.length}개
        </div>
      </div>
    </div>
  );
}
