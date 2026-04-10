import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SiLinkedin } from "react-icons/si";
import { Mail } from "lucide-react";

const founders = [
  {
    initials: "YJ",
    name: "Yogesh Joshi",
    role: "CEO & Founder",
    tagline: "B2B SaaS growth leader with 10+ years of experience, focused on organic growth and GTM. Prior to GeoRankers, he led growth at Kommunicate, building SEO and content-led engines that drove high-intent pipeline and enterprise revenue. In his spare time, Yogesh enjoys running marathons and is deeply into meditation and yoga.",
    linkedin: "https://www.linkedin.com/in/yogesh-joshi-5ba94b18/",
    photo: "/yogesh-joshi.jpg",
    gradient: "from-blue-500 to-violet-600",
  },
];

const teamMembers = [
  {
    initials: "CD",
    name: "Name Placeholder",
    role: "Head of Product",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    initials: "EF",
    name: "Name Placeholder",
    role: "Head of Engineering",
    gradient: "from-violet-500 to-pink-500",
  },
  {
    initials: "GH",
    name: "Name Placeholder",
    role: "Head of Growth",
    gradient: "from-emerald-500 to-cyan-500",
  },
];

export default function Team() {
  useSEO({
    title: "About Us — GeoRankers",
    description: "Meet the team behind GeoRankers, the AI Search Visibility Intelligence Platform for B2B SaaS teams.",
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-5">Our Story</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-slate-900 mb-8">
            The Founding Story of GeoRankers
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-6 max-w-3xl mx-auto">
            GeoRankers was born from a simple frustration — B2B SaaS teams had no reliable way to know if 
            AI search engines like ChatGPT, Perplexity, or Gemini were recommending them to buyers. 
            Everything started with our own need to understand brand visibility in AI-generated answers.
          </p>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
            We're backed by a belief that AI search is reshaping how buyers discover software — and that 
            every B2B SaaS team deserves clarity on where they stand and what to do about it.
          </p>
        </div>
      </section>

      {/* Team — merged */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-12 text-center">
            Meet the Passionate Team Behind GeoRankers
          </h2>

          {/* Founders row */}
          <div className="flex flex-col items-center gap-6 mb-12">
            {founders.map((f) => (
              <div
                key={f.initials}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start w-full max-w-2xl"
              >
                {f.photo ? (
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-44 h-44 rounded-2xl object-cover flex-shrink-0 shadow-md"
                  />
                ) : (
                  <div className={`w-44 h-44 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <span className="text-white text-5xl font-black">{f.initials}</span>
                  </div>
                )}
                <div className="flex flex-col sm:items-start items-center text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{f.name}</h3>
                  <p className="text-sm font-semibold text-blue-500 mt-1 mb-4">{f.role}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{f.tagline}</p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 text-sm font-medium transition-all duration-200"
                  >
                    <SiLinkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Team members row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((m) => (
              <div
                key={m.initials}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex items-center gap-5"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white text-lg font-black">{m.initials}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{m.name}</h3>
                  <p className="text-sm font-medium text-blue-500 mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We're hiring */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">We're Hiring</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
            Want to join the team?
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            We're a small, ambitious team building the future of AI search visibility. If that excites you, we'd love to hear from you.
          </p>
          <a
            href="mailto:hello@georankers.co"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #2994FF, #5C92FF, #7575FF)" }}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
