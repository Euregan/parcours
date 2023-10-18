import { useEffect, useState } from "react";
import { contours } from "d3";
import Level from "./Level";
import settings from "../settings";

type TerrainProps = {
  heightmap: string;
  size: number;
};

type Point = { x: number; y: number; height: number };

const gridSize = 100;
const levelCount = 30;

const Terrain = ({ heightmap, size }: TerrainProps) => {
  const [terrain, setTerrain] = useState<Array<Array<Array<Point>>> | null>(
    null
  );

  useEffect(() => {
    setTerrain(null);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    const image = new Image();
    image.onload = () => {
      canvas.width = gridSize;
      canvas.height = gridSize;
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        gridSize,
        gridSize
      );

      const map = context.getImageData(0, 0, gridSize, gridSize).data;

      let points: Array<Point> = [];
      let highest = 0;
      let lowest = 255;
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const height = map[y * (gridSize * 4) + x * 4];

          points.push({
            x: x,
            y: y,
            height,
          });

          lowest = height < lowest ? height : lowest;
          highest = height > highest ? height : highest;
        }
      }

      points = points.map((point) => ({
        ...point,
        // We normalize the height so the lowest is 0 and the highest is 1
        height: (point.height - lowest) / highest,
      }));

      const levels: Array<Array<Array<Point>>> = [];
      // We skip the first level because it would select every point anyway
      for (let minHeight = 1; minHeight <= levelCount; minHeight++) {
        const level = contours()
          .size([gridSize, gridSize])
          .contour(
            points.map(({ height }) => height),
            minHeight / levelCount
          );

        if (level.coordinates[0]) {
          console.log(level);
          levels.push(
            level.coordinates.map((level) =>
              level[0].map((position) => ({
                height: minHeight,
                x: position[0] - gridSize / 2,
                y: position[1] - gridSize / 2,
              }))
            )
          );
        }
      }

      setTerrain(levels);
    };
    image.src = heightmap;
  }, [heightmap, size]);

  if (!terrain) {
    return <></>;
  }

  return terrain
    .filter((points) => points.length > 0)
    .flatMap((levels, levelIndex) =>
      levels.map((points, pointsIndex) => (
        <Level
          key={`${heightmap}-${levelIndex}-${pointsIndex}`}
          points={points}
          height={levelIndex * 0.7 - settings.offsets.levels}
        />
      ))
    );
};

export default Terrain;
