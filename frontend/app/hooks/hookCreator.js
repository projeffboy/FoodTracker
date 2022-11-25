import { useState } from "react";

export default function hookCreator(req) {
  const [result, setResult] = useState({
    data: null,
    loading: false,
    error: null,
  });

  async function fn(...args) {
    setResult({
      data: null,
      loading: true,
      error: null,
    });

    try {
      const res = await req(...args);

      setResult({
        data: res,
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

  return [result, fn];
}
