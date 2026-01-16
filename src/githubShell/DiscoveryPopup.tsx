import React, { useState, useEffect } from 'react';
import './DiscoveryPopup.css';

interface DiscoveryPopupProps {
  onClose: () => void;
  visitCount: number | null;
}

const DiscoveryPopup: React.FC<DiscoveryPopupProps> = ({ onClose, visitCount }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // small delay for the animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  return (
    <div className={`discovery-popup-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`discovery-popup ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="discovery-popup-close" onClick={handleClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
          </svg>
        </button>
        <div className="discovery-popup-content">
          <div className="discovery-popup-emoji">:O</div>
          <h2 className="discovery-popup-title">You've discovered...</h2>
          <p className="discovery-popup-message">
            This portfolio is still under construction! 🚧
          </p>
          {visitCount !== null && (
            <p className="discovery-popup-counter">
              You're the <span className="counter-number">{visitCount}</span>
              <span className="counter-ordinal">{getOrdinalSuffix(visitCount)}</span> person to discover this!
            </p>
          )}
          {visitCount === null && (
            <p className="discovery-popup-counter">
              Loading visit count...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPopup;
