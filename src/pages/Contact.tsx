import React from 'react';
import './css/contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <h1>Contact Me</h1>
            <div className="contact-content">
                <p>Feel free to reach out to me through any of the following channels:</p>
                <div className="contact-links">
                    <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="mailto:your.email@example.com">
                        Email
                    </a>
                    <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact; 