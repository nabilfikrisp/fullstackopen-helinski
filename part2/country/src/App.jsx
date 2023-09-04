import { useEffect, useState } from "react";
import countryApi from "./api/country.api";

function Loading() {
  return <div>Loading...</div>;
}

// eslint-disable-next-line react/prop-types
function Error({ message }) {
  return <div>{message}</div>;
}

// eslint-disable-next-line react/prop-types
function CountryDetails({ countryName }) {
  const [countryDetails, setCountryDetails] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [weather, setWeather] = useState([]);
  const [iconPath, setIconPath] = useState("");

  useEffect(() => {
    countryApi
      .show(countryName.toLowerCase())
      .then((response) => {
        setCountryDetails(response);
        console.log(response, "country response");
        return {
          lat: response.capitalInfo.latlng[0],
          lang: response.capitalInfo.latlng[1],
        };
      })
      .then(({ lat, lang }) => {
        countryApi
          .getWeather(lat, lang)
          .then((response) => {
            setWeather(response);
            setIconPath(response.weather[0].icon);
            setFetching(false);
            console.log(response, "weather response");
            // console.log(response.weather[0].icon, "icon");
          })
          .catch((error) => {
            console.log("Error: ", error);
            setFetching(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFetching(false);
      });
  }, []);

  return (
    <div>
      {fetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>
            {countryDetails.name.common} {countryDetails.flag}
          </h2>
          <p>Capital: {countryDetails.capital[0]}</p>
          <p>Area: {countryDetails.area}</p>
          <p>Population: {countryDetails.population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.keys(countryDetails.languages).map(
              (languageCode, index) => (
                <li key={index}>{countryDetails.languages[languageCode]}</li>
              )
            )}
          </ul>
          <div
            style={{
              border: "1px solid black",
              padding: "2px",
              width: "fit-content",
              maxWidth: "600px",
            }}
          >
            <img
              src={countryDetails.flags["svg"]}
              alt={countryDetails.flags["alt"]}
              style={{ width: "100%" }}
            />
          </div>
          <h2>Weather in {countryDetails.capital[0]}</h2>
          <p>Temperature: {weather.main.temp} fahrenheit</p>
          <div
            style={{
              backgroundColor: "slategray",
              padding: "2px",
              width: "fit-content",
              maxWidth: "300px",
            }}
          >
            <img
              src={countryApi.getWeatherIconSrc(iconPath, 4)}
              style={{ width: "100%" }}
            />
          </div>
          <p>Winds: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  // const [filteredCountries, setFilteredCountries] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState("");
  const [showCountries, setShowCountries] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Too much country, please specify"
  );

  useEffect(() => {
    countryApi
      .getAll()
      .then((response) => {
        setCountries(response);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFetching(false);
      });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  useEffect(() => {
    if (countriesToShow.length > 10) {
      setShowCountries(false);
      setErrorMessage("Too much country, please specify");
    } else if (countriesToShow.length === 1) {
      setShowCountries(true);
      // setCountryName(countriesToShow[0].name.common.toLowerCase());
    } else if (countriesToShow.length == 0) {
      setShowCountries(false);
      setErrorMessage("There is no such country");
    } else {
      setShowCountries(true);
    }
  }, [countriesToShow]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "fit-content",
      }}
    >
      <label htmlFor="" style={{ display: "block" }}>
        find country
      </label>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value.toLowerCase())}
        style={{ width: "200px" }}
      />
      <div>
        {fetching ? (
          <Loading />
        ) : showCountries ? (
          countriesToShow.length === 1 ? (
            <CountryDetails countryName={countriesToShow[0].name.common} />
          ) : (
            countriesToShow.map((country, idx) => (
              <div key={idx}>
                <p>
                  {country.name.common}
                  <span>
                    <button
                      onClick={() =>
                        setQuery(country.name.common.toLowerCase())
                      }
                    >
                      details
                    </button>
                  </span>
                </p>
              </div>
            ))
          )
        ) : (
          <Error message={errorMessage} />
        )}
      </div>
    </div>
  );
}

export default App;
