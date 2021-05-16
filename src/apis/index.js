import axios from "axios";
import { baseURL } from "./urlsApi";

export default axios.create({
  baseURL: baseURL,
});
