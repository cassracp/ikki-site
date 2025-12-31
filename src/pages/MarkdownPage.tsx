import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPageProps {
  fileName: string;
}

export const MarkdownPage: React.FC<MarkdownPageProps> = ({ fileName }) => {
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    fetch(fileName)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch((err) => console.error(`Erro ao carregar ${fileName}:`, err));
  }, [fileName]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "40px",
        backgroundColor: "#f0e6d2",
        color: "#1a1a1a",
        minHeight: "80vh",
        border: "1px solid #d4c5a9",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        borderRadius: "2px",
        position: "relative",
      }}
    >
      {/* Decorative corners */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "20px",
          height: "20px",
          borderTop: "2px solid #8b0000",
          borderLeft: "2px solid #8b0000",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "20px",
          height: "20px",
          borderTop: "2px solid #8b0000",
          borderRight: "2px solid #8b0000",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          width: "20px",
          height: "20px",
          borderBottom: "2px solid #8b0000",
          borderLeft: "2px solid #8b0000",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "20px",
          height: "20px",
          borderBottom: "2px solid #8b0000",
          borderRight: "2px solid #8b0000",
        }}
      ></div>

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, href, children, ...props }) => {
              const isAnchor = href?.startsWith("#");

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isAnchor) {
                  e.preventDefault();
                  const targetId = href?.substring(1);
                  if (targetId) {
                    const element = document.getElementById(
                      decodeURIComponent(targetId)
                    );
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", href);
                    }
                  }
                }
              };

              return (
                <a
                  {...props}
                  href={href}
                  onClick={handleClick}
                  target={!isAnchor ? "_blank" : undefined}
                  rel={!isAnchor ? "noopener noreferrer" : undefined}
                  style={{
                    color: "var(--blood-red)",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {children}
                </a>
              );
            },
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                style={{
                  borderLeft: "4px solid var(--blood-red)",
                  margin: "20px 0",
                  padding: "10px 20px",
                  backgroundColor: "rgba(138, 28, 28, 0.05)",
                  fontStyle: "italic",
                  color: "#4a4a4a",
                }}
              />
            ),
            img: ({ ...props }) => (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <img
                  {...props}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    height: "auto",
                    borderRadius: "2px",
                    border: "1px solid #1a1a1a",
                    boxShadow: "4px 4px 0 rgba(0,0,0,0.2)",
                    display: "block",
                    margin: "0 auto",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            ),
            h1: ({ children }) => {
              const childrenArray = React.Children.toArray(children);
              const textContent = childrenArray
                .map((child) => (typeof child === "string" ? child : ""))
                .join("")
                .replace("<->", "")
                .trim();

              const id = textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

              const shouldHide = childrenArray.some(
                (child) => typeof child === "string" && child.includes("<->")
              );
              const cleanChildren = childrenArray.map((child) =>
                typeof child === "string"
                  ? child.replace("<->", "").trim()
                  : child
              );

              return (
                <h1
                  id={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{cleanChildren}</span>
                  {!shouldHide && (
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--blood-red)",
                        opacity: 0.5,
                      }}
                      title="Voltar ao topo"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  )}
                </h1>
              );
            },
            h2: ({ children }) => {
              const childrenArray = React.Children.toArray(children);
              const textContent = childrenArray
                .map((child) => (typeof child === "string" ? child : ""))
                .join("")
                .replace("<->", "")
                .trim();

              const id = textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

              const shouldHide = childrenArray.some(
                (child) => typeof child === "string" && child.includes("<->")
              );
              const cleanChildren = childrenArray.map((child) =>
                typeof child === "string"
                  ? child.replace("<->", "").trim()
                  : child
              );

              return (
                <h2
                  id={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #d4c5a9",
                    paddingBottom: "5px",
                  }}
                >
                  <span>{cleanChildren}</span>
                  {!shouldHide && (
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--blood-red)",
                        opacity: 0.5,
                      }}
                      title="Voltar ao topo"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  )}
                </h2>
              );
            },
            h3: ({ children }) => {
              const childrenArray = React.Children.toArray(children);
              const textContent = childrenArray
                .map((child) => (typeof child === "string" ? child : ""))
                .join("")
                .replace("<->", "")
                .trim();

              const id = textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

              const shouldHide = childrenArray.some(
                (child) => typeof child === "string" && child.includes("<->")
              );
              const cleanChildren = childrenArray.map((child) =>
                typeof child === "string"
                  ? child.replace("<->", "").trim()
                  : child
              );

              return (
                <h3
                  id={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{cleanChildren}</span>
                  {!shouldHide && (
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--blood-red)",
                        opacity: 0.3,
                      }}
                      title="Voltar ao topo"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  )}
                </h3>
              );
            },
            h4: ({ children }) => {
              const childrenArray = React.Children.toArray(children);
              const textContent = childrenArray
                .map((child) => (typeof child === "string" ? child : ""))
                .join("")
                .replace("<->", "")
                .trim();

              const id = textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

              const shouldHide = childrenArray.some(
                (child) => typeof child === "string" && child.includes("<->")
              );
              const cleanChildren = childrenArray.map((child) =>
                typeof child === "string"
                  ? child.replace("<->", "").trim()
                  : child
              );

              return (
                <h4
                  id={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{cleanChildren}</span>
                  {!shouldHide && (
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--blood-red)",
                        opacity: 0.3,
                      }}
                      title="Voltar ao topo"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  )}
                </h4>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};
