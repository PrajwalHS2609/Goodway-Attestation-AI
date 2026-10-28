import {
  ServiceItem,
  CountryGuide,
  DocumentTypeItem,
  BusinessSettings,
  Appointment,
  TrackingItem,
  BlogPost,
  Testimonial,
  LocationSEO
} from '../types';

export const INITIAL_SETTINGS: BusinessSettings = {
  brandName: 'Goodway Attestation',
  positioning: 'Professional Certificate Attestation & Apostille Services in Bangalore',
  tagline: 'Professional assistance for certificate attestation, apostille, authentication and document legalization for international use.',
  address: '#134, Shop No. 2, 1st Floor, K.N. Complex, 11th Cross, Temple Street, Opp. Canara Bank, Malleshwaram',
  landmark: 'Opposite Canara Bank, 11th Cross Temple Street',
  pincode: '560003',
  city: 'Bengaluru',
  state: 'Karnataka',
  primaryPhone: '+91 91488 89444',
  secondaryPhone: '+91 91488 89555',
  whatsappNumber: '919148889444',
  email: 'info@goodwayattestation.com',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  openingTime: '09:30',
  closingTime: '20:30',
  appointmentDuration: 30,
  bufferTime: 10,
  sundayStatus: 'Closed (Pre-booked priority pickup on request)',
  blockedDates: ['2026-10-02', '2026-10-24', '2026-11-01'], // Mahatma Gandhi Jayanti, Diwali, Kannada Rajyotsava
  blockedSlots: [],
  maxUploadSizeMB: 15
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'educational-attestation',
    title: 'Educational Certificate Attestation',
    category: 'educational',
    shortDesc: 'Degree, Diploma, Transcripts, and Marksheet authentication for overseas employment & higher education.',
    description: 'Comprehensive verification assistance for Indian academic qualifications. We guide candidates through state education departments, university verifications, MEA attestation, and destination embassy stamping.',
    documentsIncluded: ['Degree Certificate', 'Diploma Certificate', 'PG Certificate', 'School Certificates / 10th & 12th', 'Consolidated Transcripts'],
    stages: [
      'University / Board Verification check',
      'State HRD / Higher Education Department Stamping',
      'Ministry of External Affairs (MEA), Government of India Attestation',
      'Destination Embassy / Consulate Stamping'
    ],
    typicalUse: 'Work visa (Employment permit), higher studies admission, professional licensing (e.g. MOH, DHA, HAAD, Prometric), and permanent residency.',
    requiredDocuments: ['Original Degree/Diploma certificate', 'All year marksheets/transcripts copy', 'Passport copy (first & last pages)', 'Offer letter or university admission copy (if embassy mandated)'],
    faq: [
      {
        q: 'Is original certificate mandatory for educational attestation?',
        a: 'Yes, almost all state HRD departments, MEA, and foreign embassies require the original physical certificate to apply official seals and verification stickers.'
      },
      {
        q: 'Do all mark sheets also need to be attested along with the degree?',
        a: 'Typically, embassies attest the final Degree or Diploma certificate. However, certain countries or licensing bodies (like medical or engineering councils) may require transcript attestation as well.'
      }
    ]
  },
  {
    id: 'personal-attestation',
    title: 'Personal Certificate Attestation',
    category: 'personal',
    shortDesc: 'Birth, Marriage, Death certificates, and Affidavits legalization for dependent visas and migration.',
    description: 'Legal document authentication for family sponsorship, dependent visa processing, resident permits, or legal name changes overseas.',
    documentsIncluded: ['Birth Certificate', 'Marriage Certificate', 'Death Certificate', 'Single Status Affidavit', 'Medical Fitness Certificate'],
    stages: [
      'Notary Verification',
      'State Home Department / General Administration Department (GAD) / SDM',
      'Ministry of External Affairs (MEA) Attestation',
      'Target Country Embassy Stamping'
    ],
    typicalUse: 'Family visa, spouse visa, child school admission abroad, migration / citizenship applications, inheritance and legal proceedings.',
    requiredDocuments: ['Original certificate issued by Municipal Corporation / Registrar of Marriages / Births', 'Passport copies of applicant and spouse / parents', 'Affidavit copy where applicable'],
    faq: [
      {
        q: 'Can a laminated birth or marriage certificate be attested?',
        a: 'Attestation seals cannot be placed on plastic lamination. Laminations must be professionally removed prior to processing, which our team can assist with safely.'
      },
      {
        q: 'How long does marriage certificate attestation remain valid?',
        a: 'Attestation does not generally expire, but certain embassies (e.g. UAE, Qatar) request that certificates be issued or re-attested within a certain period if changes occur.'
      }
    ]
  },
  {
    id: 'embassy-attestation',
    title: 'Embassy Attestation Services',
    category: 'embassy',
    shortDesc: 'Destination-specific consular legalization for UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, etc.',
    description: 'Direct assistance with diplomatic missions and consular sections in New Delhi and Mumbai. Every embassy has distinct jurisdictional guidelines, fee schedules, and translation prerequisites.',
    documentsIncluded: ['Educational Certificates', 'Personal Documents', 'Commercial Invoices & MOAs', 'Police Clearance Certificates (PCC)'],
    stages: [
      'Preliminary State Authentication (HRD / Home / Chamber)',
      'MEA Central Authentication',
      'Embassy Submission & Consular Review',
      'Consular Seal & Stamping Collection'
    ],
    typicalUse: 'Non-Hague Convention countries requiring diplomatic verification prior to issuing employment visas or registering business contracts.',
    requiredDocuments: ['Original document with MEA stamping', 'Passport copies', 'Specific embassy application forms and authorization letter'],
    faq: [
      {
        q: 'Which countries require Embassy Attestation instead of Apostille?',
        a: 'Gulf Cooperation Council (GCC) nations such as UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, plus countries like China, Egypt, and Malaysia require bilateral Embassy Attestation as they are not Hague Apostille members.'
      }
    ]
  },
  {
    id: 'mea-apostille',
    title: 'MEA Apostille (Hague Convention)',
    category: 'apostille',
    shortDesc: 'Official MEA Apostille sticker for 120+ Hague Convention member countries (Germany, USA, UK, etc.).',
    description: 'Apostille is a standardized international authentication sticker issued under the Hague Convention of October 5, 1961. Once apostilled by the Ministry of External Affairs, India, the document is accepted across all member states without further embassy legalization.',
    documentsIncluded: ['Degree, Diploma, Transcripts', 'Birth & Marriage Certificates', 'Power of Attorney', 'Commercial Contracts'],
    stages: [
      'State Home / HRD / SDM Department Verification',
      'Ministry of External Affairs (MEA) Apostille Sticker Issuance',
      'QR-Code / Serial Number Verification on MEA Portal'
    ],
    typicalUse: 'Study abroad or employment in European Union countries (Germany, France, Italy, Netherlands), USA, UK, Australia, New Zealand, Japan, etc.',
    requiredDocuments: ['Original document in pristine condition', 'Applicant passport copy (front & back)', 'Sub-Divisional Magistrate (SDM) / State authentication note'],
    faq: [
      {
        q: 'Does an Apostilled document require further Embassy attestation?',
        a: 'No. Under the Hague Apostille Convention, member countries accept the MEA Apostille sticker directly without needing a separate embassy stamp.'
      }
    ]
  },
  {
    id: 'hrd-attestation',
    title: 'State HRD Attestation',
    category: 'educational',
    shortDesc: 'State Higher Education / Human Resource Development verification from regional state secretariats.',
    description: 'Human Resource Development (HRD) attestation is the mandatory first authentication layer for educational certificates issued by universities or boards recognized by UGC / AICTE / State Councils.',
    documentsIncluded: ['Bachelor Degrees (B.Tech, MBBS, B.Com, B.Sc)', 'Master Degrees (M.Tech, MBA, MD)', 'Polytechnic Diplomas', 'State Board Certificates'],
    stages: [
      'University Registrar / Exam Controller Verification',
      'Regional HRD / Education Secretariat Review',
      'Official HRD Stamp & Signature on the Reverse of Certificate'
    ],
    typicalUse: 'Mandatory prerequisite for Embassy Attestation (such as Saudi Arabia, UAE, Qatar) on original degrees.',
    requiredDocuments: ['Original Degree Certificate', 'All semester mark cards', 'University verification letter/receipt', 'Passport copy', 'Photographs'],
    faq: [
      {
        q: 'Can Karnataka HRD attestation be done in Bangalore?',
        a: 'Yes, Karnataka state education verification is processed through the collegiate education department / relevant university authorities right here in Bengaluru.'
      }
    ]
  },
  {
    id: 'commercial-attestation',
    title: 'Commercial Document Attestation',
    category: 'commercial',
    shortDesc: 'Company Incorporation, Power of Attorney, Board Resolutions, Invoices & Agreements.',
    description: 'Assisting corporations, startups, and export houses in Bangalore with cross-border commercial transactions, opening overseas branch offices, and tender bids.',
    documentsIncluded: ['Certificate of Incorporation', 'Memorandum & Articles of Association (MOA/AOA)', 'Power of Attorney (Commercial)', 'Commercial Invoices & Packing Lists', 'Certificate of Origin', 'Board Resolutions'],
    stages: [
      'Chamber of Commerce Stamping',
      'Ministry of External Affairs (MEA) Commercial Attestation',
      'Destination Embassy / Consular Stamping'
    ],
    typicalUse: 'Overseas corporate registration, setting up foreign subsidiaries, export shipment clearance, global tenders, and bank account opening abroad.',
    requiredDocuments: ['Original document on company letterhead or legal stamp paper', 'Chamber of Commerce endorsement', 'Authorized signatory passport copy & board resolution'],
    faq: [
      {
        q: 'Why is Chamber of Commerce stamping required first?',
        a: 'The Ministry of External Affairs requires commercial documents to be authenticated by a recognized Chamber of Commerce (e.g. FKCCI, ASSOCHAM, CII) before MEA attestation.'
      }
    ]
  },
  {
    id: 'state-home-attestation',
    title: 'State Home Department / SDM Attestation',
    category: 'state',
    shortDesc: 'Regional Home Department or Sub-Divisional Magistrate (SDM) authentication for non-educational documents.',
    description: 'Required foundation step for personal certificates like birth, marriage, death, and affidavits before presenting to the MEA and foreign embassies.',
    documentsIncluded: ['Personal Affidavits', 'Marriage Certificates', 'Birth Certificates', 'PCC (Police Clearance)', 'Divorce Decrees'],
    stages: [
      'Notary Public Authentication',
      'State Home Department (GAD) or Sub-Divisional Magistrate (SDM) Verification',
      'Ready for MEA Apostille or Embassy Legalization'
    ],
    typicalUse: 'Prerequisite for personal documents required for overseas spouse migration, international adoption, or overseas legal matters.',
    requiredDocuments: ['Original document', 'Applicant passport copy', 'State domicile/address proof if required'],
    faq: [
      {
        q: 'What is the difference between Home Department and SDM attestation?',
        a: 'State Home Department attestation is done in the state where the document was issued. SDM (Sub-Divisional Magistrate) is an alternative central pathway recognized by the MEA for most personal documents.'
      }
    ]
  },
  {
    id: 'mofa-assistance',
    title: 'MOFA Legalization Guidance',
    category: 'embassy',
    shortDesc: 'Guidance for Ministry of Foreign Affairs (MOFA) attestation in destination countries (UAE, Qatar, Saudi).',
    description: 'The final verification step executed after arriving in the destination country. While MOFA stamping happens locally in the UAE, Saudi, or Qatar, we ensure your documents have all prior approvals so MOFA acceptance is smooth and compliant.',
    documentsIncluded: ['Employment Contracts', 'Attested Degrees', 'Attested Marriage & Birth Certificates'],
    stages: [
      'Pre-departure Attestation in India (HRD + MEA + Destination Embassy)',
      'Document Dispatch to UAE/Destination Center',
      'MOFA Online Fee Payment & Sticker Authentication'
    ],
    typicalUse: 'Final validation for residence visa stamping, official labor card issuance, and professional licensing in the Gulf.',
    requiredDocuments: ['Document with Indian MEA and Destination Embassy seals', 'Destination resident visa/entry permit'],
    faq: [
      {
        q: 'Can MOFA attestation be done in India?',
        a: 'No, MOFA (Ministry of Foreign Affairs) is the foreign government department located inside that country (e.g., UAE MOFA in Dubai/Abu Dhabi). However, your document MUST have Indian MEA and Embassy stamps first.'
      }
    ]
  }
];

export const COUNTRIES_DATA: CountryGuide[] = [
  {
    id: 'uae',
    name: 'United Arab Emirates (UAE)',
    code: 'AE',
    embassyName: 'Embassy of the UAE, New Delhi / Consulate General, Mumbai',
    type: 'Embassy Attestation',
    description: 'Mandatory for UAE employment visas, family residence visas, school admissions in Dubai/Abu Dhabi, and trade license registration.',
    workflow: [
      '1. State Level Authentication (HRD for Educational / Home Dept or SDM for Personal)',
      '2. Ministry of External Affairs (MEA), Government of India Stamping',
      '3. UAE Embassy in New Delhi / UAE Consulate in Mumbai Attestation',
      '4. MOFA (Ministry of Foreign Affairs) in UAE upon arrival'
    ],
    requiredDocs: [
      'Original Degree/Diploma or Marriage/Birth certificate',
      'Clear passport front and back copies',
      'For educational: Mark sheets copy + sometimes University verification receipt'
    ],
    processingNotes: 'UAE requires distinct stamping for educational vs non-educational documents. Original documents must be intact without torn edges or prior invalid stamps.',
    popular: true
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia (KSA)',
    code: 'SA',
    embassyName: 'Royal Embassy of Saudi Arabia, New Delhi / Royal Consulate, Mumbai',
    type: 'Embassy Attestation',
    description: 'Strict protocol for Iqama (work permit) processing, professional engineering/medical registrations (SCFHS, Saudi Council of Engineers).',
    workflow: [
      '1. Mandatory State HRD verification from issuing state',
      '2. Original regular degree (Distance/Open universities have specific restrictions)',
      '3. MEA Attestation (Government of India)',
      '4. Saudi Culture Attestation (SACM) - mandatory for degrees',
      '5. Saudi Embassy Stamping in New Delhi'
    ],
    requiredDocs: [
      'Original Degree certificate with marks cards',
      'Genuine offer letter from Saudi employer verified by Saudi Chamber of Commerce and MOFA',
      'Valid passport copy',
      'University verification letter confirming regular mode of study'
    ],
    processingNotes: 'Saudi Arabia has rigorous verification rules; degrees must be from recognized regular universities and supported by an authentic Saudi Chamber-attested employment contract.',
    popular: true
  },
  {
    id: 'qatar',
    name: 'Qatar',
    code: 'QA',
    embassyName: 'Embassy of the State of Qatar, New Delhi',
    type: 'Embassy Attestation',
    description: 'Required for Qatar work residence permits, family sponsorship, and professional licensing in Doha.',
    workflow: [
      '1. State HRD or Home Dept verification',
      '2. MEA Attestation, New Delhi',
      '3. Qatar Embassy Attestation, New Delhi',
      '4. Final MOFA Qatar authentication in Doha'
    ],
    requiredDocs: [
      'For Educational: Degree Certificate + Consolidated Marksheet + University Verification Letter (all 3 must be submitted together as per Qatar Embassy rules)',
      'Clear passport copies',
      'Original marriage/birth certificate for family visas'
    ],
    processingNotes: 'Qatar Embassy mandates the "Trio Rule" for educational attestation: original degree, consolidated marksheet, and official verification letter from the university controller.',
    popular: true
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
    code: 'KW',
    embassyName: 'Embassy of the State of Kuwait, New Delhi / Consulate, Mumbai',
    type: 'Embassy Attestation',
    description: 'Essential for Kuwait work visas (Shuon), dependent residency, and engineering/medical licensing.',
    workflow: [
      '1. State HRD / Home Department verification',
      '2. MEA Attestation',
      '3. Kuwait Embassy / Consulate Legalization'
    ],
    requiredDocs: ['Original certificate', 'Passport copy', 'Police Clearance Certificate (PCC) attested for Kuwait work visa'],
    processingNotes: 'PCC attestation is mandatory for Kuwait employment visas alongside educational qualifications.',
    popular: true
  },
  {
    id: 'oman',
    name: 'Oman',
    code: 'OM',
    embassyName: 'Embassy of the Sultanate of Oman, New Delhi',
    type: 'Embassy Attestation',
    description: 'For employment visa stamping, family joining visas, and higher education equivalence in Muscat.',
    workflow: [
      '1. Notary & Home Department / SDM or State HRD',
      '2. MEA Attestation',
      '3. Oman Embassy Attestation'
    ],
    requiredDocs: ['Original document', 'Passport copy', 'Offer letter (if requested)'],
    processingNotes: 'Attestation process depends on whether the candidate is applying for commercial, educational, or personal sponsorship.',
    popular: true
  },
  {
    id: 'bahrain',
    name: 'Bahrain',
    code: 'BH',
    embassyName: 'Embassy of the Kingdom of Bahrain, New Delhi',
    type: 'Embassy Attestation',
    description: 'Processing for Bahrain work permits, LMRA submissions, and dependent residency visas.',
    workflow: [
      '1. State Authentication / SDM',
      '2. MEA Attestation',
      '3. Bahrain Embassy Attestation'
    ],
    requiredDocs: ['Original certificate', 'Passport copy', 'Sponsor details where applicable'],
    processingNotes: 'While Bahrain signed the Apostille convention in 2013, many employer and government processes still specifically ask for consular verification for Indian documents.',
    popular: false
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    embassyName: 'Federal Republic of Germany (Hague Apostille Member)',
    type: 'Hague Apostille',
    description: 'For German Opportunity Card (Chancenkarte), EU Blue Card, student visa blocked account equivalence, and university applications.',
    workflow: [
      '1. State Home Department / HRD / SDM Verification',
      '2. Ministry of External Affairs (MEA) Apostille Sticker with secure QR verification',
      '3. German sworn translation (if required by German authority)'
    ],
    requiredDocs: ['Original degree or birth certificate', 'Passport copy', 'SDM or State authentication'],
    processingNotes: 'Germany is a Hague Convention member. No German Embassy attestation is needed once MEA Apostille is affixed. Academic degrees may also need Anabin database recognition.',
    popular: true
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom (UK)',
    code: 'GB',
    embassyName: 'United Kingdom (Hague Apostille Member)',
    type: 'Hague Apostille',
    description: 'For UK Skilled Worker Visa, GMC/NMC medical registration, dependent visas, and university admissions.',
    workflow: [
      '1. State Department / SDM Verification',
      '2. MEA Apostille Legalization',
      '3. Direct submission to UK authorities / ECCTIS / Home Office'
    ],
    requiredDocs: ['Original document', 'Passport copy'],
    processingNotes: 'The UK accepts MEA Apostille stickers directly. For UK health sector professionals, certificates are also mapped to verified qualification registries.',
    popular: true
  },
  {
    id: 'united-states',
    name: 'United States of America (USA)',
    code: 'US',
    embassyName: 'United States (Hague Apostille Member)',
    type: 'Hague Apostille',
    description: 'For US H-1B visa, L-1 intracompany transfers, Green Card processing, WES evaluation, and US university admissions.',
    workflow: [
      '1. State Home Department / SDM authentication',
      '2. MEA Apostille Sticker',
      '3. Evaluation agency (WES, ECE) or USCIS submission'
    ],
    requiredDocs: ['Original certificate', 'Passport copy'],
    processingNotes: 'USA is a Hague Apostille member. MEA Apostille provides international legal recognition for US state authorities, universities, and corporate filings.',
    popular: true
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    embassyName: 'Commonwealth of Australia (Hague Apostille Member)',
    type: 'Hague Apostille',
    description: 'For Australian PR (Subclass 189/190), TSS 482 work visa, ACS / VETASSESS skills assessments, and partner visas.',
    workflow: [
      '1. State Verification / SDM',
      '2. MEA Apostille Authentication',
      '3. Direct upload to Home Affairs / Skills Assessment portal'
    ],
    requiredDocs: ['Original certificate', 'Passport copy'],
    processingNotes: 'Australia accepts MEA Apostille. Color scans of apostilled originals are generally uploaded directly to Australian ImmiAccount.',
    popular: true
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    embassyName: 'Canada (Joined Hague Apostille Convention in Jan 2024)',
    type: 'Hague Apostille',
    description: 'For Canada Express Entry PR, Provincial Nominee Programs (PNP), study permits, and Spousal Sponsorship.',
    workflow: [
      '1. State Authentication / SDM',
      '2. MEA Apostille Legalization',
      '3. Direct submission to IRCC / provincial authorities'
    ],
    requiredDocs: ['Original document', 'Passport copy'],
    processingNotes: 'Canada officially became an Apostille Convention member on January 11, 2024. Indian documents now require MEA Apostille rather than consular legalization.',
    popular: true
  },
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    embassyName: 'Embassy of Italy, New Delhi / Consulate General, Mumbai & Bengaluru',
    type: 'Hague Apostille',
    description: 'For Italian student visas (Dichiarazione di Valore - DOV), work visas, and citizenship applications.',
    workflow: [
      '1. State HRD / Home Department verification',
      '2. MEA Apostille Stamping',
      '3. Certified Italian Translation by Embassy-approved translator',
      '4. Italian Consulate Bangalore / Mumbai DOV stamping'
    ],
    requiredDocs: ['Original degree with marksheets', 'MEA Apostille', 'Certified Italian translation', 'Passport copy'],
    processingNotes: 'Italy requires MEA Apostille followed by sworn Italian translation and consular Declaration of Value (DOV) for educational qualifications.',
    popular: false
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    embassyName: 'Republic of France (Hague Apostille Member)',
    type: 'Hague Apostille',
    description: 'For French Talent Passport, long-stay student visas, and employment contracts in France.',
    workflow: [
      '1. State Authentication / SDM',
      '2. MEA Apostille Stamping',
      '3. Sworn French translation if requested by French prefecture'
    ],
    requiredDocs: ['Original certificate', 'Passport copy'],
    processingNotes: 'France is an Apostille country. Birth and marriage certificates usually require certified French translation alongside the MEA Apostille sticker.',
    popular: false
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    code: 'NL',
    embassyName: 'Kingdom of the Netherlands (Hague Apostille Member)',
    type: 'Hague Apostille',
    description: 'For Dutch Highly Skilled Migrant visa, IND family reunion, and municipality (Gemeente) BSN registration.',
    workflow: [
      '1. State Home Department / SDM Stamping',
      '2. MEA Apostille Legalization'
    ],
    requiredDocs: ['Original birth/marriage certificate or degree', 'Passport copy'],
    processingNotes: 'Gemeentes (Dutch city halls) strictly require birth and marriage certificates to be apostilled by MEA within 6 months of migration registration.',
    popular: false
  }
];

export const DOCUMENT_EXPLORER_DATA: DocumentTypeItem[] = [
  {
    id: 'degree-certificate',
    category: 'educational',
    name: 'Degree Certificate (UG & PG)',
    description: 'Bachelor’s and Master’s degree certificates issued by UGC, AICTE, or State recognized Indian universities.',
    typicalUse: 'Overseas work permits, employment visa stamping, medical council registrations, and higher studies abroad.',
    requiredDocuments: [
      'Original Degree Certificate',
      'Clear copies of all year mark sheets',
      'Passport front and back pages (clear scan)',
      'Previous verification receipts (if already done)'
    ],
    process: [
      'Verification check with university registrar',
      'State HRD / Education Secretariat verification',
      'MEA (Ministry of External Affairs) authentication or Apostille',
      'Embassy Attestation (for non-Apostille countries)'
    ],
    faq: [
      {
        q: 'Can provisional degree certificates be attested?',
        a: 'Certain embassies accept provisional certificates if they were issued within the last 6 to 12 months, but final degree certificates are universally preferred.'
      }
    ]
  },
  {
    id: 'diploma-certificate',
    category: 'educational',
    name: 'Diploma Certificate',
    description: 'Polytechnic and specialized technical diplomas issued by State Technical Boards or recognized institutions.',
    typicalUse: 'Technical jobs, technician visa categories in Gulf countries, and vocational certifications.',
    requiredDocuments: [
      'Original Diploma Certificate',
      'Semester mark sheets copy',
      'Passport copy'
    ],
    process: [
      'State Technical Board authentication',
      'State HRD / Home Department stamping',
      'MEA Attestation',
      'Embassy Legalization'
    ],
    faq: [
      {
        q: 'Do 3-year polytechnic diplomas qualify for UAE attestation?',
        a: 'Yes, government-recognized state polytechnic diplomas can be fully attested for UAE, Qatar, and other countries.'
      }
    ]
  },
  {
    id: 'transcripts-marksheet',
    category: 'educational',
    name: 'Transcripts & Consolidated Marksheets',
    description: 'Official academic grade records issued by universities and examination controllers.',
    typicalUse: 'Evaluation agencies like WES, ICAS, IQAS, Qatar Embassy Trio requirement, and university credits transfer.',
    requiredDocuments: [
      'Original or University-sealed transcripts envelope',
      'Degree certificate copy',
      'Passport copy'
    ],
    process: [
      'University verification and stamping',
      'State HRD or SDM authentication',
      'MEA Apostille or Embassy Stamping'
    ],
    faq: [
      {
        q: 'Can Goodway assist with collecting transcripts from Bangalore universities?',
        a: 'Yes, our team assists students and alumni with university application submissions and collection guidance across Karnataka.'
      }
    ]
  },
  {
    id: 'birth-certificate',
    category: 'personal',
    name: 'Birth Certificate',
    description: 'Official vital record issued by Municipal Corporations (e.g. BBMP), Town Municipalities, or Panchayats.',
    typicalUse: 'Child dependent visa, international school admission, dual citizenship, and foreign passport applications.',
    requiredDocuments: [
      'Original Birth Certificate in English (or with official translation)',
      'Parents’ passport copies',
      'Child’s passport copy (if already issued)'
    ],
    process: [
      'Notary Stamping',
      'State Home Department or SDM verification',
      'MEA Apostille or Consular Attestation',
      'Destination Embassy seal (for UAE, Qatar, Saudi, etc.)'
    ],
    faq: [
      {
        q: 'What if the birth certificate is in Kannada?',
        a: 'Certificates in regional languages require a certified English translation from a recognized translator before MEA and Embassy submission.'
      }
    ]
  },
  {
    id: 'marriage-certificate',
    category: 'personal',
    name: 'Marriage Certificate',
    description: 'Certificate issued by the Sub-Registrar of Marriages under Hindu Marriage Act, Special Marriage Act, or Christian Marriage Act.',
    typicalUse: 'Spouse visa sponsorship, family resident card, joint bank accounts overseas, and change of surname.',
    requiredDocuments: [
      'Original Marriage Certificate',
      'Husband’s passport copy',
      'Wife’s passport copy',
      'Marriage photographs (occasionally requested for specific state home verifications)'
    ],
    process: [
      'Notary verification',
      'Sub-Divisional Magistrate (SDM) or State Home Department (GAD) authentication',
      'Ministry of External Affairs (MEA) Stamping / Apostille',
      'Target country Embassy Legalization'
    ],
    faq: [
      {
        q: 'Is spouse name endorsement in passport necessary before marriage certificate attestation?',
        a: 'It is not mandatory for initial attestation, but having names endorsed facilitates quicker dependent visa approval at the foreign consulate.'
      }
    ]
  },
  {
    id: 'power-of-attorney',
    category: 'personal',
    name: 'Power of Attorney (POA)',
    description: 'Legal instrument executed to authorize family or legal representatives to manage property, banking, or court matters in India.',
    typicalUse: 'NRIs managing property transactions in Bengaluru, legal court representation, and bank account operations.',
    requiredDocuments: [
      'Original POA on judicial stamp paper',
      'Executant & Attorney identification proofs',
      'Passport copies',
      'Two witness signatures'
    ],
    process: [
      'Notary authentication',
      'Sub-Registrar / SDM verification',
      'MEA Apostille (for foreign use) or Indian Consulate Stamping (for POA executed abroad)'
    ],
    faq: [
      {
        q: 'Can Goodway assist if the POA was signed overseas at an Indian Embassy?',
        a: 'Yes, POAs executed abroad at an Indian consulate must be adjudicated and stamped at the local District Registrar office in Bangalore within 90 days. We provide complete guidance.'
      }
    ]
  },
  {
    id: 'commercial-agreements',
    category: 'commercial',
    name: 'Commercial Agreements & Board Resolutions',
    description: 'Contracts, Articles of Association, power of attorney, and board decisions for international corporate entities.',
    typicalUse: 'Opening overseas branch office, foreign bank account opening, cross-border mergers, and international distribution agreements.',
    requiredDocuments: [
      'Original document on company letterhead',
      'Board resolution authorizing the signatory',
      'Certificate of Incorporation copy',
      'Chamber of Commerce membership details'
    ],
    process: [
      'Authorized Chamber of Commerce (FKCCI / CII / ASSOCHAM) stamping',
      'Ministry of External Affairs (MEA) Commercial Attestation',
      'Destination Embassy / Consular Stamping'
    ],
    faq: [
      {
        q: 'How fast can commercial attestation be processed for urgent export shipments?',
        a: 'Commercial invoices and packing lists can often be prioritized through Chamber of Commerce and MEA channels. Please contact our corporate desk.'
      }
    ]
  }
];

export const SEO_LOCATIONS: LocationSEO[] = [
  {
    slug: 'malleswaram',
    area: 'Malleshwaram',
    title: 'Certificate Attestation in Malleshwaram, Bangalore | Goodway Attestation',
    description: 'Walk in directly to our head office at K.N. Complex, 11th Cross Temple Street, Malleshwaram for instant document review and submission.',
    distanceFromOffice: 'Our Registered Office Location',
    highlights: ['Headquarters with direct client consultation desk', 'Opposite Canara Bank, 11th Cross', 'Walk-in appointments available daily'],
    commonServices: ['Degree Attestation', 'Apostille for Germany/UK', 'UAE Embassy Stamping', 'Marriage Certificate Attestation']
  },
  {
    slug: 'whitefield',
    area: 'Whitefield',
    title: 'Attestation & Apostille Services for Whitefield Tech Hub, Bengaluru',
    description: 'Convenient document pickup and doorstep consultation for IT professionals, engineering leaders, and families residing in Whitefield, ITPL, and Kadugodi.',
    distanceFromOffice: 'Doorstep pickup & courier service available',
    highlights: ['Scheduled executive pickup from IT parks & gated communities', 'Online tracking for tech professionals', 'Fast-track Apostille for EU/US transfers'],
    commonServices: ['Germany Chancenkarte Apostille', 'USA WES Evaluation Attestation', 'UAE Work Permit Legalization']
  },
  {
    slug: 'electronic-city',
    area: 'Electronic City',
    title: 'Apostille & Embassy Attestation in Electronic City, Bangalore',
    description: 'Professional document handling for Phase 1 & Phase 2 IT corridors. We handle end-to-end HRD, MEA, and Embassy processes with secure courier return.',
    distanceFromOffice: 'Scheduled executive pickup available',
    highlights: ['Corporate document pickup for technology firms', 'Fast turnaround for onsite project deployments', 'Secure end-to-end chain of custody'],
    commonServices: ['Degree Certificate HRD & MEA', 'UK Skilled Worker Visa Apostille', 'Saudi Cultural & Embassy Attestation']
  },
  {
    slug: 'koramangala',
    area: 'Koramangala',
    title: 'Certificate Attestation & Legalization in Koramangala, Bengaluru',
    description: 'Quick document pickup across Koramangala 1st to 8th blocks for founders, startup employees, students, and overseas travelers.',
    distanceFromOffice: 'Doorstep pickup & consultation service',
    highlights: ['Commercial document attestation for startups & exports', 'Personal certificate attestation for family visas', 'Express service options'],
    commonServices: ['Birth & Marriage Certificate Attestation', 'Commercial Invoice Chamber & MEA', 'Netherlands BSN Apostille']
  },
  {
    slug: 'indiranagar',
    area: 'Indiranagar',
    title: 'Certificate Attestation & Apostille Services in Indiranagar, Bangalore',
    description: 'Trusted document services for residents of Indiranagar, Defense Colony, and Old Airport Road planning international relocations.',
    distanceFromOffice: 'Doorstep document pickup available',
    highlights: ['Doorstep collection with official receipt', 'Expert guidance on GCC embassy regulations', 'Real-time status tracking'],
    commonServices: ['UAE Embassy Legalization', 'Australia PR Document Apostille', 'Canada Express Entry Apostille']
  },
  {
    slug: 'hsr-layout',
    area: 'HSR Layout',
    title: 'Document Attestation & Apostille Services in HSR Layout, Bengaluru',
    description: 'Serving tech professionals and students across all HSR sectors with document legalization, HRD verification, and apostille.',
    distanceFromOffice: 'Scheduled daily pickup service',
    highlights: ['Same-day pickup scheduling', 'Transparent documentation checklist', 'Strict privacy protocol'],
    commonServices: ['Degree Attestation', 'Marriage Certificate Attestation', 'Germany Blue Card Apostille']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'GWA-2026-1042',
    createdAt: '2026-09-24T10:15:00Z',
    service: 'UAE Embassy Attestation',
    documentType: 'Degree Certificate',
    destinationCountry: 'United Arab Emirates (UAE)',
    numberOfDocuments: '2',
    appointmentType: 'Office Visit',
    date: '2026-09-28',
    timeSlot: '11:00 AM',
    customer: {
      fullName: 'Rahul Sharma',
      mobile: '+91 98451 22334',
      whatsapp: '+91 98451 22334',
      email: 'rahul.sharma@example.com',
      city: 'Bengaluru (Malleshwaram)',
      preferredContactMethod: 'WhatsApp'
    },
    additionalInfo: 'B.E. Computer Science degree from VTU Belagavi. Received offer letter from Dubai tech firm.',
    consentGiven: true,
    status: 'Documents Received',
    assignedStaff: 'Vinay Kumar (Senior Document Specialist)',
    notes: ['Initial document review complete. Original certificate received at Malleshwaram desk. University verification initiated.']
  },
  {
    id: 'GWA-2026-1089',
    createdAt: '2026-09-25T14:30:00Z',
    service: 'MEA Apostille',
    documentType: 'Degree Certificate',
    destinationCountry: 'Germany',
    numberOfDocuments: '1',
    appointmentType: 'Document Pickup',
    date: '2026-09-29',
    timeSlot: '02:30 PM',
    customer: {
      fullName: 'Priya Venkatesh',
      mobile: '+91 97412 88990',
      whatsapp: '+91 97412 88990',
      email: 'priya.v@example.com',
      city: 'Bengaluru (Whitefield)',
      preferredContactMethod: 'WhatsApp'
    },
    additionalInfo: 'Applying for German Opportunity Card (Chancenkarte). Need MEA apostille on B.Tech degree.',
    consentGiven: true,
    status: 'Contacted',
    assignedStaff: 'Kavitha R (Apostille Desk)',
    notes: ['Pickup scheduled from Whitefield address on Tuesday morning.']
  },
  {
    id: 'GWA-2026-1120',
    createdAt: '2026-09-26T09:00:00Z',
    service: 'Personal Certificate Attestation',
    documentType: 'Marriage Certificate',
    destinationCountry: 'Qatar',
    numberOfDocuments: '1',
    appointmentType: 'Office Visit',
    date: '2026-09-30',
    timeSlot: '10:30 AM',
    customer: {
      fullName: 'Syed Arshad',
      mobile: '+91 99001 54321',
      whatsapp: '+91 99001 54321',
      email: 'syed.arshad@example.com',
      city: 'Bengaluru (Jayanagar)',
      preferredContactMethod: 'Phone Call'
    },
    additionalInfo: 'Need marriage certificate attested for Qatar family residence visa.',
    consentGiven: true,
    status: 'New',
    assignedStaff: 'Unassigned',
    notes: ['New booking submitted via website.']
  }
];

export const INITIAL_TRACKING_ITEMS: TrackingItem[] = [
  {
    trackingId: 'GWA-TRK-7842',
    bookingId: 'GWA-2026-1042',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98451 22334',
    service: 'UAE Embassy Attestation',
    country: 'United Arab Emirates (UAE)',
    documentType: 'B.E. Degree Certificate (VTU)',
    currentStatus: 'Under Verification',
    expectedCompletion: '2026-10-06',
    lastUpdated: '2026-09-25 16:45',
    history: [
      {
        status: 'Document Received',
        date: '2026-09-24 11:30',
        location: 'Goodway Malleshwaram Office, Bengaluru',
        notes: 'Original certificate and passport copy received and logged into secure custody vault.',
        completed: true
      },
      {
        status: 'University Verification Initiated',
        date: '2026-09-25 14:15',
        location: 'VTU Exam Controller / State HRD Cell',
        notes: 'Verification application submitted to university registrar office.',
        completed: true
      },
      {
        status: 'State HRD Attestation',
        date: 'Pending',
        location: 'Higher Education Department, Karnataka',
        notes: 'Awaiting authentication stamp and signature from collegiate authorities.',
        completed: false
      },
      {
        status: 'MEA Stamping, New Delhi',
        date: 'Pending',
        location: 'Ministry of External Affairs, Patiala House / CPV Division',
        notes: 'Document will be forwarded to central MEA consular section.',
        completed: false
      },
      {
        status: 'UAE Embassy Attestation',
        date: 'Pending',
        location: 'UAE Embassy Consular Section, New Delhi',
        notes: 'Final diplomatic consular stamping and sticker application.',
        completed: false
      },
      {
        status: 'Ready for Collection / Delivery',
        date: 'Pending',
        location: 'Goodway Malleshwaram Office, Bengaluru',
        notes: 'Document will be safely sealed and dispatched via insured courier or kept for client pickup.',
        completed: false
      }
    ]
  },
  {
    trackingId: 'GWA-TRK-4421',
    bookingId: 'GWA-2026-0988',
    customerName: 'Ananya Deshmukh',
    customerPhone: '+91 98860 11223',
    service: 'MEA Apostille',
    country: 'Germany',
    documentType: 'Birth Certificate',
    currentStatus: 'Ready',
    expectedCompletion: '2026-09-27',
    lastUpdated: '2026-09-26 10:20',
    history: [
      {
        status: 'Document Received',
        date: '2026-09-18 10:00',
        location: 'Goodway Malleshwaram Office, Bengaluru',
        notes: 'Original BBMP birth certificate received.',
        completed: true
      },
      {
        status: 'State / SDM Authentication',
        date: '2026-09-20 15:30',
        location: 'Sub-Divisional Magistrate (SDM) Secretariat',
        notes: 'Verification signature executed.',
        completed: true
      },
      {
        status: 'MEA Apostille Affixed',
        date: '2026-09-24 16:00',
        location: 'Ministry of External Affairs (MEA), New Delhi',
        notes: 'Official Hague Apostille sticker with verifiable QR-code successfully affixed.',
        completed: true
      },
      {
        status: 'Ready for Client Pickup',
        date: '2026-09-26 10:00',
        location: 'Goodway Malleshwaram Office, Bengaluru',
        notes: 'Document has returned safely to Bengaluru office. Notification sent to customer.',
        completed: true
      }
    ]
  },
  {
    trackingId: 'GWA-TRK-9032',
    bookingId: 'GWA-2026-0912',
    customerName: 'Karthik Narayanan',
    customerPhone: '+91 94480 33445',
    service: 'Commercial Document Attestation',
    country: 'Saudi Arabia',
    documentType: 'Certificate of Incorporation & Board Resolution',
    currentStatus: 'Embassy Processing',
    expectedCompletion: '2026-09-30',
    lastUpdated: '2026-09-25 18:00',
    history: [
      {
        status: 'Document Received',
        date: '2026-09-19 12:00',
        location: 'Goodway Malleshwaram Office',
        notes: 'Corporate documents verified.',
        completed: true
      },
      {
        status: 'Chamber of Commerce Stamping',
        date: '2026-09-21 11:00',
        location: 'Chamber of Commerce (FKCCI / ASSOCHAM)',
        notes: 'Commercial trade endorsement completed.',
        completed: true
      },
      {
        status: 'MEA Commercial Attestation',
        date: '2026-09-23 15:00',
        location: 'MEA Consular Wing, New Delhi',
        notes: 'Central government commercial seal applied.',
        completed: true
      },
      {
        status: 'Saudi Embassy Legalization',
        date: '2026-09-25 14:00',
        location: 'Royal Embassy of Saudi Arabia, New Delhi',
        notes: 'Dossier in final consular review at the Saudi Embassy.',
        completed: false
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'uae-attestation-guide-bangalore',
    slug: 'uae-certificate-attestation-guide-bangalore',
    title: 'The Complete Step-by-Step Guide to UAE Certificate Attestation in Bangalore',
    category: 'UAE Attestation',
    author: 'Goodway Attestation Research Team',
    publishedDate: 'September 15, 2026',
    updatedDate: 'September 22, 2026',
    readingTime: '6 min read',
    excerpt: 'Planning to relocate to Dubai, Abu Dhabi or Sharjah for employment or business? Understand the required stages: State HRD/Home, MEA, UAE Embassy, and MOFA.',
    tableOfContents: [
      'Why UAE Requires Certificate Attestation',
      'Educational vs. Personal Document Pathways',
      'The 4 Essential Stages of UAE Attestation',
      'What is MOFA and When is it Done?',
      'Common Mistakes to Avoid',
      'Frequently Asked Questions'
    ],
    body: [
      'The United Arab Emirates is one of the most sought-after destinations for professionals, entrepreneurs, and families from Bengaluru and Karnataka. However, any Indian document submitted to UAE government entities, universities, or employers must undergo a strict chain of consular authentication.',
      'Unlike European countries that participate in the Hague Apostille Convention, the UAE requires bilateral Embassy Attestation. This means your certificates must be authenticated both by the Government of India and by the diplomatic mission of the UAE in India.',
      'Stage 1: State Authentication. Educational certificates require verification from the state education authority (State HRD in Karnataka or the respective issuing state). For personal documents like marriage or birth certificates, verification is done by the State Home Department or Sub-Divisional Magistrate (SDM).',
      'Stage 2: Central MEA Attestation. The Ministry of External Affairs, Government of India, is the sole federal authority authorized to stamp documents intended for foreign official use.',
      'Stage 3: UAE Embassy / Consulate Legalization. The document is submitted to the UAE Embassy in New Delhi or the UAE Consulate in Mumbai, where consular officers affix official holograms and verification stickers.',
      'Stage 4: Ministry of Foreign Affairs (MOFA) in the UAE. Once you arrive in the UAE, the final step is to get the MOFA stamping in Dubai or Abu Dhabi to validate the document for your labor card or residency visa.'
    ],
    faqs: [
      {
        q: 'Can a provisional degree be attested for UAE?',
        a: 'The UAE Embassy generally requires the final original degree certificate. In rare cases where graduation was recent, provisional certificates may be accepted if accompanied by a university verification letter.'
      },
      {
        q: 'How long does the entire UAE attestation process take?',
        a: 'Processing duration depends on university verification turnaround and state department schedules. Typically it spans between 8 to 15 working days.'
      }
    ]
  },
  {
    id: 'difference-between-apostille-and-attestation',
    slug: 'difference-between-apostille-and-attestation',
    title: 'Apostille vs. Attestation: What is the Real Difference for Indian Documents?',
    category: 'Apostille',
    author: 'Goodway Attestation Research Team',
    publishedDate: 'August 28, 2026',
    updatedDate: 'September 18, 2026',
    readingTime: '5 min read',
    excerpt: 'Confused whether your destination country requires an MEA Apostille sticker or an Embassy Attestation stamp? Here is the legal breakdown.',
    tableOfContents: [
      'What is the Hague Apostille Convention?',
      'Key Differences at a Glance',
      'List of Popular Apostille vs. Embassy Countries',
      'The Apostille Format & Security Features',
      'Next Steps for Bangalore Residents'
    ],
    body: [
      'One of the most frequent questions we receive at our Malleshwaram office is whether a client needs an "Apostille" or an "Attestation". While both terms describe the authentication of official documents for cross-border recognition, their legal mechanisms and applicable destinations differ significantly.',
      'The Hague Apostille Convention of 1961 was created to simplify document legalization between signatory nations. An Apostille is a standardized computer-generated sticker containing a unique serial number and QR code affixed directly by the Ministry of External Affairs (MEA), India.',
      'If your destination country is a member of the Hague Convention (such as Germany, the United States, the United Kingdom, Australia, France, or Canada), an MEA Apostille is sufficient. You DO NOT need to visit or submit to the foreign embassy.',
      'Conversely, if your destination country is NOT a member of the Hague Convention (such as the UAE, Saudi Arabia, Qatar, Kuwait, Oman, or China), you must complete full Embassy Attestation, where the destination country’s embassy in India applies their consular stamp.'
    ],
    faqs: [
      {
        q: 'Does Canada accept MEA Apostille now?',
        a: 'Yes! Canada officially joined the Hague Apostille Convention on January 11, 2024. Indian documents intended for Canada now receive an MEA Apostille sticker.'
      }
    ]
  },
  {
    id: 'karnataka-hrd-attestation-process',
    slug: 'karnataka-hrd-attestation-process-bangalore',
    title: 'Karnataka State HRD Attestation: Guide for VTU, Bangalore University & State Colleges',
    category: 'HRD Attestation',
    author: 'Goodway Attestation Research Team',
    publishedDate: 'August 10, 2026',
    updatedDate: 'September 12, 2026',
    readingTime: '5 min read',
    excerpt: 'Detailed overview of Higher Education Department verification in Bengaluru for engineering, medical, and general academic degrees.',
    tableOfContents: [
      'What is HRD Attestation?',
      'Why is University Verification the First Step?',
      'Colleges and Boards Covered in Karnataka',
      'Documents Checklist for HRD',
      'How Goodway Assists Candidates'
    ],
    body: [
      'Human Resource Development (HRD) attestation is the authentication of educational certificates by the state government where the university or board is located. In Karnataka, this is executed through the collegiate education department in Bengaluru.',
      'Before the state government applies its seal, the document’s genuineness must be confirmed with the respective university registrar or examination controller (e.g. Visvesvaraya Technological University - VTU, Bangalore University, Rajiv Gandhi University of Health Sciences - RGUHS, or Mysore University).',
      'HRD authentication is an indispensable prerequisite if you are heading to Saudi Arabia, Qatar, or Kuwait for employment, as these embassies will reject educational documents that lack prior state education verification.'
    ],
    faqs: [
      {
        q: 'Can alumni residing outside Bangalore get Karnataka HRD done?',
        a: 'Yes, alumni who have relocated to other cities or are already working abroad can authorize Goodway Attestation to handle university verification and state HRD on their behalf.'
      }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    customerName: 'Anand Kumar',
    service: 'UAE Embassy Attestation (Degree & Marriage)',
    location: 'Bengaluru (Malleshwaram)',
    review: 'Goodway handled my VTU degree and marriage certificate for my Dubai relocation. Extremely professional team, provided clear receipt at their Malleshwaram office, and delivered everything safely within the promised timeframe.',
    rating: 5,
    verified: true,
    date: 'August 2026'
  },
  {
    id: 't-2',
    customerName: 'Deepa Hegde',
    service: 'Germany MEA Apostille (Chancenkarte)',
    location: 'Bengaluru (Whitefield)',
    review: 'I needed MEA Apostille for my German Opportunity Card application. The team arranged doorstep pickup from Whitefield, kept me updated with online tracking, and the apostilled degree was accepted seamlessly by the German authority.',
    rating: 5,
    verified: true,
    date: 'September 2026'
  },
  {
    id: 't-3',
    customerName: 'Mohammed Tariq',
    service: 'Saudi Culture & Embassy Attestation',
    location: 'Bengaluru (Frazer Town)',
    review: 'Saudi attestation has very strict requirements with university verifications and SACM. Goodway guided me transparently about the documents required from my employer and handled the entire process without hassles.',
    rating: 5,
    verified: true,
    date: 'July 2026'
  },
  {
    id: 't-4',
    customerName: 'Sanjay Varma',
    service: 'Commercial Document Attestation (Chamber & MEA)',
    location: 'Bengaluru (Peenya Industrial Area)',
    review: 'Our export business required urgent Chamber of Commerce and MEA legalization for trade contracts with Oman. The team was prompt, knowledgeable, and provided transparent invoices.',
    rating: 5,
    verified: true,
    date: 'August 2026'
  }
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is certificate attestation and why is it necessary?',
    answer: 'Certificate attestation is the official verification and authentication process where authorized government authorities (State Departments, MEA, and Foreign Embassies) place seals and signatures on your document to certify its genuineness. It is necessary when presenting Indian certificates to foreign governments, universities, or employers for work visas, student admissions, or family migration.'
  },
  {
    id: 'faq-2',
    category: 'Apostille',
    question: 'What is an MEA Apostille and how is it different from Embassy attestation?',
    answer: 'An Apostille is an internationally standardized computer-generated sticker issued by the Ministry of External Affairs (MEA), Government of India, under the Hague Convention of 1961. Once apostilled, the document is legally accepted in over 120 member countries (such as Germany, the UK, the USA, Australia, and Canada) without needing individual embassy stamping. Non-Hague countries (such as the UAE, Saudi Arabia, and Qatar) require bilateral Embassy Attestation.'
  },
  {
    id: 'faq-3',
    category: 'Processing & Timelines',
    question: 'How long does certificate attestation take?',
    answer: 'Processing timelines vary depending on the document type, the issuing state, university verification speed, and the destination country embassy protocol. Generally: MEA Apostille takes 3–5 working days; State HRD + MEA + UAE/GCC Embassy takes between 8–15 working days. We provide estimated timeframes during initial document review.'
  },
  {
    id: 'faq-4',
    category: 'Documents',
    question: 'Are original certificates required, or can photocopies be attested?',
    answer: 'State HRD, MEA, and foreign embassies strictly require original physical certificates to affix security stickers, stamps, and signatures. We also require a clear passport copy of the certificate holder and mark sheets for academic verifications.'
  },
  {
    id: 'faq-5',
    category: 'Collection & Security',
    question: 'Can documents be collected from my location in Bangalore?',
    answer: 'Yes! While clients are always welcome to visit our Malleshwaram head office, we also provide scheduled executive document pickup and return delivery across major Bengaluru corridors (Whitefield, Electronic City, Koramangala, Indiranagar, HSR Layout, etc.). All documents are transported in tamper-evident security folders.'
  },
  {
    id: 'faq-6',
    category: 'Tracking',
    question: 'Can I track the status of my document during processing?',
    answer: 'Yes. Every client is assigned a unique Tracking ID upon booking and document handover. You can enter your Tracking ID directly on our website to see live status updates, from initial university checks to MEA stamping and final delivery readiness.'
  },
  {
    id: 'faq-7',
    category: 'HRD',
    question: 'What is State HRD attestation and when is it required?',
    answer: 'HRD (Human Resource Development) is state-level authentication by the Department of Higher Education where your university is located. It is mandatory for degree certificates when applying for work visas in countries like Saudi Arabia, Qatar, and Kuwait.'
  },
  {
    id: 'faq-8',
    category: 'MOFA',
    question: 'What is MOFA attestation and can it be done in India?',
    answer: 'MOFA (Ministry of Foreign Affairs) attestation is the final verification conducted inside the destination country (e.g. Dubai, Abu Dhabi, Doha, or Riyadh) after you arrive. It cannot be done in India, but your document MUST complete Indian MEA and Embassy attestation first for MOFA to accept it.'
  }
];
