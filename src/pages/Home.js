import React from "react";
import ReportForm from "../components/ReportForm";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the GBV Reporting Platform</h1>
      <p>This platform allows you to anonymously report cases of femicide and other gender-based violence.</p>
      <ReportForm />
    </div>
  );
};

export default Home;
