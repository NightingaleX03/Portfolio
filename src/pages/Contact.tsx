import React, { useRef, useState } from 'react';
import './css/contact.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Footer from '../components/footer';

const SOCIALS = [
  {
    href: 'https://github.com/NightingaleX03',
    icon: <FaGithub size={28} />, label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/sarah-mathew-0a4a06204/',
    icon: <FaLinkedin size={28} />, label: 'LinkedIn',
  },
  {
    href: 'mailto:smthayil03@gmail.com',
    icon: <FaEnvelope size={28} />, label: 'Email',
  },
];

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [time, setTime] = useState<string>(new Date().toLocaleString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    if (!form.current) return;
    // Update the time field to the current timestamp on submit
    setTime(new Date().toLocaleString());
    // Set the value in the form as well
    const timeInput = form.current.querySelector('input[name="time"]') as HTMLInputElement;
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''
    ).then(
      () => {
        setStatus('Message sent!');
        form.current?.reset();
        setTime(new Date().toLocaleString());
      },
      (error: any) => {
        setStatus('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      }
    );
  };

  return (
    <div className="contact-section">
      <h1 className="contact-title">Contact Me</h1>
      <p className="contact-intro">I'd love to connect! Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out through any of the channels below.</p>
      <div className="contact-socials">
        {SOCIALS.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-link">
            {s.icon}
            <span>{s.label}</span>
          </a>
        ))}
      </div>
      <div className="contact-card">
        <form ref={form} onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required className="contact-input" />
          <input type="text" name="time" placeholder="Time" required className="contact-input" value={time} readOnly />
          <input type="text" name="message" placeholder="Your Message" required className="contact-input" />
          <input type="text" name="title" placeholder="Subject" required className="contact-input" />
          <input type="text" name="email" placeholder="Your Email" required className="contact-input" />
          <button type="submit" className="contact-submit">Send Message</button>
          {status && <div className="contact-status">{status}</div>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact; 