import { Link } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { id: "platform", label: "1. The Platform" },
  { id: "data-limitations", label: "2. Data & Limitations" },
  { id: "acceptable-use", label: "3. Acceptable Use" },
  { id: "subscriptions", label: "4. Subscriptions & Payments" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "confidentiality", label: "6. Confidentiality" },
  { id: "warranties", label: "7. Warranties & Disclaimers" },
  { id: "liability", label: "8. Limitation of Liability" },
  { id: "indemnification", label: "9. Indemnification" },
  { id: "termination", label: "10. Term & Termination" },
  { id: "privacy", label: "11. Privacy" },
  { id: "disputes", label: "12. Dispute Resolution" },
  { id: "general", label: "13. General Terms" },
];

export default function Terms() {
  useSEO({
    title: "Terms of Service | GeoRankers",
    description:
      "Review the GeoRankers Terms of Service governing your use of the AI search visibility platform, including subscriptions, data usage, and acceptable use policy.",
    canonical: "https://georankers.co/terms",
    schemaId: "terms-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service",
      "url": "https://georankers.co/terms",
      "isPartOf": { "@type": "WebSite", "url": "https://georankers.co" },
    },
  });

  useEffect(() => {
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
              <h1 className="text-3xl sm:text-4xl font-bold leading-[1.15] text-slate-900 mb-3">Terms of Service</h1>
              <p className="text-sm text-slate-400">Effective Date: March 2026 &nbsp;·&nbsp; Last Updated: March 2026</p>
              <p className="text-sm text-slate-400 mt-1">Apex Intelligence Private Limited</p>
            </div>

            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">

              <p>
                These Terms of Service ("Terms") govern your access to and use of GeoRankers, a product of Apex Intelligence Private Limited ("Company," "we," "us," or "our"). By creating an account or using our platform, you agree to be bound by these Terms. If you are accessing GeoRankers on behalf of an organisation, you represent that you have authority to bind that organisation.
              </p>

              <hr className="my-8 border-slate-100" />

              <section id="platform">
                <h2>1. The Platform</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">1.1 What GeoRankers Does</h3>
                <p>
                  GeoRankers is an AI search visibility intelligence platform that helps B2B brands track, measure, and analyse how their brand, products, and content appear within AI-powered search engines including ChatGPT, Google Gemini, Perplexity, Grok, and similar platforms ("AI Platforms").
                </p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">1.2 Access Grant</h3>
                <p>
                  Subject to your compliance with these Terms and timely payment of applicable fees, we grant you a limited, non-exclusive, non-transferable right to access and use GeoRankers during your subscription term, solely for your internal business purposes.
                </p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">1.3 Authorised Users</h3>
                <p>
                  You may permit your employees and contractors to access the platform under your account. You are responsible for their compliance with these Terms and all actions taken under your account credentials.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="data-limitations">
                <h2>2. Data, AI Accuracy and Important Limitations</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.1 Nature of AI Search Data</h3>
                <p>Results reflect a point-in-time snapshot and are not a real-time or guaranteed continuous feed. AI Platforms change their outputs frequently. GeoRankers does not control third-party AI Platforms and cannot guarantee accuracy or consistency of data derived from them. Visibility scores and sentiment data are analytical outputs, not professional advice.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.2 No Guarantee of AI Platform Coverage</h3>
                <p>We make commercially reasonable efforts to monitor a broad set of AI Platforms. Platform availability within GeoRankers may change without notice due to third-party restrictions or API changes.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.3 Your Data</h3>
                <p>You retain all ownership rights in your Customer Data. You grant us a limited, non-exclusive licence to use your Customer Data solely to provide and improve the services. We do not sell your Customer Data to third parties.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">2.4 Aggregate Data</h3>
                <p>We may generate anonymised, aggregated insights from platform-wide data that does not identify you or your organisation. Aggregate Data is owned by us.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="acceptable-use">
                <h2>3. Acceptable Use</h2>
                <p>You may use GeoRankers only for lawful internal business purposes. You must not:</p>
                <ul>
                  <li>Use the platform to build a product that competes with GeoRankers.</li>
                  <li>Resell, sublicense, or make the platform available to third parties without our consent.</li>
                  <li>Reverse engineer, decompile, scrape, or extract source code or underlying data structures.</li>
                  <li>Use automated scripts or bots to interact with the platform beyond what is explicitly permitted.</li>
                  <li>Attempt to circumvent any security or access controls.</li>
                  <li>Input or transmit unlawful, infringing, or malicious content.</li>
                  <li>Use the platform in violation of applicable laws.</li>
                </ul>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="subscriptions">
                <h2>4. Subscriptions and Payments</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.1 Subscription Plans</h3>
                <p>GeoRankers is offered on a subscription basis. Plan details and pricing are described on our <Link href="/pricing">pricing page</Link>.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.2 Payment</h3>
                <p>Fees are due and payable in advance for each subscription period. Late payments may result in suspension of access.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.3 Taxes</h3>
                <p>All fees are exclusive of applicable taxes, including GST. You are responsible for paying all taxes applicable to your subscription.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.4 Auto-Renewal</h3>
                <p>Subscriptions automatically renew unless you cancel at least 7 days before the renewal date. Manage renewal from your account settings or contact us at <a href="mailto:hello@georankers.co">hello@georankers.co</a>.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.5 Refunds</h3>
                <p>Fees paid are non-refundable except as required by law. If GeoRankers materially fails to perform and we are unable to remedy this within 30 days, we will refund a pro-rated portion of pre-paid, unused fees.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="intellectual-property">
                <h2>5. Intellectual Property</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.1 Our IP</h3>
                <p>All rights in and to the GeoRankers platform — including software, algorithms, design, data models, and documentation — are owned by Apex Intelligence Private Limited. These Terms do not transfer any ownership rights to you.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.2 Feedback</h3>
                <p>If you share suggestions or feedback about the platform, you grant us an irrevocable, royalty-free right to use that feedback without restriction.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">5.3 Trademarks</h3>
                <p>"GeoRankers" and associated logos are trademarks of Apex Intelligence Private Limited. You may not use our name or logo without prior written consent.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="confidentiality">
                <h2>6. Confidentiality</h2>
                <p>Each party agrees to keep the other's confidential information secure and not disclose it to third parties, except as necessary to perform obligations under these Terms or as required by law. Confidentiality obligations do not apply to information that is publicly available or independently developed.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="warranties">
                <h2>7. Warranties and Disclaimers</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">7.1 Our Warranty</h3>
                <p>We warrant that GeoRankers will perform materially as described in our documentation. If it does not, notify us in writing and we will use reasonable efforts to remedy the issue within 30 days.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">7.2 Disclaimers</h3>
                <p>Except as stated in Section 7.1, the platform is provided "as is" and "as available". To the maximum extent permitted by law, we disclaim all other warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We are not liable for the accuracy of data sourced from third-party AI Platforms.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="liability">
                <h2>8. Limitation of Liability</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">8.1 Cap on Liability</h3>
                <p>Our total aggregate liability to you for all claims shall not exceed the total fees paid by you in the 12 months preceding the event giving rise to the claim.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">8.2 Exclusion of Indirect Damages</h3>
                <p>In no event shall either party be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, or loss of business opportunity.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="indemnification">
                <h2>9. Indemnification</h2>
                <p>You agree to indemnify and hold harmless Apex Intelligence Private Limited and its officers, directors, employees, and agents from and against any claims, liabilities, damages, and costs arising out of:</p>
                <ul>
                  <li>Your breach of these Terms.</li>
                  <li>Your use of GeoRankers in a manner not permitted by these Terms.</li>
                  <li>Any Customer Data you provide that infringes third-party rights or violates applicable law.</li>
                </ul>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="termination">
                <h2>10. Term and Termination</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">10.1 Term</h3>
                <p>These Terms begin on the date you first access GeoRankers and continue until your subscription is terminated or expires.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">10.2 Termination for Cause</h3>
                <p>Either party may terminate immediately on written notice if the other party materially breaches these Terms and fails to cure within 30 days of notice.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">10.3 Termination for Convenience</h3>
                <p>We may terminate your access with 30 days' written notice. You may cancel your subscription at any time through your account settings, effective at the end of your current billing period.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">10.4 Effect of Termination</h3>
                <p>On termination, your right to access GeoRankers ceases. We will retain Customer Data for up to 30 days after termination, after which we may delete it.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="privacy">
                <h2>11. Privacy and Data Protection</h2>
                <p>
                  Our <Link href="/privacy">Privacy Policy</Link> governs how we collect, use, and protect personal data. By using GeoRankers, you agree to our Privacy Policy. To the extent that your use involves processing of personal data subject to the Digital Personal Data Protection Act, 2023 (India), the parties will comply with their respective obligations.
                </p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="disputes">
                <h2>12. Dispute Resolution</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">12.1 Informal Resolution First</h3>
                <p>Before initiating formal proceedings, the parties agree to attempt good-faith resolution by written notice to <a href="mailto:hello@georankers.co">hello@georankers.co</a>. If unresolved within 30 days, either party may initiate arbitration.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">12.2 Arbitration</h3>
                <p>Any dispute arising out of these Terms shall be resolved by arbitration under the Arbitration and Conciliation Act, 1996 (India), by a sole arbitrator mutually appointed by the parties. Seat of arbitration: Bengaluru, Karnataka. Language: English. The award shall be final and binding.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">12.3 Governing Law</h3>
                <p>These Terms are governed by the laws of India. Subject to arbitration, the parties submit to the exclusive jurisdiction of the courts of Bangalore, Karnataka.</p>
              </section>

              <hr className="my-8 border-slate-100" />

              <section id="general">
                <h2>13. General Terms</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">13.1 Entire Agreement</h3>
                <p>These Terms, together with any Order Form and our Privacy Policy, constitute the entire agreement between the parties and supersede all prior agreements.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">13.2 Changes to These Terms</h3>
                <p>We may update these Terms from time to time with at least 30 days' notice of material changes. Your continued use after the effective date constitutes acceptance.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">13.3 Assignment</h3>
                <p>You may not assign or transfer your rights under these Terms without our prior written consent. We may assign our rights in connection with a merger, acquisition, or sale of assets.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">13.4 Severability</h3>
                <p>If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect.</p>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">13.5 Contact</h3>
                <p>
                  <strong>Apex Intelligence Private Limited (dba GeoRankers)</strong><br />
                  1190/1, 4th Floor, HSR Layout, 3rd Sector,<br />
                  22nd Cross Road, Bengaluru – 560102, Karnataka, India<br />
                  Email: <a href="mailto:hello@georankers.co">hello@georankers.co</a>
                </p>
              </section>

            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <Link href="/privacy" className="text-sm text-blue-600 hover:underline">Privacy Policy</Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
