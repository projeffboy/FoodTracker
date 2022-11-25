import axios from "axios";
import { API_KEY } from "@env";
import { capitalize } from "./utility";

const usda = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1",
  params: {
    api_key: process.env === "development" ? API_KEY : process.env.API_KEY,
  },
});

export async function searchFoods(term) {
  const dataTypes = ["Foundation, Survey (FNDDS), SR Legacy", "Branded"];

  const resArr = await Promise.all(
    dataTypes.map(dataType =>
      usda.get(`/foods/search`, {
        params: {
          query: term,
          dataType,
          pageSize: 20,
        },
      })
    )
  );
  let foods = resArr.map(res => res.data.foods).flat(foods);
  // remove duplicate names
  const foodNames = foods.map(food => food.description);
  foods = foods.filter((food, i) => foodNames.indexOf(food.description) === i);

  // turn uppercase to capitalize
  foods = foods.map(food => {
    const { description } = food;
    return {
      ...food,
      description:
        description === description.toUpperCase()
          ? capitalize(description.toLowerCase())
          : description.replace(", NFS", ""),
    };
  });

  // Too slow
  // const fdcIds = foods.slice(0, 2).map(food => food.fdcId);
  // let detailedFoods = await getFoods(fdcIds);
  // if (foods.length > 20) {
  //   const fdcIds2 = foods.slice(2, 4).map(food => food.fdcId);
  //   const moreDetailedFoods = (await getFoods(fdcIds2)).data;
  //   detailedFoods = [...detailedFoods, moreDetailedFoods];
  // }

  return foods;
}

export async function getFood(fdcId) {
  const res = await usda.get("/food/" + fdcId);
  return res.data;
}

export async function getFoods(fdcIds) {
  const res = await usda.post("/foods", { fdcIds });
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

  // Mocking
  // const res = [
  //   {
  //     name: "ICELAND SPRING, NATURAL WATER",
  //     id: "577183",
  //     default_quantity: "240.0",
  //     default_quantity_unit: "ml",
  //     confidence: 0.6567047238349915,
  //   },
  //   {
  //     name: "ICELAND SPRING, NATURAL SPRING WATER",
  //     id: "465951",
  //     default_quantity: "240.0",
  //     default_quantity_unit: "ml",
  //     confidence: 0.1544993817806244,
  //   },
  //   {
  //     name: "ICELAND PURE SPRING WATER",
  //     id: "481376",
  //     default_quantity: "240.0",
  //     default_quantity_unit: "ml",
  //     confidence: 0.0412713848054409,
  //   },
  //   {
  //     name: "FALAFET",
  //     id: "456761",
  //     default_quantity: "28.0",
  //     default_quantity_unit: "g",
  //     confidence: 0.039157405495643616,
  //   },
  //   {
  //     name: "479",
  //     id: "360784",
  //     default_quantity: "28.0",
  //     default_quantity_unit: "g",
  //     confidence: 0.013218403793871403,
  //   },
  //   {
  //     name: "PREMIUM ICELAND PURE SPRING WATER",
  //     id: "501230",
  //     default_quantity: "240.0",
  //     default_quantity_unit: "ml",
  //     confidence: 0.011414988897740841,
  //   },
  //   {
  //     name: "NOT A DESCRIPTIVE ITEM",
  //     id: "367076",
  //     default_quantity: "28.0",
  //     default_quantity_unit: "g",
  //     confidence: 0.005456462036818266,
  //   },
  //   {
  //     name: "HOOD, HALF AND HALF",
  //     id: "484460",
  //     default_quantity: "30.0",
  //     default_quantity_unit: "ml",
  //     confidence: 0.0034986690152436495,
  //   },
  //   {
  //     name: "ROSS NECTOR, ROSS",
  //     id: "1149348",
  //     default_quantity: "25.0",
  //     default_quantity_unit: "g",
  //     confidence: 0.0030467661563307047,
  //   },
  //   {
  //     name: "GRAPE",
  //     id: "381127",
  //     default_quantity: "20.0",
  //     default_quantity_unit: "g",
  //     confidence: 0.0030149484518915415,
  //   },
  // ];
  // return res;

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
