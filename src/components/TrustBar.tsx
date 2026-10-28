import React from 'react';
import {
  FileCheck2,
  Lock,
  Compass,
  BellRing,
  Truck,
  Globe
} from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: FileCheck2,
      title: 'Professional Assistance',
      desc: 'Expert document review before submission'
    },
    {
      icon: Lock,
      title: 'Secure Handling',
      desc: 'Tamper-evident chain of custody'
    },
    {
      icon: Compass,
      title: 'Process Guidance',
      desc: 'Clear steps for HRD, MEA & Embassies'
    },
    {
      icon: BellRing,
      title: 'Status Updates',
      desc: 'Milestone tracking for every dossier'
    },
    {
      icon: Truck,
      title: 'Pickup & Delivery',
      desc: 'Bangalore-wide scheduled collection'
    },
    {
      icon: Globe,
      title: 'Global Documentation',
      desc: 'Legalization for 120+ destinations'
    }
  ];

  return (
    <div className="bg-white border-y border-slate-200 py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-start space-y-1.5 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1357A6] flex items-center justify-center group-hover:bg-[#1357A6] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#1357A6] transition-colors">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
