import React from "react";
import ProductSection from "../Components/Products/ProductSection";
import Footer from "../Components/Common/Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-3 w-full h-full">
      <ProductSection sectionName="Electronics" categoryFilter="electronics" />
      <ProductSection sectionName="Home" categoryFilter="Home" />

      <div className="pt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
