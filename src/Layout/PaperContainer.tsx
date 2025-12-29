import React from "react";

interface PaperContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PaperContainer: React.FC<PaperContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`dirty-paper ${className}`}
      style={{
        padding: "30px",
        maxWidth: "900px",
        width: "100%",
        margin: "20px",
      }}
    >
      <div className="paper-content">{children}</div>
    </div>
  );
};
