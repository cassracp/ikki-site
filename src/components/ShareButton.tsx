import React, { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import ShareIcon from "@mui/icons-material/Share";
import CheckIcon from "@mui/icons-material/Check";
import { CustomTooltip } from "./CustomTooltip";

export const ShareButton: React.FC = () => {
  const { generateShareLink } = useGameStore();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const link = generateShareLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px",
    cursor: "pointer",
    backgroundColor: copied ? "#e8f5e9" : "var(--bg-paper)",
    border: "2px solid var(--ink-black)",
    fontFamily: "inherit",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    boxShadow: "2px 2px 0px var(--ink-black)",
    transition: "all 0.1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--ink-black)",
    width: "40px",
    height: "40px",
  };

  const iconStyle = { fontSize: "1.4rem" };

  return (
    <CustomTooltip title={copied ? "Link Copiado!" : "Compartilhar Ficha"}>
      <button
        onClick={handleShare}
        className="allow-read-only"
        style={buttonStyle}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translate(1px, 1px)";
          e.currentTarget.style.boxShadow = "1px 1px 0px var(--ink-black)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "2px 2px 0px var(--ink-black)";
        }}
      >
        {copied ? (
          <CheckIcon style={iconStyle} />
        ) : (
          <ShareIcon style={iconStyle} />
        )}
      </button>
    </CustomTooltip>
  );
};
