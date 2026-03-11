/* 임시 교체
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
*/

"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const SEAT_SIZE = 10;
const SEAT_GAP = 3;
const STEP = SEAT_SIZE + SEAT_GAP;

const GRADE_COLOR: Record<SeatGrade, number> = {
  VIP: 0xa78bfa, // 연보라
  R: 0x7c3aed,  // 보라
  S: 0x4ade80,  // 초록
  A: 0x86efac,  // 연초록
};

const STATUS_COLOR: Record<SeatStatus, number | null> = {
  available: null,
  reserved: 0xaaaaaa,
  unavailable: 0xd1d5db,
};

// 구역별 시작 좌표 (피그마 기준)
const SECTION_LAYOUT: Record<string, { x: number; y: number }> = {
  "OP":   { x: 180, y: 30  },
  "1F-A": { x: 20,  y: 110 },
  "1F-B": { x: 220, y: 110 },
  "1F-C": { x: 500, y: 110 },
  "2F-A": { x: 20,  y: 520 },
  "2F-B": { x: 220, y: 520 },
  "2F-C": { x: 500, y: 520 },
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

    const app = new PIXI.Application();
    appRef.current = app;

app.init({
  width: 650,
  height: 760,
  background: 0xf1f5f9,
  antialias: true,
}).then(() => {
      canvasRef.current?.appendChild(app.canvas);

      // Stage 텍스트
      const stageLabel = new PIXI.Text({
        text: "Stage",
        style: { fontSize: 12, fill: 0x888888 },
      });
      stageLabel.x = 290;
      stageLabel.y = 8;
      app.stage.addChild(stageLabel);

      // Console 텍스트
      const consoleLabel = new PIXI.Text({
        text: "Console",
        style: { fontSize: 11, fill: 0x888888 },
      });
      consoleLabel.x = 285;
      consoleLabel.y = 485;
      app.stage.addChild(consoleLabel);

      // 1F 텍스트
      const floor1Label = new PIXI.Text({
        text: "1F",
        style: { fontSize: 11, fill: 0x888888 },
      });
      floor1Label.x = 338;
      floor1Label.y = 498;
      app.stage.addChild(floor1Label);

      // 2F 텍스트
      const floor2Label = new PIXI.Text({
        text: "2F",
        style: { fontSize: 11, fill: 0x888888 },
      });
      floor2Label.x = 338;
      floor2Label.y = 720;
      app.stage.addChild(floor2Label);

      sections.forEach((section) => {
        const layout = SECTION_LAYOUT[section.sectionId];
        if (!layout) return;

        // 구역 이름 텍스트
        const label = new PIXI.Text({
          text: section.sectionName,
          style: { fontSize: 11, fill: 0x666666 },
        });
        label.x = layout.x;
        label.y = layout.y - 16;
        app.stage.addChild(label);

        section.rows.forEach((row, rowIndex) => {
          // 행 번호 텍스트
          const rowLabel = new PIXI.Text({
            text: row.rowName,
            style: { fontSize: 8, fill: 0x999999 },
          });
          rowLabel.x = layout.x - 14;
          rowLabel.y = layout.y + rowIndex * STEP + 2;
          app.stage.addChild(rowLabel);

          row.seats.forEach((seat, colIndex) => {
            const g = new PIXI.Graphics();

            const isSelected = selectedSeat?.seatId === seat.seatId;
            const color = isSelected
              ? 0x1e293b
              : STATUS_COLOR[seat.status] ?? GRADE_COLOR[seat.grade];

            g.rect(0, 0, SEAT_SIZE, SEAT_SIZE).fill(color);
            g.x = layout.x + colIndex * STEP;
            g.y = layout.y + rowIndex * STEP;

            if (seat.status === "available") {
              g.eventMode = "static";
              g.cursor = "pointer";
              g.on("pointerdown", () => onSeatClick(seat));
            }

            app.stage.addChild(g);
          });
        });
      });
    });

    return () => {
      appRef.current?.destroy(true);
    };
  }, [sections, selectedSeat]);

  return (
    <div
      ref={canvasRef}
      className="overflow-auto"
      style={{ width: "700px", height: "800px" }}
    />
  );
};