import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does EstateVision AI predict house prices?",
    answer:
      "EstateVision AI uses a Machine Learning model trained on Bengaluru housing data. It analyzes property features such as location, area, bedrooms, and bathrooms to estimate the property value.",
  },
  {
    question: "Is the prediction accurate?",
    answer:
      "The prediction is based on historical real estate data and provides a strong estimate. Actual prices may vary depending on market conditions and property-specific factors.",
  },
  {
    question: "What information do I need?",
    answer:
      "Simply enter the property location, total area in square feet, number of bedrooms (BHK), and bathrooms.",
  },
  {
    question: "Can I use this for investment decisions?",
    answer:
      "EstateVision AI is designed as a decision-support tool. We recommend combining the prediction with professional real estate advice before making investment decisions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#020817] py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-400">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
            Have Questions?
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            Everything you need to know about EstateVision AI.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <ChevronUp className="text-cyan-400" />
                ) : (
                  <ChevronDown className="text-cyan-400" />
                )}
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-60" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 leading-8 text-slate-400">
                  {faq.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}