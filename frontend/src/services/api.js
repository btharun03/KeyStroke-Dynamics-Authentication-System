import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (username, email, phone, password, keystrokeData, labelId) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    phone,
    password,
    keystrokeData,
    labelId,
  });
};

export const loginUser = async (username, password, keystrokeData) => {
  return axios.post(`${API_URL}/login`, {
    username,
    password,
    keystrokeData,
  });
};