import { CatmullRomLine, Shape } from "@react-three/drei";
import { Vector2, BackSide, Shape as BaseShape } from "three";

type Point = { x: number; y: number };

type LevelProps = {
  points: Array<Point>;
  height: number;
};

const Level = ({ points, height }: LevelProps) => {
  return (
    <group position={[0, height, 0]}>
      <CatmullRomLine
        lineWidth={3}
        color="#66676c"
        points={points.map((point) => [point.x, 0, point.y])}
        closed
        // The type is wrong, segments exists, and is used to smooth the line curve
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        segments={points.length * 8}
      />
      <Shape
        args={[
          new BaseShape(points.map((point) => new Vector2(point.x, point.y))),
        ]}
        rotation={[Math.PI * 0.5, 0, 0]}
        // Here, we cheat: We offset it slightly toward the bottom to properly display the outline
        position={[0, -0.05, 0]}
      >
        <meshBasicMaterial color="#1c1c1e" side={BackSide} />
      </Shape>
    </group>
  );
};

export default Level;
