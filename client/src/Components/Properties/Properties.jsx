import React from "react";
import useProperties from "../../Hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Cards from "../../Components/Cards/Cards";
const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  if (isError) {
    <div className="flexCenter paddings">
      <span>Error while fetching the property details</span>
    </div>;
  }
  if (isLoading) {
    <div className="wrapper flexCenter paddings">
      <PuffLoader
        height="80"
        width="80"
        radius={1}
        color="#4066ff"
        aria-label="puff-loading"
      />
    </div>;
  }
  return (
    <div className="wrapper-grid">
      {data && data.map((card, i) => <Cards card={card} key={i} />)}
    </div>
  );
};

export default Properties;
