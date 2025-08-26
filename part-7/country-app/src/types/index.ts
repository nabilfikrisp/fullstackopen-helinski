import { ChangeEvent } from "react";

export interface FieldProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface CountryData {
  name: string;
  capital: string;
  population: number;
  flag: string;
}

export interface Country {
  found: boolean;
  data?: CountryData;
}
