import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { CharacterSheet } from "./pages/CharacterSheet";
import { MarkdownPage } from "./pages/MarkdownPage";
import { ToolsPage } from "./pages/ToolsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="sheet" element={<CharacterSheet />} />
          <Route path="srd" element={<MarkdownPage fileName="/srd.md" />} />
          <Route path="about" element={<MarkdownPage fileName="/about.md" />} />
          <Route path="tools" element={<ToolsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
