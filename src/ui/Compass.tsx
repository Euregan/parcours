import { FontData, Line, Shape, Text3D } from "@react-three/drei";
import {
  Vector2,
  BackSide,
  Shape as BaseShape,
  EllipseCurve,
  Path,
  LineCurve,
} from "three";
import settings from "../settings";
import font from "../fira.json";

const Compass = () => {
  const mask = new BaseShape([
    new Vector2(-100, -100),
    new Vector2(-100, 100),
    new Vector2(100, 100),
    new Vector2(100, -100),
  ]);
  mask.holes = [
    new Path(
      new EllipseCurve(
        0,
        0,
        settings.sizes.compass / 2,
        settings.sizes.compass / 2
      ).getPoints(100)
    ),
  ];

  const margin = 1;

  return (
    <group position={[0, 0, 0]}>
      <Line
        points={new EllipseCurve(
          0,
          0,
          settings.sizes.compass / 2,
          settings.sizes.compass / 2
        ).getPoints(100)}
        color={settings.colors.compass.line}
        lineWidth={0.3}
        rotation={[Math.PI * 0.5, 0, 0]}
      />

      <Line
        points={[
          new Vector2(
            Math.cos(Math.PI * 0.25) * (settings.sizes.compass / 2 + margin),
            Math.sin(Math.PI * 0.25) * (settings.sizes.compass / 2 + margin)
          ),
          new Vector2(
            Math.cos(Math.PI * 0.25) *
              (settings.sizes.compass / 2 + margin + 3),
            Math.sin(Math.PI * 0.25) * (settings.sizes.compass / 2 + margin + 3)
          ),
        ]}
        // color={settings.colors.compass.line}
        color="red"
        lineWidth={1}
        rotation={[Math.PI * 0.5, 0, 0]}
      />

      <Line
        points={[
          new Vector2(
            Math.cos(Math.PI * 0.33) * (settings.sizes.compass / 2 + margin),
            Math.sin(Math.PI * 0.33) * (settings.sizes.compass / 2 + margin)
          ),
          new Vector2(
            Math.cos(Math.PI * 0.33) *
              (settings.sizes.compass / 2 + margin + 3),
            Math.sin(Math.PI * 0.33) * (settings.sizes.compass / 2 + margin + 3)
          ),
        ]}
        color="orange"
        lineWidth={1}
        rotation={[Math.PI * 0.5, 0, 0]}
      />

      <Shape
        args={[mask]}
        rotation={[Math.PI * 0.5, 0, 0]}
        // Here, we cheat: We offset it slightly toward the bottom to properly display the outline
        position={[0, -0.15, 0]}
      >
        <meshBasicMaterial color={settings.colors.background} side={BackSide} />
      </Shape>

      <Text3D
        font={font as unknown as FontData}
        size={3}
        rotation={[Math.PI * 1.5, 0, Math.PI * 1.5]}
        position={[settings.sizes.compass / 2 + margin, 0, -1.5]}
      >
        N
        <meshBasicMaterial color={settings.colors.compass.text} />
      </Text3D>
      <Text3D
        font={font as unknown as FontData}
        size={3}
        rotation={[Math.PI * 1.5, 0, Math.PI]}
        position={[1.5, 0, settings.sizes.compass / 2 + margin]}
      >
        E
        <meshBasicMaterial color={settings.colors.compass.text} />
      </Text3D>
      <Text3D
        font={font as unknown as FontData}
        size={3}
        rotation={[Math.PI * 1.5, 0, Math.PI * 0.5]}
        position={[-settings.sizes.compass / 2 - margin, 0, 1.5]}
      >
        S
        <meshBasicMaterial color={settings.colors.compass.text} />
      </Text3D>
      <Text3D
        font={font as unknown as FontData}
        size={3}
        rotation={[Math.PI * 1.5, 0, Math.PI * 2]}
        position={[-1.5, 0, -settings.sizes.compass / 2 - margin]}
      >
        W
        <meshBasicMaterial color={settings.colors.compass.text} />
      </Text3D>
    </group>
  );
};

export default Compass;
