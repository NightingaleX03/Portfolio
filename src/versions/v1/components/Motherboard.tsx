import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  bat,
  bios,
  chip,
  cpu,
  gpu,
  m2a,
  m2b,
  owner,
  ram,
  sata,
  vrm,
  type RigPart,
} from "../data/rig";
import { prefersReducedMotion } from "./BootSequence";
import BoardDecor, { type BoardBox } from "./BoardDecor";
import { RigPorts } from "./RigFooter";
import SpecDrawer from "./SpecDrawer";
import "./Motherboard.css";

interface Point {
  x: number;
  y: number;
}

interface Trace {
  id: string;
  lines: string[];
  via: Point;
  bend: Point;
}

interface MotherboardProps {
  sweep: number;
}

function round(value: number) {
  return value.toFixed(1);
}

function sameBoxes(left: Record<string, BoardBox>, right: Record<string, BoardBox>) {
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  return keys.every((key) => {
    const a = left[key];
    const b = right[key];
    return (
      b !== undefined &&
      Math.abs(a.x - b.x) < 0.5 &&
      Math.abs(a.y - b.y) < 0.5 &&
      Math.abs(a.w - b.w) < 0.5 &&
      Math.abs(a.h - b.h) < 0.5
    );
  });
}

function centerOf(box: BoardBox): Point {
  return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
}

function orthBus(from: Point, to: Point, gap = 5) {
  const horizontal = Math.abs(to.x - from.x) >= Math.abs(to.y - from.y);
  const lines: string[] = [];
  let via = to;
  let bend = to;
  for (let index = 0; index < 3; index += 1) {
    const offset = (index - 1) * gap;
    if (horizontal) {
      lines.push(`M ${round(from.x)} ${round(from.y + offset)} H ${round(to.x + offset)} V ${round(to.y)}`);
      if (index === 1) {
        via = { x: to.x + offset, y: to.y };
        bend = { x: to.x + offset, y: from.y + offset };
      }
    } else {
      lines.push(`M ${round(from.x + offset)} ${round(from.y)} V ${round(to.y + offset)} H ${round(to.x)}`);
      if (index === 1) {
        via = { x: to.x, y: to.y + offset };
        bend = { x: from.x + offset, y: to.y + offset };
      }
    }
  }
  return { lines, via, bend };
}

const detailLabel = (part: RigPart) => `${part.title}, ${part.part}, open details`;

const Motherboard: React.FC<MotherboardProps> = ({ sweep }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [boxes, setBoxes] = useState<Record<string, BoardBox>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<RigPart | null>(null);
  const [sweeping, setSweeping] = useState(false);
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const bounds = board.getBoundingClientRect();
      const scaleX = bounds.width / board.offsetWidth || 1;
      const scaleY = bounds.height / board.offsetHeight || 1;
      const next: Record<string, BoardBox> = {};
      board.querySelectorAll<HTMLElement>("[data-trace]").forEach((element) => {
        const id = element.dataset.trace;
        if (!id) return;
        const rect = element.getBoundingClientRect();
        next[id] = {
          x: (rect.left - bounds.left) / scaleX,
          y: (rect.top - bounds.top) / scaleY,
          w: rect.width / scaleX,
          h: rect.height / scaleY,
        };
      });
      setBoxes((current) => (sameBoxes(current, next) ? current : next));
      const w = board.offsetWidth;
      const h = board.offsetHeight;
      setSize((current) => (current.w === w && current.h === h ? current : { w, h }));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const ready = Boolean(boxes.cpu);
  useEffect(() => {
    if (!sweep || reduced || !ready) return;
    setSweeping(true);
    const timer = window.setTimeout(() => setSweeping(false), 1200);
    return () => window.clearTimeout(timer);
  }, [sweep, reduced, ready]);

  const traces: Trace[] = [];
  if (boxes.cpu) {
    const origin = centerOf(boxes.cpu);
    Object.keys(boxes).forEach((id) => {
      const box = boxes[id];
      if (id === "cpu" || id === "silk" || !box) return;
      const bus = orthBus(origin, centerOf(box));
      traces.push({ id, ...bus });
    });
  }

  const obstacles = useMemo(() => Object.values(boxes), [boxes]);

  const hot = (id: string) => hover === id || selected?.id === id;

  const openPart = (part: RigPart, element: HTMLElement) => {
    opener.current = element;
    setSelected(part);
  };

  const closePart = useCallback(() => {
    const back = opener.current;
    setSelected(null);
    window.requestAnimationFrame(() => back?.focus());
  }, []);

  const bind = (id: string) => ({
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover((current) => (current === id ? null : current)),
    onFocus: () => setHover(id),
    onBlur: () => setHover((current) => (current === id ? null : current)),
  });

  const renderSheet = (part: RigPart, className: string, body: React.ReactNode) => (
    <button
      key={part.id}
      type="button"
      data-trace={part.id}
      data-part={part.id}
      className={`rig-part ${className}${hot(part.id) ? " is-hot" : ""}`}
      aria-label={detailLabel(part)}
      aria-expanded={selected?.id === part.id}
      onClick={(event) => openPart(part, event.currentTarget)}
      {...bind(part.id)}
    >
      {body}
    </button>
  );

  return (
    <>
      <div className="rig-board" ref={boardRef}>
        <BoardDecor
          width={size.w}
          height={size.h}
          obstacles={obstacles}
          reducedMotion={reduced}
        />
        {size.w > 0 && (
          <svg className={`rig-buses${sweeping ? " is-sweeping" : ""}`} viewBox={`0 0 ${size.w} ${size.h}`}>
            {traces.map((trace) => (
              <g key={trace.id} className={hot(trace.id) || hot("cpu") ? "is-hot" : undefined}>
                {trace.lines.map((line, index) => (
                  <path
                    key={`${trace.id}-${index}`}
                    className="bus"
                    d={line}
                    pathLength={sweeping && !hot(trace.id) ? 1 : undefined}
                  />
                ))}
                <circle className="rig-via" cx={trace.via.x} cy={trace.via.y} r="3.2" />
                <circle className="rig-via-hole" cx={trace.via.x} cy={trace.via.y} r="1.15" />
                <circle className="rig-via" cx={trace.bend.x} cy={trace.bend.y} r="2.4" />
                <circle className="rig-via-hole" cx={trace.bend.x} cy={trace.bend.y} r="0.8" />
              </g>
            ))}
          </svg>
        )}
        <div className="rig-grid">
          <header className="rig-silk ga-silk" data-trace="silk">
            <p className="rig-silk-model">{owner.model}</p>
            <h1 id="rig-silk-title" tabIndex={-1}>
              {owner.name}
            </h1>
            <p className="rig-role">{owner.role}</p>
            <p className="rig-blurb">{owner.blurb}</p>
            <p className="rig-hint">Click any component to inspect it.</p>
          </header>

          <div
            className="rig-io ga-io"
            data-trace="io"
            onMouseEnter={() => setHover("io")}
            onMouseLeave={() => setHover((current) => (current === "io" ? null : current))}
            onFocusCapture={() => setHover("io")}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setHover((current) => (current === "io" ? null : current));
              }
            }}
          >
            <p className="rig-io-label">I/O shield</p>
            <RigPorts labelled className="rig-io-list" />
          </div>

          {renderSheet(
            cpu,
            "rig-cpu ga-cpu",
            <span className="rig-ihs">
              <span className="rig-kicker">{cpu.part}</span>
              <span className="rig-part-title">{cpu.title}</span>
              <span className="rig-part-sub">{cpu.subtitle}</span>
              {cpu.status && <span className="rig-pill">{cpu.status}</span>}
            </span>
          )}

          {renderSheet(
            vrm,
            "rig-vrm ga-vrm",
            <>
              <span className="rig-chokes" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="rig-kicker">{vrm.part}</span>
              <span className="rig-part-title">{vrm.title}</span>
            </>
          )}

          {renderSheet(
            chip,
            "rig-chipset ga-chip",
            <>
              <span className="rig-fins" aria-hidden="true" />
              <span className="rig-kicker">{chip.part}</span>
              <span className="rig-part-title">{chip.title}</span>
            </>
          )}

          <div className="rig-ram ga-ram">
            {ram.map((stick) =>
              renderSheet(
                stick,
                "rig-dimm",
                <>
                  <span className="rig-dimm-chips" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="rig-dimm-text">
                    <span className="rig-dimm-slot">{stick.part}</span>
                    <span className="rig-dimm-role">{stick.title}</span>
                    <span className="rig-dimm-role">{stick.subtitle}</span>
                  </span>
                </>
              )
            )}
          </div>

          {renderSheet(
            bios,
            "rig-bios ga-bios",
            <span className="rig-dip">
              <span className="rig-kicker">{bios.part}</span>
              <span className="rig-part-title">{bios.title}</span>
            </span>
          )}

          {renderSheet(
            m2a,
            "rig-m2 ga-m2a",
            <>
              <span className="rig-kicker">{m2a.part}</span>
              <span className="rig-part-title">{m2a.title}</span>
              <span className="rig-part-sub">{m2a.subtitle}</span>
              <span className="rig-nand-row" aria-hidden="true">
                <span className="rig-nand" />
                <span className="rig-nand" />
              </span>
              <span className="rig-m2-edge" aria-hidden="true" />
            </>
          )}

          {renderSheet(
            m2b,
            "rig-m2 ga-m2b",
            <>
              <span className="rig-kicker">{m2b.part}</span>
              <span className="rig-part-title">{m2b.title}</span>
              <span className="rig-part-sub">{m2b.subtitle}</span>
              <span className="rig-nand-row" aria-hidden="true">
                <span className="rig-nand" />
                <span className="rig-nand" />
              </span>
              <span className="rig-m2-edge" aria-hidden="true" />
            </>
          )}

          <Link
            to={bat.route ?? "/commit/v1/journey"}
            data-trace={bat.id}
            data-part={bat.id}
            className={`rig-part rig-bat ga-bat${hot(bat.id) ? " is-hot" : ""}`}
            aria-label={`${bat.title}, ${bat.part}, open the log`}
            {...bind(bat.id)}
          >
            <span className="rig-coin">
              <span className="rig-kicker">{bat.part}</span>
              <span className="rig-part-title">{bat.title}</span>
              <span className="rig-part-sub">{bat.subtitle}</span>
            </span>
          </Link>

          {renderSheet(
            gpu,
            "rig-gpu ga-gpu",
            <>
              <span className="rig-gpu-top">
                <span className="rig-fans" aria-hidden="true">
                  <span className={`rig-fan${hot(gpu.id) ? " is-spin" : ""}`} />
                  <span className={`rig-fan${hot(gpu.id) ? " is-spin" : ""}`} />
                </span>
                <span className="rig-gpu-copy">
                  <span className="rig-kicker">{gpu.part}</span>
                  <span className="rig-part-title">{gpu.title}</span>
                  <span className="rig-part-sub">{gpu.subtitle}</span>
                  {gpu.status && <span className="rig-gpu-status">{gpu.status}</span>}
                </span>
              </span>
              <span className="rig-pcie" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <i key={index} />
                ))}
              </span>
            </>
          )}

          <Link
            to={sata.route ?? "/commit/v1/projects"}
            data-trace={sata.id}
            data-part={sata.id}
            className={`rig-part rig-sata ga-sata${hot(sata.id) ? " is-hot" : ""}`}
            aria-label={`${sata.title}, ${sata.part}, open projects`}
            {...bind(sata.id)}
          >
            <span className="rig-sata-label">
              <span className="rig-kicker">{sata.part}</span>
              <span className="rig-part-title">{sata.title}</span>
              <span className="rig-part-sub">{sata.subtitle}</span>
            </span>
            <span className="rig-sata-tab">Open drive</span>
          </Link>
        </div>
      </div>
      <SpecDrawer part={selected} onClose={closePart} />
    </>
  );
};

export default Motherboard;
