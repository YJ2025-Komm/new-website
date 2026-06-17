import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SiLinkedin } from "react-icons/si";
import { Heart, Eye, Zap, Shield } from "lucide-react";

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
    initials: "SM",
    name: "Sahil Maheshwari",
    role: "Advisor — AI & Machine Learning",
    bio: "Sahil Maheshwari is a senior AI and ML leader with 12+ years of experience across Hunch, Sixt, and ThoughtWorks. He specializes in large language models, including fine tuning, RAG, and agentic AI systems, and has built high performing data science teams while actively exploring AI driven information discovery.",
    photo: "/sahil-maheshwari.jpg",
    linkedin: "https://www.linkedin.com/in/maheshwarisahil/",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    initials: "G",
    name: "Gaurav",
    role: "Frontend Lead",
    bio: "A Computer Science graduate specialising in AI and Machine Learning with research across adversarial learning and generative models. Published in leading journals including IJMLC by Springer Nature. In his spare time, he enjoys travelling and trying out different cuisines.",
    photo: "/gaurav.jpg",
    photoScale: "scale-100",
    gradient: "from-violet-500 to-pink-500",
  },
  {
    initials: "MR",
    name: "Melvin Rex",
    role: "Full Stack Engineer",
    bio: "A full stack engineer with a strong track record in optimizing data pipelines and building AI driven products. Currently focused on advancing AI capabilities using agentic workflows and LangGraph, with a deep interest in building intuitive, user friendly products.",
    photo: "/melvin-rex.jpg",
    gradient: "from-orange-500 to-rose-500",
  },
];

export default function Team() {
  useSEO({
    title: "About Us — The GeoRankers Team | AI Search Visibility",
    description: "Meet the founders, engineers, and advisors behind GeoRankers — the AI visibility platform helping B2B SaaS teams improve how AI systems discover them.",
    canonical: "https://georankers.ai/team",
    schemaId: "schema-team",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "name": "About GeoRankers",
          "url": "https://georankers.ai/team",
          "description": "Meet the founders, engineers, and advisors building GeoRankers — the AI Search Visibility Intelligence Platform helping B2B SaaS teams understand and improve how AI systems discover them.",
          "publisher": {
            "@type": "Organization",
            "name": "GeoRankers",
            "url": "https://georankers.ai",
            "logo": {
              "@type": "ImageObject",
              "url": "https://georankers.ai/georankers-logo.svg",
              "contentUrl": "https://georankers.ai/georankers-logo.svg"
            },
            "foundingDate": "2026",
            "founder": {
              "@type": "Person",
              "name": "Yogesh Joshi",
              "jobTitle": "CEO & Founder",
              "url": "https://georankers.ai/team",
              "sameAs": "https://www.linkedin.com/in/yogesh-joshi-5ba94b18/"
            },
            "award": "DPIIT Startup India Recognition",
            "sameAs": [
              "https://blog.georankers.co",
              "https://www.linkedin.com/company/georankers/",
              "https://x.com/georankers",
              "https://www.facebook.com/people/GeoRankers/61588912087425/"
            ]
          }
        },
        {
          "@type": "Person",
          "name": "Yogesh Joshi",
          "jobTitle": "CEO & Founder",
          "url": "https://georankers.ai/team",
          "sameAs": "https://www.linkedin.com/in/yogesh-joshi-5ba94b18/",
          "worksFor": {
            "@type": "Organization",
            "name": "GeoRankers",
            "url": "https://georankers.ai",
            "foundingDate": "2026"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "GeoRankers", "item": "https://georankers.ai" },
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://georankers.ai/team" }
          ]
        }
      ]
    },
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
              As search shifts to AI platforms like ChatGPT, Google AI Mode, and Google AI Overviews, this problem has only compounded. Instead of optimizing for one platform, teams now have to understand and influence how AI models perceive and recommend their brand.
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

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-blue-50/60 to-violet-100 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-7">
            <span className="text-xs font-black uppercase tracking-widest text-blue-500">Our Mission</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-8">
            Turning AI Visibility from a Black Box into a Growth Lever
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-5">
            AI search is changing how people discover and choose businesses, but for most companies, it still feels confusing and impossible to measure. We want to simplify that.
          </p>
          <p className="text-lg text-slate-500 leading-relaxed">
            Our mission is to help businesses clearly understand how AI systems perceive them and give them a practical path from insight to action. Instead of treating AI visibility like a black box, we want to make it something every team can understand, improve, and grow from.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">How We Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: Heart,
                title: "People First",
                body: "Technology will evolve, but trust will remain foundational. We build for people first — customers, teams, and partners alike.",
              },
              {
                Icon: Eye,
                title: "Transparency",
                body: "In a world increasingly shaped by AI, clarity and honesty matter more than ever. We believe trust is built through openness and explainability.",
              },
              {
                Icon: Zap,
                title: "Innovation",
                body: "We question assumptions, adapt quickly, and build for where technology is going — not where it has been.",
              },
              {
                Icon: Shield,
                title: "Be Responsible",
                body: "AI will influence how businesses are discovered, trusted, and understood. We are committed to building with accountability, integrity, and long-term thinking.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #2994FF, #7575FF)" }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-slate-900 text-base mb-3 leading-snug">{title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
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
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center"
              >
                {/* Avatar / Photo */}
                {m.photo ? (
                  <div className="w-32 h-32 rounded-xl overflow-hidden mb-5 shadow-md flex-shrink-0">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className={`w-full h-full object-cover object-top ${m.photoScale ?? "scale-125"} origin-top`}
                    />
                  </div>
                ) : (
                  <div className={`w-32 h-32 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-5 shadow-md`}>
                    <span className="text-white text-3xl font-black">{m.initials}</span>
                  </div>
                )}
                <h3 className="text-base font-bold text-slate-900 leading-tight">{m.name}</h3>
                <p className="text-sm font-semibold text-blue-500 mt-1 mb-3">{m.role}</p>
                {m.bio && (
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{m.bio}</p>
                )}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 text-sm font-medium transition-all duration-200 mt-auto"
                  >
                    <SiLinkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We're hiring */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100/50 via-blue-50/20 to-violet-100/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-7">
            <span className="text-xs font-black uppercase tracking-widest text-blue-500">We're Hiring</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-8">
            Want to Join the Team?
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            We are a small, ambitious team building the future of AI search visibility. If that excites you, write to us at{" "}
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
