import React, { useRef } from "react";
import samewise from "../images/samwise.png";
import "./keyProjects.css";

const KeyProjects = () => {
  const slideRef = useRef(null);

  const handleNext = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const handlePrev = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  return (
    <div className="container">
      <div className="slide" ref={slideRef}>
                <div class="item" style={{ backgroundImage: `url(${samewise})` }}>
                    <div class="content">
                        <div class="name">Switzerland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${samewise})` }}>
                    <div class="content">
                        <div class="name">Finland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${samewise})` }}>
                    <div class="content">
                        <div class="name">Iceland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${samewise})` }}>
                    <div class="content">
                        <div class="name">Australia</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${samewise})` }}>
                    <div class="content">
                        <div class="name">Netherland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${samewise})` }}>
                    <div class="content">
                        <div class="name">Ireland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
    
            </div>
    
            <div className="button">
                <button className="prev" onClick={handlePrev}>
                <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className="next" onClick={handleNext}>
                <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default KeyProjects;