import { PaperContainer } from "./Layout/PaperContainer";
import { HeaderSection } from "./components/HeaderSection";
import { StatsGrid } from "./components/StatsGrid";
import { InventorySection } from "./components/InventorySection/InventorySection";
import { BottomSection } from "./components/BottomSection";

function App() {
  return (
    <PaperContainer>
      <div className="sheet-header">
        <h1>IKKI: Mokanbo Tan</h1>
      </div>

      <HeaderSection />
      <StatsGrid />
      <InventorySection />
      <BottomSection />
    </PaperContainer>
  );
}

export default App;
