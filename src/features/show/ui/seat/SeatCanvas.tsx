"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const SS = 8;
const SG = 3;
const STEP = SS + SG;

const LOGICAL_W = 720;

const GRADE_COLOR: Record<string, number> = {
  VIP: 0xa78bfa,
  R:   0x7c3aed,
  S:   0x818cf8,
  A:   0x86efac,
  A2:  0xfbbf24,
};

const STATUS_OVERRIDE: Partial<Record<SeatStatus, number>> = {
  reserved:    0xaaaaaa,
  unavailable: 0xF1F1F4,
};

// fill 색 기준 hover 색 매핑
const FILL_TO_HOVER: Record<number, number> = {
  0xDECFFB: 0xBDA0F8,  // VIP
  0xC2F2D8: 0xA0EEC3,  // R
  0xCCEBF6: 0xA8D8F0,  // S
  0xFDE5BE: 0xFFD580,  // A
};

const SELECTED_COLOR = 0xf11322;

type Align = "left" | "right" | "center";

const SECTION_CONFIG: Record<string, {
  label: string;
  align: Align;
  getStyle: (rowName: string, col: number, rowMaxCol: number) => { fill: number; stroke?: number }
}> = {
  "OP":   { label: "OP", align: "center",
    getStyle: () => ({ fill: 0xDECFFB, stroke: 0x783CF1 })
  },
  "1F-A": { label: "A", align: "right",
    getStyle: (rowName, col, rowMaxCol) => {
      if (Number(rowName) > 15) return { fill: 0xC2F2D8, stroke: 0x25B07D };
      if (col > rowMaxCol - 3) return { fill: 0xDECFFB, stroke: 0x783CF1 };
      return { fill: 0xC2F2D8, stroke: 0x25B07D };
    }
  },
  "1F-B": { label: "B", align: "center",
    getStyle: (rowName) => Number(rowName) <= 15
      ? { fill: 0xDECFFB, stroke: 0x783CF1 }
      : { fill: 0xC2F2D8, stroke: 0x25B07D }
  },
  "1F-C": { label: "C", align: "left",
    getStyle: (rowName, col) => {
      if (Number(rowName) > 15) return { fill: 0xC2F2D8, stroke: 0x25B07D };
      if (col <= 3) return { fill: 0xDECFFB, stroke: 0x783CF1 };
      return { fill: 0xC2F2D8, stroke: 0x25B07D };
    }
  },
  "2F-A": { label: "A", align: "right",
    getStyle: (rowName) => {
      const row = Number(rowName);
      if (row <= 2) return { fill: 0xC2F2D8, stroke: 0x25B07D };
      if (row <= 4) return { fill: 0xCCEBF6, stroke: 0x1D7CD0 };
      return { fill: 0xFDE5BE, stroke: 0xC59805 };
    }
  },
  "2F-B": { label: "B", align: "center",
    getStyle: (rowName) => {
      const row = Number(rowName);
      if (row <= 1) return { fill: 0xDECFFB, stroke: 0x783CF1 };
      if (row <= 2) return { fill: 0xC2F2D8, stroke: 0x25B07D };
      if (row <= 4) return { fill: 0xCCEBF6, stroke: 0x1D7CD0 };
      return { fill: 0xFDE5BE, stroke: 0xC59805 };
    }
  },
  "2F-C": { label: "C", align: "left",
    getStyle: (rowName) => {
      const row = Number(rowName);
      if (row <= 2) return { fill: 0xC2F2D8, stroke: 0x25B07D };
      if (row <= 4) return { fill: 0xCCEBF6, stroke: 0x1D7CD0 };
      return { fill: 0xFDE5BE, stroke: 0xC59805 };
    }
  },
};

const makeText = (text: string, style: Partial<PIXI.TextStyle>, x: number, y: number): PIXI.Text => {
  const t = new PIXI.Text({ text, style });
  t.x = x; t.y = y;
  return t;
};

const drawCurvedBox = (
  g: PIXI.Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  topCurve: number,
  bottomCurve: number,
) => {
  // 위쪽 - 오목 (안으로 들어가게)
  g.moveTo(x, y);
  g.quadraticCurveTo(x + w / 2, y + topCurve, x + w, y); // ← 제어점이 아래로
  g.lineTo(x + w, y + h);
  // 아래쪽 - 볼록 (밖으로 나오게)
  g.quadraticCurveTo(x + w / 2, y + h + bottomCurve, x, y + h); // ← 제어점이 더 아래로
  g.closePath();
  g.fill({ color: 0xffffff });
};

const drawCurvedBoxWithCut = (
  g: PIXI.Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  topCurve: number,
  bottomCurve: number,
) => {
  const cutSize = topCurve * 2;

  g.moveTo(x + cutSize, y);
  g.lineTo(x, y + cutSize);
  g.lineTo(x, y + h);
  g.quadraticCurveTo(x + w / 2, y + h + bottomCurve, x + w, y + h);
  g.lineTo(x + w, y + cutSize);
  g.lineTo(x + w - cutSize, y);
  g.quadraticCurveTo(x + w / 2, y + topCurve, x + cutSize, y);
  g.closePath();
  g.fill({ color: 0xffffff });
};

interface SeatCanvasProps {
  sections: SeatSection[];
  selectedSeats: Seat[];
  onSeatClick: (seat: Seat) => void;
}

export const SeatCanvas = ({ sections, selectedSeats, onSeatClick }: SeatCanvasProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const appRef     = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (wrapperRef.current.querySelector('canvas')) return; // 이미 캔버스가 있으면 스킵
    const wrapper = wrapperRef.current;

    const opRows   = sections.find((s) => s.sectionId === "OP")?.rows.length   ?? 3;
    const rows1F   = Math.max(
      sections.find((s) => s.sectionId === "1F-A")?.rows.length ?? 20,
      sections.find((s) => s.sectionId === "1F-B")?.rows.length ?? 20,
    );
    const rows2F   = Math.max(
      sections.find((s) => s.sectionId === "2F-A")?.rows.length ?? 6,
      sections.find((s) => s.sectionId === "2F-B")?.rows.length ?? 6,
    );

    const STAGE_H    = 12 + 22 + 4;
    const OP_H       = 10 + opRows * STEP;
    const GAP_OP_1F  = 16;
    const SEC1_H     = 12 + rows1F * STEP;
    const CONSOLE_H  = 8 + 16 + 8;
    const BOX1_PAD   = 12 + 8;
    const BADGE_H    = 14 + 22 + 16;
    const SEC2_H     = 12 + rows2F * STEP;
    const BOX2_PAD   = 12 + 24;
    const BADGE2_H   = 14 + 22;

    const LOGICAL_H =
      STAGE_H + OP_H + GAP_OP_1F + SEC1_H + CONSOLE_H +
      BOX1_PAD + BADGE_H + SEC2_H + BOX2_PAD + BADGE2_H + 20;

    if (appRef.current) {
      try {
        appRef.current.destroy(true);
      } catch (e) {}
      appRef.current = null;
    }  

    const app = new PIXI.Application();
    appRef.current = app;

    app.init({
      width:      LOGICAL_W,
      height:     LOGICAL_H,
      background: 0xEDEEF4,
      antialias:  true,
    }).then(() => {
      if (!wrapperRef.current) return;

      const canvas = app.canvas as HTMLCanvasElement;
      canvas.style.display = "block";
      wrapper.appendChild(canvas);

      const selectedIds = new Set(selectedSeats.map((s) => s.seatId));
      const CX     = LOGICAL_W / 2;
      const BOX_PX = 55;

      const b1 = sections.find((s) => s.sectionId === "1F-B");
      const b1MaxCols = Math.max(...(b1?.rows.flatMap((r) => r.seats.map((s) => s.col)) ?? [16]));
      const B_startX  = CX - (b1MaxCols * STEP - SG) / 2;
      const B_endX    = B_startX + b1MaxCols * STEP - SG;

      const a1 = sections.find((s) => s.sectionId === "1F-A");
      const a1MaxCols = Math.max(...(a1?.rows.flatMap((r) => r.seats.map((s) => s.col)) ?? [9]));
      const SIDE_GAP  = 20;
      const A_startX  = B_startX - SIDE_GAP - a1MaxCols * STEP + SG;
      const C_startX  = B_endX + SIDE_GAP + SG;

      // ── Stage ─────────────────────────────────────────────
      const stageBar = new PIXI.Graphics();
      stageBar.roundRect(CX - 170, 12, 340, 22, 6).fill({ color: 0xDDDDE4 });
      app.stage.addChild(stageBar);
      app.stage.addChild(makeText("Stage", { fontSize: 11, fill: 0xffffff }, CX - 17, 17));

      const BOX1_Y = 32;

      // ── OP ────────────────────────────────────────────────
      const OP_Y = BOX1_Y + 60;
      const opSecRows = sections.find((s) => s.sectionId === "OP")?.rows ?? [];

      const opLabel = makeText("OP", { fontSize: 10, fill: 0x555555, fontWeight: "bold" }, 0, OP_Y - 16);
      opLabel.x = CX - opLabel.width / 2;
      app.stage.addChild(opLabel);

      opSecRows.forEach((row) => {
        const TOTAL_OP_COLS = 25;
        const rx = CX - (TOTAL_OP_COLS * STEP - SG) / 2;
        const ry = OP_Y + (opSecRows.indexOf(row)) * STEP;
        const rn = makeText(row.rowName, { fontSize: 7, fill: 0x999999 }, rx - 4, ry + 1);
        rn.anchor.set(1, 0);
        app.stage.addChild(rn);

        row.seats.forEach((seat) => {
          const g = new PIXI.Graphics();
          const isSelected = selectedIds.has(seat.seatId);
          const style = STATUS_OVERRIDE[seat.status] !== undefined
            ? { fill: STATUS_OVERRIDE[seat.status]! }
            : { fill: 0xDECFFB, stroke: 0x783CF1 };

            if (isSelected) {
              const hoverFill = FILL_TO_HOVER[style.fill] ?? style.fill;
              if (style.stroke) {
                g.roundRect(0, 0, SS, SS, 2)
                  .fill({ color: hoverFill })
                  .stroke({ color: style.stroke, width: 1 });
              } else {
                g.roundRect(0, 0, SS, SS, 2).fill({ color: hoverFill });
              }
            } else {
              if (style.stroke) {
                g.roundRect(0, 0, SS, SS, 2)
                  .fill({ color: style.fill })
                  .stroke({ color: style.stroke, width: 1 });
              } else {
                g.roundRect(0, 0, SS, SS, 2).fill({ color: style.fill });
              }
            }

          g.x = rx + (seat.col - 1) * STEP;
          g.y = ry;

          if (seat.status === "available" && !isSelected) {
            g.eventMode = "static";
            g.cursor = "pointer";

            g.on("pointerover", () => {
              g.clear();
              const hoverFill = FILL_TO_HOVER[style.fill] ?? style.fill;
              if (style.stroke) {
                g.roundRect(0, 0, SS, SS, 2)
                  .fill({ color: hoverFill })
                  .stroke({ color: style.stroke, width: 1 });
              } else {
                g.roundRect(0, 0, SS, SS, 2).fill({ color: hoverFill });
              }
            });

            g.on("pointerout", () => {
              g.clear();
              if (style.stroke) {
                g.roundRect(0, 0, SS, SS, 2)
                  .fill({ color: style.fill })
                  .stroke({ color: style.stroke, width: 1 });
              } else {
                g.roundRect(0, 0, SS, SS, 2).fill({ color: style.fill });
              }
            });

            g.on("pointerdown", () => onSeatClick(seat));
          }

          app.stage.addChild(g);
        });
      });

      // ── 공통 섹션 렌더 ────────────────────────────────────
      const renderSection = (
        sectionId: string,
        baseX: number,
        align: Align,
        maxCols: number,
        startY: number,
      ) => {
        const sec = sections.find((s) => s.sectionId === sectionId);
        if (!sec) return;
        const cfg = SECTION_CONFIG[sectionId];

        sec.rows.forEach((row) => {
          const ry = startY + sec.rows.indexOf(row) * STEP;

          if (row.seats.length === 0) {
            const rn = makeText(row.rowName, { fontSize: 7, fill: 0x999999 }, baseX - 4, ry + 1);
            rn.anchor.set(1, 0);
            app.stage.addChild(rn);
            return;
          }

          const maxCol = Math.max(...row.seats.map((s) => s.col));

          let rx: number;
          if (align === "right")       rx = baseX + (maxCols - maxCol) * STEP;
          else if (align === "center") rx = CX - (maxCol * STEP - SG) / 2;
          else                         rx = baseX;

          if (align === "left") {
            app.stage.addChild(makeText(row.rowName, { fontSize: 7, fill: 0x999999 }, rx + maxCol * STEP + 3, ry + 1));
          } else {
            const rn = makeText(row.rowName, { fontSize: 7, fill: 0x999999 }, rx - 4, ry + 1);
            rn.anchor.set(1, 0);
            app.stage.addChild(rn);
          }

          row.seats.forEach((seat) => {
            const g = new PIXI.Graphics();
            const isSelected = selectedIds.has(seat.seatId);

            const style = STATUS_OVERRIDE[seat.status] !== undefined
              ? { fill: STATUS_OVERRIDE[seat.status]! }
              : cfg.getStyle(row.rowName, seat.col, maxCol);

              if (isSelected) {
                const hoverFill = FILL_TO_HOVER[style.fill] ?? style.fill;
                if (style.stroke) {
                  g.roundRect(0, 0, SS, SS, 2)
                    .fill({ color: hoverFill })
                    .stroke({ color: style.stroke, width: 1 });
                } else {
                  g.roundRect(0, 0, SS, SS, 2).fill({ color: hoverFill });
                }
              } else {
              if (style.stroke) {
                g.roundRect(0, 0, SS, SS, 2)
                  .fill({ color: style.fill })
                  .stroke({ color: style.stroke, width: 1 });
              } else {
                g.roundRect(0, 0, SS, SS, 2).fill({ color: style.fill });
              }
            }

            g.x = rx + (seat.col - 1) * STEP;
            g.y = ry;

            if (seat.status === "available" && !isSelected) {
              g.eventMode = "static";
              g.cursor = "pointer";

              g.on("pointerover", () => {
                g.clear();
                const hoverFill = FILL_TO_HOVER[style.fill] ?? style.fill;
                if (style.stroke) {
                  g.roundRect(0, 0, SS, SS, 2)
                    .fill({ color: hoverFill })
                    .stroke({ color: style.stroke, width: 1 });
                } else {
                  g.roundRect(0, 0, SS, SS, 2).fill({ color: hoverFill });
                }
              });

              g.on("pointerout", () => {
                g.clear();
                if (style.stroke) {
                  g.roundRect(0, 0, SS, SS, 2)
                    .fill({ color: style.fill })
                    .stroke({ color: style.stroke, width: 1 });
                } else {
                  g.roundRect(0, 0, SS, SS, 2).fill({ color: style.fill });
                }
              });

              g.on("pointerdown", () => onSeatClick(seat));
            }

            app.stage.addChild(g);
          });
        });
      };

      // ── 1F A/B/C ─────────────────────────────────────────
      const SEC1_Y = OP_Y + opSecRows.length * STEP + 16;

      const labelPos1F: Record<string, number> = {
        "1F-A": A_startX + (a1MaxCols * STEP) / 2,
        "1F-B": CX,
        "1F-C": C_startX + (a1MaxCols * STEP) / 2,
      };
      ["1F-A", "1F-B", "1F-C"].forEach((sid) => {
        const lbl = makeText(SECTION_CONFIG[sid].label, { fontSize: 10, fill: 0x555555, fontWeight: "bold" }, 0, SEC1_Y - 16);
        lbl.x = labelPos1F[sid] - lbl.width / 2;
        app.stage.addChild(lbl);
      });

      renderSection("1F-A", A_startX, "right",  a1MaxCols, SEC1_Y);
      renderSection("1F-B", B_startX, "center", b1MaxCols, SEC1_Y);
      renderSection("1F-C", C_startX, "left",   a1MaxCols, SEC1_Y);

      // Console
      const CONSOLE_Y = SEC1_Y + rows1F * STEP + 8;
      const consolebar = new PIXI.Graphics();
      consolebar.roundRect(CX - 120, CONSOLE_Y, 240, 16, 4).fill({ color: 0xDDDDE4 });
      app.stage.addChild(consolebar);
      app.stage.addChild(makeText("Console", { fontSize: 10, fill: 0xffffff }, CX - 22, CONSOLE_Y + 3));

      // 1F 흰 박스
      const BOX1_H = CONSOLE_Y + 40 - BOX1_Y;
      const box1F  = new PIXI.Graphics();
      drawCurvedBoxWithCut(box1F, BOX_PX, BOX1_Y, LOGICAL_W - BOX_PX * 2, BOX1_H, 40, 50);
      app.stage.addChildAt(box1F, 0);

      // 1F 뱃지
      const BADGE1_Y = BOX1_Y + BOX1_H + 14;
      const b1g = new PIXI.Graphics();
      b1g.circle(CX, BADGE1_Y, 11).fill({ color: 0x444444 });
      app.stage.addChild(b1g);
      app.stage.addChild(makeText("1F", { fontSize: 9, fill: 0xffffff, fontWeight: "bold" }, CX - 6, BADGE1_Y - 5));

      // ── 2F ───────────────────────────────────────────────
      const BOX2_Y = BADGE1_Y + 16;
      const SEC2_Y = BOX2_Y + 55;

      const b2 = sections.find((s) => s.sectionId === "2F-B");
      const b2MaxCols = Math.max(...(b2?.rows.map((r) => r.seats.length) ?? [14]));
      const a2MaxCols = Math.max(
        ...(sections.find((s) => s.sectionId === "2F-A")
          ?.rows.flatMap((r) => r.seats.map((s) => s.col)) ?? [5])
      );

      const labelPos2F: Record<string, number> = {
        "2F-A": A_startX + (a2MaxCols * STEP) / 2,
        "2F-B": CX,
        "2F-C": C_startX + (a2MaxCols * STEP) / 2,
      };
      ["2F-A", "2F-B", "2F-C"].forEach((sid) => {
        const lbl = makeText(SECTION_CONFIG[sid].label, { fontSize: 10, fill: 0x555555, fontWeight: "bold" }, 0, SEC2_Y - 16);
        lbl.x = labelPos2F[sid] - lbl.width / 2;
        app.stage.addChild(lbl);
      });

      renderSection("2F-A", A_startX, "right",  a2MaxCols, SEC2_Y);
      renderSection("2F-B", B_startX, "center", b2MaxCols, SEC2_Y);
      renderSection("2F-C", C_startX, "left",   a2MaxCols, SEC2_Y);

      // 2F 흰 박스
      const BOX2_H = rows2F * STEP + 60;
      const box2F  = new PIXI.Graphics();
      drawCurvedBox(box2F, BOX_PX, BOX2_Y, LOGICAL_W - BOX_PX * 2, BOX2_H, 50, 50);
      app.stage.addChildAt(box2F, app.stage.getChildIndex(box1F) + 1);

      // 2F 뱃지
      const BADGE2_Y = BOX2_Y + BOX2_H + 14;
      const b2g = new PIXI.Graphics();
      b2g.circle(CX, BADGE2_Y, 11).fill({ color: 0x444444 });
      app.stage.addChild(b2g);
      app.stage.addChild(makeText("2F", { fontSize: 9, fill: 0xffffff, fontWeight: "bold" }, CX - 6, BADGE2_Y - 5));

      // ── ResizeObserver ────────────────────────────────────
      const applyScale = () => {
        const { clientWidth, clientHeight } = wrapper;
        if (!clientWidth || !clientHeight) return;
        const scaleX = clientWidth  / LOGICAL_W;
        const scaleY = clientHeight / LOGICAL_H;
        const scale = Math.min(scaleX, scaleY);
        canvas.style.width  = `${LOGICAL_W * scale}px`;
        canvas.style.height = `${LOGICAL_H * scale}px`;
      };

      applyScale();
      const ro = new ResizeObserver(applyScale);
      ro.observe(wrapper);
      (app as any)._ro = ro;
    });

    return () => {
      (appRef.current as any)?._ro?.disconnect();
      if (appRef.current) {
        try {
          appRef.current.destroy(true);
        } catch (e) {
          // ignore
        }
        appRef.current = null;
      }
    };
  }, [sections, selectedSeats]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full flex items-center justify-center bg-[#EDEEF4]"
    />
  );
};