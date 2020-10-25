import axios from "axios";

export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV !== 'production'
    ? "http://localhost:4000/api"
    : "http://51.75.122.116:4000/api"
  });
};
