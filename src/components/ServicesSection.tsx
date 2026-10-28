import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import {
  GraduationCap,
  Users,
  Building,
  Stamp,
  Award,
  Briefcase,
  Landmark,
  Globe2,
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, openBookingModal, setSelectedServiceDetail } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'educational-attestation':
        return GraduationCap;
      case 'personal-attestation':
        return Users;
      case 'embassy-attestation':
        return Building;
      case 'mea-apostille':
        return Stamp;
      case 'hrd-attestation':
        return Award;
      case 'commercial-attestation':
        return Briefcase;
      case 'state-home-attestation':
        return Landmark;
      case 'mofa-assistance':
        return Globe2;
      default:
        return Stamp;
    }
  };

  const filteredServices = services.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'educational') return s.category === 'educational';
    if (activeFilter === 'personal') return s.category === 'personal';
    if (activeFilter === 'commercial') return s.category === 'commercial';
    if (activeFilter === 'embassy-apostille') return s.category === 'embassy' || s.category === 'apostille' || s.category === 'state';
    return true;
  });

  return (
    <section id="services" className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Document Authentication & Consular Legalization
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Attestation & Document Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Professional assistance for educational certificates, vital personal records, and commercial
            contracts. We manage the complete verification pipeline across university, state secretariats,
            Ministry of External Affairs, and diplomatic embassies.
          </p>
        </div>

        {/* Filter Segmented Control (Compliant with frontend-design: functional button elements) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl max-w-2xl mx-auto mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Services ({services.length})
          </button>
          <button
            onClick={() => setActiveFilter('educational')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFilter === 'educational'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Educational
          </button>
          <button
            onClick={() => setActiveFilter('personal')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFilter === 'personal'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveFilter('commercial')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFilter === 'commercial'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commercial
          </button>
          <button
            onClick={() => setActiveFilter('embassy-apostille')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFilter === 'embassy-apostille'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Embassy & Apostille
          </button>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const Icon = getServiceIcon(service.id);
            return (
              <div
                key={service.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all group"
              >
                <div>
                  {/* Top Row with Clean Unboxed Category Metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1357A6] flex items-center justify-center group-hover:bg-[#1357A6] group-hover:text-white transition-colors shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Natural editorial numbering & category without pills */}
                    <div className="text-right text-xs text-slate-500 font-medium">
                      <span>0{index + 1}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span className="capitalize">{service.category}</span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1357A6] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Documents List Bullet points */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 mb-6">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Typical Documents:
                    </div>
                    {service.documentsIncluded.slice(0, 3).map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                    {service.documentsIncluded.length > 3 && (
                      <div className="text-[11px] text-slate-500 italic pl-5">
                        +{service.documentsIncluded.length - 3} more document types
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions: View Service & Book Service */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedServiceDetail(service)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Service</span>
                  </button>

                  <button
                    onClick={() => openBookingModal(service.title)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#1357A6] hover:bg-[#1976D2] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#1357A6] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Not sure which attestation pathway applies to your certificate?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100">
              Bring your documents for free review at our Malleshwaram desk, or send copies on WhatsApp.
            </p>
          </div>
          <button
            onClick={() => openBookingModal()}
            className="px-5 py-2.5 bg-[#D6A84F] hover:bg-[#c29640] text-[#0B1F3A] font-bold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow"
          >
            Request Document Review
          </button>
        </div>

      </div>
    </section>
  );
};
