import { jsPDF } from 'jspdf';
import { CountryChecklistRule } from './checklistData';
import { BusinessSettings } from '../types';

export interface GenerateChecklistOptions {
  rule: CountryChecklistRule;
  category: 'educational' | 'personal' | 'commercial';
  applicantName?: string;
  documentTypeName: string;
  settings: BusinessSettings;
}

export const generateChecklistPDF = (options: GenerateChecklistOptions): void => {
  const { rule, category, applicantName, documentTypeName, settings } = options;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 15;

  // 1. Top Header Banner (Deep Navy #0B1F3A)
  doc.setFillColor(11, 31, 58); // #0B1F3A
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold accent bar (#D6A84F)
  doc.setFillColor(214, 168, 79);
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('GOODWAY ATTESTATION', 14, 12);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 215, 235);
  doc.text(
    'Professional Certificate Attestation, Embassy Legalization & MEA Apostille Services',
    14,
    18
  );
  doc.text(
    '#134, K.N. Complex, 11th Cross, Temple St, Opp. Canara Bank, Malleshwaram, Bengaluru - 560003',
    14,
    23
  );

  // Phone / Web on Right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(214, 168, 79);
  doc.text(`Phone: ${settings.primaryPhone}`, pageWidth - 14, 12, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('Web: goodwayattestation.com', pageWidth - 14, 18, { align: 'right' });
  doc.text(`Hours: Mon-Sat ${settings.openingTime} - ${settings.closingTime}`, pageWidth - 14, 23, { align: 'right' });

  y = 38;

  // 2. Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(11, 31, 58);
  doc.text('OFFICIAL DOCUMENT PREPARATION CHECKLIST', 14, y);

  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y, pageWidth - 14, y);

  y += 6;

  // 3. Metadata Table Box
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'D');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 31, 58);
  doc.text('Destination Country:', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 70, 85);
  doc.text(`${rule.countryName} (${rule.countryCode})`, 54, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 31, 58);
  doc.text('Legalization Framework:', 110, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(19, 87, 166);
  doc.text(rule.type, 150, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 31, 58);
  doc.text('Document Category:', 18, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 70, 85);
  doc.text(`${documentTypeName} (${category.toUpperCase()})`, 54, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 31, 58);
  doc.text('Applicant / Reference:', 110, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 70, 85);
  doc.text(applicantName?.trim() || 'General Applicant Checklist', 150, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 130, 145);
  doc.text(
    `Checklist Generated on: ${new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}`,
    18,
    y + 19
  );

  y += 28;

  // Helper function to render a section with interactive checkboxes
  const renderChecklistSection = (
    title: string,
    items: string[],
    boxColor: [number, number, number] = [19, 87, 166]
  ) => {
    // Section Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(boxColor[0], boxColor[1], boxColor[2]);
    doc.text(title.toUpperCase(), 14, y);
    y += 4;

    items.forEach((item) => {
      // Check if page overflow
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }

      // Draw vector checkbox [ ]
      doc.setDrawColor(100, 110, 130);
      doc.setFillColor(255, 255, 255);
      doc.rect(14, y - 3, 3.5, 3.5, 'FD');

      // Draw item text with word wrap
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 40, 55);
      const splitText = doc.splitTextToSize(item, pageWidth - 32);
      doc.text(splitText, 21, y);
      y += splitText.length * 4.2 + 1.5;
    });

    y += 3;
  };

  // 4. Section 1: Original Certificate Prerequisites
  const primaryDocs =
    rule.primaryDocuments[category] || rule.primaryDocuments['educational'] || [];
  renderChecklistSection('1. Primary Certificate Requirements (Mandatory)', primaryDocs, [11, 31, 58]);

  // 5. Section 2: Identification & Supporting Documents
  const supportingDocs =
    rule.supportingDocuments[category] || rule.supportingDocuments['educational'] || [];
  renderChecklistSection('2. Identification & Supporting Credentials', supportingDocs, [19, 87, 166]);

  // 6. Section 3: Official Authentication Stages
  renderChecklistSection('3. Authentication Pathway Stages to be Executed', rule.workflowStages, [11, 31, 58]);

  // 7. Section 4: Crucial Do's & Don'ts
  renderChecklistSection('4. Crucial Guidelines & Verification Notices', rule.crucialNotes, [180, 80, 20]);

  // 8. Office Handover & Contact Summary Box
  if (y > pageHeight - 45) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(240, 245, 252);
  doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, 'F');
  doc.setDrawColor(190, 210, 235);
  doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(11, 31, 58);
  doc.text('HANDOVER & SUBMISSION INSTRUCTIONS', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 50, 65);
  doc.text(
    `• Office Walk-in: Bring original certificates to ${settings.address}`,
    18,
    y + 11
  );
  doc.text(
    `• Doorstep Collection: Available across Bangalore. Call ${settings.primaryPhone} to schedule an executive pickup.`,
    18,
    y + 16
  );
  doc.text(
    '• Online Tracking: A unique tracking ID will be generated upon inward physical receipt.',
    18,
    y + 21
  );

  y += 28;

  // 9. Bottom Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(120, 130, 140);
  const disclaimer =
    'Disclaimer: Goodway Attestation is a professional document facilitation service in Bengaluru. Legalization criteria and final acceptance are determined solely by issuing state departments, university registrars, MEA, and respective foreign embassies. Keep this checklist with your documents.';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 28);
  doc.text(splitDisclaimer, 14, pageHeight - 10);

  // Trigger download
  const cleanCountry = rule.countryName.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanDoc = documentTypeName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Goodway_Attestation_Checklist_${cleanCountry}_${cleanDoc}.pdf`);
};
