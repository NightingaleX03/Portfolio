document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left; // X position inside the card
        const y = e.clientY - cardRect.top; // Y position inside the card
  
        const centerX = cardRect.width / 2; // Center X of the card
        const centerY = cardRect.height / 2; // Center Y of the card
  
        const rotateX = -(y - centerY) / 15; // Tilt along the X-axis
        const rotateY = (x - centerX) / 15; // Tilt along the Y-axis
  
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
      });
    });
  });
  