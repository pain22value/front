"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const SEAT_SIZE = 10;
const SEAT_GAP = 3;
const STEP = SEAT_SIZE + SEAT_GAP;

const GRADE_COLOR: Record<SeatGrade, number> = {
  VIP: 0xa78bfa,
  R: 0x7c3aed,
  S: 0x4ade80,
  A: 0x86efac,
};

const STATUS_COLOR: Record<SeatStatus, number | null> = {
  available: null,
  reserved: 0xaaaaaa,
  unavailable: 0xd1d5db,
};

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
  selectedSeats: Seat[];       // ← 배열로 변경
  onSeatClick: (seat: Seat) => void;
}

export const SeatCanvas = ({ sections, selectedSeats, onSeatClick }: SeatCanvasProps) => {
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

      const selectedIds = new Set(selectedSeats.map((s) => s.seatId)); // ← Set으로 빠른 조회

      // Stage 텍스트
      const stageLabel = new PIXI.Text({ text: "Stage", style: { fontSize: 12, fill: 0x888888 } });
      stageLabel.x = 290; stageLabel.y = 8;
      app.stage.addChild(stageLabel);

      // Console 텍스트
      const consoleLabel = new PIXI.Text({ text: "Console", style: { fontSize: 11, fill: 0x888888 } });
      consoleLabel.x = 285; consoleLabel.y = 485;
      app.stage.addChild(consoleLabel);

      // 1F 텍스트
      const floor1Label = new PIXI.Text({ text: "1F", style: { fontSize: 11, fill: 0x888888 } });
      floor1Label.x = 338; floor1Label.y = 498;
      app.stage.addChild(floor1Label);

      // 2F 텍스트
      const floor2Label = new PIXI.Text({ text: "2F", style: { fontSize: 11, fill: 0x888888 } });
      floor2Label.x = 338; floor2Label.y = 720;
      app.stage.addChild(floor2Label);

      sections.forEach((section) => {
        const layout = SECTION_LAYOUT[section.sectionId];
        if (!layout) return;

        const label = new PIXI.Text({
          text: section.sectionName,
          style: { fontSize: 11, fill: 0x666666 },
        });
        label.x = layout.x;
        label.y = layout.y - 16;
        app.stage.addChild(label);

        section.rows.forEach((row, rowIndex) => {
          const rowLabel = new PIXI.Text({
            text: row.rowName,
            style: { fontSize: 8, fill: 0x999999 },
          });
          rowLabel.x = layout.x - 14;
          rowLabel.y = layout.y + rowIndex * STEP + 2;
          app.stage.addChild(rowLabel);

          row.seats.forEach((seat, colIndex) => {
            const g = new PIXI.Graphics();

            const isSelected = selectedIds.has(seat.seatId); // ← Set으로 체크
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
  }, [sections, selectedSeats]);

  return (
    <div
      ref={canvasRef}
      className="overflow-auto"
      style={{ width: "700px", height: "800px" }}
    />
  );
};