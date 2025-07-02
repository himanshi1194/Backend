import axios from "axios";

const API = axios.create({
  baseURL: "https://melodious-sawine-21ea88.netlify.app/api", // change if deployed
});

export default API;
