import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrackingItem } from '../types';
import { formatWhatsAppLink } from '../utils/helpers';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Calendar
} from 'lucide-react';

export const TrackingSection: React.FC = () => {
  const { getTrackingItem, settings, trackings } = useApp();
  const [searchQuery, setSearchQuery] = useState('GWA-TRK-7842');
  const [activeTracking, setActiveTracking] = useState<TrackingItem | null>(() => {
    return getTrackingItem('GWA-TRK-7842') || null;
  });
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = getTrackingItem(searchQuery.trim());
    setActiveTracking(found || null);
    setSearched(true);
  };

  const selectDemoTracking = (id: string) => {
    setSearchQuery(id);
    const found = getTrackingItem(id);
    setActiveTracking(found || null);
    setSearched(true);
  };

  const getStatusColor = (status: TrackingItem['currentStatus']) => {
    switch (status) {
      case 'Received':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Under Verification':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'At Authority':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Embassy Processing':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Ready':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Delivered':
        return 'text-teal-700 bg-teal-50 border-teal-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const stagesList = [
    'Received',
    'Under Verification',
    'At Authority',
    'Embassy Processing',
    'Ready',
    'Delivered'
  ];

  const getCurrentStageIndex = (status: TrackingItem['currentStatus']) => {
    const idx = stagesList.indexOf(status);
    return idx >= 0 ? idx : 1;
  };

  const whatsappInquiryUrl = activeTracking
    ? formatWhatsAppLink(
        settings.whatsappNumber,
        `Hello Goodway Attestation, I am checking the status of my document dossier Tracking ID: ${activeTracking.trackingId} (${activeTracking.customerName}).`
      )
    : '#';

  return (
    <section id="track" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Real-Time Milestone Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Track Your Document Dossier
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enter your unique Goodway Tracking ID or registered mobile number to check the active
            authentication status of your academic, personal, or commercial certificates.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Tracking ID (e.g. GWA-TRK-7842 or booking ID)..."
              className="w-full pl-5 pr-32 py-4 rounded-2xl border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6] shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {/* Quick Demo Tracking ID Buttons for instant preview */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium">Try Sample Tracking IDs:</span>
            {trackings.slice(0, 3).map((item) => (
              <button
                key={item.trackingId}
                onClick={() => selectDemoTracking(item.trackingId)}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[#1357A6] font-mono text-[11px] font-semibold hover:border-[#1357A6] hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {item.trackingId} ({item.country})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details View */}
        {activeTracking ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Active Document Dossier
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] flex items-center gap-2">
                  <span>{activeTracking.documentType}</span>
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                  <span>Tracking ID: <strong className="font-mono text-slate-800">{activeTracking.trackingId}</strong></span>
                  <span>·</span>
                  <span>Destination: <strong className="text-slate-800">{activeTracking.country}</strong></span>
                  <span>·</span>
                  <span>Customer: <strong className="text-slate-800">{activeTracking.customerName}</strong></span>
                </div>
              </div>

              {/* Status pill & last updated */}
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Current Milestone</div>
                <div className={`inline-block px-3 py-1 rounded-full border text-xs font-extrabold ${getStatusColor(activeTracking.currentStatus)}`}>
                  {activeTracking.currentStatus}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Last updated: {activeTracking.lastUpdated}
                </div>
              </div>
            </div>

            {/* Visual Multi-Stage Progress Bar */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Milestone Pipeline
              </div>
              <div className="relative">
                {/* Horizontal line for desktop */}
                <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-slate-100 -z-0" />
                
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                  {stagesList.map((stage, idx) => {
                    const currentIdx = getCurrentStageIndex(activeTracking.currentStatus);
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={stage} className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-[#1357A6] text-white ring-4 ring-blue-100'
                              : 'bg-white border-2 border-slate-200 text-slate-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs mt-2 font-semibold ${
                            isCurrent
                              ? 'text-[#1357A6] font-bold'
                              : isCompleted
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Expected Completion Date Card */}
            {activeTracking.expectedCompletion && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#1357A6]" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Estimated Completion</div>
                    <div className="text-sm font-bold text-slate-900">
                      Target Delivery / Readiness: {activeTracking.expectedCompletion}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Subject to consular processing cycles
                </span>
              </div>
            )}

            {/* Timestamped Log History */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Chronological Milestone History
              </div>
              <div className="space-y-3">
                {activeTracking.history.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                      log.completed
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-dashed border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5">
                      {log.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {log.status}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {log.date}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{log.location}</span>
                      </div>
                      <p className="text-xs text-slate-500 pt-0.5 leading-relaxed">
                        {log.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Support Assistance for this tracking */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Need urgent assistance or have updated travel dates?</span>
              </div>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Handling Officer on WhatsApp</span>
              </a>
            </div>

          </div>
        ) : searched ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              No Dossier Found Matching &ldquo;{searchQuery}&rdquo;
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please check your Tracking ID or registered mobile number. If you recently dropped off
              documents at our Malleshwaram desk, your tracking entry may take up to 2 hours to sync.
            </p>
            <div className="pt-2">
              <a
                href={formatWhatsAppLink(settings.whatsappNumber, `Hello, I need help checking my tracking ID: ${searchQuery}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1357A6] hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Inquire with Support via WhatsApp
              </a>
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
};
