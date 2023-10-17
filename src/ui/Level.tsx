import { CatmullRomLine, Shape } from "@react-three/drei";
import { Vector2, BackSide, Shape as BaseShape } from "three";
import settings from "../settings";

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
        color={settings.colors.level.line}
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
        <meshBasicMaterial
          color={settings.colors.level.floor}
          side={BackSide}
        />
      </Shape>
    </group>
  );
};

export default Level;
