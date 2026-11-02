import React from "react";
import type { IconType } from "react-icons";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDevpost, SiLeetcode } from "react-icons/si";
import { contactLinks, type ContactLink } from "../data/rig";

const ICONS: Record<ContactLink["id"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  devpost: SiDevpost,
  leetcode: SiLeetcode,
  resume: FaFilePdf,
};

export const RigPorts: React.FC<{ labelled?: boolean; className?: string }> = ({
  labelled = false,
  className,
}) => (
  <ul className={className}>
    {contactLinks.map((link) => {
      const Icon = ICONS[link.id];
      const external = /^https?:/i.test(link.href) || link.id === "resume";
      return (
        <li key={link.id}>
          <a
            className="rig-socket"
            href={link.href}
            aria-label={link.label}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          >
            <Icon aria-hidden="true" />
            <span className="rig-socket-label">{labelled ? link.label : link.label}</span>
          </a>
        </li>
      );
    })}
  </ul>
);

const RigFooter: React.FC = () => (
  <footer className="rig-footer">
    <p>Sarah Mathew · built with React</p>
    <RigPorts className="rig-footer-ports" />
  </footer>
);

export default RigFooter;
