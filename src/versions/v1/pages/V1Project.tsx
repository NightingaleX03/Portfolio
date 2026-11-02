import React, { useMemo, useState } from "react";
import rawProjects from "../../../projectsInfo.json";
import { newProjects, type CatalogProject } from "../data/rig";
import RigFooter from "../components/RigFooter";
import "../rig.css";
import "./css/project.css";

interface RawProject {
  title: string;
  role: string;
  description: string;
  tools: string[];
  links?: {
    github?: string;
    githubTwo?: string;
    devpost?: string;
    demo?: string;
  };
}

const TOOL_CASE: Record<string, string> = {
  python: "Python",
  css: "CSS",
  html: "HTML",
  javascritp: "JavaScript",
  typescript: "TypeScript",
  scss: "SCSS",
  flet: "Flet",
  mediapipe: "MediaPipe",
  tensorflow: "TensorFlow",
  autho: "Auth0",
};

function normalizeTool(tool: string) {
  return TOOL_CASE[tool.toLowerCase()] ?? tool;
}

function filled(url?: string): url is string {
  return Boolean(url && url.trim());
}

function normalizeRaw(project: RawProject): CatalogProject {
  return {
    title: project.title,
    role: project.role,
    description: project.description,
    tools: project.tools.map(normalizeTool),
    links: {
      github: project.links?.github,
      githubTwo: project.links?.githubTwo,
      devpost: project.links?.devpost,
      demo: project.links?.demo,
    },
  };
}

type GroupId = "compilers" | "hack" | "other";

const GROUPS: { id: GroupId; title: string }[] = [
  { id: "compilers", title: "Compilers and GPU" },
  { id: "hack", title: "Hackathons" },
  { id: "other", title: "Coursework and personal" },
];

const catalog: (CatalogProject & { group: GroupId })[] = [
  ...newProjects.map((project) => ({ ...project, group: "compilers" as const })),
  ...(rawProjects as RawProject[])
    .filter((project) => project.title !== "React Portfolio")
    .map(normalizeRaw)
    .map((project) => ({
      ...project,
      group: filled(project.links.devpost) ? ("hack" as const) : ("other" as const),
    })),
];

const sharedTools = (() => {
  const counts = new Map<string, number>();
  catalog.forEach((project) => {
    new Set(project.tools).forEach((tool) => {
      counts.set(tool, (counts.get(tool) ?? 0) + 1);
    });
  });
  return Array.from(counts.entries())
    .filter(([, count]) => count >= 2)
    .map(([tool]) => tool)
    .sort((a, b) => a.localeCompare(b));
})();

const V1Project: React.FC = () => {
  const [query, setQuery] = useState("");
  const [tools, setTools] = useState<string[]>([]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((project) => {
      const matchesQuery =
        needle.length === 0 ||
        project.title.toLowerCase().includes(needle) ||
        project.description.toLowerCase().includes(needle) ||
        project.tools.some((tool) => tool.toLowerCase().includes(needle));
      const matchesTool =
        tools.length === 0 || project.tools.some((tool) => tools.includes(tool));
      return matchesQuery && matchesTool;
    });
  }, [query, tools]);

  const toggleTool = (tool: string) => {
    setTools((current) =>
      current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool]
    );
  };

  const clear = () => {
    setQuery("");
    setTools([]);
  };

  const quoted = query.trim() || tools.join(", ");

  return (
    <div className="rig rig-page">
      <div className="rig-devices">
        <h1>Device manager</h1>
        <p className="rig-lead">
          Search by name, description, or tool. Tool buttons keep the ones shared by at least two projects.
        </p>
        <label className="rig-search" htmlFor="device-search">
          Search
          <input
            id="device-search"
            value={query}
            placeholder="Try LLVM, React or Python"
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="rig-filters">
          <button
            type="button"
            className="rig-toggle"
            aria-pressed={tools.length === 0}
            onClick={() => setTools([])}
          >
            All tools
          </button>
          {sharedTools.map((tool) => (
            <button
              key={tool}
              type="button"
              className="rig-toggle"
              aria-pressed={tools.includes(tool)}
              onClick={() => toggleTool(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
        {visible.length === 0 ? (
          <div className="rig-empty">
            <p>No devices match "{quoted}"</p>
            <button type="button" className="rig-toggle" onClick={clear}>
              Clear filters
            </button>
          </div>
        ) : (
          GROUPS.map((group) => {
            const rows = visible.filter((project) => project.group === group.id);
            if (rows.length === 0) return null;
            return (
              <section key={group.id} className="rig-group">
                <h2>
                  {group.title} <span className="rig-count">{rows.length}</span>
                </h2>
                {rows.map((project) => (
                  <details
                    key={project.title}
                    className={`rig-device${project.inProgress ? " is-progress" : ""}`}
                  >
                    <summary>
                      <span className="rig-device-led" aria-hidden="true" />
                      <span className="rig-device-name">{project.title}</span>
                      <span className="rig-device-role">{project.role}</span>
                    </summary>
                    <div className="rig-device-body">
                      <p>{project.description}</p>
                      {project.tools.length > 0 && (
                        <div className="rig-chip-row">
                          {project.tools.map((tool) => (
                            <span key={tool} className="rig-chip">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                      {(filled(project.links.github) ||
                        filled(project.links.githubTwo) ||
                        filled(project.links.devpost) ||
                        filled(project.links.demo)) && (
                        <div className="rig-link-row">
                          {filled(project.links.github) && (
                            <a className="rig-link" href={project.links.github} target="_blank" rel="noreferrer noopener">
                              Code
                            </a>
                          )}
                          {filled(project.links.githubTwo) && (
                            <a className="rig-link" href={project.links.githubTwo} target="_blank" rel="noreferrer noopener">
                              More code
                            </a>
                          )}
                          {filled(project.links.devpost) && (
                            <a className="rig-link" href={project.links.devpost} target="_blank" rel="noreferrer noopener">
                              Devpost
                            </a>
                          )}
                          {filled(project.links.demo) && (
                            <a className="rig-link" href={project.links.demo} target="_blank" rel="noreferrer noopener">
                              Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </section>
            );
          })
        )}
      </div>
      <RigFooter />
    </div>
  );
};

export default V1Project;
