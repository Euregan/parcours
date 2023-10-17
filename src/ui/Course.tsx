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
    camera={{ fov: 50, position: [-75, 60, -75] }}
  >
    <OrbitControls enablePan={false} enableZoom={false} />
    <color attach="background" args={["#1c1c1e"]} />

    <Compass />
    <Terrain heightmap={heightmap} size={size} />
  </Canvas>
);

export default Course;
