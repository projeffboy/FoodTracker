import axios from "axios";
import { API_KEY } from "@env";
import { capitalize, createObj } from "./utility";

const usda = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1",
  params: {
    api_key: process.env === "development" ? API_KEY : process.env.API_KEY,
  },
});

export async function searchFoods(term, size = 20) {
  // Make two requests and join both responses
  const dataTypes = ["Foundation, Survey (FNDDS), SR Legacy", "Branded"];
  const resArr = await Promise.all(
    dataTypes.map(dataType =>
      usda.get(`/foods/search`, {
        params: {
          query: term,
          dataType,
          pageSize: size,
        },
      })
    )
  );
  let foods = resArr.map(res => res.data.foods).flat();

  // remove duplicate names
  const foodNames = foods.map(food => food.description);
  foods = foods.filter((food, i) => foodNames.indexOf(food.description) === i);

  // modify it to suit the needs of FoodList
  foods = foods.map(searchFoodsConformToSchema);

  return foods;
}

function searchFoodsConformToSchema({
  description,
  fdcId,
  foodNutrients,
  foodMeasures = [],
  servingSize,
  servingSizeUnit,
  finalFoodInputFoods,
}) {
  // put the less desirable serving sizes at the end
  const servingSizes = foodMeasures.map(
    ({ disseminationText, gramWeight }) => ({
      text: disseminationText,
      gramWeight,
    })
  );
  servingSizes.sort(servingSize1 =>
    ["quantity not specified", "1 serving"].includes(
      servingSize1.text.toLowerCase()
    )
      ? 1
      : -1
  );
  if (servingSizes.length === 0) {
    servingSizes[0] = {
      text: servingSize + servingSizeUnit,
    };
  }
  const defaultServingSize =
    servingSizes?.[0]?.text || servingSizes?.[0]?.gramWeight;

  // we only want the nutrient value -- number and unit
  const mapping = {
    "Total lipid (fat)": "Total Fat",
    "Fatty acids, total saturated": "Saturated Fat",
    "Fatty acids, total trans": "Trans Fat",
    Cholesterol: "Cholesterol",
    "Sodium, Na": "Sodium",
    "Carbohydrate, by difference": "Total Carbohydrates",
    "Fiber, total dietary": "Fiber",
    "Sugars, total including NLEA": "Total Sugars",
    Protein: "Protein",
    "Vitamin D (D2 + D3)": "Vitamin D",
    "Calcium, Ca": "Calcium",
    "Iron, Fe": "Iron",
    "Potassium, K": "Potassium",
  };
  const nutrientNames = foodNutrients.map(
    ({ nutrientName }) =>
      mapping[nutrientName] || substrMapping(nutrientName) || nutrientName
  );
  const nutrientValues = foodNutrients.map(nutrient => [
    nutrient.value,
    nutrient.unitName.toLowerCase(),
  ]);
  const nutrients = createObj(nutrientNames, nutrientValues);

  // ingredients
  const ingredients = finalFoodInputFoods.map(
    ({ foodDescription, value, unit, gramWeight }) => ({
      food: foodDescription,
      num: value,
      unit,
      grams: gramWeight,
    })
  );

  // valid schema for the frontend
  return {
    id: fdcId,
    food:
      description === description.toUpperCase()
        ? capitalize(description.toLowerCase())
        : description.replace(", NFS", ""),
    optional: {
      nutrients,
      defaultServingSize,
      servingSizes,
      ingredients,
    },
  };
}

function substrMapping(nutrientName) {
  if (nutrientName.toLowerCase().includes("energy")) {
    return "Energy";
  }
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
