import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export const SrdPage: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    fetch("/srd.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch((err) => console.error("Erro ao carregar SRD:", err));
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f0e6d2",
        color: "#1a1a1a",
        minHeight: "80vh",
        border: "1px solid #d4c5a9",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
      }}
    >
      <div className="markdown-body" style={{ fontFamily: "serif" }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};
