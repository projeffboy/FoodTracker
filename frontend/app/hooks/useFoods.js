import usda from "../api/usda";
import hookCreator from "./hookCreator";

export default function useFoods() {
  async function searchFoods(term) {
    const res = await usda.get(`/search`, {
      params: {
        query: term,
        dataType: "Foundation, Survey (FNDDS), SR Legacy", // no branded ones
      },
    });

    return res.data;
  }

  return hookCreator(searchFoods);
}
