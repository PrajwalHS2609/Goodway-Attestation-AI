import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessSettings,
  Appointment,
  TrackingItem,
  ServiceItem,
  CountryGuide,
  DocumentTypeItem,
  BlogPost,
  Testimonial,
  LocationSEO
} from '../types';
import {
  INITIAL_SETTINGS,
  SERVICES_DATA,
  COUNTRIES_DATA,
  DOCUMENT_EXPLORER_DATA,
  SEO_LOCATIONS,
  INITIAL_APPOINTMENTS,
  INITIAL_TRACKING_ITEMS,
  BLOG_POSTS,
  TESTIMONIALS_DATA,
  FAQ_ITEMS
} from '../data/mockData';

interface AppContextType {
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Appointment;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  trackings: TrackingItem[];
  getTrackingItem: (searchId: string) => TrackingItem | undefined;
  addOrUpdateTracking: (item: TrackingItem) => void;
  services: ServiceItem[];
  countries: CountryGuide[];
  documentTypes: DocumentTypeItem[];
  seoLocations: LocationSEO[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqs: typeof FAQ_ITEMS;
  
  // Modals & Navigation
  isBookingModalOpen: boolean;
  preselectedService?: string;
  preselectedCountry?: string;
  openBookingModal: (service?: string, country?: string) => void;
  closeBookingModal: () => void;

  isChecklistModalOpen: boolean;
  checklistCountry?: string;
  checklistCategory?: 'educational' | 'personal' | 'commercial';
  openChecklistModal: (country?: string, category?: 'educational' | 'personal' | 'commercial') => void;
  closeChecklistModal: () => void;
  
  isExitModalOpen: boolean;
  openExitModal: () => void;
  closeExitModal: () => void;

  legalModalType: 'privacy' | 'terms' | 'document-handling' | 'refund' | 'disclaimer' | null;
  openLegalModal: (type: 'privacy' | 'terms' | 'document-handling' | 'refund' | 'disclaimer') => void;
  closeLegalModal: () => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  selectedServiceDetail: ServiceItem | null;
  setSelectedServiceDetail: (service: ServiceItem | null) => void;

  selectedCountryDetail: CountryGuide | null;
  setSelectedCountryDetail: (country: CountryGuide | null) => void;

  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (post: BlogPost | null) => void;

  // Notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Settings
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem('gwa_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gwa_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // 2. Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('gwa_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gwa_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [appointments]);

  const addAppointment = (appData: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `GWA-${new Date().getFullYear()}-${randomDigits}`;
    const newAppointment: Appointment = {
      ...appData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: [`Appointment submitted via online booking system on ${new Date().toLocaleDateString('en-IN')}.`]
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Also auto-create a corresponding Tracking entry for immediate client reassurance
    const newTrackingId = `GWA-TRK-${randomDigits}`;
    const newTracking: TrackingItem = {
      trackingId: newTrackingId,
      bookingId: newId,
      customerName: newAppointment.customer.fullName,
      customerPhone: newAppointment.customer.mobile,
      service: newAppointment.service,
      country: newAppointment.destinationCountry,
      documentType: newAppointment.documentType,
      currentStatus: 'Received',
      lastUpdated: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      history: [
        {
          status: 'Appointment Scheduled & Dossier Logged',
          date: new Date().toLocaleDateString('en-IN'),
          location: 'Goodway Malleshwaram Office, Bengaluru',
          notes: `Scheduled ${newAppointment.appointmentType} for ${newAppointment.date} at ${newAppointment.timeSlot}.`,
          completed: true
        },
        {
          status: 'Physical Document Inspection & Inward Entry',
          date: 'Pending Handover',
          location: 'Goodway Malleshwaram Office, Bengaluru',
          notes: 'Awaiting original document verification at office or via executive pickup.',
          completed: false
        },
        {
          status: 'Authentication Processing (HRD / MEA)',
          date: 'Pending',
          location: 'State Secretariat & MEA New Delhi',
          notes: 'Verification by relevant issuing authority.',
          completed: false
        },
        {
          status: 'Destination Consular / Apostille Completion',
          date: 'Pending',
          location: 'Embassy / Apostille Center',
          notes: 'Final legalization seal.',
          completed: false
        },
        {
          status: 'Ready for Collection / Doorstep Dispatch',
          date: 'Pending',
          location: 'Goodway Malleshwaram Office',
          notes: 'Secure return delivery.',
          completed: false
        }
      ]
    };
    addOrUpdateTracking(newTracking);

    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  // 3. Trackings
  const [trackings, setTrackings] = useState<TrackingItem[]>(() => {
    try {
      const saved = localStorage.getItem('gwa_trackings');
      return saved ? JSON.parse(saved) : INITIAL_TRACKING_ITEMS;
    } catch {
      return INITIAL_TRACKING_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gwa_trackings', JSON.stringify(trackings));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [trackings]);

  const addOrUpdateTracking = (item: TrackingItem) => {
    setTrackings((prev) => {
      const index = prev.findIndex((t) => t.trackingId.toLowerCase() === item.trackingId.toLowerCase() || (item.bookingId && t.bookingId === item.bookingId));
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = item;
        return copy;
      }
      return [item, ...prev];
    });
  };

  const getTrackingItem = (searchQuery: string): TrackingItem | undefined => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return undefined;
    return trackings.find(
      (t) =>
        t.trackingId.toLowerCase() === q ||
        (t.bookingId && t.bookingId.toLowerCase() === q) ||
        t.customerPhone.replace(/\D/g, '').endsWith(q.replace(/\D/g, ''))
    );
  };

  // 4. Modal and Interaction State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [preselectedCountry, setPreselectedCountry] = useState<string | undefined>();
  
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [checklistCountry, setChecklistCountry] = useState<string | undefined>();
  const [checklistCategory, setChecklistCategory] = useState<'educational' | 'personal' | 'commercial' | undefined>();

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'document-handling' | 'refund' | 'disclaimer' | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedCountryDetail, setSelectedCountryDetail] = useState<CountryGuide | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const openBookingModal = (service?: string, country?: string) => {
    setPreselectedService(service);
    setPreselectedCountry(country);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedService(undefined);
    setPreselectedCountry(undefined);
  };

  const openChecklistModal = (country?: string, category?: 'educational' | 'personal' | 'commercial') => {
    setChecklistCountry(country);
    setChecklistCategory(category);
    setIsChecklistModalOpen(true);
  };

  const closeChecklistModal = () => {
    setIsChecklistModalOpen(false);
    setChecklistCountry(undefined);
    setChecklistCategory(undefined);
  };

  const openExitModal = () => setIsExitModalOpen(true);
  const closeExitModal = () => setIsExitModalOpen(false);

  const openLegalModal = (type: 'privacy' | 'terms' | 'document-handling' | 'refund' | 'disclaimer') => {
    setLegalModalType(type);
  };
  const closeLegalModal = () => setLegalModalType(null);

  // 5. Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        trackings,
        getTrackingItem,
        addOrUpdateTracking,
        services: SERVICES_DATA,
        countries: COUNTRIES_DATA,
        documentTypes: DOCUMENT_EXPLORER_DATA,
        seoLocations: SEO_LOCATIONS,
        blogPosts: BLOG_POSTS,
        testimonials: TESTIMONIALS_DATA,
        faqs: FAQ_ITEMS,
        isBookingModalOpen,
        preselectedService,
        preselectedCountry,
        openBookingModal,
        closeBookingModal,
        isChecklistModalOpen,
        checklistCountry,
        checklistCategory,
        openChecklistModal,
        closeChecklistModal,
        isExitModalOpen,
        openExitModal,
        closeExitModal,
        legalModalType,
        openLegalModal,
        closeLegalModal,
        isAdminOpen,
        setIsAdminOpen,
        selectedServiceDetail,
        setSelectedServiceDetail,
        selectedCountryDetail,
        setSelectedCountryDetail,
        selectedBlogPost,
        setSelectedBlogPost,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
