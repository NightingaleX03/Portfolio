import React from "react";
import "./Intro.css";
import myself from "../images/myself.jpg";
import samwise from "../images/samwise2.0.png";
import "devicon/devicon.min.css";

const Intro = () => {
  return (
    <div className="intro-wrapper">
        <br></br>
      <div className="intro-container">
        <div className="card card-left">
        <img
            src={samwise}
            alt="Corner Decoration"
            className="corner-image"
        />

          <h1 className="header-card">Hello World!</h1>
          <p className="paragraph-Text">
            <br></br>👋 <i>How are you? </i><br></br>
            My name is <b><span>Sarah Mathew</span></b> and I hope you are doing well! <br></br> <br></br>
            😮 <i> What am I doing right now? </i><br></br>
            Thank you for asking! I'm a recent graduate of Computer Programming at Seneca Polytechnic
            and a current student at Ontario Tech University studying Computer
            Science. <br></br>
            I'm a passionate software developer excited to venture into the world of tech learning
            about new technologies and creating innovative solutions. <br></br> <br></br>
            <b><span>Fun Fact: </span></b>In my free time, I enjoy playing video games, stargazing, and volunteering.
          </p>
        </div>
        <div className="card card-right">
        <img
            src={samwise}
            alt="Corner Decoration"
            className="corner-image"
        />
          <img
            src={myself}
            alt="Placeholder"
            className="card-image"
          />
        </div>
      </div>

      <br></br>
      <div className="skills-container card">
      <img
            src={samwise}
            alt="Corner Decoration"
            className="corner-image"
        />

        <div className="skills-icons">
            <i className="devicon-javascript-plain colored"></i>
            <i className="devicon-react-original colored"></i>
            <i className="devicon-html5-plain colored"></i>
            <i className="devicon-css3-plain colored"></i>
            <i className="devicon-mongodb-plain colored"></i>
            <i className="devicon-cplusplus-plain colored"></i>
            <i className="devicon-mysql-plain colored"></i>
            <i className= "devicon-python-plain colored"></i>
            <i className="devicon-java-plain colored"></i>
            <i className="devicon-androidstudio-plain colored"></i>
            <i className="devicon-github-original colored"></i>
            <i className="devicon-visualstudio-plain colored"></i>
            <i className="devicon-tensorflow-original colored"></i>
            <i className="devicon-tailwindcss-original colored"></i>
            <i className="devicon-nodejs-plain colored"></i>
            <i className="devicon-express-original colored"></i>
            <i className="devicon-c-plain colored"></i>

        </div>
      </div>
    </div>
  );
};

export default Intro;
