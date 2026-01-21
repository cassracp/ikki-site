import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { CharacterSheet } from "./pages/CharacterSheet";
import { RulesPage } from "./pages/RulesPage";
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

          <Route path="rules/*" element={<RulesPage />} />

          {/* Keep old route for backward compatibility, maybe redirect? For now just render MarkdownPage */}
          <Route path="srd" element={<RulesPage />} />

          <Route path="about" element={<MarkdownPage fileName="/about.md" />} />
          <Route path="tools" element={<ToolsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
