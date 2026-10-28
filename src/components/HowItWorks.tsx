import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ClipboardCheck,
  Search,
  Stamp,
  Bell,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { openBookingModal } = useApp();

  const steps = [
    {
      num: '01',
      icon: ClipboardCheck,
      title: 'Submit Your Requirement',
      desc: 'Book an appointment online, request a doorstep pickup in Bangalore, or bring your documents directly to our Malleshwaram desk.'
    },
    {
      num: '02',
      icon: Search,
      title: 'Document Review & Verification Check',
      desc: 'Our specialists inspect original certificates, verify university recognition, and determine the exact state and central department prerequisites.'
    },
    {
      num: '03',
      icon: Stamp,
      title: 'Authentication & Consular Legalization',
      desc: 'Dossiers are securely processed through state HRD/Home departments, the Ministry of External Affairs (MEA), and destination embassies in New Delhi/Mumbai.'
    },
    {
      num: '04',
      icon: Bell,
      title: 'Status Updates & Milestone Tracking',
      desc: 'Monitor real-time progress using your unique Tracking ID with live updates from university clearance to central diplomatic stamping.'
    },
    {
      num: '05',
      icon: PackageCheck,
      title: 'Document Delivery & Collection',
      desc: 'Collect your authenticated certificates in person at our Malleshwaram office, or receive them through insured doorstep courier anywhere in India.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Structured 5-Stage Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            How Goodway Handles Your Documents
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A transparent, secure, and stress-free process designed to give you peace of mind
            while your critical certificates are handled with complete confidentiality.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div>
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono group-hover:text-[#1357A6] transition-colors">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1357A6] flex items-center justify-center group-hover:bg-[#1357A6] group-hover:text-white transition-colors shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1357A6] transition-colors mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-slate-400 group-hover:text-[#1357A6] transition-colors">
                  <span>Stage {idx + 1} of 5</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-3 max-w-4xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Process & Timeline Notice:</strong> Exact processing stages, state department fees,
            and embassy turnaround times depend strictly upon the specific document type, the issuing state
            or university authority, and the destination country consular regulations. Goodway Attestation
            acts as your dedicated facilitation partner to manage every step seamlessly.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => openBookingModal()}
            className="px-6 py-3.5 bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#D6A84F]" />
            <span>Book Your Document Submission Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
