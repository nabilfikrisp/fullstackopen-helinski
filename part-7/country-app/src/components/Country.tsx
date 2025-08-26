import React from "react";
import { Country as CountryType } from "../types";

interface CountryProps {
  country: CountryType | null;
}

export const Country: React.FC<CountryProps> = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data?.name}</h3>
      <div>capital {country.data?.capital}</div>
      <div>population {country.data?.population}</div>
      <img
        src={country.data?.flag}
        height="100"
        alt={`flag of ${country.data?.name}`}
      />
    </div>
  );
};
