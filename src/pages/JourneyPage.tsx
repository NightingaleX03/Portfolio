import React, { useEffect, useState } from "react";
import "./css/blogpage.css";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const JourneyPage: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    // Dynamically import the JSON file
    import("../data/journeyEvents.json").then((module) => {
      const timelineEvents = module.default;
      const sorted = [...timelineEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEvents(sorted);
    });
  }, []);

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">My Coding Journey</h2>
      <div className="timeline">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className={`timeline-event ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <span className="timeline-date">{event.date}</span>
              <p>{event.description}</p>
              <div className="timeline-tags">
                {event.tags.map((tag, i) => (
                  <span className="timeline-tag" key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="timeline-line" />
      </div>
    </div>
  );
};

export default JourneyPage; 