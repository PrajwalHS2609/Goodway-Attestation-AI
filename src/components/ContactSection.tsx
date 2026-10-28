import React from 'react';
import { useApp } from '../context/AppContext';
import { formatWhatsAppLink } from '../utils/helpers';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageSquare,
  Calendar,
  Building2,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, openBookingModal } = useApp();

  const whatsappUrl = formatWhatsAppLink(
    settings.whatsappNumber,
    'Hello Goodway Attestation, I would like to visit your Malleshwaram office for document attestation.'
  );

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Goodway Attestation, #134, Shop No. 2, 1st Floor, K.N. Complex, 11th Cross, Temple Street, Malleshwaram, Bengaluru 560003'
  )}`;

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Visit Our Registered Malleshwaram Office
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Contact & Head Office Location
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Conveniently situated on Temple Street in central Malleshwaram, opposite Canara Bank.
            Walk-ins, consultation appointments, and document drop-offs are welcome during regular business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Official Head Office
              </div>
              <h3 className="text-xl font-extrabold text-[#0B1F3A] mt-1">
                GOODWAY ATTESTATION
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <MapPin className="w-5 h-5 text-[#1357A6] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Registered Office Address:</div>
                <p className="leading-relaxed mt-0.5">
                  #134, Shop No. 2, 1st Floor, K.N. Complex, <br />
                  11th Cross, Temple Street, Opp. Canara Bank, <br />
                  Malleshwaram, Bengaluru – 560003, Karnataka, India.
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <Phone className="w-5 h-5 text-[#1357A6] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Direct Consultation Lines:</div>
                <div className="flex flex-col gap-1 mt-1">
                  <a
                    href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                    className="text-[#1357A6] font-bold hover:underline"
                  >
                    {settings.primaryPhone} (Primary Desk)
                  </a>
                  {settings.secondaryPhone && (
                    <a
                      href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
                      className="text-slate-600 hover:text-[#1357A6]"
                    >
                      {settings.secondaryPhone} (Corporate Inquiries)
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <Mail className="w-5 h-5 text-[#1357A6] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Official Inquiries Email:</div>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[#1357A6] hover:underline"
                >
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
              <Clock className="w-5 h-5 text-[#1357A6] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Office Working Hours:</div>
                <div className="text-slate-600 mt-0.5">
                  <div>{settings.workingDays.join(' – ')}: {settings.openingTime} – {settings.closingTime}</div>
                  <div className="text-slate-500 text-xs">Sundays: {settings.sundayStatus}</div>
                </div>
              </div>
            </div>

            {/* 4 Action Buttons */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Call Now</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1357A6] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={() => openBookingModal()}
                className="py-2.5 px-3 rounded-xl bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Book Visit</span>
              </button>
            </div>
          </div>

          {/* Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full min-h-[420px]">
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Building2 className="w-4 h-4 text-[#1357A6]" />
                <span>Malleshwaram Location Map (Opp. Canara Bank, 11th Cross)</span>
              </div>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1357A6] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Real Google Map Embed for Malleshwaram Bengaluru */}
            <div className="flex-1 w-full relative min-h-[360px]">
              <iframe
                title="Goodway Attestation Malleshwaram Bengaluru Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6749969165384!2d77.56828557582236!3d13.00350438731454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1641014e3863%3A0x7d33d9aa36a7187e!2sTemple%20St%2C%20Malleshwaram%2C%20Bengaluru%2C%20Karnataka%20560003!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
