import { ArrowRight, Sparkles } from "lucide-react";
import heroHouse from "../assets/hero-house.png";

export default function Hero() {
  const scrollToPredict = () => {
    const section = document.getElementById("predict");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToFeatures = () => {
    const section = document.getElementById("features");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#020817] pt-28 lg:pt-36"
    >
      {/* Background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute top-10 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute right-0 top-20 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[170px]" />

        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl items-center px-6">

        <div className="grid w-full items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2">

              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <span className="text-sm font-medium text-cyan-300">

                AI Powered Property Valuation Platform

              </span>

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

              Predict

              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">

                House Prices

              </span>

              <br />

              with AI

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              Get instant and accurate house price predictions using
              Machine Learning trained on Bengaluru real estate data.

              Make smarter buying and selling decisions with AI-powered
              insights.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={scrollToPredict}
                className="group flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400"
              >
                Predict Price

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

              <button
                onClick={scrollToFeatures}
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 font-semibold text-slate-300 backdrop-blur-md transition hover:border-cyan-500 hover:text-cyan-400"
              >
                Learn More
              </button>

            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">

  <div className="text-center">

    <h2 className="text-5xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]">
      95%
    </h2>

    <p className="mt-3 text-cyan-300 font-semibold tracking-wide">
      Accuracy
    </p>

  </div>

  <div className="text-center">

    <h2 className="text-5xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]">
      10K+
    </h2>

    <p className="mt-3 text-cyan-300 font-semibold tracking-wide">
      Predictions
    </p>

  </div>

  <div className="text-center">

    <h2 className="text-5xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]">
      24/7
    </h2>

    <p className="mt-3 text-cyan-300 font-semibold tracking-wide">
      AI Support
    </p>

  </div>

</div>
          </div>

          {/* RIGHT */}

          <div className="relative flex items-center justify-center">

                        {/* Glow Effect */}

            <div className="absolute h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />

            {/* Decorative Ring */}

            <div className="absolute h-[540px] w-[540px] rounded-full border border-cyan-500/10" />

            {/* Hero Image */}

            <img
              src={heroHouse}
              alt="EstateVision AI House"
              className="relative z-10 w-full max-w-xl drop-shadow-[0_25px_60px_rgba(34,211,238,0.35)] transition-transform duration-500 hover:scale-105"
            />

            {/* Floating Badge */}

            <div className="absolute left-0 top-12 rounded-2xl border border-cyan-500/20 bg-slate-900/80 px-5 py-4 backdrop-blur-xl shadow-xl">

              <p className="text-xs uppercase tracking-widest text-cyan-400">
                AI Prediction
              </p>

              <h3 className="mt-1 text-2xl font-bold text-white">
                95%
              </h3>

              <p className="text-sm text-slate-400">
                Estimated Accuracy
              </p>

            </div>

            {/* Floating Card */}

            <div className="absolute bottom-10 right-0 rounded-2xl border border-cyan-500/20 bg-slate-900/80 px-6 py-5 backdrop-blur-xl shadow-xl">

              <p className="text-sm text-slate-400">
                Average Response Time
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                &lt; 2 sec
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Gradient */}

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#020817] to-transparent" />

    </section>
  );
}