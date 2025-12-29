import { PaperContainer } from "./Layout/PaperContainer";
import { HeaderSection } from "./components/HeaderSection";
import { StatsGrid } from "./components/StatsGrid";
import { InventorySection } from "./components/InventorySection/InventorySection";
import { BottomSection } from "./components/BottomSection";
import { DataPersistenceActions } from "./components/DataPersistenceActions";

function App() {
  return (
    <PaperContainer>
      <div className="sheet-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>IKKI: Mokanbo Tan</h1>
          <DataPersistenceActions />
        </div>
      </div>

      <HeaderSection />
      <StatsGrid />
      <InventorySection />
      <BottomSection />
    </PaperContainer>
  );
}

export default App;
