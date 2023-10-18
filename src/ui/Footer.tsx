import * as style from "./Footer.css";

const Footer = () => (
  <footer className={style.footer}>
    <span>
      {" "}
      All demo terrains come from{" "}
      <a
        href="https://www.motionforgepictures.com/height-maps/"
        target="_blank"
        rel="noreferrer"
        className={style.link}
      >
        Motion Forge Pictures
      </a>
    </span>
  </footer>
);

export default Footer;
