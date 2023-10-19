import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import Terrain from "./Terrain";
import Compass from "./Compass";
import settings from "../settings";
import * as style from "./Course.css";

type CourseProps = {
  heightmap: string;
};

const size = 100;

const Course = ({ heightmap }: CourseProps) => (
  <section className={style.course}>
    <Canvas
      gl={{
        // We remove the default tone mapping to fully control the colors
        toneMapping: NoToneMapping,
      }}
      camera={{ fov: 50, position: [75, 60, 75] }}
    >
      <OrbitControls enablePan={false} enableZoom={false} />
      <color attach="background" args={[settings.colors.background]} />

      <Compass />
      {/* <Terrain heightmap={heightmap} size={size} /> */}
    </Canvas>
  </section>
);

export default Course;
