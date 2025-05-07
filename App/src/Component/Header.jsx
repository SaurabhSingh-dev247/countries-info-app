import lightModeImg from "../assets/light-mode.png";
import darkModeImg from "../assets/dark-mode.png";

export default function Header({ handleThemeChange, theme }) {
  return (
    <header className={theme ? "header-light-mode" : "header-dark-mode"}>
      <h1>Where in the world?</h1>
      <button
        className={theme ? "button-light-mode" : "button-dark-mode"}
        onClick={handleThemeChange}
      >
        <img src={theme ? darkModeImg : lightModeImg} /> <span>{theme ? "Dark Mode" : "Light Mode"}</span>
      </button>
    </header>
  );
}
