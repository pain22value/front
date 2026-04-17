"use client";

import { useCallback, useEffect, useMemo, useRef, type Dispatch, type SetStateAction } from "react";
import styles from "./MousePathTraceChallenge.module.css";
import type { MouseEventRecord, PathPoint } from "./types";

type MousePathTraceChallengeProps = {
  config: Record<string, unknown>;
  points: PathPoint[];
  setPoints: Dispatch<SetStateAction<PathPoint[]>>;
  events: MouseEventRecord[];
  setEvents: Dispatch<SetStateAction<MouseEventRecord[]>>;
};

const isPoint = (value: unknown): value is PathPoint =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as PathPoint).x === "number" &&
  typeof (value as PathPoint).y === "number";

export default function MousePathTraceChallenge({
  config,
  points,
  setPoints,
  events,
  setEvents,
}: MousePathTraceChallengeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const width = Number(config.width ?? 360);
  const height = Number(config.height ?? 220);
  const strokeWidth = Number(config.stroke_width ?? 14);
  const pathPoints = useMemo(
    () => (Array.isArray(config.path_points) ? config.path_points.filter(isPoint) : []),
    [config.path_points],
  );
  const checkpoints = useMemo(
    () => (Array.isArray(config.checkpoints) ? config.checkpoints.filter(isPoint) : []),
    [config.checkpoints],
  );

  const getPos = useCallback((clientX: number, clientY: number): PathPoint | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvas.clientWidth;
    const scaleY = canvas.height / canvas.clientHeight;
    return {
      x: Math.round((clientX - rect.left - canvas.clientLeft) * scaleX),
      y: Math.round((clientY - rect.top - canvas.clientTop) * scaleY),
    };
  }, []);

  const logEvent = useCallback((type: string, clientX: number, clientY: number, button: number) => {
    const point = getPos(clientX, clientY);
    if (!point) return;
    setEvents((prev) => [
      ...prev,
      {
        type,
        x: point.x,
        y: point.y,
        timestamp: Date.now(),
        button,
      },
    ]);
  }, [getPos, setEvents]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#d8dee9";
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    pathPoints.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    checkpoints.forEach((checkpoint, index) => {
      const isStart = index === 0;
      const isEnd = index === checkpoints.length - 1;
      const color = isStart ? "#2ec4b6" : isEnd ? "#e63946" : "#4361ee";
      const radius = isStart || isEnd ? 7 : 5;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(checkpoint.x, checkpoint.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.arc(checkpoint.x, checkpoint.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    if (points.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = "#4361ee";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }
  }, [checkpoints, pathPoints, points, strokeWidth]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!drawingRef.current) return;
      const point = getPos(event.clientX, event.clientY);
      if (!point) return;
      setPoints((prev) => [...prev, point].slice(0, 800));
      logEvent("mousemove", event.clientX, event.clientY, event.button);
    };

    const handleUp = (event: PointerEvent) => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
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
  }, [getPos, logEvent, setPoints]);

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Puzzle Bot Detection</div>
        <div className={styles.title}>경로 따라 그리기 퍼즐</div>
        <div className={styles.subtitle}>시작점에서 끝점까지 천천히 경로를 따라 그려주세요.</div>
      </div>

      <div className={styles.hint}>✍️ 🟢 시작점에서 🔴 끝점까지 경로를 따라 천천히 그려주세요.</div>

      <div className={styles.wrapper}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={width}
          height={height}
          onPointerDown={(event) => {
            const point = getPos(event.clientX, event.clientY);
            if (!point) return;
            drawingRef.current = true;
            setPoints((prev) => [...prev, point].slice(0, 800));
            logEvent("mousedown", event.clientX, event.clientY, event.button);
            event.preventDefault();
          }}
        />
        <div className={styles.caption}>체크포인트를 최대한 많이 지나가도록 경로를 따라 그린 뒤 제출하세요.</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.caption}>기록된 경로 점 {points.length}개</div>
        <div className={styles.meta}>
          <span className={styles.dot} />
          기록된 마우스 이벤트 {events.length}개
        </div>
      </div>
    </div>
  );
}
