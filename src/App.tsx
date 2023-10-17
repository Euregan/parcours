import "./App.css";
import Course from "./ui/Course";
import { themeClass } from "./theme.css";
import heightmap from "./assets/test-mountain-heightmap.png";

const App = () => (
  <main className={themeClass}>
    <Course heightmap={heightmap} />
  </main>
);

export default App;
