import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import Compass from "./Compass";
import Terrain from "./Terrain";
import Marker from "./Marker";
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
      <Terrain heightmap={heightmap} size={size} />

      <Marker
        position={{ x: 22, y: 2 }}
        elevation={3.2}
        color={settings.colors.compass.line}
        letter="S"
      />
      <Marker
        position={{ x: -24, y: -5 }}
        elevation={4.9}
        color="#fc6f50"
        letter="F"
      />
    </Canvas>
  </section>
);

export default Course;
