import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRY_CHECKLIST_RULES, CountryChecklistRule } from '../utils/checklistData';
import { generateChecklistPDF } from '../utils/pdfGenerator';
import { formatWhatsAppLink } from '../utils/helpers';
import {
  X,
  FileDown,
  Printer,
  CheckSquare,
  Square,
  Globe2,
  FileText,
  AlertCircle,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Building,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const ChecklistGeneratorModal: React.FC = () => {
  const {
    isChecklistModalOpen,
    closeChecklistModal,
    checklistCountry,
    checklistCategory,
    settings,
    openBookingModal,
    showToast
  } = useApp();

  // Selection states
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('uae');
  const [selectedCategory, setSelectedCategory] = useState<'educational' | 'personal' | 'commercial'>('educational');
  const [selectedDocType, setSelectedDocType] = useState<string>('Degree Certificate (B.E. / B.Tech / MBA / MBBS)');
  const [applicantName, setApplicantName] = useState<string>('');

  // Interactive checked items on screen
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Sync props when opened
  useEffect(() => {
    if (isChecklistModalOpen) {
      if (checklistCountry) {
        const lower = checklistCountry.toLowerCase();
        if (lower.includes('uae') || lower.includes('emirates')) setSelectedCountryKey('uae');
        else if (lower.includes('saudi')) setSelectedCountryKey('saudi');
        else if (lower.includes('qatar')) setSelectedCountryKey('qatar');
        else if (lower.includes('germany')) setSelectedCountryKey('germany');
        else if (lower.includes('uk') || lower.includes('kingdom')) setSelectedCountryKey('uk');
        else if (lower.includes('usa') || lower.includes('states')) setSelectedCountryKey('usa');
        else if (lower.includes('canada')) setSelectedCountryKey('canada');
        else setSelectedCountryKey('general');
      }
      if (checklistCategory) {
        setSelectedCategory(checklistCategory);
      }
      setCheckedItems({});
    }
  }, [isChecklistModalOpen, checklistCountry, checklistCategory]);

  if (!isChecklistModalOpen) return null;

  const currentRule: CountryChecklistRule =
    COUNTRY_CHECKLIST_RULES[selectedCountryKey] || COUNTRY_CHECKLIST_RULES.general;

  const primaryDocs =
    currentRule.primaryDocuments[selectedCategory] ||
    currentRule.primaryDocuments.educational ||
    [];

  const supportingDocs =
    currentRule.supportingDocuments[selectedCategory] ||
    currentRule.supportingDocuments.educational ||
    [];

  const toggleCheck = (itemText: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  const handleDownloadPDF = () => {
    try {
      generateChecklistPDF({
        rule: currentRule,
        category: selectedCategory,
        applicantName: applicantName.trim() || undefined,
        documentTypeName: selectedDocType,
        settings
      });
      showToast(`PDF Checklist downloaded for ${currentRule.countryName}!`);
    } catch (e) {
      console.error('PDF generation error', e);
      alert('Could not generate PDF. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = `Hello Goodway Attestation, I generated a document checklist for ${currentRule.countryName} (${selectedDocType}). I would like to verify my paperwork.`;
  const whatsappUrl = formatWhatsAppLink(settings.whatsappNumber, whatsappMessage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1357A6] flex items-center justify-center text-[#D6A84F]">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#D6A84F] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Document Readiness Engine</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Downloadable Attestation & Apostille Checklist Generator
              </h2>
            </div>
          </div>
          <button
            onClick={closeChecklistModal}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Controls Bar: Select Country, Category & Document */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Step 1: Select Your Destination & Certificate Profile
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Destination Country */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Destination Country
                </label>
                <select
                  value={selectedCountryKey}
                  onChange={(e) => {
                    setSelectedCountryKey(e.target.value);
                    setCheckedItems({});
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                >
                  <option value="uae">United Arab Emirates (UAE) - Embassy</option>
                  <option value="saudi">Saudi Arabia (KSA) - Cultural & Embassy</option>
                  <option value="qatar">Qatar - Embassy (Trio Rule)</option>
                  <option value="germany">Germany - MEA Apostille</option>
                  <option value="uk">United Kingdom (UK) - MEA Apostille</option>
                  <option value="usa">United States of America (USA) - MEA Apostille</option>
                  <option value="canada">Canada - MEA Apostille</option>
                  <option value="general">Global International Standard</option>
                </select>
              </div>

              {/* Document Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Document Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value as any);
                    setCheckedItems({});
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                >
                  <option value="educational">Educational Certificates</option>
                  <option value="personal">Personal / Vital Records</option>
                  <option value="commercial">Commercial Documents</option>
                </select>
              </div>

              {/* Specific Document Type */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Document Sub-type
                </label>
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                >
                  {selectedCategory === 'educational' ? (
                    <>
                      <option value="Degree Certificate (B.E. / B.Tech / MBA / MBBS)">Degree Certificate (UG/PG)</option>
                      <option value="Diploma Certificate (Polytechnic/Technical)">Diploma Certificate</option>
                      <option value="Consolidated Transcripts & Marksheets">Consolidated Transcripts</option>
                      <option value="School Leaving / 10th & 12th Board">10th & 12th Certificates</option>
                    </>
                  ) : selectedCategory === 'personal' ? (
                    <>
                      <option value="Marriage Certificate">Marriage Certificate</option>
                      <option value="Birth Certificate">Birth Certificate</option>
                      <option value="Power of Attorney (POA)">Power of Attorney (POA)</option>
                      <option value="Single Status / General Affidavit">Affidavit / Single Status</option>
                    </>
                  ) : (
                    <>
                      <option value="Certificate of Incorporation & MOA">Certificate of Incorporation & MOA</option>
                      <option value="Commercial Invoices & Packing Lists">Commercial Invoices & Packing Lists</option>
                      <option value="Board Resolution & Power of Attorney">Board Resolution & Power of Attorney</option>
                      <option value="Certificate of Origin">Certificate of Origin</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Optional Applicant Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Applicant Name / Dossier Reference (Optional - printed on your PDF)
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma / Bangalore"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full sm:w-1/2 p-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1357A6]"
              />
            </div>
          </div>

          {/* Legalization Protocol Banner */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-[#1357A6] shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900">
                  {currentRule.countryName} Legalization Type:
                </span>
                <span className="ml-2 text-xs font-extrabold text-[#1357A6] bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                  {currentRule.type}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Malleshwaram Processing Hub · Bengaluru
            </span>
          </div>

          {/* Live Interactive Checklist Preview */}
          <div className="space-y-6">
            
            {/* Section 1: Original Certificate Prerequisites */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1357A6] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Primary Original Certificate Prerequisites (Mandatory)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Click boxes to test readiness</span>
              </div>

              <div className="space-y-2">
                {primaryDocs.map((item, idx) => {
                  const isChecked = !!checkedItems[item];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(item)}
                      className={`p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <button type="button" className="mt-0.5 text-[#1357A6]">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <span className={`text-xs sm:text-sm ${isChecked ? 'line-through opacity-80' : 'font-medium'}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Identification & Supporting Credentials */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#1357A6] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Identification & Supporting Credentials</span>
              </h4>

              <div className="space-y-2">
                {supportingDocs.map((item, idx) => {
                  const isChecked = !!checkedItems[item];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(item)}
                      className={`p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <button type="button" className="mt-0.5 text-[#1357A6]">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <span className={`text-xs sm:text-sm ${isChecked ? 'line-through opacity-80' : 'font-medium'}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Sequential Authentication Pathway */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700">
                Official Sequential Authentication Pipeline for {currentRule.countryName}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                {currentRule.workflowStages.map((stage, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Crucial Guidelines & Verification Notices */}
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Crucial Guidelines for {currentRule.countryName}</span>
              </div>
              <ul className="space-y-1 list-disc pl-5">
                {currentRule.crucialNotes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Submission and Office Drop-off info */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900">
                Ready to Handover Documents?
              </div>
              <div>
                Drop off in person at our Malleshwaram desk, or schedule a door-to-door courier pickup across Bengaluru.
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Hours: Mon–Sat {settings.openingTime} – {settings.closingTime}
            </div>
          </div>

        </div>

        {/* Footer Actions: Download PDF, Print, WhatsApp & Book */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-[#D6A84F]" />
              <span>Download Official PDF Checklist</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Print Checklist"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                closeChecklistModal();
                openBookingModal(undefined, currentRule.countryName);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#0B1F3A] hover:bg-[#132d52] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Book Appointment</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
