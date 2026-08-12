"use client";

import { useState } from "react";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export interface FAQ {
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <FaqJsonLd faqs={faqs} />
      <h2 className="text-center text-[--text-section] font-semibold">{title}</h2>
      <dl className="mt-10 divide-y divide-[--color-gold]/20">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.question} className="py-2">
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium"
                >
                  <span>{faq.question}</span>
                  <span aria-hidden className="text-[--color-saffron]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </dt>
              {isOpen && (
                <dd className="pb-4 text-[--color-ink]/75">{faq.answer}</dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
