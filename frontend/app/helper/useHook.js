import { useState } from "react";

export default function useHook(req) {
  const [result, setResult] = useState({
    res: null,
    loading: false,
    err: null,
  });

  async function fn(...args) {
    setResult({
      res: null,
      loading: true,
      err: null,
    });

    try {
      const res = await req(...args);

      setResult({
        res,
        loading: false,
        err: null,
      });
    } catch (error) {
      setResult({
        res: null,
        loading: false,
        err: error,
      });
    }
  }

  return [result, fn];
}
