import React from "react";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowitWorks";
import Features from "../components/Features";
import FAQ from "../components/FAQ";

function Home() {
  return (
    <div>
      <div className="pt-[70px]">
      <Hero />
      <HowItWorks/>
        
      <Features />
      <FAQ />
      </div>
    </div>
  );
}

export default Home;
