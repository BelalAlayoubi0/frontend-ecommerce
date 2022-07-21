import axios from "axios";
import Cookies from "js-cookie";

const token = () => {
  if (Cookies.get("token")) {
    return {
      "Content-type": "Application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
  }
  return {
    "Content-type": "Application/json",
  };
};

const axiosApp = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Access-Control-Allow-Origin": "*", ...token() },
});

export default axiosApp;
