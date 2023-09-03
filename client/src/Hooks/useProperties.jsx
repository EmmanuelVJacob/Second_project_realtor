import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/Api";

const useProperties = () => {
  const { data, isError, isLoading, reFetch } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isError,
    isLoading,
    reFetch,
  };
};

export default useProperties;
