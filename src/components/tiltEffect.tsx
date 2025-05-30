import { useEffect } from 'react';

const TiltEffect: React.FC = () => {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".card");
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
  
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
  
        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;
  
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
      });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return null;
};

export default TiltEffect; 