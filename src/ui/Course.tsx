import { OrbitControls } from "@react-three/drei";
import Compass from "./Compass";
import Terrain from "./Terrain";
import { Canvas } from "@react-three/fiber";

type CourseProps = {
  heightmap: string;
};

const size = 100;

const Course = ({ heightmap }: CourseProps) => (
  <Canvas>
    <OrbitControls />
    <color attach="background" args={["#242424"]} />

    <Compass />
    <Terrain heightmap={heightmap} size={size} />
  </Canvas>
);

export default Course;
