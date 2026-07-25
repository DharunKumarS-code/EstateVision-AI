import { useEffect, useState } from "react";
import {
  MapPin,
  Home,
  BedDouble,
  Bath,
  Ruler,
  Sparkles,
} from "lucide-react";
import api from "../services/api";

export default function PredictionForm() {
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    total_sqft: "",
    location: "",
    bhk: "",
    bath: "",
    balcony: "",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await api.get("/get_location_names");
        setLocations(res.data.locations || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictPrice = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);

    try {
      const res = await api.post("/predict_home_price", {
        location: formData.location,
        sqft: parseFloat(formData.total_sqft),
        bath: parseInt(formData.bath),
        balcony: parseInt(formData.balcony),
        bhk: parseInt(formData.bhk),
      });

      setPrediction(res.data.estimated_price);
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Prediction failed.");
    }

    setLoading(false);
  };

  return (
    <section
      id="predict"
      className="bg-[#020817] py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-400">

            <Sparkles size={18} />

            Predict Property Value

          </span>

          <h2 className="mt-6 text-5xl font-black text-white">

            House Price Predictor

          </h2>

          <p className="mt-5 text-slate-400 text-lg">

            Enter your property details and let AI estimate the price.

          </p>

        </div>

        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl">

          <form
            onSubmit={predictPrice}
            className="grid gap-8 md:grid-cols-2"
          >

            {/* Location */}

            <div>

              <label className="mb-3 flex items-center gap-2 text-white">

                <MapPin size={18} />

                Location

              </label>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
                required
              >

                <option value="">Select Location</option>

                {locations.map((location) => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                ))}

              </select>

            </div>

            {/* Area */}

            <div>

              <label className="mb-3 flex items-center gap-2 text-white">

                <Ruler size={18} />

                Total Area (sq.ft)

              </label>

              <input
                type="number"
                name="total_sqft"
                value={formData.total_sqft}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
                required
              />

            </div>

            {/* Bedrooms */}

            <div>

              <label className="mb-3 flex items-center gap-2 text-white">

                <BedDouble size={18} />

                Bedrooms (BHK)

              </label>

              <input
                type="number"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
                required
              />

            </div>

            {/* Bathrooms */}

            <div>

              <label className="mb-3 flex items-center gap-2 text-white">

                <Bath size={18} />

                Bathrooms

              </label>

              <input
                type="number"
                name="bath"
                value={formData.bath}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
                required
              />

            </div>

            {/* Balcony */}

            <div className="md:col-span-2">

              <label className="mb-3 flex items-center gap-2 text-white">

                Balcony

              </label>

              <input
                type="number"
                name="balcony"
                value={formData.balcony}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
                required
              />

            </div>

            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-bold text-white transition hover:bg-cyan-400 disabled:opacity-60"
              >

                {loading ? "Predicting..." : "Predict House Price"}

              </button>

            </div>

          </form>

          {prediction !== null && (

            <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-8 text-center">

              <Home
                size={50}
                className="mx-auto text-cyan-400"
              />

              <h3 className="mt-5 text-2xl font-bold text-white">

                Estimated Price

              </h3>

              <p className="mt-4 text-5xl font-black text-cyan-400">

                ₹ {prediction} Lakhs

              </p>

            </div>

          )}

        </div>

      </div>
    </section>
  );
}