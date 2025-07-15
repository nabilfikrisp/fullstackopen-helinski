import axios from "axios";
import type { Person, PersonMutation } from "../types/person";

const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject: PersonMutation) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = async (id: number) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.delete(url);
  return request.then((response) => response.data);
};

const update = async (personObject: Person) => {
  const url = `${baseUrl}/${personObject.id}`;
  const request = axios.put(url, personObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
