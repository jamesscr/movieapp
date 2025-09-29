import { useState, useEffect } from "react";

//creating a useFetch Hook which is a function that return a Promise
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => { 
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // the fetchFunction can be any function e.g fetchMovies, fetchMovieDetails etc..
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // this is as soon as the component loads check if autoFetch then fetchData
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  // returning all states and functions
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
