import React, { useRef, useState, useEffect } from "react";
import backgrounddd from "../images/keyprojectbackground.png";
import "./keyProjects.css";

const KeyProjects: React.FC = () => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  const startAutoSlide = () => {
    // Clear any existing interval
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    
    // Set new interval - 8 seconds per slide
    autoSlideInterval.current = setInterval(() => {
      handleNext();
    }, 8000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  // Start auto-sliding when component mounts
  useEffect(() => {
    startAutoSlide();
    
    // Cleanup on unmount
    return () => {
      stopAutoSlide();
    };
  }, []);

  // Pause auto-sliding when user interacts
  const handleUserInteraction = () => {
    stopAutoSlide();
    // Resume auto-sliding after 15 seconds of no interaction
    setTimeout(startAutoSlide, 15000);
  };

  const handleNext = () => {
    if (!slideRef.current || isAnimating) return;
    setIsAnimating(true);
    handleUserInteraction();
    const items = slideRef.current.querySelectorAll(".item");
    const currentItem = items[currentIndex];
    const nextItem = items[(currentIndex + 1) % items.length];

    // First fade out current item
    currentItem.classList.remove("active");
    currentItem.classList.add("sliding-out");

    // After fade out, start sliding in next item
    setTimeout(() => {
      if (slideRef.current) {
        nextItem.classList.add("sliding-in");
        nextItem.classList.add("active");
      }
    }, 500);

    // Complete the transition
    setTimeout(() => {
      if (slideRef.current) {
        currentItem.classList.remove("sliding-out");
        nextItem.classList.remove("sliding-in");
        setIsAnimating(false);
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }
    }, 1500);
  };

  const handlePrev = () => {
    if (!slideRef.current || isAnimating) return;
    setIsAnimating(true);
    handleUserInteraction();
    const items = slideRef.current.querySelectorAll(".item");
    const currentItem = items[currentIndex];
    const prevItem = items[(currentIndex - 1 + items.length) % items.length];

    // First fade out current item
    currentItem.classList.remove("active");
    currentItem.classList.add("sliding-out");

    // After fade out, start sliding in previous item
    setTimeout(() => {
      if (slideRef.current) {
        prevItem.classList.add("sliding-in");
        prevItem.classList.add("active");
      }
    }, 500);

    // Complete the transition
    setTimeout(() => {
      if (slideRef.current) {
        currentItem.classList.remove("sliding-out");
        prevItem.classList.remove("sliding-in");
        setIsAnimating(false);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    }, 1500);
  };

  const handleTabClick = (index: number) => {
    if (!slideRef.current || isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    handleUserInteraction();
    const items = slideRef.current.querySelectorAll(".item");
    const currentItem = items[currentIndex];
    const targetItem = items[index];

    // First fade out current item
    currentItem.classList.remove("active");
    currentItem.classList.add("sliding-out");

    // After fade out, start sliding in target item
    setTimeout(() => {
      if (slideRef.current) {
        targetItem.classList.add("sliding-in");
        targetItem.classList.add("active");
      }
    }, 500);

    // Complete the transition
    setTimeout(() => {
      if (slideRef.current) {
        currentItem.classList.remove("sliding-out");
        targetItem.classList.remove("sliding-in");
        setIsAnimating(false);
        setCurrentIndex(index);
      }
    }, 1500);
  };

  useEffect(() => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll(".item");
      items.forEach((item, i) => {
        if (i === currentIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  }, [currentIndex]);

  return (
    <div className="container">
      <div className="slide" ref={slideRef}>
        <div className="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
          <div className="content">
            <div className="name">Nomore404 App</div>
            <div className="des">
              <h3><span>Role: Full Stack Developer and AI Integration</span></h3>
              <br />
              <p>
                <ul>
                  <li>AI powered platform built with Streamlit, PostgreSQL, and Cohere AI provides an algorithm analysis solution for Job Search</li>
                  <li>Developed community features, tackled API challenges and worked with python, css, and GenAI</li>
                </ul>
              </p>
            </div>
            <a href="https://github.com/gurmehakkaur/noMore404" target="_blank" rel="noopener noreferrer">
              <button>See More</button>
            </a>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
          <div className="content">
            <div className="name">NoteEase App</div>
            <div className="des">
              <h3><span>Role: Full Stack Developer</span></h3>
              <br />
              <p>
                <ul>
                  <li>AI driven note taking application utilizing Google Cloud Speech-To-Text API and TensorFlow to generate real-time transcription, creating an immersive note taking experience through hand gestures formatting.</li>
                  <li>Implemented Google Gemini to improve transcription accuracy and collaborated with team using MERN Stack</li>
                </ul>
              </p>
            </div>
            <a href="https://github.com/SharuSiv/GDSC_Hacks2024" target="_blank" rel="noopener noreferrer">
              <button>See More</button>
            </a>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
          <div className="content">
            <div className="name">RentEase App</div>
            <div className="des">
              <h3><span>Role: Backend Developer</span></h3>
              <br />
              <p>
                <ul>
                  <li>Full-stack application using Python and MERN stack to facilitate smooth interactions between homeowners homebuyers</li>
                  <li>Integrated AI-powered lawyer on custom database assisting contract generation using HTML to PDF API</li>
                </ul>
              </p>
            </div>
            <a href="https://renteasenow.netlify.app/?" target="_blank" rel="noopener noreferrer">
              <button>See More</button>
            </a>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
          <div className="content">
            <div className="name">3udoku-shuffle</div>
            <div className="des">
              <h3><span>Role: Web Developer</span></h3>
              <br />
              <p>
                <ul>
                  <li>Developed front-end based website for game dev startup team size of 3 using HTML, CSS, and JavaScript</li>
                </ul>
              </p>
            </div>
            <a href="https://github.com/NightingaleX03/3sudoku-shuffle" target="_blank" rel="noopener noreferrer">
              <button>See More</button>
            </a>
          </div>
        </div>
        <div className="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
          <div className="content">
            <div className="name">Mealer: Food Delivery App</div>
            <div className="des">
              <h3><span>Role: Front-End Developer and Database Developer</span></h3>
              <br />
              <p>
                <ul>
                  <li>Developed food delivery app Android Studio using Java, for seamless user experience for restaurant owners/customers</li>
                  <li>Integrated Google Maps API to allow users to view nearby restaurants and explore available options in their area.</li>
                </ul>
              </p>
            </div>
            <a href="https://github.com/SEG-2105-Group/Mealer" target="_blank" rel="noopener noreferrer">
              <button>See More</button>
            </a>
          </div>
        </div>
      </div>
      <div className="tab-indicators">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`tab-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
      <div className="button">
        <button className="prev" onClick={handlePrev}>
          &#8592;
        </button>
        <button className="next" onClick={handleNext}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default KeyProjects; 