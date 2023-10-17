import { useEffect, useState } from "react";

type TerrainProps = {
  heightmap: string;
  size: number;
};

type Point = { x: number; y: number; height: number };

const gridSize = 50;

const heightToColor = (height: number) => {
  const color = Math.floor(0xff * height)
    .toString(16)
    .padStart(2, "0");

  return `#${color}${color}${color}`;
};

const Terrain = ({ heightmap, size }: TerrainProps) => {
  const [terrain, setTerrain] = useState<Array<Point>>([]);

  useEffect(() => {
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

      const map = context.getImageData(0, 0, canvas.width, canvas.height).data;

      const points: Array<Point> = [];
      let highest = 0;
      let lowest = 255;

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const height = map[y * (canvas.width * 4) + x * 4];

          points.push({
            x: x * (size / gridSize),
            y: y * (size / gridSize),
            height,
          });

          if (x * (size / gridSize) === 46 && y * (size / gridSize) === 26) {
            console.log(
              height,
              height / 76,
              Math.floor(0xff * (height / 76)).toString(16),
              `#${Math.floor(0xff * (height / 76)).toString(16)}${Math.floor(
                0xff * (height / 76)
              ).toString(16)}${Math.floor(0xff * (height / 76)).toString(16)}`
            );
          }

          lowest = height < lowest ? height : lowest;
          highest = height > highest ? height : highest;
        }
      }

      setTerrain(
        points.map((point) => ({
          ...point,
          // We normalize the height so the lowest is 0 and the highest is 1
          height: (point.height - lowest) / highest,
        }))
      );
    };
    image.src = heightmap;
  }, [heightmap]);

  return terrain.map((point) => (
    <circle
      key={`(${point.x},${point.y})`}
      cx={point.x}
      cy={point.y}
      r={0.5}
      fill={heightToColor(point.height)}
    />
  ));
};

export default Terrain;
