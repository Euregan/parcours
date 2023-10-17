import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import Terrain from "./Terrain";
import Compass from "./Compass";

type CourseProps = {
  heightmap: string;
};

const size = 100;

const Course = ({ heightmap }: CourseProps) => (
  <Canvas
    onCreated={({ gl }) => {
      // We remove the default tone mapping to fully control the colors
      gl.toneMapping = NoToneMapping;
    }}
  >
    <OrbitControls />
    <color attach="background" args={["#242424"]} />

    <Compass />
    <Terrain heightmap={heightmap} size={size} />
  </Canvas>
);

export default Course;
