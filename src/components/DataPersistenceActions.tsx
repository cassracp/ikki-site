import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGameStore } from "../store/useGameStore";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ShareButton } from "./ShareButton";
import { CustomTooltip } from "./CustomTooltip";
import styles from "./actions.module.css";

export const DataPersistenceActions: React.FC = () => {
  const { character, loadCharacter, isReadOnly, generateShareLink } =
    useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  // Separate state for mounting portal to avoid hydration mismatches if SSR (though this is SPA)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${character.meta.name || "ficha"}_ikki.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    setIsFabOpen(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.meta && json.stats) {
          loadCharacter(json);
          alert("Ficha importada com sucesso!");
        } else {
          alert("Arquivo JSON inválido.");
        }
      } catch (err) {
        console.error("Erro ao importar JSON:", err);
        alert("Erro ao ler o arquivo JSON.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsFabOpen(false);
  };

  const handleShare = async () => {
    const link = generateShareLink();
    try {
      await navigator.clipboard.writeText(link);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
      // Fallback simples
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
    // Não fecha o FAB imediatamente para dar feedback visual
    setTimeout(() => setIsFabOpen(false), 500);
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px",
    cursor: "pointer",
    backgroundColor: "var(--bg-paper)",
    border: "2px solid var(--ink-black)",
    fontFamily: "inherit",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    boxShadow: "2px 2px 0px var(--ink-black)",
    transition: "transform 0.1s, box-shadow 0.1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  };

  const iconStyle = { fontSize: "1.4rem" };

  return (
    <>
      {/* Desktop Actions */}
      <div className={styles.desktopActions}>
        <ShareButton />
        {!isReadOnly && (
          <>
            <CustomTooltip title="Exportar Ficha (JSON)">
              <button
                onClick={handleExport}
                style={buttonStyle}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(1px, 1px)";
                  e.currentTarget.style.boxShadow =
                    "1px 1px 0px var(--ink-black)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "2px 2px 0px var(--ink-black)";
                }}
              >
                <SaveIcon style={iconStyle} />
              </button>
            </CustomTooltip>

            <CustomTooltip title="Importar Ficha (JSON)">
              <button
                onClick={() => fileInputRef.current?.click()}
                style={buttonStyle}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(1px, 1px)";
                  e.currentTarget.style.boxShadow =
                    "1px 1px 0px var(--ink-black)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "2px 2px 0px var(--ink-black)";
                }}
              >
                <UploadFileIcon style={iconStyle} />
              </button>
            </CustomTooltip>
          </>
        )}
      </div>

      {/* Mobile FAB - Rendered via Portal to ensure correct fixed positioning */}
      {mounted &&
        createPortal(
          <div
            className={`${styles.mobileFabContainer} ${
              isFabOpen ? styles.open : ""
            }`}
          >
            {/* Actions (Shown when open) */}
            {!isReadOnly && (
              <>
                <button
                  className={styles.fabAction}
                  onClick={() => fileInputRef.current?.click()}
                  title="Importar Ficha"
                >
                  <UploadFileIcon />
                  <span className={styles.fabLabel}>Importar</span>
                </button>
                <button
                  className={styles.fabAction}
                  onClick={handleExport}
                  title="Exportar Ficha"
                >
                  <SaveIcon />
                  <span className={styles.fabLabel}>Salvar</span>
                </button>
              </>
            )}

            <button
              className={styles.fabAction}
              onClick={handleShare}
              title="Compartilhar Link"
            >
              {shareCopied ? <CheckIcon /> : <ShareIcon />}
              <span className={styles.fabLabel}>Compartilhar</span>
            </button>

            {/* Main Toggle Button */}
            <button
              className={styles.fabButton}
              onClick={() => setIsFabOpen(!isFabOpen)}
            >
              {isFabOpen ? <CloseIcon /> : <MoreVertIcon />}
            </button>
          </div>,
          document.body
        )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        style={{ display: "none" }}
      />
    </>
  );
};
