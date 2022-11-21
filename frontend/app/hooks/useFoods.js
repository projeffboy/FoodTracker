import { useState } from "react";
import usda from "../api/usda";

export default function useFoods() {
  const [result, setResult] = useState({
    data: null,
    loading: false,
    error: null,
  });

  async function searchFoods(term) {
    setResult({
      data: null,
      loading: true,
      error: null,
    });

    //return; // to prevent unnecessary calls

    try {
      const response = await usda.get(`/search`, {
        params: {
          query: term,
          dataType: "Foundation, Survey (FNDDS), SR Legacy", // no branded ones
        },
      });

      setResult({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setResult({
        data: null,
        loading: false,
        error,
      });
    }
  }

  return [result, searchFoods];
}
