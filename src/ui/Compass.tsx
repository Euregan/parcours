import { Line, Shape } from "@react-three/drei";
import {
  Vector2,
  BackSide,
  Shape as BaseShape,
  EllipseCurve,
  Path,
} from "three";
import settings from "../settings";

const Compass = () => {
  const mask = new BaseShape([
    new Vector2(-100, -100),
    new Vector2(-100, 100),
    new Vector2(100, 100),
    new Vector2(100, -100),
  ]);
  mask.holes = [new Path(new EllipseCurve(0, 0, 35, 35).getPoints(100))];

  return (
    <group position={[0, 2, 0]}>
      <Line
        worldUnits
        points={new EllipseCurve(0, 0, 35, 35).getPoints(100)}
        color={settings.compass.line}
        lineWidth={0.3}
        rotation={[Math.PI * 0.5, 0, 0]}
      />
      <Shape
        args={[mask]}
        rotation={[Math.PI * 0.5, 0, 0]}
        // Here, we cheat: We offset it slightly toward the bottom to properly display the outline
        position={[0, -0.15, 0]}
      >
        <meshBasicMaterial color={settings.background} side={BackSide} />
      </Shape>
    </group>
  );
};

export default Compass;
