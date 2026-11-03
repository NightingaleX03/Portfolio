import React, { useEffect, useRef } from "react";
import type { RigPart } from "../data/rig";
import "./SpecDrawer.css";

interface SpecDrawerProps {
  part: RigPart | null;
  onClose: () => void;
}

const SpecDrawer: React.FC<SpecDrawerProps> = ({ part, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const open = part !== null;

  useEffect(() => {
    if (!part) return;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
    };
  }, [part]);

  useEffect(() => {
    if (!part) return;
    const dialog = dialogRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const nodes = Array.from(
        dialog.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]")
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
  }, [part, onClose]);

  return (
    <>
      <div
        className={`rig-scrim${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={dialogRef}
        className={`rig-drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-labelledby={part ? "rig-spec-title" : undefined}
      >
        {part && (
          <>
            <div className="rig-drawer-top">
              <p className="rig-drawer-part">{part.part}</p>
              <button ref={closeRef} type="button" className="rig-drawer-close" onClick={onClose}>
                Close
              </button>
            </div>
            <h2 id="rig-spec-title">{part.title}</h2>
            {part.subtitle && <p className="rig-drawer-sub">{part.subtitle}</p>}
            {part.status && <span className="rig-pill">{part.status}</span>}
            {part.sections && part.sections.length > 0 ? (
              part.sections.map((section) => (
                <div key={section.text} className="rig-section">
                  <p className="rig-drawer-summary">{section.text}</p>
                  {section.points && section.points.length > 0 && (
                    <ul className="rig-pins">
                      {section.points.map((point) => (
                        <li key={point}>
                          <span className="rig-pad" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                {part.summary && <p className="rig-drawer-summary">{part.summary}</p>}
                {part.points && part.points.length > 0 && (
                  <ul className="rig-pins">
                    {part.points.map((point) => (
                      <li key={point}>
                        <span className="rig-pad" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            {part.tools && part.tools.length > 0 && (
              <>
                <p className="rig-built">Built with</p>
                <div className="rig-chip-row">
                  {part.tools.map((tool) => (
                    <span key={tool} className="rig-chip">
                      {tool}
                    </span>
                  ))}
                </div>
              </>
            )}
            {part.links && part.links.length > 0 && (
              <div className="rig-link-row">
                {part.links.map((link) => (
                  <a
                    key={link.href}
                    className="rig-link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </aside>
    </>
  );
};

export default SpecDrawer;
