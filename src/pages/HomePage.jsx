import React from "react";
import "../styles/homepage.css";

const HomePage = () => {
  return (
    <div className="homePage-container">
      <main className="measure center tc sans-serif black-80 absolute absolute--fill">
        <div className="flex flex-column justify-center items-center h-100">
          <header>
            <h1 className="animated fadeInUp ease-out-circ d2 a-1 f2 fw3">
              <code className="db black-40" style={{ width: "500px" }}>
                'Welcome To X-pense'
              </code>
            </h1>
            <h2 className="animated fadeInUp ease-out-circ d-1 a-2 f6">
              Register yourself to enjoy{" "}
              <span class="nowrap">our services</span>
            </h2>
          </header>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
