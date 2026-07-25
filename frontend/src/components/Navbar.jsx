import { useState, useEffect } from "react";
import { Menu, X, Home, Sparkles, Cpu, HelpCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3"
        >
          <div className="h-11 w-11 rounded-xl bg-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/40">
            E
          </div>

          <div>
            <h1 className="text-white font-bold text-xl">
              EstateVision
            </h1>

            <p className="text-xs text-cyan-400">
              AI Price Predictor
            </p>
          </div>
        </button>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-10 text-slate-300">

          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-cyan-400 transition"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("how")}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <Cpu size={18} />
            How It Works
          </button>

          <button
            onClick={() => scrollToSection("predict")}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <Sparkles size={18} />
            Predict
          </button>

          <button
            onClick={() => scrollToSection("faq")}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <HelpCircle size={18} />
            FAQ
          </button>

        </nav>

        {/* CTA */}

        <button
          onClick={() => scrollToSection("predict")}
          className="hidden lg:block rounded-xl bg-cyan-500 px-6 py-3 text-white font-semibold hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
        >
          Get Started
        </button>

        {/* Mobile Button */}

        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800">

          <div className="flex flex-col p-6 gap-5 text-slate-300">

            <button
              onClick={() => scrollToSection("hero")}
              className="text-left hover:text-cyan-400"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="text-left hover:text-cyan-400"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("how")}
              className="text-left hover:text-cyan-400"
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection("predict")}
              className="text-left hover:text-cyan-400"
            >
              Predict
            </button>

            <button
              onClick={() => scrollToSection("faq")}
              className="text-left hover:text-cyan-400"
            >
              FAQ
            </button>

          </div>

        </div>
      )}

    </header>
  );
}