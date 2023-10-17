import { CatmullRomLine } from "@react-three/drei";

type Point = { x: number; y: number };

type LevelProps = {
  points: Array<Point>;
  height: number;
};

const Level = ({ points, height }: LevelProps) => (
  <CatmullRomLine
    lineWidth={3}
    color="#66676c"
    points={points.map((point) => [point.x, height, point.y])}
    closed
    // The type is wrong, segments exists, and is used to smooth the line curve
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    segments={points.length * 8}
  />
);

export default Level;
