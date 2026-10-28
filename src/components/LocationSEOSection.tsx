import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocationSEO } from '../types';
import { MapPin, Truck, ArrowRight, Calendar, Building, CheckCircle2 } from 'lucide-react';

export const LocationSEOSection: React.FC = () => {
  const { seoLocations, openBookingModal } = useApp();
  const [selectedArea, setSelectedArea] = useState<LocationSEO>(seoLocations[0]);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Bangalore Hub & Doorstep Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Serving Key Corridors Across Bengaluru
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether visiting our Malleshwaram head office or requesting executive doorstep pickup
            from major IT hubs and residential layouts, Goodway provides prompt service across Bangalore.
          </p>
        </div>

        {/* Location Selector Tabs (Compliant with frontend-design tab buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-3xl mx-auto mb-10">
          {seoLocations.map((loc) => {
            const isSelected = loc.slug === selectedArea.slug;
            return (
              <button
                key={loc.slug}
                onClick={() => setSelectedArea(loc)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0B1F3A] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {loc.area}
              </button>
            );
          })}
        </div>

        {/* Selected Hub Details Card */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1357A6] mb-1">
                <MapPin className="w-4 h-4" />
                <span>Bangalore Location Service Guide</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedArea.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Truck className="w-4 h-4 text-[#1357A6]" />
              <span>{selectedArea.distanceFromOffice}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {selectedArea.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Highlights */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Service Highlights for {selectedArea.area}
              </div>
              <div className="space-y-1.5">
                {selectedArea.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Services */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Most In-Demand Attestation Paths
              </div>
              <div className="space-y-1.5">
                {selectedArea.commonServices.map((cs, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    {cs}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Direct consultation or scheduled pickup available for {selectedArea.area}.
            </span>
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 bg-[#1357A6] hover:bg-[#1976D2] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Schedule for {selectedArea.area}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
