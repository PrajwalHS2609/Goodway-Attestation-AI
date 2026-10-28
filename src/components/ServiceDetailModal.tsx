import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Calendar, FileText, ArrowRight, HelpCircle, FileDown } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { selectedServiceDetail, setSelectedServiceDetail, openBookingModal, openChecklistModal } = useApp();

  if (!selectedServiceDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0B1F3A] text-white rounded-t-2xl">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#D6A84F]">
              Service Guide
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
              {selectedServiceDetail.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedServiceDetail(null)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
              Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedServiceDetail.description}
            </p>
          </div>

          {/* Typical Use Cases */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
            <h4 className="text-xs font-bold text-[#1357A6] uppercase tracking-wider mb-1">
              Typical Purpose & Purpose of Attestation
            </h4>
            <p className="text-xs sm:text-sm text-slate-800">
              {selectedServiceDetail.typicalUse}
            </p>
          </div>

          {/* Documents Included */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Documents Covered Under This Service
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedServiceDetail.documentsIncluded.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-800"
                >
                  <FileText className="w-3.5 h-3.5 text-[#1357A6] shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Processing Stages */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Standard Authentication Pathway
            </h4>
            <div className="space-y-2">
              {selectedServiceDetail.stages.map((stage, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1357A6] text-white flex items-center justify-center font-bold shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Documents Required From Applicant
            </h4>
            <div className="space-y-1.5">
              {selectedServiceDetail.requiredDocuments.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Specific FAQs */}
          {selectedServiceDetail.faq && selectedServiceDetail.faq.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#1357A6]" />
                Frequently Asked for This Service
              </h4>
              <div className="space-y-3">
                {selectedServiceDetail.faq.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-900 mb-1">{item.q}</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            <strong>Important Note:</strong> Exact processing stages, fees, and timelines are
            determined by issuing educational/state authorities and target embassy consular
            regulations. Goodway Attestation provides document facilitation and legal verification
            handling.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
          <button
            onClick={() => {
              const cat = selectedServiceDetail.category;
              const mappedCat = cat === 'commercial' ? 'commercial' : cat === 'personal' ? 'personal' : 'educational';
              setSelectedServiceDetail(null);
              openChecklistModal(undefined, mappedCat);
            }}
            className="px-4 py-2 text-xs font-bold text-[#1357A6] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-[#1357A6]" />
            <span>Download Preparation Checklist (PDF)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedServiceDetail(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                const sTitle = selectedServiceDetail.title;
                setSelectedServiceDetail(null);
                openBookingModal(sTitle);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1357A6] hover:bg-[#1976D2] rounded-lg transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Book Appointment for This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
