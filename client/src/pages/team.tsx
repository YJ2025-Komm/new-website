import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SiLinkedin } from "react-icons/si";

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
    initials: "G",
    name: "Gaurav",
    role: "Founding Engineer — Frontend Lead",
    bio: "A Computer Science graduate specialising in AI and Machine Learning with research across adversarial learning and generative models. Published in leading journals including IJMLC by Springer Nature. In his spare time, he enjoys travelling and trying out different cuisines.",
    photo: "/gaurav.jpg",
    gradient: "from-violet-500 to-pink-500",
  },
  {
    initials: "CD",
    name: "Name Placeholder",
    role: "Head of Product",
    bio: "",
    photo: "",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    initials: "GH",
    name: "Name Placeholder",
    role: "Head of Growth",
    bio: "",
    photo: "",
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
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text — left */}
          <div className="flex-1 lg:max-w-xl">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-5">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-slate-900 mb-7">
              The Founding Story of GeoRankers
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-5">
              GeoRankers was born from a simple frustration — B2B SaaS and enterprise teams were drowning in data from SEO and analytics tools, but had no clear direction on what to actually do with it. Teams were left spending hours piecing together insights, with little clarity on what would move the needle.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed mb-5">
              As search shifts to AI platforms like ChatGPT, Perplexity, and Gemini, this problem has only compounded. Instead of optimizing for one platform, teams now have to understand and influence how multiple AI models perceive and recommend their brand.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              We built GeoRankers to solve this — to give teams clear visibility into how they show up in AI generated answers, and more importantly, what actions they need to take to improve it.
            </p>
          </div>

          {/* Image — right */}
          <div className="flex-1 w-full lg:max-w-lg">
            <div className="relative rounded-2xl overflow-hidden shadow-xl p-1" style={{ background: "linear-gradient(135deg, #2994FF, #5C92FF, #7575FF)" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop"
                alt="GeoRankers team"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover rounded-xl"
              />
            </div>
          </div>
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
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col"
              >
                {/* Avatar / Photo */}
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-32 h-32 rounded-xl object-cover mb-5 shadow-md"
                  />
                ) : (
                  <div className={`w-32 h-32 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-5 shadow-md`}>
                    <span className="text-white text-3xl font-black">{m.initials}</span>
                  </div>
                )}
                <h3 className="text-base font-bold text-slate-900 leading-tight">{m.name}</h3>
                <p className="text-sm font-semibold text-blue-500 mt-1 mb-3">{m.role}</p>
                {m.bio && (
                  <p className="text-sm text-slate-500 leading-relaxed">{m.bio}</p>
                )}
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
          <p className="text-slate-500 leading-relaxed mb-4">
            We're a small, ambitious team building the future of AI search visibility. If that excites you, we'd love to hear from you.
          </p>
          <p className="text-slate-600">
            Contact us at{" "}
            <a href="mailto:hello@georankers.co" className="text-blue-500 font-semibold hover:underline">
              hello@georankers.co
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
