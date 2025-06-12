import React from "react";
import "./css/blogpage.css";

interface BlogPost {
  id: number;
  type: "linkedin" | "text";
  embedUrl?: string;
  height?: string;
  width?: string;
  title?: string;
  content?: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    type: "linkedin",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7165799107695955968",
    height: "h-[1095px]",
    width: "w-[504px]",
  },
  {
    id: 2,
    type: "linkedin",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7175673134753230848",
    height: "h-[986px]",
    width: "w-[504px]",
  },
  {
    id: 3,
    type: "text",
    title: "Blog Update",
    content: "A detailed blog post description goes here.",
    height: "h-72",
  },
];

const BlogSection: React.FC = () => {
  return (
    <div className="blog-container">
      {posts.map((post) => (
        <div key={post.id} className={`blog-card ${post.height || "h-auto"}`}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          {post.type === "linkedin" ? (
            <iframe
              src={post.embedUrl}
              height="1095"
              width="504"
              frameBorder="0"
              allowFullScreen
              title="Embedded LinkedIn Post"
            ></iframe>
          ) : (
            <p className="text-gray-600">{post.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const JourneyPage = () => {
  return (
    <div className="blog-container">
      {posts.map((post) => (
        <div key={post.id} className={`blog-card ${post.height || "h-auto"}`}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          {post.type === "linkedin" ? (
            <iframe
              src={post.embedUrl}
              height="1095"
              width="504"
              frameBorder="0"
              allowFullScreen
              title="Embedded LinkedIn Post"
            ></iframe>
          ) : (
            <p className="text-gray-600">{post.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default JourneyPage; 