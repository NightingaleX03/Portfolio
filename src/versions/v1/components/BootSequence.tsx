import React, { useEffect, useRef, useState } from "react";
import "./BootSequence.css";

const LINES = [
  "NIGHTINGALE BIOS v1.0",
  "CPU    Lyra compiler core ... detected",
  "GPU    ROCm kernel suite ... detected",
  "Memory 4 modules of experience ... OK",
  "M.2    2 featured projects ... OK",
  "SATA   project archive ... OK",
  "Boot   opening side panel",
];

type Stage = "off" | "post" | "open" | "zoom";

interface BootSequenceProps {
  onReveal: () => void;
  onComplete: (reason: "finished" | "skipped") => void;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onReveal, onComplete }) => {
  const [stage, setStage] = useState<Stage>("off");
  const [shown, setShown] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const powerRef = useRef<HTMLButtonElement>(null);
  const done = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onRevealRef = useRef(onReveal);
  onCompleteRef.current = onComplete;
  onRevealRef.current = onReveal;

  const finish = (reason: "finished" | "skipped") => {
    if (done.current) return;
    done.current = true;
    onCompleteRef.current(reason);
  };

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    powerRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish("skipped");
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]")
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (stage !== "post") return;
    setShown(1);
    const step = window.setInterval(() => {
      setShown((count) => Math.min(count + 1, LINES.length));
    }, 230);
    const next = window.setTimeout(() => setStage("open"), 1800);
    return () => {
      window.clearInterval(step);
      window.clearTimeout(next);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "open") return;
    const next = window.setTimeout(() => {
      onRevealRef.current();
      setStage("zoom");
    }, 1000);
    return () => window.clearTimeout(next);
  }, [stage]);

  useEffect(() => {
    if (stage !== "zoom") return;
    const next = window.setTimeout(() => finish("finished"), 900);
    return () => window.clearTimeout(next);
  }, [stage]);

  const stageClass =
    stage === "open" ? " is-open" : stage === "zoom" ? " is-open is-zoom" : "";

  return (
    <div
      ref={rootRef}
      className={`rig-boot${stageClass}`}
      role="dialog"
      aria-modal="true"
      aria-label="Power on the computer"
    >
      <button type="button" className="rig-skip" onClick={() => finish("skipped")}>
        Skip intro
      </button>
      <div className="rig-boot-layout">
        <div className="rig-tower" aria-hidden={stage !== "off"}>
          <div className="rig-front">
            <span className="rig-bay" />
            <span className="rig-bay" />
            <span className="rig-bay" />
            <span className="rig-case-leds">
              <span className={`rig-case-led${stage !== "off" ? " is-on" : ""}`} />
              <span className={`rig-case-act${stage === "post" ? " is-flicker" : ""}`} />
            </span>
            <button
              ref={powerRef}
              type="button"
              className="rig-power"
              aria-label="Power button"
              disabled={stage !== "off"}
              onClick={() => setStage("post")}
            />
          </div>
          <div className="rig-chassis">
            <div className="rig-mini">
              <div className="rig-mini-cpu" />
              <div className="rig-mini-ram">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="rig-mini-m2" />
              <div className="rig-mini-gpu">
                <span className="rig-mini-fan" />
                <span className="rig-mini-fan" />
              </div>
            </div>
            <div className="rig-side">
              <span className="rig-screw rig-screw-top" />
              <span className="rig-screw rig-screw-bottom" />
            </div>
          </div>
        </div>
        <div className="rig-boot-copy">
          {stage === "off" ? (
            <>
              <p className="rig-boot-prompt">Press the power button</p>
              <p className="rig-boot-hint">or press Esc to skip</p>
            </>
          ) : (
            <p className="rig-boot-log" aria-live="polite">
              {LINES.slice(0, shown).join("\n")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
