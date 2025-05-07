import { useState, useEffect, useRef } from "react";
import "./App.css";
import sortCountryByDistance from "./SortCountry.js";
import Header from "./Component/Header.jsx";
import Input from "./Component/Input.jsx";
import CountryCard from "./Component/CountryCard.jsx";
import CountryDetails from "./Component/CountryDetails.jsx";
import Spinner from "./Component/Spinner.jsx";
import { use } from "react";

const body = document.querySelector("body");
body.classList.add("dark-mode-body");

function App() {
  const sortedCountry = useRef([]);

  const [countries, setCountries] = useState([]);
  const [pickedCountry, setPickedCountry] = useState({
    country: {},
    isPicked: false,
  });

  const [lightMode, setLightMode] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState({
    region: "",
    searchedCountry: "",
  });

  function handleCardSelect(selectedCountry) {
    setPickedCountry({
      country: { ...selectedCountry },
      isPicked: true,
    });
  }

  function handleBackSelect() {
    setPickedCountry({
      country: {},
      isPicked: false,
    });
  }

  function handleCountrySelectChange(event) {
    setFilteredCountry((prevFilter) => {
      return {
        ...prevFilter,
        region: event.target.value,
      };
    });
  }

  function handleCountrySearch(event) {
    setFilteredCountry((prevFilter) => {
      return {
        ...prevFilter,
        searchedCountry: event.target.value,
      };
    });
  }

  function changeTheme() {
    setLightMode((prevTheme) => !prevTheme);

    if (lightMode && body.classList.value === "light-mode-body") {
      body.classList.replace("light-mode-body", "dark-mode-body");
    } else if (!lightMode && body.classList.value === "dark-mode-body") {
      body.classList.replace("dark-mode-body", "light-mode-body");
    }
  }

  function getCurrentPositionAsync() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  useEffect(() => {
    async function fetchCountriesAndSort() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const apiData = await res.json();

        const countryList = apiData.map((country) => ({
          name: country.name.common,
          nativeName: country.name.official,
          population: country.population,
          region: country.region,
          subregion: country.subregion,
          capital: country.capital?.[0] || "N/A",
          topLevelDomain: country.tld?.[0] || "",
          latlng: [...country.latlng],
          currencies: country.currencies
            ? Object.values(country.currencies)
            : [],
          languages: country.languages
            ? Object.values(country.languages).map((lang) => ({ name: lang }))
            : [],
          borders: country.borders || [],
          flags: {
            svg: country.flags.svg,
          },
        }));

        const position = await getCurrentPositionAsync();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        sortedCountry.current = sortCountryByDistance(lat, lon, countryList);
        setCountries(sortedCountry.current);
      } catch (error) {
        console.error("Error fetching country data: ", error);
      }
    }

    fetchCountriesAndSort();
  }, []);

  useEffect(() => {
    const filtered = sortedCountry.current
      .filter((country) =>
        country.name
          .toLowerCase()
          .includes(filteredCountry.searchedCountry.toLowerCase())
      )
      .filter((country) =>
        filteredCountry.region
          ? country.region === filteredCountry.region
          : true
      );

    setCountries(filtered);
  }, [filteredCountry.region, filteredCountry.searchedCountry]);

  return (
    <>
      <Header handleThemeChange={changeTheme} theme={lightMode} />
      <main>
        {pickedCountry.isPicked && (
          <CountryDetails
            onBackSelect={handleBackSelect}
            country={pickedCountry.country}
            lightMode={lightMode}
          />
        )}

        {!pickedCountry.isPicked && (
          <Input
            theme={lightMode}
            selectedRegion={filteredCountry.region}
            onSelectChange={handleCountrySelectChange}
            countryValue={filteredCountry.searchedCountry}
            onCountrySearch={handleCountrySearch}
          />
        )}

        {filteredCountry.searchedCountry.trim() === "" &&
          countries.length === 0 && (
            <Spinner
              lightMode={lightMode}
              spinnerText="Waiting to display the countries..."
            />
          )}

        {filteredCountry.searchedCountry.trim() !== "" &&
          filteredCountry.region.trim() === "" &&
          countries.length === 0 && (
            <p className="no-country-para">No country found.</p>
          )}

        {filteredCountry.searchedCountry.trim() !== "" &&
          filteredCountry.region.trim() !== "" &&
          countries.length === 0 && (
            <p className="no-country-para-region">
              No country found with above name in this region.
            </p>
          )}

        {!pickedCountry.isPicked && (
          <div className="country-card-wrapper">
            {countries.map((country, countryIndex) => {
              return (
                <CountryCard
                  onSelect={() => handleCardSelect(country)}
                  lightTheme={lightMode}
                  key={countryIndex}
                  countryFlag={country["flags"].svg}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                />
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
