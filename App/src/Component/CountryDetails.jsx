import classes from "./CountryDetails.module.css";

export default function CountryDetails({
  onBackSelect,
  country,
  lightMode,
  onBorderCountrySelect,
}) {
  const backBtnClass = lightMode
    ? "backward-btn-light-mode"
    : "backward-btn-dark-mode";

  const flagWrapperClass = lightMode
    ? "country-flag-wrapper-light-mode"
    : "country-flag-wrapper-dark-mode";

  const countryBtnClass = lightMode
    ? "border-country-btn-light-mode"
    : "border-country-btn-dark-mode";

  return (
    <section className={classes.section}>
      <aside className={classes["side-content"]}>
        <button className={classes[backBtnClass]} onClick={onBackSelect}>
          Back
        </button>

        <div className={classes[flagWrapperClass]}>
          <img
            className={classes.countryFlag}
            src={country["flags"].svg}
            alt={country.name + " flag image"}
          />
        </div>
      </aside>

      <div className={classes.countryDetails}>
        <h1 className={classes.countryName}>{country.name}</h1>

        <div className={classes["country-details-wrapper"]}>
          <ol className={classes.orderedList}>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>
                  Native Name:
                </strong>
                <span className={classes.spanText}>{country.nativeName}</span>
              </p>
            </li>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>
                  Population:
                </strong>
                <span className={classes.spanText}>{country.population}</span>
              </p>
            </li>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>Region: </strong>
                <span className={classes.spanText}>{country.region}</span>
              </p>
            </li>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>
                  Sub Region:
                </strong>
                <span className={classes.spanText}>{country.subregion}</span>
              </p>
            </li>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>Capital:</strong>
                <span className={classes.spanText}>{country.capital}</span>
              </p>
            </li>
          </ol>

          <ol className={classes.orderedList}>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>
                  Top level Domain:
                </strong>
                <span className={classes.spanText}>
                  {country.topLevelDomain}
                </span>
              </p>
            </li>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>
                  Currencies:
                </strong>
                {country.currencies.map((currency, index) => {
                  const comma =
                    index !== country.currencies.length - 1 ? ", " : "";

                  return (
                    <span className={classes.spanText} key={index}>
                      {currency.name + comma}
                    </span>
                  );
                })}
              </p>
            </li>
            <li>
              <p>
                <strong className={classes.countryDetailsText}>
                  Languages:
                </strong>
                {country.languages.map((language, index) => {
                  const comma =
                    index !== country.languages.length - 1 ? ", " : "";

                  return (
                    <span className={classes.spanText} key={index}>
                      {language.name + comma}
                    </span>
                  );
                })}
              </p>
            </li>
          </ol>
        </div>

        <p className={classes["border-countries"]}>
          {country.borders.length !== 0 && (
            <strong className={classes.borderCountryText}>
              Border countries:{" "}
              {country.borders.map((borderCountry, index) => (
                <button className={classes[countryBtnClass]} key={index}>
                  {borderCountry}
                </button>
              ))}
            </strong>
          )}

          {country.borders.length === 0 && (
            <strong className={classes.spanText}>
              This country does not share border with any other country.
            </strong>
          )}
        </p>
      </div>
    </section>
  );
}
