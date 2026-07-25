import {
  MapPin,
  Database,
  BrainCircuit,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: MapPin,
    title: "Enter Property Details",
    description:
      "Provide the location, square footage, number of bedrooms, and bathrooms of your property.",
  },
  {
    id: "02",
    icon: Database,
    title: "Data Processing",
    description:
      "Your inputs are validated and transformed into a format suitable for our prediction model.",
  },
  {
    id: "03",
    icon: BrainCircuit,
    title: "AI Model Analysis",
    description:
      "Our Machine Learning model analyzes thousands of historical Bengaluru housing records.",
  },
  {
    id: "04",
    icon: BadgeDollarSign,
    title: "Instant Prediction",
    description:
      "Receive an accurate estimated property price within seconds along with AI-powered insights.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-[#020817] py-24 px-6 overflow-hidden"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      </div>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-400">
            Simple Prediction Process
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
            How
            <span className="text-cyan-400"> EstateVision AI </span>
            Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Our intelligent workflow predicts house prices using Machine
            Learning and real estate analytics in just a few seconds.
          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-20">

          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/20 via-cyan-500 to-cyan-500/20 rounded-full" />

          <div className="grid gap-10 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="group relative"
                >
                  {/* Card */}

                  <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

                    {/* Number */}

                    <div className="absolute right-6 top-6 text-5xl font-black text-slate-800">
                      {step.id}
                    </div>

                    {/* Icon */}

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">

                      <Icon
                        size={30}
                        className="text-cyan-400"
                      />

                    </div>

                    {/* Title */}

                    <h3 className="relative mt-8 text-2xl font-bold text-white">
                      {step.title}
                    </h3>

                    {/* Description */}

                    <p className="relative mt-5 leading-8 text-slate-400">
                      {step.description}
                    </p>

                  </div>

                  {/* Arrow */}

                  {index !== steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-6 top-16 z-20 items-center justify-center">
                      <ArrowRight className="text-cyan-400" size={28} />
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}