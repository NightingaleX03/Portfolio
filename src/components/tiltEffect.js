document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
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
  });
  