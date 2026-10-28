/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ServicesSection } from './components/ServicesSection';
import { CountryExplorer } from './components/CountryExplorer';
import { DocumentExplorer } from './components/DocumentExplorer';
import { HowItWorks } from './components/HowItWorks';
import { TrackingSection } from './components/TrackingSection';
import { AboutSection } from './components/AboutSection';
import { LocationSEOSection } from './components/LocationSEOSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { ChecklistBannerSection } from './components/ChecklistBannerSection';
import { Footer } from './components/Footer';

// Modals
import { BookingModal } from './components/BookingModal';
import { ChecklistGeneratorModal } from './components/ChecklistGeneratorModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CountryGuideModal } from './components/CountryGuideModal';
import { BlogModal } from './components/BlogModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModal } from './components/LegalModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#172033] flex flex-col font-sans selection:bg-[#1357A6] selection:text-white antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B1F3A] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ServicesSection />
        <CountryExplorer />
        <ChecklistBannerSection />
        <DocumentExplorer />
        <HowItWorks />
        <TrackingSection />
        <AboutSection />
        <LocationSEOSection />
        <TestimonialsSection />
        <FaqSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <BookingModal />
      <ChecklistGeneratorModal />
      <ServiceDetailModal />
      <CountryGuideModal />
      <BlogModal />
      <AdminDashboard />
      <LegalModal />
      <ExitIntentModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
