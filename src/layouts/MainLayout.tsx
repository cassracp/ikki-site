import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkStyle = (path: string) => ({
    color: isActive(path) ? "#f0e6d2" : "#a0a0a0",
    textDecoration: "none",
    padding: "10px 15px",
    borderBottom: isActive(path)
      ? "2px solid #8a1c1c"
      : "2px solid transparent",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    transition: "color 0.2s",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <nav
        style={{
          backgroundColor: "#1a1a1a",
          padding: "15px 20px",
          borderBottom: "1px solid #4a4a4a",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          zIndex: 100,
        }}
      >
        <Link to="/" style={navLinkStyle("/")}>
          Home
        </Link>
        <Link to="/sheet" style={navLinkStyle("/sheet")}>
          Ficha
        </Link>
        <Link to="/srd" style={navLinkStyle("/srd")}>
          Regras
        </Link>
        <Link to="/tools" style={navLinkStyle("/tools")}>
          Ferramentas
        </Link>
      </nav>

      <main
        style={{
          flex: 1,
          padding: "20px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#4a4a4a",
          fontSize: "0.8rem",
          marginTop: "auto",
        }}
      >
        IKKI PROTOTYPE v0.2 &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};
