import React, { useRef } from "react";
import { useGameStore } from "../store/useGameStore";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export const DataPersistenceActions: React.FC = () => {
  const { character, loadCharacter } = useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${character.meta.name || "ficha"}_ikki.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
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
    // Reset input so the same file can be picked again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 16px",
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
    gap: "8px",
  };

  const iconStyle = { fontSize: "1.2rem" };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
        marginBottom: "15px",
      }}
    >
      <button
        onClick={handleExport}
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
        <SaveIcon style={iconStyle} /> Exportar Ficha
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
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
        <UploadFileIcon style={iconStyle} /> Importar Ficha
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        style={{ display: "none" }}
      />
    </div>
  );
};
