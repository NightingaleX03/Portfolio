import React, { useEffect, useRef, useState } from "react";
import "./css/blogpage.css";
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
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

// Helper to generate a playful looping SVG path that circles each event card
function generateTimelinePath(events: TimelineEvent[], width: number, startY: number, gapY: number, loopRadius: number, cardWidth: number, cardHeight: number) {
  if (events.length === 0) return { path: "", endY: startY };
  let path = `M ${width / 2} ${startY}`;
  let currentX = width / 2;
  let currentY = startY;
  for (let i = 0; i < events.length; i++) {
    const isLeft = i % 2 === 0;
    const eventX = isLeft ? width * 0.15 : width * 0.6;
    const eventY = startY + (i + 1) * gapY;
    // Approach the card
    path += ` Q ${currentX} ${currentY + gapY / 2}, ${eventX} ${eventY - cardHeight / 2 - loopRadius}`;
    // Loop around the card (circle)
    const loopCenterX = eventX + (isLeft ? -cardWidth / 2 - loopRadius : cardWidth / 2 + loopRadius);
    const loopCenterY = eventY;
    // Move to loop start
    path += ` Q ${eventX} ${eventY - cardHeight / 2 - loopRadius}, ${loopCenterX} ${loopCenterY - loopRadius}`;
    // Draw the loop (circle arc)
    path += ` a ${loopRadius} ${loopRadius} 0 1 1 0 ${loopRadius * 2}`;
    path += ` a ${loopRadius} ${loopRadius} 0 1 1 0 -${loopRadius * 2}`;
    // Cross to the other side, below the card
    const nextX = !isLeft ? width * 0.15 : width * 0.6;
    const crossY = eventY + cardHeight / 2 + loopRadius;
    path += ` Q ${eventX} ${crossY}, ${nextX} ${eventY + gapY / 2}`;
    currentX = nextX;
    currentY = eventY + gapY / 2;
  }
  // End at center bottom (bottom of the timeline line)
  const endY = currentY + gapY;
  path += ` Q ${currentX} ${currentY + gapY / 2}, ${width / 2} ${endY}`;
  return { path, endY };
}

const TIMELINE_START_Y = 60;
const TIMELINE_GAP_Y = 220;
const LOOP_RADIUS = 36;
const CARD_WIDTH = 440;
const CARD_HEIGHT = 120;
const MAX_WIDTH = 1200;

const JourneyPage: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [timelineWidth, setTimelineWidth] = useState<number>(Math.min(Math.floor(window.innerWidth), MAX_WIDTH));
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

  // Responsive timeline width
  useEffect(() => {
    const handleResize = () => setTimelineWidth(Math.min(Math.floor(window.innerWidth), MAX_WIDTH));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP airplane animation along SVG path
  useEffect(() => {
    if (!airplaneRef.current || events.length === 0 || !document.getElementById("timelinePath")) return;
    gsap.to(airplaneRef.current, {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      motionPath: {
        path: "#timelinePath",
        align: "#timelinePath",
        autoRotate: true,
        alignOrigin: [0.7, 0.5],
      },
      ease: "power1.inOut"
    });
  }, [events, timelineWidth]);

  // GSAP fade-in for event cards
  useEffect(() => {
    if (!events.length) return;
    gsap.utils.toArray<HTMLElement>(".timeline-event").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [events]);

  // Breeze GSAP animation
  useEffect(() => {
    if (!airplaneRef.current || !breezeRef.current || events.length === 0 || !document.getElementById("timelinePath")) return;
    gsap.set(breezeRef.current, { opacity: 0.5 });
    gsap.to(breezeRef.current, {
      motionPath: {
        path: "#timelinePath",
        align: "#timelinePath",
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
        start: 0.01, // trail slightly behind
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
  }, [events, timelineWidth]);

  // Generate the dynamic path
  const { path: pathString, endY } = generateTimelinePath(events, timelineWidth, TIMELINE_START_Y, TIMELINE_GAP_Y, LOOP_RADIUS, CARD_WIDTH, CARD_HEIGHT);

  return (
    <div className="timeline-container" style={{ width: "100vw", maxWidth: MAX_WIDTH, margin: 0, paddingLeft: 24, overflowX: "hidden" }}>
      <h2 className="timeline-title">My Coding Journey</h2>
      <div className="timeline" ref={timelineRef} style={{ position: "relative", width: "100%", height: endY + 60 }}>
        {/* Dynamic SVG path for airplane to follow */}
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
        {/* Breeze element */}
        {events.length > 0 && pathString && <div ref={breezeRef} className="timeline-breeze" />}
        {/* Paper airplane tracker */}
        {events.length > 0 && pathString && <img
          src={airplane}
          alt="Paper Airplane"
          className="timeline-tracker-airplane"
          ref={airplaneRef}
          style={{ transform: "rotate(45deg)" }}
        />}
        {/* Timeline events */}
        {events.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          const eventX = isLeft ? timelineWidth * 0.15 : timelineWidth * 0.6;
          const eventY = TIMELINE_START_Y + (idx + 1) * TIMELINE_GAP_Y;
          return (
            <div
              key={event.id}
              className={`timeline-event ${isLeft ? "left" : "right"}`}
              ref={el => { eventRefs.current[idx] = el; }}
              style={{ position: "absolute", left: eventX - CARD_WIDTH / 2, top: eventY - CARD_HEIGHT / 2, width: CARD_WIDTH, height: CARD_HEIGHT }}
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