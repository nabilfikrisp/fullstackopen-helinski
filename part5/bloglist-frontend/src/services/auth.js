import axios from "axios";
const baseUrl = "/api/auth";
const testUrl = "http://localhost:3003/api/auth";

const login = async (params) => {
  const response = await axios.post(`${testUrl}/login`, params);
  return response.data;
};

export default { login };
