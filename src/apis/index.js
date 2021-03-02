import axios from "axios";

export default axios.create({
  baseURL:
    "https://easybuydut.herokuapp.com/api/user" ||
    "http://127.0.0.1:8000/api/user",
});
