import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, User, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

export const BlogModal: React.FC = () => {
  const { selectedBlogPost, setSelectedBlogPost, openBookingModal } = useApp();

  if (!selectedBlogPost) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0B1F3A] text-white rounded-t-2xl">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#D6A84F]">
              {selectedBlogPost.category}
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5 line-clamp-1">
              {selectedBlogPost.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedBlogPost(null)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {selectedBlogPost.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Published: {selectedBlogPost.publishedDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {selectedBlogPost.readingTime}
            </span>
          </div>

          {/* Table of contents */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Table of Contents
            </div>
            <ul className="space-y-1.5 text-xs text-[#1357A6]">
              {selectedBlogPost.tableOfContents.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono">0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {selectedBlogPost.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Article Specific FAQs */}
          {selectedBlogPost.faqs && selectedBlogPost.faqs.length > 0 && (
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#1357A6]" />
                Key Q&A for This Topic
              </h4>
              <div className="space-y-2.5">
                {selectedBlogPost.faqs.map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900 mb-1">{f.q}</div>
                    <div className="text-slate-600 leading-relaxed">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to action inside blog */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#1357A6] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold">Have documents for this destination?</div>
              <div className="text-xs text-blue-100">Schedule your review with Goodway specialists in Malleshwaram.</div>
            </div>
            <button
              onClick={() => {
                setSelectedBlogPost(null);
                openBookingModal();
              }}
              className="px-4 py-2.5 bg-[#D6A84F] hover:bg-[#c29640] text-[#0B1F3A] font-bold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow"
            >
              Book Appointment Now
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
          <button
            onClick={() => setSelectedBlogPost(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
