import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rulesData from "../data/rules.json";

interface RuleItem {
  title: string;
  path: string;
  file?: string;
  children?: RuleItem[];
}

// Recursive function to find the active rule based on the current path
const findRuleByPath = (
  items: RuleItem[],
  currentPath: string,
  basePath: string = "/rules"
): RuleItem | null => {
  for (const item of items) {
    // Construct the full path for this item
    // If item.path is empty, it maps to basePath (root of rules)
    const itemFullPath = item.path ? `${basePath}/${item.path}` : basePath;

    // Remove trailing slashes for comparison
    const cleanCurrent = currentPath.replace(/\/$/, "");
    const cleanItem = itemFullPath.replace(/\/$/, "");

    if (cleanCurrent === cleanItem) {
      return item;
    }

    if (item.children) {
      const found = findRuleByPath(item.children, currentPath, itemFullPath);
      if (found) return found;
    }
  }
  return null;
};

const RulesMenuNode: React.FC<{ item: RuleItem; basePath: string }> = ({
  item,
  basePath,
}) => {
  const location = useLocation();
  const fullPath = item.path ? `${basePath}/${item.path}` : basePath;
  const hasChildren = item.children && item.children.length > 0;

  // precise check
  const isActive =
    location.pathname === fullPath || location.pathname === fullPath + "/";
  const isAncestor = location.pathname.startsWith(fullPath + "/");
  const shouldBeExpanded = isActive || isAncestor;

  // Initial state based on current path logic
  const [isExpanded, setIsExpanded] = useState(shouldBeExpanded);

  // Update expansion if path changes (e.g. user navigates deeply)
  useEffect(() => {
    if (shouldBeExpanded) {
      setIsExpanded(true);
    }
  }, [shouldBeExpanded]);

  const toggleExpand = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to={fullPath}
          end={!hasChildren && item.path === ""}
          onClick={(e) => {
            // If it acts as a folder (no file), toggle
            if (!item.file && hasChildren) {
              toggleExpand(e);
            }
            // If it has file, we let it navigate.
            // Accordion state will update via useEffect if path matches.
          }}
          style={({ isActive }) => ({
            color: isActive ? "#f0e6d2" : "#a0a0a0",
            textDecoration: "none",
            padding: "5px 10px",
            backgroundColor: isActive ? "#8a1c1c" : "transparent",
            borderRadius: "2px",
            transition: "all 0.2s",
            fontSize: "0.9rem",
            fontWeight: isActive ? "bold" : "normal",
            paddingLeft: "10px",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <span style={{ flex: 1 }}>{item.title}</span>
        </NavLink>

        {hasChildren && (
          <button
            onClick={toggleExpand}
            style={{
              background: "none",
              border: "none",
              color: "#a0a0a0",
              cursor: "pointer",
              padding: "0 10px",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div
          style={{
            marginLeft: "15px",
            borderLeft: "1px solid #4a4a4a",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {item.children!.map((child) => (
            <RulesMenuNode key={child.path} item={child} basePath={fullPath} />
          ))}
        </div>
      )}
    </div>
  );
};

export const RulesPage: React.FC = () => {
  const location = useLocation();
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentRule = findRuleByPath(rulesData, location.pathname);

    if (!currentRule || !currentRule.file) {
      if (currentRule && !currentRule.file && currentRule.children) {
        // Is a category folder, render sub-index
        const childLinks = currentRule.children
          .map((child) => {
            // construct child url. currentRule is found, so we know its structure match.
            // We can rebuild path or just grab from current location + child path
            // Safer to use what was found.
            // But findRuleByPath returns the item generic.
            // We can infer path from location.pathname if it matches currentRule
            // Or safer: just append child.path if current rule path ends with slash?

            // Actually, we don't have the full path string in `currentRule` object returned by findRuleByPath
            // We just have the object from JSON.
            // However, we know `location.pathname` IS the path to `currentRule`.

            const cleanLoc = location.pathname.replace(/\/$/, "");
            const childUrl = `${cleanLoc}/${child.path}`;
            return `- [**${child.title}**](${childUrl})`;
          })
          .join("\n");

        setMarkdown(
          `# ${currentRule.title}\n\nSelecione um tópico abaixo:\n\n${childLinks}`
        );
        setLoading(false);
        return;
      }

      if (location.pathname === "/rules" || location.pathname === "/rules/") {
        setMarkdown("");
        setLoading(false);
        return;
      } else {
        setMarkdown(
          "# Página não encontrada\n\nA seção que você procura não existe ou está em construção."
        );
        setLoading(false);
        return;
      }
    }

    // Double check if we fell through
    if (currentRule && currentRule.file) {
      setLoading(true);
      fetch(currentRule.file)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load file");
          return res.text();
        })
        .then((text) => {
          const processedText = text.replace(
            /´([\s\S]*?)´/g,
            "\n```note\n$1\n```\n"
          );
          setMarkdown(processedText);
          setLoading(false);
        })
        .catch((err) => {
          console.error(`Error loading ${currentRule.file}:`, err);
          setMarkdown(
            "# Erro ao carregar conteúdo.\n\nNão foi possível carregar o arquivo solicitado."
          );
          setLoading(false);
        });
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
        minHeight: "80vh",
        alignItems: !markdown && !loading ? "center" : "flex-start",
        justifyContent: !markdown && !loading ? "center" : "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "15px",
          backgroundColor: "#1a1a1a",
          borderRadius: "4px",
          border: "1px solid #4a4a4a",
          flex: "1 0 220px",
          maxWidth: "300px",
          position: "sticky",
          top: "20px",
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
        }}
      >
        <span
          style={{
            color: "#8a1c1c",
            fontWeight: "bold",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #4a4a4a",
            marginBottom: "5px",
          }}
        >
          REGRAS
        </span>
        {rulesData.map((item) => (
          <RulesMenuNode key={item.path} item={item} basePath="/rules" />
        ))}
      </div>

      <div
        style={{
          display: !markdown && !loading ? "none" : undefined,
          flex: "1 1 400px",
          minWidth: "0", // Prevent overflow in flex items
          padding: "40px",
          backgroundColor: "#f0e6d2",
          color: "#1a1a1a",
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Carregando...
          </div>
        ) : (
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  if (match && match[1] === "note") {
                    return (
                      <div className="rpg-note">
                        <ReactMarkdown>{String(children)}</ReactMarkdown>
                      </div>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                a: ({ node, href, children, ...props }) => {
                  const isInternalRule = href?.startsWith("/rules/");
                  const isAnchor = href?.startsWith("#");

                  if (isAnchor) {
                    const handleClick = (
                      e: React.MouseEvent<HTMLAnchorElement>
                    ) => {
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
                    };
                    return (
                      <a
                        href={href}
                        onClick={handleClick}
                        style={{
                          color: "var(--blood-red)",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  }

                  return (
                    <a
                      href={href}
                      {...props}
                      target={
                        !isAnchor && !isInternalRule ? "_blank" : undefined
                      }
                      rel={
                        !isAnchor && !isInternalRule
                          ? "noopener noreferrer"
                          : undefined
                      }
                      style={{
                        color: "var(--blood-red)",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {children}
                    </a>
                  );
                },
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
                    />
                  </div>
                ),
                table: ({ children }) => (
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                        backgroundColor: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      border: "1px solid #8b0000",
                      padding: "8px",
                      backgroundColor: "rgba(139, 0, 0, 0.1)",
                      color: "#8b0000",
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td style={{ border: "1px solid #d4c5a9", padding: "8px" }}>
                    {children}
                  </td>
                ),
                blockquote: ({ ...props }) => (
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
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
