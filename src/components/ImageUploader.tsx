import React, { useRef } from "react";
import { useGameStore } from "../store/useGameStore";
import { processImage } from "../services/imageService";
import styles from "./bottom.module.css";

export const ImageUploader: React.FC = () => {
  const { character, updateCharacterMeta, isReadOnly } = useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await processImage(file, 500);
      updateCharacterMeta({ image: { url: base64 } });
    } catch (err) {
      console.error("Erro ao processar imagem:", err);
      alert("Erro ao processar imagem. Tente outro arquivo.");
    }
  };

  const handleBoxClick = () => {
    if (isReadOnly) return;
    fileInputRef.current?.click();
  };

  return (
    <div
      className={styles.portraitBox}
      onClick={handleBoxClick}
      style={{
        backgroundImage: character.meta.image?.url
          ? `url('${character.meta.image.url}')`
          : "none",
        cursor: isReadOnly ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={isReadOnly ? "" : "Clique para carregar imagem do personagem"}
    >
      {!isReadOnly && !character.meta.image?.url && (
        <span
          style={{
            color: "var(--ink-black)",
            opacity: 0.6,
            textAlign: "center",
            padding: "10px",
          }}
        >
          Clique para carregar retrato
        </span>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {!isReadOnly && character.meta.image?.url && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            fontSize: "10px",
            textAlign: "center",
            padding: "2px 0",
          }}
        >
          Trocar Imagem
        </div>
      )}
    </div>
  );
};
