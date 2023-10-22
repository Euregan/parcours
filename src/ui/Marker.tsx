import { Circle, Line, Sphere, Text } from "@react-three/drei";
import { BackSide, Mesh, Vector2 } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { rgb } from "color";

type MarkerProps = {
  position: { x: number; y: number };
  elevation: number;
  color: string;
  letter: string;
};

const Marker = ({ position, elevation, color, letter }: MarkerProps) => {
  const text = useRef<Mesh>();

  const length = Math.min(15, 15 - elevation);
  const radius = 1.5;

  useFrame(({ camera }) => {
    // We make the text face the camera
    text.current!.quaternion.copy(camera.quaternion);
  });

  return (
    <group position={[position.x, elevation, position.y]}>
      <Circle rotation={[Math.PI * 1.5, 0, 0]}>
        <meshBasicMaterial
          color={rgb(color).darken(0.6).desaturate(0.7).toString()}
        />
      </Circle>

      <Line
        points={[new Vector2(0, 0), new Vector2(0, length)]}
        color={color}
        lineWidth={3}
        rotation={[0, 0, 0]}
      />

      <Sphere position={[0, length + radius, 0]} args={[radius]}>
        <meshBasicMaterial color={color} side={BackSide} />
      </Sphere>

      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        fontSize={1.5}
        // We center the character manually
        position={[0, length + radius - 0.2, 0]}
        ref={text}
      >
        {letter}
      </Text>
    </group>
  );
};

export default Marker;
