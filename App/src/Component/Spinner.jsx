import classes from "./Spinner.module.css"

export default function Spinner({ lightMode, spinnerText }) {
    const spinnerClass = lightMode ? "spinner-light-mode" : "spinner-dark-mode";
  return (
    <div className={classes["spinner-container"]}>
      <div className={classes[spinnerClass]}></div>
      <p className={classes.para}>
        {spinnerText}
      </p>
    </div>
  );
}
