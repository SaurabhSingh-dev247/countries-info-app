import { memo } from "react";

const CountryCard =  memo(function CountryCard({
  countryFlag,
  name,
  population,
  region,
  capital,
  lightTheme,
  onSelect,
}) {
  // lightTheme ? "country-card-light-mode" : "country-card-dark-mode"

  const classAdjustHeight = name === "Nepal" || name === "Belgium" ? "-nepal" : "";

  return (
    <div
      className={
        lightTheme
          ? "country-card-light-mode" + classAdjustHeight
          : "country-card-dark-mode" + classAdjustHeight
      }
      onClick={onSelect}
    >
      <div className="image-container">
        <img src={countryFlag} alt={name} />
      </div>
      <div
        className={
          lightTheme
            ? "country-details-container-light-mode"
            : "country-details-container-dark-mode"
        }
      >
        <h3>{name}</h3>
        <p>
          <span>
            <strong>Population: </strong>
            {population}
          </span>
          <span>
            <strong>Region: </strong>
            {region}
          </span>
          <span>
            <strong>Capital: </strong>
            {capital}
          </span>
        </p>
      </div>
    </div>
  );
});

export default CountryCard;
