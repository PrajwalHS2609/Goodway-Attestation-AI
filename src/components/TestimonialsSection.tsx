import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Client Experiences & Case Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Trusted by Bangalore Professionals & Families
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Genuine experiences from clients who entrusted their vital degrees, marriage certificates,
            and commercial documents to our Malleshwaram desk.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D6A84F]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {t.verified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Service
                    </span>
                  )}
                </div>

                {/* Service Tag */}
                <div className="text-xs font-bold text-[#1357A6]">
                  {t.service}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.customerName}</div>
                  <div className="text-[11px] text-slate-500">{t.location}</div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {t.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
