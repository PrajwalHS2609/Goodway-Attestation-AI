import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { legalModalType, closeLegalModal, settings } = useApp();

  if (!legalModalType) return null;

  const getTitle = () => {
    switch (legalModalType) {
      case 'privacy':
        return 'Privacy & Data Protection Policy';
      case 'terms':
        return 'Terms of Service & Engagement';
      case 'document-handling':
        return 'Document Security & Handling Policy';
      case 'refund':
        return 'Refund & Cancellation Guidelines';
      case 'disclaimer':
        return 'Legal Disclaimer & Facilitation Notice';
      default:
        return 'Legal Information';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0B1F3A] text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D6A84F]" />
            <h3 className="text-lg font-bold text-white">{getTitle()}</h3>
          </div>
          <button
            onClick={closeLegalModal}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {legalModalType === 'privacy' && (
            <>
              <p>
                At <strong>Goodway Attestation</strong> (Malleshwaram, Bengaluru), safeguarding
                the personal data, identity credentials, and educational certificates of our clients is
                our highest priority.
              </p>
              <h4 className="font-bold text-slate-900 text-sm pt-2">1. Information We Collect</h4>
              <p>
                We collect names, contact numbers, email addresses, passport copies, educational
                certificates, and vital personal records solely to fulfill document attestation,
                state verification, and consular authentication requested by you.
              </p>
              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Confidentiality & Storage</h4>
              <p>
                Digital scans uploaded through our website are stored in encrypted environments and are
                never indexed by search engines or shared with third parties for marketing.
              </p>
              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Physical Security</h4>
              <p>
                Original physical certificates remain in dedicated custody vaults at our Malleshwaram
                office and are transferred only through insured couriers or authorized diplomatic liaison officers.
              </p>
            </>
          )}

          {legalModalType === 'terms' && (
            <>
              <p>
                By requesting services or booking an appointment with Goodway Attestation, you agree
                to the following terms of engagement:
              </p>
              <h4 className="font-bold text-slate-900 text-sm pt-2">1. Scope of Service</h4>
              <p>
                Goodway Attestation acts as an authorized document facilitation and administrative
                processing partner for educational, personal, and commercial certificates.
              </p>
              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Client Responsibility</h4>
              <p>
                Clients must ensure that all certificates submitted are genuine and issued by
                accredited educational institutions, registrar departments, or statutory bodies.
                Any submission of counterfeit or altered documents will be immediately reported.
              </p>
              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Timelines & Consular Delays</h4>
              <p>
                Processing timelines provided are good-faith estimates based on standard university,
                HRD, and embassy schedules. Turnaround times may vary due to diplomatic holidays,
                governmental system updates, or university verification delays beyond our direct control.
              </p>
            </>
          )}

          {legalModalType === 'document-handling' && (
            <>
              <p>
                Original documents such as university degrees, birth certificates, and marriage certificates
                are irreplaceable assets. We adhere to a strict Chain of Custody standard:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 pt-1">
                <li>Immediate logging into our inward tracking register upon receipt.</li>
                <li>Inspection for any prior damage or lamination issues before processing.</li>
                <li>Storage in fire-resistant security cabinets.</li>
                <li>Transport in water-resistant, tamper-evident security satchels.</li>
                <li>Verification of client identity and signature upon delivery or in-office collection.</li>
              </ul>
            </>
          )}

          {legalModalType === 'refund' && (
            <>
              <h4 className="font-bold text-slate-900 text-sm">Cancellation & Refund Guidelines</h4>
              <p>
                Appointments can be cancelled or rescheduled at no charge prior to physical document
                submission. Once government challans (e.g. MEA fees, university fees, embassy attestation
                stamps) have been disbursed to relevant departments, government fees become non-refundable.
              </p>
              <p className="pt-2">
                If a document cannot be processed due to university closure or jurisdictional changes
                prior to submission, administrative fees will be reconciled transparently.
              </p>
            </>
          )}

          {legalModalType === 'disclaimer' && (
            <>
              <h4 className="font-bold text-slate-900 text-sm">Facilitation Disclaimer</h4>
              <p>
                Goodway Attestation is a private document assistance and legalization consultancy
                operating in Bengaluru, India. We are NOT a government ministry, nor are we a foreign
                embassy or consulate.
              </p>
              <p className="pt-2">
                All final approvals, authentication seals, apostille stickers, and consular stamps
                remain at the sole discretion of the respective State Education/Home Departments,
                the Ministry of External Affairs (MEA), Government of India, and the diplomatic missions
                of foreign sovereign states.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 p-4 bg-slate-50 border-t border-slate-200 text-right rounded-b-2xl">
          <button
            onClick={closeLegalModal}
            className="px-5 py-2 bg-[#1357A6] text-white text-xs font-bold rounded-lg hover:bg-[#1976D2]"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
};
