import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './V2JourneyPage.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const V2JourneyPage: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load journey events from JSON
    import('../../../data/journeyEvents.json').then((module) => {
      const timelineEvents = module.default;
      // Sort by date, newest first
      const sorted = [...timelineEvents].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEvents(sorted);
    });
  }, []);

  useEffect(() => {
    // Animate timeline events on scroll (alternate directions)
    if (timelineRef.current && events.length > 0) {
      const eventCards = timelineRef.current.querySelectorAll('.v2-timeline-event');
      eventCards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });
    }

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [events]);

  return (
    <div className="v2-journey-page">
      <div className="v2-journey-hero">
        <div className="v2-container">
          <h1 className="v2-journey-title">My Coding Journey</h1>
          <p className="v2-journey-subtitle">
            Follow my journey through the world of software development
          </p>
        </div>
      </div>
      <div className="v2-container">
        <div ref={timelineRef} className="v2-timeline">
          {events.map((event, index) => (
            <div key={event.id} className="v2-timeline-event">
              <div className="v2-timeline-marker"></div>
              <div className="v2-timeline-content">
                <div className="v2-timeline-date">{event.date}</div>
                <h3 className="v2-timeline-title">{event.title}</h3>
                <p className="v2-timeline-description">{event.description}</p>
                <div className="v2-timeline-tags">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="v2-timeline-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2JourneyPage;

