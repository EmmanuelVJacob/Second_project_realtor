import React from "react";
import Header from "../../Components/Header/Header";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./AllProperties.css";

import Properties from "../../Components/Properties/Properties";
const AllProperties = () => {
 
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="flexColCenter paddings innerWidth properties-container">
          <SearchBar />
        </div>
      </div>
      <Properties />
    </>
  );
};

export default AllProperties;
