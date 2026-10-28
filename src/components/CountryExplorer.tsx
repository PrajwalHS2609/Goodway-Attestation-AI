import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CountryGuide } from '../types';
import { Search, Globe2, ArrowRight, Eye, Sparkles, FileDown } from 'lucide-react';

export const CountryExplorer: React.FC = () => {
  const { countries, openBookingModal, openChecklistModal, setSelectedCountryDetail } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'gcc' | 'europe' | 'americas-oceania'>('all');

  const filteredCountries = countries.filter((c) => {
    // Search match
    const matchQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchQuery) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'gcc') {
      return ['AE', 'SA', 'QA', 'KW', 'OM', 'BH'].includes(c.code);
    }
    if (activeTab === 'europe') {
      return ['DE', 'GB', 'IT', 'FR', 'NL'].includes(c.code);
    }
    if (activeTab === 'americas-oceania') {
      return ['US', 'CA', 'AU'].includes(c.code);
    }
    return true;
  });

  return (
    <section id="countries" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Global Destination Protocols
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Attestation Services for Your Destination Country
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every country has distinct legalization frameworks. Hague Convention member nations accept
            an MEA Apostille, while Gulf and Asian countries require bilateral Embassy Attestation and
            state-level HRD verification.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination country (e.g. UAE, Germany, Saudi Arabia, UK)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6] focus:border-transparent transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Regional Filter Buttons (Compliant with frontend-design tab buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-[#0B1F3A] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Destinations ({countries.length})
            </button>
            <button
              onClick={() => setActiveTab('gcc')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'gcc'
                  ? 'bg-white text-[#0B1F3A] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              GCC & Middle East (Embassy)
            </button>
            <button
              onClick={() => setActiveTab('europe')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'europe'
                  ? 'bg-white text-[#0B1F3A] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Europe (Hague Apostille)
            </button>
            <button
              onClick={() => setActiveTab('americas-oceania')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'americas-oceania'
                  ? 'bg-white text-[#0B1F3A] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USA, Canada & Australia
            </button>
          </div>
        </div>

        {/* Country Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Header with Unboxed Metadata */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm group-hover:bg-[#1357A6] group-hover:text-white transition-colors">
                      {country.code}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1357A6] transition-colors">
                        {country.name}
                      </h3>
                      {/* Zero-Pill unboxed metadata text with subtle separator */}
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                        <span>{country.type}</span>
                        {country.popular && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#D6A84F] font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              High Demand
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {country.description}
                </p>

                {/* Authentication Stages Summary */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1 mb-4">
                  <div className="font-semibold text-slate-900 text-[11px] uppercase tracking-wider text-slate-500">
                    Primary Route:
                  </div>
                  <div className="line-clamp-2 leading-tight font-medium text-slate-800">
                    {country.workflow.slice(0, 2).join(' → ')} ...
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCountryDetail(country)}
                  className="py-2 px-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="View Process Details"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Process</span>
                </button>

                <button
                  onClick={() => openChecklistModal(country.name.toLowerCase())}
                  className="py-2 px-2.5 text-xs font-bold text-[#1357A6] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer border border-blue-200"
                  title="Generate PDF Checklist"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Checklist</span>
                </button>

                <button
                  onClick={() => openBookingModal(undefined, country.name)}
                  className="flex-1 py-2 px-2.5 text-xs font-semibold text-white bg-[#1357A6] hover:bg-[#1976D2] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                >
                  <span>Book {country.code}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Globe2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-800">No destination found matching &ldquo;{searchQuery}&rdquo;</div>
            <p className="text-xs text-slate-500 mt-1">
              Goodway Attestation handles 120+ countries worldwide. Contact our team directly for custom destination requirements.
            </p>
            <button
              onClick={() => openBookingModal()}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#1357A6] rounded-lg hover:bg-[#1976D2]"
            >
              Inquire Custom Destination
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
