import { useEffect, useState } from "react";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Sparkles,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import api from "../services/api";

export default function PredictionForm({
  setPrediction,
  setFormData,
}) {
  const [locations, setLocations] = useState([]);

  const [formData, updateFormData] = useState({
    total_sqft: "",
    location: "",
    bhk: "",
    bath: "",
    balcony: "",
  });

  const [loading, setLoading] = useState(false);

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
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictPrice = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/predict_home_price", {
        location: formData.location,
        sqft: parseFloat(formData.total_sqft),
        bath: parseInt(formData.bath),
        balcony: parseInt(formData.balcony),
        bhk: parseInt(formData.bhk),
      });

      setPrediction(res.data.estimated_price);

      setFormData({
        location: formData.location,
        sqft: formData.total_sqft,
        bhk: formData.bhk,
        bath: formData.bath,
        balcony: formData.balcony,
      });

      document
        .getElementById("result")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        "Prediction failed."
      );
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 disabled:opacity-60"
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
                disabled={loading}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 disabled:opacity-60"
                required
              />
            </div>

            {/* BHK */}
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
                disabled={loading}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 disabled:opacity-60"
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
                disabled={loading}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 disabled:opacity-60"
                required
              />
            </div>

            {/* Balcony */}
            <div className="md:col-span-2">
              <label className="mb-3 text-white">
                Balcony
              </label>

              <input
                type="number"
                name="balcony"
                value={formData.balcony}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 disabled:opacity-60"
                required
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-bold text-white transition hover:bg-cyan-400 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <ClipLoader
                      size={22}
                      color="#ffffff"
                      loading={loading}
                    />
                    AI is analyzing your property...
                  </>
                ) : (
                  "Predict House Price"
                )}
              </button>

              {loading && (
                <p className="mt-4 text-center text-slate-400 animate-pulse">
                  Our AI model is estimating your property's value...
                </p>
              )}
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}