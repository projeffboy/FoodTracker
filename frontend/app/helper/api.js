import axios from "axios";
import { API_KEY } from "@env";

export async function searchFoods(term) {
  const usda = axios.create({
    baseURL: "https://api.nal.usda.gov/fdc/v1/foods",
    params: {
      api_key: process.env === "development" ? API_KEY : process.env.API_KEY,
    },
  });

  const res = await usda.get(`/search`, {
    params: {
      query: term,
      dataType: "Foundation, Survey (FNDDS), SR Legacy", // no branded ones
    },
  });

  return res.data;
}

// the heart of our app
export async function recognizeFood(uri) {
  const api = axios.create({
    baseURL: "http://172.105.16.76:5000",
  });

  const body = new FormData();
  body.append("file", {
    uri,
    name: "photo.jpg",
    type: "image/jpeg",
  });
  const res = await api.post("/image_query", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;

  // This works as well
  // const body = new FormData();
  // body.append("file", {
  //   uri,
  //   name: "photo.jpg",
  //   type: "image/jpeg",
  // });
  // const res = await fetch("http://172.105.16.76:5000/image_query", {
  //   method: "POST",
  //   headers: { "Content-Type": "multipart/form-data" },
  //   body,
  // });

  // return res.json();
}
