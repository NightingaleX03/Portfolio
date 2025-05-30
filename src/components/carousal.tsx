import React, { useEffect } from 'react';

const Carousal: React.FC = () => {
  useEffect(() => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    if (!next || !prev || !slide) return;

    next.addEventListener('click', () => {
      const items = document.querySelectorAll('.item');
      slide.appendChild(items[0]);
    });

    prev.addEventListener('click', () => {
      const items = document.querySelectorAll('.item');
      slide.prepend(items[items.length - 1]);
    });

    return () => {
      next.removeEventListener('click', () => {});
      prev.removeEventListener('click', () => {});
    };
  }, []);

  return null;
};

export default Carousal; 