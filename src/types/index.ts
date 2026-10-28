export interface ServiceItem {
  id: string;
  title: string;
  category: 'educational' | 'personal' | 'commercial' | 'embassy' | 'apostille' | 'state';
  shortDesc: string;
  description: string;
  documentsIncluded: string[];
  stages: string[];
  typicalUse: string;
  requiredDocuments: string[];
  faq: { q: string; a: string }[];
}

export interface CountryGuide {
  id: string;
  name: string;
  code: string;
  embassyName: string;
  type: 'Embassy Attestation' | 'Hague Apostille' | 'Dual Legalization';
  description: string;
  workflow: string[];
  requiredDocs: string[];
  processingNotes: string;
  popular: boolean;
}

export interface DocumentTypeItem {
  id: string;
  category: 'educational' | 'personal' | 'commercial';
  name: string;
  description: string;
  typicalUse: string;
  requiredDocuments: string[];
  process: string[];
  faq: { q: string; a: string }[];
}

export interface Appointment {
  id: string;
  createdAt: string;
  service: string;
  documentType: string;
  destinationCountry: string;
  numberOfDocuments: string;
  appointmentType: 'Office Visit' | 'Document Pickup' | 'Online Consultation' | 'Phone Consultation';
  date: string;
  timeSlot: string;
  customer: {
    fullName: string;
    mobile: string;
    whatsapp: string;
    email: string;
    city: string;
    preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  };
  additionalInfo: string;
  uploadedFiles?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  consentGiven: boolean;
  status: 'New' | 'Contacted' | 'Documents Requested' | 'Documents Received' | 'Processing' | 'Ready' | 'Completed' | 'Cancelled';
  assignedStaff?: string;
  notes?: string[];
}

export interface TrackingEntry {
  status: string;
  date: string;
  location: string;
  notes: string;
  completed: boolean;
}

export interface TrackingItem {
  trackingId: string;
  bookingId?: string;
  customerName: string;
  customerPhone: string;
  service: string;
  country: string;
  documentType: string;
  currentStatus: 'Received' | 'Under Verification' | 'At Authority' | 'Embassy Processing' | 'Ready' | 'Delivered';
  expectedCompletion?: string;
  lastUpdated: string;
  history: TrackingEntry[];
}

export interface BusinessSettings {
  brandName: string;
  positioning: string;
  tagline: string;
  address: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  workingDays: string[];
  openingTime: string; // e.g. "09:30"
  closingTime: string; // e.g. "20:30"
  appointmentDuration: number; // in minutes
  bufferTime: number; // in minutes
  sundayStatus: string;
  blockedDates: string[]; // YYYY-MM-DD
  blockedSlots: { date: string; slot: string }[];
  maxUploadSizeMB: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  excerpt: string;
  body: string[];
  tableOfContents: string[];
  faqs: { q: string; a: string }[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  service: string;
  location: string;
  review: string;
  rating: number;
  verified: boolean;
  date: string;
}

export interface LocationSEO {
  slug: string;
  area: string;
  title: string;
  description: string;
  highlights: string[];
  distanceFromOffice: string;
  commonServices: string[];
}
