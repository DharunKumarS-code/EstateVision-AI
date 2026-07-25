import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {

  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <div className="bg-[#020817] text-white overflow-x-hidden">

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <PredictionForm
        setPrediction={setPrediction}
        setFormData={setFormData}
      />

      {prediction !== null && (
        <ResultCard
          price={prediction}
          form={formData}
          onReset={() => {
            setPrediction(null);
            setFormData(null);
          }}
        />
      )}

      <FAQ />

      <Footer />

    </div>
  );
}

export default App;