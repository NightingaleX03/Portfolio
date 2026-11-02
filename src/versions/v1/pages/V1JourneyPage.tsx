import React, { useMemo, useState } from "react";
import journeyEvents from "../../../data/journeyEvents.json";
import RigFooter from "../components/RigFooter";
import "../rig.css";
import "./css/blogpage.css";

interface JourneyLink {
  type: string;
  url: string;
}

interface JourneyEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
  links?: JourneyLink[];
}

const LINK_LABELS: Record<string, string> = {
  devpost: "Devpost",
  devppost: "Devpost",
  github: "GitHub",
  linkedin: "LinkedIn",
  coursera: "Certificate",
  demo: "Demo",
};

const extra: JourneyEvent = {
  id: 1001,
  date: "2026-05-01",
  title: "Started as a software developer at TiketFix",
  description:
    "Joined TiketFix to ship client-facing features on a legal client-intake platform used by 300+ law firm offices across North America.",
  tags: ["Work"],
  links: [],
};

const events: JourneyEvent[] = [...(journeyEvents as JourneyEvent[]), extra];

const V1JourneyPage: React.FC = () => {
  const [tag, setTag] = useState<string | null>(null);
  const [newestFirst, setNewestFirst] = useState(false);

  const tags = useMemo(() => {
    const names = new Set<string>();
    events.forEach((event) => event.tags.forEach((item) => names.add(item)));
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, []);

  const rows = useMemo(() => {
    const filtered = events.filter((event) => (tag ? event.tags.includes(tag) : true));
    return filtered.sort((a, b) => {
      const byDate = a.date.localeCompare(b.date);
      const directed = newestFirst ? -byDate : byDate;
      return directed === 0 ? a.id - b.id : directed;
    });
  }, [tag, newestFirst]);

  return (
    <div className="rig rig-page">
      <div className="rig-log-page">
        <h1>System log</h1>
        <p className="rig-lead">
          School, hackathons, clubs, and work since 2023. Filter by a tag, or flip the order.
        </p>
        <div className="rig-log-controls">
          <button
            type="button"
            className="rig-toggle"
            aria-pressed={tag === null}
            onClick={() => setTag(null)}
          >
            Everything
          </button>
          {tags.map((name) => (
            <button
              key={name}
              type="button"
              className="rig-toggle"
              aria-pressed={tag === name}
              onClick={() => setTag(name)}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            className="rig-toggle"
            aria-pressed={newestFirst}
            onClick={() => setNewestFirst((value) => !value)}
          >
            {newestFirst ? "Show oldest first" : "Show newest first"}
          </button>
        </div>
        <div className="rig-terminal">
          {rows.map((event) => (
            <details key={event.id} className="rig-entry">
              <summary>
                <span className="rig-entry-date">[{event.date}]</span>
                <span className="rig-entry-tag">{(event.tags[0] ?? "").toLowerCase()}</span>
                <span className="rig-entry-title">{event.title}</span>
              </summary>
              <div className="rig-entry-body">
                <p className="rig-log-body">{event.description}</p>
                {event.links && event.links.length > 0 && (
                  <div className="rig-link-row">
                    {event.links.map((link) => (
                      <a
                        key={`${event.id}-${link.type}-${link.url}`}
                        className="rig-link"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {LINK_LABELS[link.type] ?? link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
      <RigFooter />
    </div>
  );
};

export default V1JourneyPage;
