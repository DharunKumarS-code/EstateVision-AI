import { Sparkles, TrendingUp, TrendingDown, Minus, RotateCcw } from "lucide-react";

function ConfidenceMeter({ value }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-2">
        <span>AI Confidence Score</span>
        <span className="text-cyan-400 font-bold">{value}%</span>
      </div>
      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-600 mt-1">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

function MarketTrend({ price }) {
  const isHigh   = price > 100;
  const isMid    = price > 60 && price <= 100;

  const config = isHigh
    ? { Icon: TrendingUp,   label: "High Demand",  segment: "Premium",   color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
    : isMid
    ? { Icon: Minus,        label: "Moderate",     segment: "Mid-Range", color: "text-yellow-400",  bg: "bg-yellow-500/10",  border: "border-yellow-500/30" }
    : { Icon: TrendingDown, label: "Affordable",   segment: "Budget",    color: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/30" };

  const { Icon, label, segment, color, bg, border } = config;

  return (
    <div className={`flex items-center justify-between px-5 py-4 rounded-xl border ${border} ${bg}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className={color} />
        <div>
          <p className="text-slate-400 text-xs mb-0.5">Market Trend</p>
          <p className={`font-semibold text-sm ${color}`}>{label}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-slate-400 text-xs mb-0.5">Price Segment</p>
        <p className="text-white text-sm font-semibold">{segment}</p>
      </div>
    </div>
  );
}

export default function ResultCard({ price, form, onReset }) {
  const confidence = Math.min(95, Math.max(72, Math.round(85 - Math.abs(price - 80) * 0.05)));

  return (
    <section id="result" className="py-24 px-6 bg-slate-900/30 relative overflow-hidden">

      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">AI Property Report</span>
        </div>

        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl overflow-hidden">

          {/* Price banner */}
          <div className="relative p-10 text-center border-b border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 mb-4">
                <Sparkles size={14} className="text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-300">AI Estimated Value</span>
              </div>
              <p className="text-7xl font-black text-white">
                ₹{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {price.toFixed(2)}
                </span>
              </p>
              <p className="text-slate-400 text-xl mt-2">Lakhs</p>
            </div>
          </div>

          <div className="p-8 space-y-6">

            {/* Property tags */}
            <div className="flex flex-wrap gap-2">
              {[
                form.location,
                `${form.sqft} sqft`,
                `${form.bhk} BHK`,
                `${form.bath} Bath`,
                `${form.balcony} Balcony`,
              ].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Confidence meter */}
            <ConfidenceMeter value={confidence} />

            {/* Market trend */}
            <MarketTrend price={price} />

            {/* Price range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <p className="text-slate-400 text-xs mb-1">Lower Estimate</p>
                <p className="text-white font-bold text-lg">₹ {(price * 0.92).toFixed(2)}L</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <p className="text-slate-400 text-xs mb-1">Upper Estimate</p>
                <p className="text-white font-bold text-lg">₹ {(price * 1.08).toFixed(2)}L</p>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-slate-600 text-xs text-center">
              Estimates are based on ML model predictions. Not financial advice.
            </p>

            {/* CTA */}
            <button
              onClick={() => {
                onReset();
                document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-cyan-500/20 cursor-pointer"
            >
              <RotateCcw size={18} /> Predict Another Property
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
