export default function ({
  theme,
  onSelectChange,
  selectedRegion,
  countryValue,
  onCountrySearch,
}) {
  return (
    <div className="region-selector-wrapper">
      <div className="search-container">
        <input
          type="text"
          className={
            theme ? "search-input-light-mode" : "search-input-dark-mode"
          }
          placeholder="Search for a country..."
          value={countryValue}
          onChange={onCountrySearch}
        />
      </div>

      <select
        name="region-select"
        className={
          theme ? "region-select-light-mode" : "region-select-dark-mode"
        }
        id="region-select"
        value={selectedRegion}
        onChange={onSelectChange}
      >
        <option value="" hidden>
          Filter by region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
