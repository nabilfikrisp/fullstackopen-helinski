import { useState, useEffect } from "react";
import axios from "axios";
import { Country, CountryData } from "../types";

export const useCountry = (name: string): Country | null => {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );

        if (response.data) {
          const countryData: CountryData = {
            name: response.data.name.common,
            capital: response.data.capital?.[0] || "N/A",
            population: response.data.population,
            flag: response.data.flags.png,
          };

          setCountry({ found: true, data: countryData });
        } else {
          setCountry({ found: false });
        }
      } catch (error) {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};
