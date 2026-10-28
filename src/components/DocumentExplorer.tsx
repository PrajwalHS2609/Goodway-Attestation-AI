import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentTypeItem } from '../types';
import {
  FileText,
  GraduationCap,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const DocumentExplorer: React.FC = () => {
  const { documentTypes, openBookingModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<'educational' | 'personal' | 'commercial'>('educational');
  const [selectedDocId, setSelectedDocId] = useState<string>('degree-certificate');

  const filteredDocs = documentTypes.filter((d) => d.category === activeCategory);
  const activeDoc = documentTypes.find((d) => d.id === selectedDocId) || filteredDocs[0];

  const handleCategoryChange = (cat: 'educational' | 'personal' | 'commercial') => {
    setActiveCategory(cat);
    const firstInCat = documentTypes.find((d) => d.category === cat);
    if (firstInCat) setSelectedDocId(firstInCat.id);
  };

  return (
    <section id="documents" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Document Classification Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Comprehensive Document Requirements Guide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your certificate category below to see exact prerequisites, university/state
            verification procedures, and destination-specific guidelines.
          </p>
        </div>

        {/* Category Tabs (Compliant with frontend-design: functional tab buttons) */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto mb-10">
          <button
            onClick={() => handleCategoryChange('educational')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeCategory === 'educational'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#1357A6]" />
            <span>Educational</span>
          </button>

          <button
            onClick={() => handleCategoryChange('personal')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeCategory === 'personal'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#1357A6]" />
            <span>Personal</span>
          </button>

          <button
            onClick={() => handleCategoryChange('commercial')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeCategory === 'commercial'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#1357A6]" />
            <span>Commercial</span>
          </button>
        </div>

        {/* Master Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Document list menu (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Specific Document:
            </div>
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === activeDoc?.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#1357A6] bg-blue-50/70 text-[#0B1F3A] shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className={`w-4 h-4 ${
                        isSelected ? 'text-[#1357A6]' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-xs sm:text-sm font-bold">{doc.name}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#1357A6] translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detailed Document Specification Card (8 cols) */}
          {activeDoc && (
            <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6] mb-1">
                    Document Specification & Checklist
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                    {activeDoc.name}
                  </h3>
                </div>
                <button
                  onClick={() => openBookingModal(undefined, undefined)}
                  className="px-4 py-2 bg-[#1357A6] hover:bg-[#1976D2] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>Book for this Document</span>
                </button>
              </div>

              {/* Description & Typical Use */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeDoc.description}
                </p>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800">
                  <span className="font-bold text-[#1357A6]">Typical Official Use: </span>
                  {activeDoc.typicalUse}
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                  Documents You Must Provide
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDoc.requiredDocuments.map((req, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Process Pipeline */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                  Sequential Authentication Stages
                </h4>
                <div className="space-y-2">
                  {activeDoc.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#1357A6] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document specific FAQ */}
              {activeDoc.faq && activeDoc.faq.length > 0 && (
                <div className="pt-2 border-t border-slate-200">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#1357A6]" />
                    Expert FAQ for {activeDoc.name}
                  </h4>
                  <div className="space-y-2">
                    {activeDoc.faq.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs">
                        <div className="font-bold text-slate-900 mb-1">{item.q}</div>
                        <div className="text-slate-600 leading-relaxed">{item.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
