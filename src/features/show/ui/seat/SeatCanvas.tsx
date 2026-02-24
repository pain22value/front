"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const SEAT_SIZE = 14;   // 좌석 크기
const SEAT_GAP = 4;     // 좌석 간격
const SECTION_GAP = 30; // 구역 간격

// 임시 색상
const GRADE_COLOR: Record<SeatGrade, number> = {
  VIP: 0x9b59b6,  // 보라
  R: 0x8e44ad,
  S: 0x27ae60,    // 초록
  A: 0x95a5a6,    // 회색
};

// 임시 색상
const STATUS_COLOR: Record<SeatStatus, number | null> = {
  available: null,       // 등급 색상 사용
  reserved: 0xcccccc,   // 진한 회색
  unavailable: 0xe0e0e0, // 연한 회색
};

interface SeatCanvasProps {
  sections: SeatSection[];
  selectedSeat: Seat | null;
  onSeatClick: (seat: Seat) => void;
}

export const SeatCanvas = ({ sections, selectedSeat, onSeatClick }: SeatCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // PixiJS 앱 초기화
    const app = new PIXI.Application();
    appRef.current = app;

    app.init({
      width: canvasRef.current.clientWidth || 800,
      height: canvasRef.current.clientHeight || 600,
      background: 0xf5f5f5,
      antialias: true,
    }).then(() => {
      canvasRef.current?.appendChild(app.canvas);

      let currentY = SECTION_GAP;

      // 구역별로 그리기
      sections.forEach((section) => {
        // 구역 이름 텍스트
        const sectionLabel = new PIXI.Text({
          text: section.sectionName,
          style: { fontSize: 12, fill: 0x666666 },
        });
        sectionLabel.x = SECTION_GAP;
        sectionLabel.y = currentY;
        app.stage.addChild(sectionLabel);
        currentY += 20;

        // 행별로 그리기
        section.rows.forEach((row) => {
          let currentX = SECTION_GAP;

          // 행 이름 텍스트
          const rowLabel = new PIXI.Text({
            text: row.rowName,
            style: { fontSize: 10, fill: 0x999999 },
          });
          rowLabel.x = currentX;
          rowLabel.y = currentY + 2;
          app.stage.addChild(rowLabel);
          currentX += 20;

          // 좌석 그리기
          row.seats.forEach((seat) => {
            const g = new PIXI.Graphics();

            // 색상 결정
            const isSelected = selectedSeat?.seatId === seat.seatId;
            const color = isSelected
              ? 0x2c3e50  // 선택됨 → 진한 색
              : STATUS_COLOR[seat.status] ?? GRADE_COLOR[seat.grade];

            g.rect(0, 0, SEAT_SIZE, SEAT_SIZE).fill(color);
            g.x = currentX;
            g.y = currentY;

            // 클릭 가능한 좌석만 이벤트 등록
            if (seat.status === "available") {
              g.eventMode = "static";
              g.cursor = "pointer";
              g.on("pointerdown", () => onSeatClick(seat));
            }

            app.stage.addChild(g);
            currentX += SEAT_SIZE + SEAT_GAP;
          });

          currentY += SEAT_SIZE + SEAT_GAP;
        });

        currentY += SECTION_GAP;
      });
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      app.destroy(true);
    };
  }, [sections, selectedSeat]);

  return <div ref={canvasRef} className="w-full h-full" />;
};