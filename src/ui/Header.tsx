import GrandMountain from "../assets/Grand Mountain Height Map.png";
import RollingHills from "../assets/Rolling Hills Height Map.png";
import MountainRange from "../assets/Mountain Range Height Map.png";
import RuggedTerrain from "../assets/Rugged Terrain Height Map.png";
import RidgeThroughTerrain from "../assets/Ridge Through Terrain Height Map.png";
import RuggedTerrainWithRockyPeaks from "../assets/Rugged Terrain with Rocky Peaks Height Map.png";
import RockyLandAndRivers from "../assets/Rocky Land and Rivers Height Map.png";
import Selector from "./Selector";
import { useEffect } from "react";

type HeaderProps = {
  heightmap: string | null;
  onHeightmapChange: (heightmap: string) => void;
};

const Header = ({ heightmap, onHeightmapChange }: HeaderProps) => {
  useEffect(() => {
    if (!heightmap) {
      onHeightmapChange(GrandMountain);
    }
  }, [heightmap, onHeightmapChange]);

  return (
    <header>
      <Selector
        label="Terrain selection"
        selected={heightmap}
        onSelectionChange={onHeightmapChange}
        options={[
          { label: "Grand Mountain", value: GrandMountain },
          { label: "Rolling Hills", value: RollingHills },
          { label: "Mountain Range", value: MountainRange },
          { label: "Rugged Terrain", value: RuggedTerrain },
          { label: "Ridge Through Terrain", value: RidgeThroughTerrain },
          {
            label: "Rugged Terrain With Rocky Peaks",
            value: RuggedTerrainWithRockyPeaks,
          },
          { label: "Rocky Land And Rivers", value: RockyLandAndRivers },
        ]}
      />
    </header>
  );
};

export default Header;
