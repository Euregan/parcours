import "./App.css";
import Course from "./ui/Course";
import heightmap from "./assets/test-mountain-heightmap.png";

function App() {
  return <Course heightmap={heightmap} />;
}

export default App;
