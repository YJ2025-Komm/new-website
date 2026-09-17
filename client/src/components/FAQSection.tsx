import { useEffect, useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

// FAQ accordion plus its FAQPage JSON-LD, kept together so the rendered questions
// and the structured data can never drift apart.
//
// The schema goes in its own <script> tag rather than inside the page schema —
// nesting a second FAQPage into an existing WebPage block triggers Google's
// "Duplicate field FAQ page" error.

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  /**
   * DOM id for the JSON-LD script tag. Required, not derived, because cleanup
   * removes by id: two pages sharing an id means one page's unmount deletes the
   * other's schema. Convention: `<slug>-faq-schema`.
   */
  schemaId: string;
  heading?: string;
  /** Optional closing line under the grid, e.g. a link back to the parent page. */
  footer?: ReactNode;
}

export default function FAQSection({
  faqs,
  schemaId,
  heading = "Frequently Asked Questions",
  footer,
}: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const serialized = JSON.stringify(faqs);

  // Check-before-create: the prerendered HTML already carries this tag, so
  // hydration must reuse it rather than append a duplicate.
  useEffect(() => {
    let el = document.querySelector(`script#${schemaId}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = schemaId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (JSON.parse(serialized) as FAQ[]).map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    });
    return () => { el?.remove(); };
  }, [schemaId, serialized]);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">{heading}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between hover:bg-white/20 transition-colors duration-300"
                  data-testid={`button-faq-${index}`}
                >
                  <h3 className="text-base font-bold text-slate-900 pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="text-slate-600 leading-relaxed text-sm sm:text-[15px]">{faq.answer}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {footer && <p className="text-center text-sm text-slate-500 mt-10">{footer}</p>}
      </div>
    </section>
  );
}
