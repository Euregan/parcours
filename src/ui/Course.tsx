import Compass from "./Compass";
import Terrain from "./Terrain";
import * as style from "./Course.css";

type CourseProps = {
  heightmap: string;
};

const size = 100;

const Course = ({ heightmap }: CourseProps) => (
  <svg viewBox={`0 0 ${size} ${size}`} className={style.svg}>
    <Compass />
    <Terrain heightmap={heightmap} size={size} />
  </svg>
);

export default Course;
