export type Person = {
  id: number;
  name: string;
  number: string;
};

export type PersonMutation = Omit<Person, "id">;
