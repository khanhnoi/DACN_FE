import axios from "axios";
import { baseURL } from "./urlsApi";

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
