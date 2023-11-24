import React from "react";
import ProductSection from "./Products/ProductSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-5 w-full h-full">
      <ProductSection sectionName="Electronics" categoryFilter="electronics" />
      <ProductSection sectionName="Home" categoryFilter="Home" />
    </div>
  );
};

export default Dashboard;
