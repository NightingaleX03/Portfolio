import React, { useCallback, useEffect, useState } from "react";
import BootSequence, { prefersReducedMotion } from "../components/BootSequence";
import Motherboard from "../components/Motherboard";
import RigFooter from "../components/RigFooter";
import "../rig.css";
import "./V1HomePage.css";

function alreadyBooted() {
  try {
    return sessionStorage.getItem("rig-booted") === "1";
  } catch {
    return false;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem("rig-booted", "1");
  } catch {
    /* storage unavailable */
  }
}

const V1HomePage: React.FC = () => {
  const skipIntro = prefersReducedMotion() || alreadyBooted();
  const [bootKey, setBootKey] = useState(0);
  const [showBoot, setShowBoot] = useState(!skipIntro);
  const [revealed, setRevealed] = useState(skipIntro);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) markBooted();
  }, []);

  useEffect(() => {
    const onReboot = () => {
      if (prefersReducedMotion()) {
        markBooted();
        setShowBoot(false);
        setRevealed(true);
        return;
      }
      setSweep(0);
      setRevealed(false);
      setBootKey((key) => key + 1);
      setShowBoot(true);
    };
    window.addEventListener("rig:reboot", onReboot);
    return () => window.removeEventListener("rig:reboot", onReboot);
  }, []);

  const onReveal = useCallback(() => setRevealed(true), []);

  const onComplete = useCallback((reason: "finished" | "skipped") => {
    markBooted();
    setShowBoot(false);
    setRevealed(true);
    if (reason === "finished" && !prefersReducedMotion()) {
      setSweep((value) => value + 1);
    }
    window.requestAnimationFrame(() => {
      document.getElementById("rig-silk-title")?.focus();
    });
  }, []);

  return (
    <div className="rig rig-page">
      {showBoot && (
        <BootSequence key={bootKey} onReveal={onReveal} onComplete={onComplete} />
      )}
      <div className={revealed ? "rig-reveal is-shown" : "rig-reveal is-hidden"}>
        <Motherboard sweep={sweep} />
        <RigFooter />
      </div>
    </div>
  );
};

export default V1HomePage;
