import { useEffect } from "react";
import { PaperContainer } from "../Layout/PaperContainer";
import { HeaderSection } from "../components/HeaderSection";
import { StatsGrid } from "../components/StatsGrid";
import { InventorySection } from "../components/InventorySection/InventorySection";
import { BottomSection } from "../components/BottomSection";
import { DataPersistenceActions } from "../components/DataPersistenceActions";
import { useGameStore } from "../store/useGameStore";
import { useSearchParams } from "react-router-dom";

export const CharacterSheet = () => {
  const { isReadOnly, loadFromShareLink } = useGameStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check both standard URL query params (handled by router) and legacy window.location for robustness
    const data = searchParams.get("data");
    if (data) {
      loadFromShareLink(data);
    }
  }, [loadFromShareLink, searchParams]);

  return (
    <PaperContainer className={isReadOnly ? "read-only" : ""}>
      <div className="sheet-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
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
};
