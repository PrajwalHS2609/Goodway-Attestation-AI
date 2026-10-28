import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { generateTimeSlots, formatDateDisplay, formatWhatsAppLink } from '../utils/helpers';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Printer,
  CalendarPlus,
  MessageSquare,
  AlertTriangle,
  FileDown
} from 'lucide-react';
import { Appointment } from '../types';
import { generateChecklistPDF } from '../utils/pdfGenerator';
import { COUNTRY_CHECKLIST_RULES } from '../utils/checklistData';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    preselectedService,
    preselectedCountry,
    settings,
    addAppointment,
    appointments,
    showToast
  } = useApp();

  // 10-Step state variables
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<string>('Certificate Attestation');
  const [documentType, setDocumentType] = useState<string>('Degree Certificate');
  const [destinationCountry, setDestinationCountry] = useState<string>('United Arab Emirates (UAE)');
  const [numberOfDocuments, setNumberOfDocuments] = useState<string>('1');
  const [appointmentType, setAppointmentType] = useState<'Office Visit' | 'Document Pickup' | 'Online Consultation' | 'Phone Consultation'>('Office Visit');
  
  // Date & Time state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  
  // Customer info
  const [fullName, setFullName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [sameAsMobile, setSameAsMobile] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Bengaluru (Malleshwaram)');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  
  // Additional info & file upload
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; type: string; url?: string }[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  // Consent
  const [consentGiven, setConsentGiven] = useState<boolean>(true);

  // Submitted Appointment Result
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Sync preselected props when modal opens
  useEffect(() => {
    if (isBookingModalOpen) {
      if (preselectedService) setService(preselectedService);
      if (preselectedCountry) setDestinationCountry(preselectedCountry);
      // Default date: tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = tomorrow.toISOString().split('T')[0];
      setSelectedDate(iso);
      setConfirmedBooking(null);
      setStep(1);
    }
  }, [isBookingModalOpen, preselectedService, preselectedCountry]);

  // Sync WhatsApp with Mobile if checkbox checked
  useEffect(() => {
    if (sameAsMobile) {
      setWhatsapp(mobile);
    }
  }, [mobile, sameAsMobile]);

  if (!isBookingModalOpen) return null;

  // Compute available slots dynamically based on settings and existing appointments
  const allSlots = generateTimeSlots(settings.openingTime, settings.closingTime, settings.appointmentDuration);
  
  // Check if selected date is blocked or Sunday
  const isDateBlocked = settings.blockedDates.includes(selectedDate);
  const dateObj = selectedDate ? new Date(selectedDate) : null;
  const isSunday = dateObj && dateObj.getDay() === 0;

  // Filter slots booked already for this date
  const bookedSlotsOnDate = appointments
    .filter((a) => a.date === selectedDate && a.status !== 'Cancelled')
    .map((a) => a.timeSlot);

  const availableSlots = allSlots.filter((slot) => {
    // If blocked specifically in settings
    const isManuallyBlocked = settings.blockedSlots.some(
      (bs) => bs.date === selectedDate && bs.slot === slot
    );
    if (isManuallyBlocked) return false;
    // Allow up to 2 concurrent appointments per slot for a physical desk
    const count = bookedSlotsOnDate.filter((s) => s === slot).length;
    return count < 2;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: { name: string; size: number; type: string; url?: string }[] = [];
    const maxBytes = settings.maxUploadSizeMB * 1024 * 1024;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

      if (!validTypes.includes(file.type)) {
        setFileError(`File "${file.name}" is not supported. Please upload PDF, JPG, or PNG.`);
        return;
      }

      if (file.size > maxBytes) {
        setFileError(`File "${file.name}" exceeds the maximum allowed size of ${settings.maxUploadSizeMB}MB.`);
        return;
      }

      newFiles.push({
        name: file.name,
        size: Math.round(file.size / 1024), // in KB
        type: file.type,
        url: URL.createObjectURL(file)
      });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleNextStep = () => {
    // Basic validation per step
    if (step === 6 && !selectedDate) {
      alert('Please select an appointment date.');
      return;
    }
    if (step === 7 && !selectedSlot) {
      alert('Please select an available time slot.');
      return;
    }
    if (step === 8) {
      if (!fullName.trim()) {
        alert('Please enter your full name.');
        return;
      }
      if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
    }
    if (step === 10 && !consentGiven) {
      alert('Please agree to be contacted to proceed with your booking.');
      return;
    }

    if (step < 10) {
      setStep(step + 1);
    } else {
      // Step 10 Submit!
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newBooking = addAppointment({
      service,
      documentType,
      destinationCountry,
      numberOfDocuments,
      appointmentType,
      date: selectedDate,
      timeSlot: selectedSlot || '10:30 AM',
      customer: {
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        whatsapp: whatsapp.trim() || mobile.trim(),
        email: email.trim(),
        city: city.trim(),
        preferredContactMethod: preferredContact
      },
      additionalInfo: additionalInfo.trim(),
      uploadedFiles,
      consentGiven
    });

    setConfirmedBooking(newBooking);
    showToast(`Appointment confirmed! Booking Reference: ${newBooking.id}`);
  };

  // WhatsApp link for instant appointment confirmation notification
  const confirmedWhatsAppMessage = confirmedBooking
    ? `Hello Goodway Attestation, I just booked an appointment on your website.\n*Booking Reference:* ${confirmedBooking.id}\n*Service:* ${confirmedBooking.service}\n*Document:* ${confirmedBooking.documentType}\n*Country:* ${confirmedBooking.destinationCountry}\n*Date & Time:* ${confirmedBooking.date} at ${confirmedBooking.timeSlot}\n*Customer:* ${confirmedBooking.customer.fullName} (${confirmedBooking.customer.mobile})`
    : '';

  const confirmedWhatsAppUrl = formatWhatsAppLink(settings.whatsappNumber, confirmedWhatsAppMessage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 bg-[#0B1F3A] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1357A6] flex items-center justify-center text-[#D6A84F]">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#D6A84F]">
                Goodway Attestation · Appointment Engine
              </div>
              <h3 className="text-lg font-bold text-white">
                {confirmedBooking ? 'Appointment Confirmed' : 'Book Your Consultation / Service'}
              </h3>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Confirmation Page */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0B1F3A]">
                Appointment Successfully Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{confirmedBooking.customer.fullName}</span>.
                Your appointment and document consultation dossier have been logged in our system.
              </p>
            </div>

            {/* Official Confirmation Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Booking Reference ID
                  </div>
                  <div className="text-lg font-extrabold text-[#1357A6] font-mono">
                    {confirmedBooking.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Status
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Service:</span>
                  <div className="font-bold text-slate-900">{confirmedBooking.service}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Destination Country:</span>
                  <div className="font-bold text-slate-900">{confirmedBooking.destinationCountry}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Document Type:</span>
                  <div className="font-bold text-slate-900">
                    {confirmedBooking.documentType} ({confirmedBooking.numberOfDocuments} doc{confirmedBooking.numberOfDocuments === '1' ? '' : 's'})
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Appointment Type:</span>
                  <div className="font-bold text-slate-900">{confirmedBooking.appointmentType}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Date & Time:</span>
                  <div className="font-bold text-[#1357A6]">
                    {formatDateDisplay(confirmedBooking.date)} at {confirmedBooking.timeSlot}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Contact:</span>
                  <div className="font-bold text-slate-900">
                    {confirmedBooking.customer.mobile} · {confirmedBooking.customer.email}
                  </div>
                </div>
              </div>

              {/* Office Location & Preparation Instructions */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-[#1357A6] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Next Steps & Preparation</span>
                </div>
                {confirmedBooking.appointmentType === 'Office Visit' ? (
                  <p>
                    Please visit our Malleshwaram desk at: <br />
                    <strong className="text-slate-900">{settings.address}</strong>. <br />
                    Bring your original certificates along with 2 clear passport photocopies.
                  </p>
                ) : confirmedBooking.appointmentType === 'Document Pickup' ? (
                  <p>
                    Our courier executive will coordinate with you via phone/WhatsApp prior to pickup
                    at your Bengaluru address. Keep documents in a clean folder with passport copies.
                  </p>
                ) : (
                  <p>
                    Our senior document consultant will call you at {confirmedBooking.customer.mobile} on{' '}
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!confirmedBooking) return;
                  const cLower = confirmedBooking.destinationCountry.toLowerCase();
                  let key = 'general';
                  if (cLower.includes('uae') || cLower.includes('emirates')) key = 'uae';
                  else if (cLower.includes('saudi')) key = 'saudi';
                  else if (cLower.includes('qatar')) key = 'qatar';
                  else if (cLower.includes('germany')) key = 'germany';
                  else if (cLower.includes('uk') || cLower.includes('kingdom')) key = 'uk';
                  else if (cLower.includes('usa') || cLower.includes('states')) key = 'usa';
                  else if (cLower.includes('canada')) key = 'canada';

                  const dLower = confirmedBooking.documentType.toLowerCase();
                  const cat: 'educational' | 'personal' | 'commercial' =
                    dLower.includes('commercial') || dLower.includes('invoice') || dLower.includes('board')
                      ? 'commercial'
                      : dLower.includes('marriage') || dLower.includes('birth') || dLower.includes('affidavit') || dLower.includes('death')
                      ? 'personal'
                      : 'educational';

                  generateChecklistPDF({
                    rule: COUNTRY_CHECKLIST_RULES[key] || COUNTRY_CHECKLIST_RULES.general,
                    category: cat,
                    applicantName: confirmedBooking.customer.fullName,
                    documentTypeName: confirmedBooking.documentType,
                    settings
                  });
                  showToast('Official PDF Checklist downloaded!');
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#D6A84F]" />
                <span>Download PDF Checklist</span>
              </button>

              <a
                href={confirmedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp Now</span>
              </a>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Slip</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={closeBookingModal}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Done and Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="p-6 space-y-6">
            
            {/* Step Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Step {step} of 10</span>
                <span className="font-bold text-[#1357A6]">
                  {step === 1 && 'Select Service'}
                  {step === 2 && 'Document Type'}
                  {step === 3 && 'Destination Country'}
                  {step === 4 && 'Number of Documents'}
                  {step === 5 && 'Appointment Type'}
                  {step === 6 && 'Select Date'}
                  {step === 7 && 'Select Time Slot'}
                  {step === 8 && 'Your Information'}
                  {step === 9 && 'Additional Details & Upload'}
                  {step === 10 && 'Review & Consent'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1357A6] transition-all duration-300"
                  style={{ width: `${(step / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 1: Select Required Service</h4>
                  <p className="text-xs text-slate-500">Choose the authentication category needed for your paperwork.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Embassy Attestation',
                    'MEA Apostille',
                    'HRD Attestation',
                    'Certificate Attestation',
                    'Commercial Document Attestation',
                    'Personal Document Attestation',
                    'Document Legalization',
                    'Other / Not Sure'
                  ].map((sName) => (
                    <label
                      key={sName}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                        service === sName
                          ? 'border-[#1357A6] bg-blue-50/70 text-[#1357A6] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span>{sName}</span>
                      <input
                        type="radio"
                        name="service"
                        checked={service === sName}
                        onChange={() => setService(sName)}
                        className="text-[#1357A6] focus:ring-[#1357A6]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Select Document Type */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 2: Select Document Type</h4>
                  <p className="text-xs text-slate-500">What type of certificate or document requires legalization?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Degree Certificate',
                    'Diploma',
                    'Birth Certificate',
                    'Marriage Certificate',
                    'Death Certificate',
                    'Affidavit',
                    'Power of Attorney',
                    'Commercial Document',
                    'School Leaving / 10th & 12th',
                    'Other'
                  ].map((dName) => (
                    <label
                      key={dName}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                        documentType === dName
                          ? 'border-[#1357A6] bg-blue-50/70 text-[#1357A6] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span>{dName}</span>
                      <input
                        type="radio"
                        name="documentType"
                        checked={documentType === dName}
                        onChange={() => setDocumentType(dName)}
                        className="text-[#1357A6] focus:ring-[#1357A6]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Destination Country */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 3: Destination Country</h4>
                  <p className="text-xs text-slate-500">Where will this document be officially submitted?</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Target Country
                  </label>
                  <select
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                  >
                    <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                    <option value="Saudi Arabia (KSA)">Saudi Arabia (KSA)</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Germany">Germany (Apostille)</option>
                    <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                    <option value="United States of America (USA)">United States of America (USA)</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Italy">Italy</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Other Country">Other Country</option>
                  </select>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <strong>Protocol Note:</strong> Authentication stages differ significantly between
                  Hague Apostille members (e.g. Germany/USA) and non-Hague nations (e.g. UAE/Saudi).
                  Our experts will prepare the exact pathway.
                </div>
              </div>
            )}

            {/* STEP 4: Number of Documents */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 4: Number of Documents</h4>
                  <p className="text-xs text-slate-500">How many physical certificates require attestation?</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {['1', '2', '3', '4', '5+', 'Other'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumberOfDocuments(num)}
                      className={`py-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                        numberOfDocuments === num
                          ? 'border-[#1357A6] bg-[#1357A6] text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Preferred Appointment Type */}
            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 5: Preferred Appointment Type</h4>
                  <p className="text-xs text-slate-500">How would you like to hand over documents or consult?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'Office Visit',
                      title: 'Office Visit (Malleshwaram)',
                      desc: 'Visit our K.N. Complex Malleshwaram desk for instant inspection and physical handover.'
                    },
                    {
                      id: 'Document Pickup',
                      title: 'Document Pickup (Bangalore)',
                      desc: 'Scheduled executive pickup from your home or office anywhere in Bengaluru.'
                    },
                    {
                      id: 'Online Consultation',
                      title: 'Online Video Consultation',
                      desc: 'Connect with a senior documentation specialist for digital review before dispatch.'
                    },
                    {
                      id: 'Phone Consultation',
                      title: 'Phone Consultation',
                      desc: 'Direct telephonic briefing regarding document eligibility, stages, and timeline.'
                    }
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                        appointmentType === item.id
                          ? 'border-[#1357A6] bg-blue-50/70 text-slate-900 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</span>
                        <input
                          type="radio"
                          name="appointmentType"
                          checked={appointmentType === item.id}
                          onChange={() => setAppointmentType(item.id as any)}
                          className="text-[#1357A6] focus:ring-[#1357A6]"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Select Date */}
            {step === 6 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 6: Select Appointment Date</h4>
                  <p className="text-xs text-slate-500">
                    Business Hours: {settings.workingDays.join(', ')} ({settings.openingTime} – {settings.closingTime}).
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pick a Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                  />
                </div>

                {isDateBlocked && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Selected date is an official holiday or blocked by administration. Please pick another date.</span>
                  </div>
                )}

                {isSunday && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                    <strong>Sunday Notice:</strong> Our physical office is closed on Sundays, but pre-booked priority courier pickups can be coordinated.
                  </div>
                )}

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Selected date: <strong className="text-slate-900">{formatDateDisplay(selectedDate) || 'None'}</strong>
                </div>
              </div>
            )}

            {/* STEP 7: Select Time Slot */}
            {step === 7 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 7: Select Time Slot</h4>
                  <p className="text-xs text-slate-500">
                    Available slots for {formatDateDisplay(selectedDate)}:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'border-[#1357A6] bg-[#1357A6] text-white shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <Clock className="w-3 h-3 inline-block mr-1 opacity-70" />
                      {slot}
                    </button>
                  ))}
                </div>

                {availableSlots.length === 0 && (
                  <div className="text-center p-4 bg-slate-50 rounded-xl text-xs text-slate-500">
                    No time slots available for this date. Please select another date.
                  </div>
                )}
              </div>
            )}

            {/* STEP 8: Customer Information */}
            {step === 8 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 8: Customer Information</h4>
                  <p className="text-xs text-slate-500">We will use these details to confirm your booking and send receipt updates.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Mobile Number (Calling) *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98451 22334"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">WhatsApp Number *</label>
                      <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sameAsMobile}
                          onChange={(e) => setSameAsMobile(e.target.checked)}
                          className="rounded text-[#1357A6]"
                        />
                        Same as mobile
                      </label>
                    </div>
                    <input
                      type="tel"
                      disabled={sameAsMobile}
                      placeholder="e.g. +91 98451 22334"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6] disabled:bg-slate-100"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">City / Area in Bangalore</label>
                    <input
                      type="text"
                      placeholder="e.g. Malleshwaram / Whitefield"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Preferred Contact Method</label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value as any)}
                      className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Additional Details & Optional Upload */}
            {step === 9 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 9: Requirement Details & Document Upload</h4>
                  <p className="text-xs text-slate-500">Provide details about universities or urgency, and optionally upload a copy.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Tell us about your document or requirement (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. B.Tech degree from VTU Belagavi, need fast-track attestation for Dubai employment offer..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                  />
                </div>

                {/* Upload box */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Upload Certificate / Document Copy (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-slate-700">
                      Click or drag document scans here (PDF, JPG, PNG)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Max file size: {settings.maxUploadSizeMB}MB · Bank-grade encrypted storage
                    </div>
                  </div>

                  {fileError && (
                    <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{fileError}</span>
                    </div>
                  )}

                  {/* Uploaded files preview list */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-[#1357A6] shrink-0" />
                            <span className="font-medium text-slate-800 truncate">{file.name}</span>
                            <span className="text-slate-400">({file.size} KB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 10: Review & Consent */}
            {step === 10 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Step 10: Review & Confirm</h4>
                  <p className="text-xs text-slate-500">Please review your appointment summary before submitting.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400">Service:</span>
                      <div className="font-bold text-slate-800">{service}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Destination:</span>
                      <div className="font-bold text-slate-800">{destinationCountry}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Document Type:</span>
                      <div className="font-bold text-slate-800">{documentType} ({numberOfDocuments})</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Appointment Type:</span>
                      <div className="font-bold text-slate-800">{appointmentType}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Date & Slot:</span>
                      <div className="font-bold text-[#1357A6]">
                        {formatDateDisplay(selectedDate)} at {selectedSlot}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Customer:</span>
                      <div className="font-bold text-slate-800">{fullName} ({mobile})</div>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 rounded text-[#1357A6] focus:ring-[#1357A6]"
                  />
                  <span className="text-xs text-slate-700 leading-snug">
                    I agree to be contacted regarding my enquiry and appointment by Goodway Attestation
                    via WhatsApp, Phone, or Email in accordance with the{' '}
                    <span className="text-[#1357A6] underline">Privacy Policy</span>.
                  </span>
                </label>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your personal information and documents are securely handled with strict confidentiality.</span>
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={step === 6 && isDateBlocked}
                className="px-6 py-2.5 bg-[#1357A6] hover:bg-[#1976D2] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>{step === 10 ? 'Confirm Appointment' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
