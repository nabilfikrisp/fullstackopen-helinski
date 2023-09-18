import axios from "axios";
const baseUrl = "/api/blogs";
const testUrl = "http://localhost:3003/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(testUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(testUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(
    `${testUrl}/${newObject.id}`,
    newObject,
    config
  );
  return response.data;
};
const show = async (id) => {
  const response = await axios.get(`${testUrl}/${id}`);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${testUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, create, update, show, remove };
