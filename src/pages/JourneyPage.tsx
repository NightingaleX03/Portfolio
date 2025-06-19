import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "./css/blogpage.css";
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import airplane from "../images/paper-airplane.png";

interface TimelineLink {
  type: "github" | "linkedin" | "devpost" | string;
  url: string;
}

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
  links?: TimelineLink[];
  image?: string;
}

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ICONS: Record<string, JSX.Element> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  devpost: <FaDev />,
};

const TIMELINE_START_Y = 60;
const TIMELINE_GAP_Y = 260;
const LOOP_RADIUS = 64;
const CARD_WIDTH = 440;
const CARD_HEIGHT = 120;
const MAX_WIDTH = 1200;

const JourneyPage: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [timelineWidth, setTimelineWidth] = useState<number>(Math.min(Math.floor(window.innerWidth), MAX_WIDTH));
  const [cardPositions, setCardPositions] = useState<{ x: number, y: number, width: number, height: number }[]>([]);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const airplaneRef = useRef<HTMLImageElement>(null);
  const breezeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("../data/journeyEvents.json").then((module) => {
      const timelineEvents = module.default;
      const sorted = [...timelineEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEvents(sorted);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setTimelineWidth(Math.min(Math.floor(window.innerWidth), MAX_WIDTH));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!events.length) return;
    const positions = eventRefs.current.map((ref) => {
      if (!ref) return { x: 0, y: 0, width: 0, height: 0 };
      const rect = ref.getBoundingClientRect();
      const parentRect = timelineRef.current?.getBoundingClientRect();
      return {
        x: rect.left - (parentRect?.left || 0) + rect.width / 2,
        y: rect.top - (parentRect?.top || 0) + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    });
    setCardPositions(positions);
  }, [events, timelineWidth]);

  function generateLoopingPath(cardPositions: { x: number, y: number, width: number, height: number }[], width: number, startY: number, loopRadius: number) {
    if (!cardPositions.length) return { path: "", endY: startY };
    const minX = 32;
    const maxX = width - 32;
    let path = `M ${width / 2} ${startY}`;
    let currentX = width / 2;
    let currentY = startY;
    for (let i = 0; i < cardPositions.length; i++) {
      const { x, y, width: cardW, height: cardH } = cardPositions[i];
      let approachX = x + (i % 2 === 0 ? -cardW / 2 - loopRadius : cardW / 2 + loopRadius);
      approachX = Math.max(minX, Math.min(maxX, approachX));
      const approachY = y - cardH / 2 - loopRadius;
      path += ` Q ${currentX} ${(currentY + approachY) / 2}, ${approachX} ${approachY}`;
      const loopCenterX = Math.max(minX, Math.min(maxX, x));
      const loopCenterY = y;
      path += ` Q ${approachX} ${approachY}, ${loopCenterX} ${loopCenterY - cardH / 2 - loopRadius}`;
      path += ` a ${loopRadius} ${loopRadius} 0 1 1 0 ${loopRadius * 2}`;
      path += ` a ${loopRadius} ${loopRadius} 0 1 1 0 -${loopRadius * 2}`;
      const centerX = width / 2;
      const centerY = y + cardH / 2 + loopRadius;
      path += ` Q ${loopCenterX} ${loopCenterY + cardH / 2 + loopRadius}, ${centerX} ${centerY}`;
      currentX = centerX;
      currentY = centerY;
    }
    const endY = currentY + 120;
    path += ` Q ${currentX} ${(currentY + endY) / 2}, ${width / 2} ${endY}`;
    return { path, endY };
  }

  const { path: pathString, endY } = generateLoopingPath(cardPositions, timelineWidth, TIMELINE_START_Y, LOOP_RADIUS);

  // Single useEffect to handle all animations
  useEffect(() => {
    if (!events.length) return;

    // Kill all existing ScrollTriggers and animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf(".timeline-event");
    gsap.killTweensOf(".timeline-title");
    gsap.killTweensOf(".timeline-description");
    gsap.killTweensOf(airplaneRef.current);
    gsap.killTweensOf(breezeRef.current);
    gsap.killTweensOf("#timelinePath");

    // Only run initial animations if they haven't run yet
    if (!hasAnimated) {
      // Create a timeline for better control
      const tl = gsap.timeline();

      // Initial animation for title and description
      const title = document.querySelector('.timeline-title');
      const description = document.querySelector('.timeline-description');
      
      if (title) {
        gsap.set(title, { opacity: 0, y: -30 });
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      }
      
      if (description) {
        gsap.set(description, { opacity: 0, y: -20 });
        tl.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out"
        }, "-=0.6");
      }

      // Animate the timeline path drawing in
      const timelinePath = document.getElementById("timelinePath");
      if (timelinePath) {
        gsap.set(timelinePath, { strokeDasharray: "0 8" });
        tl.to(timelinePath, {
          strokeDasharray: "8 8",
          duration: 2,
          ease: "power2.out"
        }, "-=0.4");
      }

      // Animate in the airplane and breeze
      if (airplaneRef.current && breezeRef.current) {
        gsap.set(airplaneRef.current, { opacity: 0, scale: 0.5 });
        gsap.set(breezeRef.current, { opacity: 0, scale: 0.5 });
        
        tl.to([airplaneRef.current, breezeRef.current], {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)"
        }, "-=1.5");
      }
      
      // Initial animation for timeline events
      gsap.utils.toArray<HTMLElement>(".timeline-event").forEach((el, index) => {
        gsap.set(el, { opacity: 0, y: 60 });
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.7");
      });

      setHasAnimated(true);
    } else {
      // If animations have already run, just make sure elements are visible
      gsap.set(".timeline-title", { opacity: 1, y: 0 });
      gsap.set(".timeline-description", { opacity: 1, y: 0 });
      gsap.set(".timeline-event", { opacity: 1, y: 0 });
      gsap.set(airplaneRef.current, { opacity: 1, scale: 1 });
      gsap.set(breezeRef.current, { opacity: 1, scale: 1 });
      gsap.set("#timelinePath", { strokeDasharray: "8 8" });
    }

    // Set up scroll-triggered animations after initial animations
    setTimeout(() => {
      // Scroll-triggered animations for timeline events
      gsap.utils.toArray<HTMLElement>(".timeline-event").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Scroll-triggered animations for airplane and breeze
      if (airplaneRef.current && breezeRef.current && document.getElementById("timelinePath")) {
        gsap.set(breezeRef.current, { opacity: 0.5 });
        gsap.to(breezeRef.current, {
          motionPath: {
            path: "#timelinePath",
            align: "#timelinePath",
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: 0.01,
            end: 0.92,
          },
          scrollTrigger: {
            trigger: ".timeline",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
          opacity: 0.2,
          ease: "power1.inOut"
        });

        gsap.to(airplaneRef.current, {
          motionPath: {
            path: "#timelinePath",
            align: "#timelinePath",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
          scrollTrigger: {
            trigger: ".timeline",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
          ease: "none"
        });
      }
    }, hasAnimated ? 0 : 2000); // No delay if animations have already run

  }, [events, timelineWidth, hasAnimated]);

  // Cleanup function to kill all ScrollTriggers when component unmounts
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      setHasAnimated(false); // Reset animation state when component unmounts
    };
  }, []);

  return (
    <div className="timeline-container" style={{ width: "100vw", maxWidth: MAX_WIDTH, margin: 0, paddingLeft: 24, overflowX: "hidden" }}>
      <h2 className="timeline-title">My Coding Journey</h2>
      <p className="timeline-description" style={{
        maxWidth: "800px",
        margin: "0 auto 40px",
        textAlign: "center",
        lineHeight: "1.6",
        color: "#666",
        fontSize: "1.1rem"
      }}>
        Follow my journey through the world of software development, from my first lines of code to my latest projects.
        Each milestone represents a significant step in my growth as a developer, showcasing the challenges I've overcome
        and the skills I've acquired along the way. The paper airplane symbolizes my continuous learning and exploration
        in this ever-evolving field.
      </p>
      <div className="timeline" ref={timelineRef} style={{ position: "relative", width: "100%", height: endY + 60 }}>
        <svg width={timelineWidth} height={endY + 60} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 1 }}>
          <path
            id="timelinePath"
            d={pathString}
            fill="none"
            stroke="#ce686b"
            strokeWidth="4"
            strokeDasharray="8 8"
            strokeOpacity="0.08"
          />
        </svg>

        {/* Paper Airplane */}
        {events.length > 0 && pathString && (
          <img
            ref={airplaneRef}
            src={airplane}
            alt="Paper airplane"
            className="timeline-airplane"
            style={{
              position: "absolute",
              width: 100,
              top: 0,
              left: 0,   // Increase this value
              height: 100,
              zIndex: 2,
              pointerEvents: "none"
            }}
          />
        )}

        {/* Breeze trail */}
        {events.length > 0 && pathString && <div ref={breezeRef} className="timeline-breeze" />}

        {/* Event Cards */}
        {events.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={event.id}
              className={`timeline-event ${isLeft ? "left" : "right"}`}
              ref={el => { eventRefs.current[idx] = el; }}
            >
              <div className="timeline-content">
                {event.image && (
                  <img src={event.image} alt="event" className="timeline-event-image" style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
                )}
                <h3>{event.title}</h3>
                <span className="timeline-date">{event.date}</span>
                <p>{event.description}</p>
                <div className="timeline-tags">
                  {event.tags.map((tag, i) => (
                    <span className="timeline-tag" key={i}>{tag}</span>
                  ))}
                </div>
                {event.links && (
                  <div className="timeline-links">
                    {event.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-link-icon"
                        title={link.type}
                      >
                        {ICONS[link.type] || <span>{link.type[0].toUpperCase()}</span>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="timeline-line" />
      </div>
    </div>
  );
};

export default JourneyPage;