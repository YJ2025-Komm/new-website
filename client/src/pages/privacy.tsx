import { Link } from "wouter";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "what-we-collect", label: "2. What Data We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Data" },
  { id: "aggregate-data", label: "4. Aggregate Data" },
  { id: "how-we-share", label: "5. How We Share Your Data" },
  { id: "cookies", label: "6. Cookies" },
  { id: "data-retention", label: "7. Data Retention" },
  { id: "security", label: "8. Data Security" },
  { id: "your-rights", label: "9. Your Privacy Rights" },
  { id: "third-party-ai", label: "10. Third-Party AI Platforms" },
  { id: "international", label: "11. International Transfers" },
  { id: "childrens", label: "12. Children's Privacy" },
  { id: "third-party-links", label: "13. Third-Party Links" },
  { id: "changes", label: "14. Changes to This Policy" },
  { id: "contact", label: "15. Contact Us" },
];

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | GeoRankers";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">

          {/* Sidebar TOC — sticky on desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-slate-500 hover:text-blue-600 py-1 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0">
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
              <p className="text-sm text-slate-400">Effective Date: March 2026 &nbsp;·&nbsp; Last Updated: March 2026</p>
              <p className="text-sm text-slate-400 mt-1">Apex Intelligence Private Limited</p>
            </div>

            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">

              <p>
                This Privacy Policy explains how Apex Intelligence Private Limited ("Company," "we," "us," or "our"), the company behind GeoRankers, collects, uses, stores, and protects your personal data when you visit our website at georankers.co, sign up for our platform, or interact with our services.
              </p>
              <p>
                We are committed to protecting your privacy and handling your data in a transparent, lawful manner. By using GeoRankers, you agree to the practices described in this Privacy Policy.
              </p>

              <hr className="my-8 border-slate-100" />

              <section id="who-we-are">
                <h2>1. Who We Are</h2>
                <p>GeoRankers is an AI search visibility intelligence platform operated by:</p>
                <p>
                  <strong>Apex Intelligence Private Limited</strong><br />
                  1190/1, 4th Floor, HSR Layout, 3rd Sector,<br />
                  22nd Cross Road, Bengaluru – 560102<br />
                  Karnataka, India
                </p>
                <p>Privacy contact: <a href="mailto:hello@georankers.co">hello@georankers.co</a></p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="what-we-collect">
                <h2>2. What Data We Collect</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.1 Data You Provide to Us</h3>
                <ul>
                  <li><strong>Account information:</strong> your name, email address, company name, and job title.</li>
                  <li><strong>Billing information:</strong> payment details processed securely through our third-party payment provider. We do not store your full card details.</li>
                  <li><strong>Platform inputs:</strong> brand names, competitor names, keywords, and queries you enter to track AI search visibility.</li>
                  <li><strong>Communications:</strong> messages, feedback, and support requests you send us.</li>
                </ul>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.2 Data We Collect Automatically</h3>
                <ul>
                  <li><strong>Log data:</strong> IP address, browser type, device type, pages visited, and time spent on pages.</li>
                  <li><strong>Usage data:</strong> how you interact with our platform, features accessed, and actions taken.</li>
                  <li><strong>Cookies:</strong> small files placed on your device to maintain sessions and analyse usage. See Section 6.</li>
                </ul>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.3 Data from Third-Party Sign-In</h3>
                <p>If you sign in using Google or another provider, we may receive your name, email, and profile picture. We do not receive your passwords.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="how-we-use">
                <h2>3. How We Use Your Data</h2>
                <ul>
                  <li>To provide and operate the GeoRankers platform.</li>
                  <li>To manage your account, authenticate your identity, and process payments.</li>
                  <li>To communicate with you about your account, subscription, and service notices.</li>
                  <li>To respond to your support requests and resolve issues.</li>
                  <li>To improve our platform by analysing usage patterns and developing new features.</li>
                  <li>To generate anonymised, aggregated insights across our platform.</li>
                  <li>To send you product updates or marketing communications where you have given consent. You may opt out at any time.</li>
                  <li>To comply with legal obligations under Indian law.</li>
                </ul>
                <p><strong>What we do not do:</strong> We do not sell your personal data. We do not use your data to train general-purpose AI or machine learning models.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="aggregate-data">
                <h2>4. Aggregate and Anonymised Data</h2>
                <p>
                  GeoRankers may generate aggregated, anonymised data derived from usage patterns ("Aggregate Data"). Aggregate Data does not identify you, your organisation, or any individual user. We may use it to produce industry benchmarks, trend reports, and product insights.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="how-we-share">
                <h2>5. How We Share Your Data</h2>
                <p>We do not sell your personal data. We may share your data only in the following limited circumstances:</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.1 Service Providers</h3>
                <p>We work with trusted third-party vendors for cloud hosting, payment processing, email delivery, and analytics. These vendors process your data only as instructed by us and are contractually bound to protect it.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.2 Legal Requirements</h3>
                <p>We may disclose your data if required by applicable Indian law, court order, or lawful request from a government authority.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.3 Business Transfers</h3>
                <p>If we are involved in a merger or acquisition, your data may be transferred as part of that transaction. We will notify you before your data is transferred.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.4 With Your Consent</h3>
                <p>We may share your data with third parties for other purposes only with your explicit consent.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="cookies">
                <h2>6. Cookies and Tracking Technologies</h2>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for the platform to function — login sessions, secure access, and core features.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform so we can improve it.</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences such as language settings and dashboard layout.</li>
                </ul>
                <p>You can control or disable non-essential cookies through your browser settings or our cookie consent banner.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="data-retention">
                <h2>7. Data Retention</h2>
                <ul>
                  <li><strong>Active account data:</strong> retained for the duration of your subscription plus 30 days after closure.</li>
                  <li><strong>Billing records:</strong> retained for 7 years as required under Indian accounting and tax laws.</li>
                  <li><strong>Usage logs and analytics:</strong> retained for up to 12 months, then deleted or anonymised.</li>
                  <li><strong>Support communications:</strong> retained for up to 2 years after resolution.</li>
                </ul>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="security">
                <h2>8. Data Security</h2>
                <p>We implement appropriate technical and organisational measures to protect your data, including:</p>
                <ul>
                  <li>Encryption of data in transit using TLS/HTTPS.</li>
                  <li>Access controls ensuring only authorised personnel can access your data.</li>
                  <li>Regular security reviews of our systems and infrastructure.</li>
                  <li>Use of reputable, certified cloud infrastructure providers.</li>
                </ul>
                <p>In the event of a data breach that is likely to adversely affect you, we will notify you as required under the Digital Personal Data Protection Act, 2023 (DPDPA).</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="your-rights">
                <h2>9. Your Privacy Rights</h2>
                <p>Under the DPDPA 2023 and applicable laws, you have the following rights:</p>
                <ul>
                  <li><strong>Right to Access:</strong> Request a summary of the personal data we hold about you.</li>
                  <li><strong>Right to Correction:</strong> Request that inaccurate or incomplete data be corrected.</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data (subject to legal retention requirements).</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing communications at any time.</li>
                  <li><strong>Right to Grievance Redressal:</strong> Raise a grievance with us; you also have the right to approach the Data Protection Board of India.</li>
                </ul>
                <p>To exercise these rights, email <a href="mailto:hello@georankers.co">hello@georankers.co</a> with the subject line <em>"Privacy Request"</em>. We will respond within 30 days.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="third-party-ai">
                <h2>10. Third-Party AI Platforms</h2>
                <p>
                  GeoRankers queries third-party AI platforms such as ChatGPT, Google Gemini, Perplexity, Grok, and others to track how brands appear in AI-generated responses. Queries contain your brand names and keywords but do not include your personal account data. Each AI platform's own privacy policy applies to those interactions.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="international">
                <h2>11. International Data Transfers</h2>
                <p>
                  GeoRankers is operated from India. Some third-party service providers may process data outside India. Where this occurs, we ensure appropriate contractual safeguards are in place consistent with the DPDPA and applicable Indian law.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="childrens">
                <h2>12. Children's Privacy</h2>
                <p>
                  GeoRankers is a B2B platform intended for professionals and business organisations. We do not knowingly collect personal data from individuals under the age of 18. If we become aware of such collection, we will delete it promptly.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="third-party-links">
                <h2>13. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. This Privacy Policy does not apply to those external sites. We recommend reviewing the privacy policy of any third-party site you visit.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="changes">
                <h2>14. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. If we make material changes, we will notify you at least 30 days in advance by email or through a prominent notice on the platform.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="contact">
                <h2>15. Contact Us</h2>
                <p>
                  <strong>Apex Intelligence Private Limited (dba GeoRankers)</strong><br />
                  1190/1, 4th Floor, HSR Layout, 3rd Sector,<br />
                  22nd Cross Road, Bengaluru – 560102<br />
                  Karnataka, India
                </p>
                <p>Email: <a href="mailto:hello@georankers.co">hello@georankers.co</a></p>
                <p>Website: <a href="https://georankers.co">georankers.co</a></p>
                <p>We aim to respond to all privacy-related requests within 30 days.</p>
              </section>

            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <Link href="/terms" className="text-sm text-blue-600 hover:underline">Terms of Service</Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
