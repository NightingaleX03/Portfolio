import React, { useRef } from "react";
import backgrounddd from "../images/keyprojectbackground.png";
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
                <div class="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
                    <div class="content">
                        <div class="name">Nomore404 App</div>
                        <div class="des">
                            <h3><span>Role: Full Stack Developer and AI Integration</span></h3>
                            <br></br>
                            <p>
                                <ul>
                                    <li>AI powered platform built with Streamlit, PostgreSQL, and Cohere AI provides an algorithm analysis solution for Job Search</li>
                                    <li>Developed community features, tackled API challenges and worked with python, css, and GenAI</li>
                                </ul>
                            </p>
                        </div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
                    <div class="content">
                        <div class="name">NoteEase App</div>
                        <div class="des"><h3><span>Role: Full Stack Developer</span></h3>
                        <br></br>
                            <p>
                                <ul>
                                    <li>AI driven note taking application utilizing Google Cloud Speech-To-Text API and TensorFlow to generate real-time transcription, creating an immersive note taking experience through hand gestures formatting.</li>
                                    <li>Implemented Google Gemini to improve transcription accuracy and collaborated with team using MERN Stack</li>
                                </ul>
                            </p>
                        </div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
                    <div class="content">
                        <div class="name">RentEase App</div>
                        <div class="des"><h3><span>Role: Backend Developer</span></h3>
                        <br></br>
                            <p>
                                <ul>
                                    <li>Full-stack application using Python and MERN stack to facilitate smooth interactions between homeowners homebuyers</li>
                                    <li>Integrated AI-powered lawyer on custom database assisting contract generation using HTML to PDF API</li>
                                </ul>
                            </p>
                        </div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
                    <div class="content">
                        <div class="name">3udoku-shuffle</div>
                        <div class="des"><h3><span>Role: Web Developer</span></h3>
                        <br></br>
                            <p>
                                <ul>
                                    <li>Developed front-end based website for game dev startup team size of 3 using HTML, CSS, and JavaScript</li>
                                </ul>
                            </p>
                        </div>
                        <button>See More</button>
                    </div>
                </div>
                <div class="item" style={{ backgroundImage: `url(${backgrounddd})` }}>
                    <div class="content">
                        <div class="name">Mealer: Food Delivery App</div>
                        <div class="des"><h3><span>Role: Front-End Developer and Database Developer</span></h3>
                        <br></br>
                            <p>
                                <ul>
                                    <li>Developed food delivery app Android Studio using Java, for seamless user experience for restaurant owners/customers</li>
                                    <li>Integrated Google Maps API to allow users to view nearby restaurants and explore available options in their area.</li>
                                </ul>
                            </p>
                        </div>
                        <button>See More</button>
                    </div>
                </div>
    
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