import { BrainCircuit, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Powered Prediction",
    description:
      "Advanced Machine Learning models analyze property details to estimate accurate house prices instantly.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Leverage historical Bengaluru housing data to understand market trends and make informed decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Results",
    description:
      "Built with trusted datasets and intelligent algorithms to provide consistent and dependable predictions.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#020817] py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 text-cyan-400 text-sm font-semibold">
            Why EstateVision AI?
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
            Smarter Property Decisions
            <span className="text-cyan-400"> with AI</span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-8">
            EstateVision AI combines Machine Learning, market intelligence,
            and real estate analytics to help buyers, sellers, and investors
            predict property prices with confidence.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
              >

                {/* Glow */}

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                  <Icon
                    size={32}
                    className="text-cyan-400"
                  />

                </div>

                {/* Content */}

                <h3 className="relative mt-8 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="relative mt-5 text-slate-400 leading-8">
                  {feature.description}
                </p>

                {/* Bottom Line */}

                <div className="relative mt-8 h-1 w-16 rounded-full bg-cyan-500 transition-all duration-500 group-hover:w-full" />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}