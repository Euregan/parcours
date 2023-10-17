import { useEffect, useState } from "react";

type TerrainProps = {
  heightmap: string;
  size: number;
};

type Point = { x: number; y: number; height: number };

const gridSize = 50;
const levelCount = 25;

const heightToColor = (height: number) => {
  const color = Math.floor(0xff * height)
    .toString(16)
    .padStart(2, "0");

  return `#${color}${color}${color}`;
};

const isEdge = (
  x: number,
  y: number,
  minHeight: number,
  points: Array<Point>
) =>
  x === 0 ||
  y === 0 ||
  x === gridSize - 1 ||
  y === gridSize - 1 ||
  (x > 1 &&
    points.find((point) => point.x === x - 1 && point.y === y)!.height <
      minHeight) ||
  (x < gridSize - 2 &&
    points.find((point) => point.x === x + 1 && point.y === y)!.height <
      minHeight) ||
  (y > 1 &&
    points.find((point) => point.x === x && point.y === y - 1)!.height <
      minHeight) ||
  (y < gridSize - 2 &&
    points.find((point) => point.x === x && point.y === y + 1)!.height <
      minHeight);

const contour = (
  points: Array<Point>,
  minHeight: number,
  x: number = 0,
  y: number = 0,
  selectedPoints: Array<Point> = [],
  alreadyVisited: Array<Point> = []
): [Array<Point>, Array<Point>] => {
  // If coordinates are out of bound, we stop
  if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) {
    return [selectedPoints, alreadyVisited];
  }

  // If the current pixel has already been visited, we stop
  if (alreadyVisited.some((point) => point.x === x && point.y === y)) {
    return [selectedPoints, alreadyVisited];
  }

  const point = points.find((point) => point.x === x && point.y === y)!;
  let updatedVisited = alreadyVisited.concat([point]);

  // If the point is too low, we stop
  if (point.height < minHeight) {
    return [selectedPoints, updatedVisited];
  }

  let result = selectedPoints;

  // We only select the point if it's on the edge of the shape or of the picture
  if (isEdge(x, y, minHeight, points)) {
    result.push(point);
  }

  // Lookup in all four directions
  [result, updatedVisited] = contour(
    points,
    minHeight,
    x - 1,
    y,
    result,
    updatedVisited
  );
  [result, updatedVisited] = contour(
    points,
    minHeight,
    x + 1,
    y,
    result,
    updatedVisited
  );
  [result, updatedVisited] = contour(
    points,
    minHeight,
    x,
    y - 1,
    result,
    updatedVisited
  );
  [result, updatedVisited] = contour(
    points,
    minHeight,
    x,
    y + 1,
    result,
    updatedVisited
  );

  return [result, updatedVisited];
};

const order = (contour: Array<Point>, previous = contour[0]): Array<Point> => {
  if (contour.length <= 1) {
    return contour;
  }

  const findNext = (distance: number) => {
    let next = contour.find(
      (point) => point.x === previous.x && point.y === previous.y - distance
    );
    next =
      next ||
      contour.find(
        (point) =>
          point.x === previous.x - distance && point.y === previous.y - distance
      );
    next =
      next ||
      contour.find(
        (point) => point.x === previous.x - distance && point.y === previous.y
      );
    next =
      next ||
      contour.find(
        (point) =>
          point.x === previous.x - distance && point.y === previous.y + distance
      );
    next =
      next ||
      contour.find(
        (point) => point.x === previous.x && point.y === previous.y + distance
      );
    next =
      next ||
      contour.find(
        (point) =>
          point.x === previous.x + distance && point.y === previous.y + distance
      );
    next =
      next ||
      contour.find(
        (point) => point.x === previous.x + distance && point.y === previous.y
      );
    next =
      next ||
      contour.find(
        (point) =>
          point.x === previous.x + distance && point.y === previous.y - distance
      );

    return next;
  };

  const next = findNext(1) || findNext(2);

  if (!next) {
    return [];
  }

  return [
    previous,
    ...order(
      contour.filter(
        (point) => point.x !== previous.x || point.y !== previous.y
      ),
      next
    ),
  ];
};

const Terrain = ({ heightmap, size }: TerrainProps) => {
  const [terrain, setTerrain] = useState<Array<Array<Point>>>([]);

  const path = (contour: Array<Point>) => {
    const scale = size / gridSize;

    const orderedPoints = order(contour);

    let path = "";
    for (let i = 0; i < orderedPoints.length; i++) {
      const point = orderedPoints[i];

      if (i === 0) {
        path += `M${point.x * scale} ${point.y * scale}`;
      } else {
        path += `L${point.x * scale} ${point.y * scale}`;
      }
    }

    return `${path} Z`;
  };

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

      const levels = [];
      // We skip the first level because it would select every point anyway
      for (let minHeight = 1; minHeight <= levelCount; minHeight++) {
        levels.push(
          contour(points, minHeight / levelCount, gridSize / 2, gridSize / 2)[0]
        );
      }

      setTerrain(levels);
    };
    image.src = heightmap;
  }, [heightmap, size]);

  return terrain.map((points, index) => (
    <path
      key={index}
      d={path(points)}
      stroke="white"
      fill="transparent"
      strokeWidth={0.3}
    />
  ));
};

export default Terrain;
