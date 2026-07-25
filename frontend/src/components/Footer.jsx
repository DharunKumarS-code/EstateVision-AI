import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Home,
} from "lucide-react";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#020817] border-t border-slate-800">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-white">

                <Home size={24} />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  EstateVision AI
                </h2>

                <p className="text-sm text-cyan-400">
                  Smart Property Prediction
                </p>

              </div>

            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Predict house prices with Machine Learning and
              make confident real estate decisions using
              AI-powered insights.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a href="#hero" className="text-slate-400 hover:text-cyan-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="text-slate-400 hover:text-cyan-400 transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#how" className="text-slate-400 hover:text-cyan-400 transition">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#predict" className="text-slate-400 hover:text-cyan-400 transition">
                  Predict
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-3 text-slate-400">

                <Mail size={18} className="text-cyan-400" />

                sdharunkumargdr@gmail.com

              </div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-semibold text-white">
              Connect
            </h3>

            <div className="mt-6 flex gap-4">

              <a
                href="https://github.com/DharunKumarS-code"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-900 p-4 text-slate-300 transition hover:bg-cyan-500 hover:text-white"
              >
                <Github size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/dharun-kumar-8504a4290/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-900 p-4 text-slate-300 transition hover:bg-cyan-500 hover:text-white"
              >
                <Linkedin size={22} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:flex-row">

          <p className="text-slate-500">
            © {new Date().getFullYear()} EstateVision AI. All Rights Reserved.
          </p>

          <button
            onClick={scrollTop}
            className="rounded-full bg-cyan-500 p-3 text-white transition hover:scale-110 hover:bg-cyan-400"
          >
            <ArrowUp size={20} />
          </button>

        </div>

      </div>

    </footer>
  );
}