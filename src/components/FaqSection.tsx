import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle, Search, Calendar, MessageSquare } from 'lucide-react';
import { formatWhatsAppLink } from '../utils/helpers';

export const FaqSection: React.FC = () => {
  const { faqs, settings, openBookingModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  const whatsappFaqUrl = formatWhatsAppLink(
    settings.whatsappNumber,
    'Hello Goodway Attestation, I have a specific question regarding certificate attestation.'
  );

  return (
    <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Transparent Knowledge & Guidelines
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Essential clarity on apostille vs embassy attestation, state HRD procedures, turnaround
            times, and document custody.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. apostille, HRD, turnaround time, original certificate)..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#1357A6]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No matching questions found. Chat with our consultant directly on WhatsApp.
          </div>
        )}

        {/* Bottom Help Card */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Still have questions regarding your specific university or document?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Our Malleshwaram advisors are available for instant telephonic consultation.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappFaqUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <button
              onClick={() => openBookingModal()}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#1357A6] hover:bg-[#1976D2] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D6A84F]" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
