import { useState } from "react";
import Header from "./ui/Header";
import Course from "./ui/Course";
import Footer from "./ui/Footer";
import "./theme.css";
import * as style from "./App.css";

const App = () => {
  const [heightmap, setHeightmap] = useState<null | string>(null);

  return (
    <main className={style.main}>
      <Header heightmap={heightmap} onHeightmapChange={setHeightmap} />
      {heightmap && <Course heightmap={heightmap} />}
      <Footer />
    </main>
  );
};

export default App;
