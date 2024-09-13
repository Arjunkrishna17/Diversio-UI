import React from "react";
import ProductSection from "../Components/Products/ProductSection";
import Footer from "../Components/Common/Footer";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col h-full space-y-5 w-full">
        <ProductSection
          sectionName="Electronics"
          categoryFilter="electronics"
        />
        <ProductSection sectionName="Home" categoryFilter="Home" />

        <div className="flex flex-col h-full ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
