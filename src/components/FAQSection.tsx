import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

export const FAQSection: React.FC = () => {
  const { isMobileView } = useDevice();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Cabo Verde’s White Glove Delivery service?',
      a: 'Every order exceeding $500 includes complimentary White Glove logistics. Our certified two-person delivery team brings the furniture into your room of choice, uncrates and inspects every component, completes full assembly, and removes all packaging materials.',
    },
    {
      q: 'Can I customize dimensions or fabrics for a specific architectural space?',
      a: 'Yes! We frequently collaborate with interior designers and private clients on custom dimension adaptations, COM (Customer’s Own Material) fabrics, and commercial grade finishes. Send your architectural floor plan to client@webmedia.al to request a bespoke quote.',
    },
    {
      q: 'How does the 30-Day In-Home Trial work?',
      a: 'Experience your chosen pieces inside your home lighting for up to 30 calendar days. If the comfort or aesthetic does not align with your vision, simply notify us at client@webmedia.al to arrange complimentary return shipping and receive a 100% refund.',
    },
    {
      q: 'How do I care for Cabo Verde top-grain leather and natural linen?',
      a: 'We provide an artisanal care kit with every upholstery purchase. Dust weekly with a soft brush and avoid direct sunlight exposure. For emergency spills, blot immediately with a clean, dry microfiber cloth.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-red-100">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Have questions before ordering? Our design team is ready to assist.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 sm:py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-neutral-900 hover:text-red-600 transition-colors py-1 cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4 leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-600 leading-relaxed animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clean responsive question banner with direct routing to client@webmedia.al */}
        <div className={`mt-10 p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between gap-4 ${
          isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row text-center sm:text-left'
        }`}>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-neutral-900">Still have a question?</h4>
            <p className="text-xs text-neutral-500 mt-1">
              Contact our design desk directly: <strong className="text-red-600 font-mono">client@webmedia.al</strong>
            </p>
          </div>
          <a
            href="mailto:client@webmedia.al?subject=Cabo Verde Design Inquiry"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-red-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <Mail className="w-4 h-4 text-red-400" />
            <span>Email client@webmedia.al</span>
          </a>
        </div>

      </div>
    </section>
  );
};
