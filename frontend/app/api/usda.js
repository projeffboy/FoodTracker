import axios from "axios";
import { API_KEY } from "@env";

export default axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1/foods",
  params: {
    api_key: process.env === "development" ? API_KEY : process.env.API_KEY,
  },
});
