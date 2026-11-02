import React, { useEffect, useMemo, useState } from "react";

export interface BoardBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

type PartKind = "resistor" | "cap" | "qfn" | "crystal";

interface DecorPart {
  id: string;
  kind: PartKind;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
}

interface DecorBus {
  id: number;
  lines: string[];
  spine: string;
  via: Point;
}

interface BoardDecorProps {
  width: number;
  height: number;
  obstacles: BoardBox[];
  reducedMotion: boolean;
}

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hits(obstacles: BoardBox[], x: number, y: number, pad: number) {
  return obstacles.some(
    (box) =>
      x >= box.x - pad &&
      x <= box.x + box.w + pad &&
      y >= box.y - pad &&
      y <= box.y + box.h + pad
  );
}

function toPath(points: Point[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

function buildDecor(width: number, height: number, obstacles: BoardBox[]) {
  const rand = mulberry32(0x534d03);
  const buses: DecorBus[] = [];
  const parts: DecorPart[] = [];

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  for (let attempt = 0; attempt < 48 && buses.length < 18; attempt += 1) {
    const startX = 12 + rand() * (width - 24);
    const startY = 28 + rand() * (height - 56);
    if (hits(obstacles, startX, startY, 1)) continue;

    const points: Point[] = [{ x: startX, y: startY }];
    let x = startX;
    let y = startY;
    let horizontal = rand() > 0.45;
    const legs = 2 + Math.floor(rand() * 2);

    for (let leg = 0; leg < legs; leg += 1) {
      const length = 48 + rand() * 150;
      const sign = rand() > 0.5 ? 1 : -1;
      const diagonal = rand() > 0.62;
      let nextX = x;
      let nextY = y;
      if (horizontal) nextX += sign * length;
      else nextY += sign * length;
      if (diagonal) {
        const bend = (rand() > 0.5 ? 1 : -1) * length * 0.7;
        if (horizontal) nextY += bend;
        else nextX += bend;
      }
      nextX = clamp(nextX, 8, width - 8);
      nextY = clamp(nextY, 8, height - 8);
      const midX = (x + nextX) / 2;
      const midY = (y + nextY) / 2;
      if (hits(obstacles, midX, midY, 0) && hits(obstacles, nextX, nextY, 0)) {
        horizontal = !horizontal;
        continue;
      }
      points.push({ x: nextX, y: nextY });
      x = nextX;
      y = nextY;
      horizontal = !horizontal;
    }

    if (points.length < 2) continue;
    const span = Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
    if (span < 36) continue;

    const dx = points[1].x - points[0].x;
    const dy = points[1].y - points[0].y;
    const length = Math.hypot(dx, dy) || 1;
    const px = -dy / length;
    const py = dx / length;
    const count = rand() > 0.82 ? 6 + Math.floor(rand() * 3) : 3 + Math.floor(rand() * 3);
    const gap = 4 + rand() * 2;
    const lines = Array.from({ length: count }, (_, index) => {
      const offset = (index - (count - 1) / 2) * gap;
      return toPath(points.map((point) => ({ x: point.x + px * offset, y: point.y + py * offset })));
    });
    const end = points[points.length - 1];
    buses.push({
      id: buses.length,
      lines,
      spine: toPath(points),
      via: end,
    });
  }

  let placed = 0;
  for (let y = 22; y < height - 22 && placed < 64; y += 18) {
    for (let x = 16; x < width - 16 && placed < 64; x += 20) {
      const jitterX = x + Math.floor(rand() * 7) - 3;
      const jitterY = y + Math.floor(rand() * 7) - 3;
      if (jitterY < 30 || jitterY > height - 30) continue;
      if ((jitterX < 30 && jitterY < 30) || (jitterX > width - 30 && jitterY > height - 30)) continue;
      if (hits(obstacles, jitterX, jitterY, 2)) continue;

      const roll = rand();
      let kind: PartKind = "resistor";
      let w = 14;
      let h = 6;
      if (roll >= 0.62 && roll < 0.84) {
        kind = "cap";
        w = 10;
        h = 6;
      } else if (roll >= 0.84 && roll < 0.93) {
        kind = "crystal";
        w = 13;
        h = 8;
      } else if (roll >= 0.93) {
        kind = "qfn";
        w = 22;
        h = 22;
        if (hits(obstacles, jitterX, jitterY, 12)) continue;
      }
      parts.push({
        id: `smd-${placed}`,
        kind,
        x: jitterX,
        y: jitterY,
        w,
        h,
        rot: rand() > 0.7 ? 90 : 0,
      });
      placed += 1;
    }
  }

  const pushBus = (points: Point[], count: number, gap: number) => {
    if (points.length < 2) return;
    const dx = points[1].x - points[0].x;
    const dy = points[1].y - points[0].y;
    const length = Math.hypot(dx, dy) || 1;
    const px = -dy / length;
    const py = dx / length;
    const lines = Array.from({ length: count }, (_, index) => {
      const offset = (index - (count - 1) / 2) * gap;
      return toPath(points.map((point) => ({ x: point.x + px * offset, y: point.y + py * offset })));
    });
    const end = points[points.length - 1];
    buses.push({ id: buses.length, lines, spine: toPath(points), via: end });
  };

  pushBus(
    [
      { x: 8, y: 70 },
      { x: 8, y: height - 70 },
    ],
    3,
    4
  );
  pushBus(
    [
      { x: width - 8, y: 64 },
      { x: width - 8, y: height * 0.45 },
      { x: width - 48, y: height * 0.45 },
    ],
    4,
    4
  );
  pushBus(
    [
      { x: 56, y: height - 24 },
      { x: width * 0.55, y: height - 24 },
      { x: width * 0.55, y: height - 70 },
    ],
    5,
    4
  );
  pushBus(
    [
      { x: width - 56, y: height - 22 },
      { x: width * 0.7, y: height - 22 },
    ],
    6,
    4
  );

  return { buses, parts };
}

const BoardDecor: React.FC<BoardDecorProps> = ({ width, height, obstacles, reducedMotion }) => {
  const decor = useMemo(
    () => (width > 80 && height > 80 ? buildDecor(width, height, obstacles) : { buses: [], parts: [] }),
    [width, height, obstacles]
  );

  const [packet, setPacket] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion || decor.buses.length === 0) {
      setPacket(null);
      return;
    }
    let timer = 0;
    let cancelled = false;
    const queue = () => {
      const wait = 4000 + Math.random() * 2000;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setPacket(Math.floor(Math.random() * decor.buses.length));
        queue();
      }, wait);
    };
    queue();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [decor.buses.length, reducedMotion]);

  if (width < 80 || height < 80) return null;

  return (
    <div className="rig-decor" aria-hidden="true">
      <svg className="rig-decor-svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {decor.buses.map((bus) => (
          <g key={bus.id}>
            {bus.lines.map((line, index) => (
              <path key={index} d={line} className="rig-decor-trace" />
            ))}
            <circle className="rig-via" cx={bus.via.x} cy={bus.via.y} r="3.1" />
            <circle className="rig-via-hole" cx={bus.via.x} cy={bus.via.y} r="1.15" />
            {packet === bus.id && (
              <path className="rig-packet" d={bus.spine} pathLength={100} />
            )}
          </g>
        ))}
      </svg>
      {decor.parts.map((part) => (
        <span
          key={part.id}
          className={`rig-smd rig-smd-${part.kind}`}
          style={{
            left: part.x,
            top: part.y,
            width: part.w,
            height: part.h,
            transform: `rotate(${part.rot}deg)`,
          }}
        />
      ))}
      <span className="rig-slot" style={{ top: 6, left: 52, right: 52 }} />
      <span className="rig-slot" style={{ bottom: 6, left: 52, right: 52 }} />
      <span className="rig-hole" style={{ top: 12, left: 12 }} />
      <span className="rig-hole" style={{ right: 12, bottom: 12 }} />
    </div>
  );
};

export default BoardDecor;
