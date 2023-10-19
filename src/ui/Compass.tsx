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
  const lines = [];

  for (let i = 0; i < 90; i++) {
    const angle = (i * Math.PI) / 180 + 0.05;
    let lineColor = settings.colors.compass.line;
    let lineWidth = 3;
    let startMargin = 0;

    if (i === 30 || i === 60) {
      lineColor = settings.colors.compass.specialLine;
    }

    if (Math.abs(i % 2) === 1) {
      startMargin = 1.5;
      lineWidth = 3;
    }

    // Ajoute une ligne à l'angle actuel
    const startPoint = new Vector2(
      Math.cos(angle) * (settings.sizes.compass / 2 + margin + startMargin),
      Math.sin(angle) * (settings.sizes.compass / 2 + margin + startMargin)
    );
    const endPoint = new Vector2(
      Math.cos(angle) * (settings.sizes.compass / 2 + margin + lineWidth),
      Math.sin(angle) * (settings.sizes.compass / 2 + margin + lineWidth)
    );

    lines.push(
      <Line
        key={`line-${i}`}
        points={[startPoint, endPoint]}
        color={lineColor}
        lineWidth={lineWidth}
        rotation={[Math.PI * 0.5, 0, 0]}
      />
    );
  }

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

      {lines}

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
