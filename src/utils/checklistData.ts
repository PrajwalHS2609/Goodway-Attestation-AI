export interface CountryChecklistRule {
  countryName: string;
  countryCode: string;
  type: 'Embassy Attestation' | 'Hague Apostille';
  primaryDocuments: { [key: string]: string[] };
  supportingDocuments: { [key: string]: string[] };
  workflowStages: string[];
  crucialNotes: string[];
}

export const COUNTRY_CHECKLIST_RULES: Record<string, CountryChecklistRule> = {
  uae: {
    countryName: 'United Arab Emirates (UAE)',
    countryCode: 'AE',
    type: 'Embassy Attestation',
    primaryDocuments: {
      educational: [
        'Original Final Degree or Diploma Certificate (Pristine condition, undamaged)',
        'Clear photocopies of all semester / year-wise mark sheets',
        'Consolidated marks card or official university transcript copy',
        'De-lamination required if the certificate is plastified'
      ],
      personal: [
        'Original Birth or Marriage Certificate (Issued by Registrar / Municipal Corp e.g. BBMP)',
        'Translation into English if certificate is in Kannada or other regional language',
        'De-lamination required if certificate is laminated'
      ],
      commercial: [
        'Original Commercial Document (Power of Attorney, Invoices, Board Resolution, MOA)',
        'Company Letterhead with authorized director signature',
        'Chamber of Commerce (FKCCI/ASSOCHAM) endorsement'
      ]
    },
    supportingDocuments: {
      educational: [
        'Clear color copy of applicant passport (Front page with photo & Back address page)',
        'Employment offer letter or contract from UAE employer (if requested for fast-track)',
        '2 recent passport-size photographs with white background'
      ],
      personal: [
        'Passport copies of primary applicant and spouse / dependent',
        'Recent passport-size photographs of applicant',
        'Proof of relationship or residence in UAE (if dependent visa sponsorship)'
      ],
      commercial: [
        'Certificate of Incorporation copy',
        'Board resolution authorizing the signatory',
        'Passport copy of the authorized director'
      ]
    },
    workflowStages: [
      '1. State Authentication (State HRD in Karnataka or issuing state / Home Dept)',
      '2. Central MEA Attestation (Ministry of External Affairs, Government of India)',
      '3. UAE Embassy Stamping (New Delhi / Consulate General in Mumbai)',
      '4. Destination MOFA Attestation (Upon arrival in UAE / Dubai / Abu Dhabi)'
    ],
    crucialNotes: [
      'The UAE Embassy strictly rejects laminated documents. Seals cannot be placed on plastic.',
      'Spelling of the candidate name on the certificate must exactly match the Passport.',
      'Provisional certificates are accepted only within 6 months of graduation; final original degree is strongly advised.'
    ]
  },

  saudi: {
    countryName: 'Saudi Arabia (KSA)',
    countryCode: 'SA',
    type: 'Embassy Attestation',
    primaryDocuments: {
      educational: [
        'Original Regular Degree Certificate (Distance/Open university degrees are strictly restricted)',
        'All semester marks cards in original and clear copies',
        'Official University Verification Letter confirming regular mode of attendance'
      ],
      personal: [
        'Original Marriage or Birth Certificate with official English translation',
        'Notarized and Home Department verified original vital record'
      ],
      commercial: [
        'Original Commercial Contract / Power of Attorney on legal stamp paper',
        'Chamber of Commerce verification'
      ]
    },
    supportingDocuments: {
      educational: [
        'Genuine Job Offer Letter verified by Saudi Chamber of Commerce and MOFA KSA',
        'Valid Indian Passport copy with at least 6 months validity',
        'Saudi Cultural Attestation (SACM) authorization form signed by candidate'
      ],
      personal: [
        'Husband & Wife valid passport copies',
        'Iqama copy of the sponsor in Saudi Arabia',
        'Permanent address verification'
      ],
      commercial: [
        'CR (Commercial Registration) copy of the Saudi company',
        'Authorized signatory ID copy'
      ]
    },
    workflowStages: [
      '1. State HRD Attestation from issuing state (Mandatory for Saudi)',
      '2. Ministry of External Affairs (MEA), Government of India Attestation',
      '3. Saudi Cultural Attestation (SACM) - mandatory for degrees',
      '4. Royal Embassy of Saudi Arabia Consular Legalization in New Delhi',
      '5. MOFA verification inside KSA upon arrival'
    ],
    crucialNotes: [
      'Saudi Arabia has the strictest verification protocol in the GCC; all degrees require direct university cross-verification.',
      'Employment contract must be stamped by Saudi Chamber of Commerce prior to embassy submission.',
      'Distance learning degrees without laboratory/regular accreditation are rejected by SACM.'
    ]
  },

  qatar: {
    countryName: 'Qatar',
    countryCode: 'QA',
    type: 'Embassy Attestation',
    primaryDocuments: {
      educational: [
        'Original Degree Certificate (Regular college mode)',
        'Consolidated Marksheet / All year transcript cards',
        'Official University Verification Letter directly from Controller of Examinations (Qatar "Trio Rule")'
      ],
      personal: [
        'Original Marriage or Birth Certificate from municipal authority',
        'English translation certified by registered translator'
      ],
      commercial: [
        'Original Invoices / MOA / Power of Attorney stamped by Chamber of Commerce'
      ]
    },
    supportingDocuments: {
      educational: [
        'Clear Passport scan of candidate (first and last pages)',
        'Qatar employment offer letter or Qatar ID (QID) copy of employer',
        'Candidate authorization letter for Goodway verification desk'
      ],
      personal: [
        'Passport copies of husband, wife, and child',
        'Sponsor Qatar QID copy'
      ],
      commercial: [
        'Qatar partner company trade license copy',
        'Certificate of Incorporation'
      ]
    },
    workflowStages: [
      '1. State HRD (Educational) or State Home Department (Personal)',
      '2. MEA Attestation (Ministry of External Affairs, New Delhi)',
      '3. Qatar Embassy Attestation, New Delhi',
      '4. Ministry of Foreign Affairs (MOFA) Doha, Qatar'
    ],
    crucialNotes: [
      'Qatar Embassy enforces the mandatory "Trio Rule" for educational degrees: original degree, consolidated mark sheet, and university verification letter must all be submitted together.',
      'Any missing component of the trio will result in consular rejection.'
    ]
  },

  germany: {
    countryName: 'Germany',
    countryCode: 'DE',
    type: 'Hague Apostille',
    primaryDocuments: {
      educational: [
        'Original Degree or Diploma Certificate',
        'Academic transcripts and semester mark sheets',
        'De-lamination if certificate is plastified'
      ],
      personal: [
        'Original Birth Certificate / Marriage Certificate issued by Municipal Registrar (e.g. BBMP)',
        'Single Status Affidavit if applying for marriage in Germany'
      ],
      commercial: [
        'Power of Attorney, Business Contracts, Company Registration Documents'
      ]
    },
    supportingDocuments: {
      educational: [
        'Clear passport copy (front & back)',
        'German university admission letter or Opportunity Card (Chancenkarte) checklist',
        'Anabin database university equivalence printout (recommended)'
      ],
      personal: [
        'Applicant passport copy',
        'Certified German sworn translation (if demanded by German Standesamt/Bürgeramt)'
      ],
      commercial: [
        'Director passport copy and Board authorization'
      ]
    },
    workflowStages: [
      '1. State Home Department / HRD / SDM Verification',
      '2. Ministry of External Affairs (MEA) Hague Apostille Sticker with verifiable QR code',
      '3. Sworn German translation (if required by German authorities)'
    ],
    crucialNotes: [
      'Germany is a member of the Hague Apostille Convention. NO German Embassy attestation is required after MEA Apostille.',
      'Check if your municipality (Bürgeramt/Standesamt) requires sworn translation done inside Germany or by an accredited translator.'
    ]
  },

  uk: {
    countryName: 'United Kingdom (UK)',
    countryCode: 'GB',
    type: 'Hague Apostille',
    primaryDocuments: {
      educational: [
        'Original Degree Certificate',
        'Official transcripts for ECCTIS qualification recognition'
      ],
      personal: [
        'Original Birth Certificate or Marriage Certificate'
      ],
      commercial: [
        'Power of Attorney, Corporate Resolutions, Commercial Contracts'
      ]
    },
    supportingDocuments: {
      educational: [
        'Clear Passport copy',
        'ECCTIS reference number (if for Skilled Worker / Healthcare visa)'
      ],
      personal: [
        'Passport copies of spouses and children'
      ],
      commercial: [
        'UK Companies House correspondence or incorporation copy'
      ]
    },
    workflowStages: [
      '1. State Home Department / SDM Verification',
      '2. Ministry of External Affairs (MEA) Hague Apostille Sticker'
    ],
    crucialNotes: [
      'The UK accepts MEA Apostille stickers directly without additional consular legalization.',
      'Healthcare professionals registered with GMC/NMC must also undergo primary source verification.'
    ]
  },

  usa: {
    countryName: 'United States of America (USA)',
    countryCode: 'US',
    type: 'Hague Apostille',
    primaryDocuments: {
      educational: [
        'Original Degree Certificate & Transcripts in sealed envelopes for WES / ECE evaluation'
      ],
      personal: [
        'Original Birth Certificate, Marriage Certificate, or Adoption Deed'
      ],
      commercial: [
        'Commercial Agreements, Patent assignments, Power of Attorney for property'
      ]
    },
    supportingDocuments: {
      educational: [
        'Clear copy of Indian Passport',
        'WES / ECE Evaluation Reference number (if applicable)'
      ],
      personal: [
        'Passport copies of applicant and family members'
      ],
      commercial: [
        'US state incorporation or IRS EIN registration copy'
      ]
    },
    workflowStages: [
      '1. State Home Department / Sub-Divisional Magistrate (SDM) Stamping',
      '2. MEA Hague Apostille Sticker (Government of India)'
    ],
    crucialNotes: [
      'USA is a Hague Apostille member. MEA Apostille provides complete legal recognition for USCIS, universities, and state licensing boards.',
      'Ensure name on certificate matches Indian passport and US visa petition.'
    ]
  },

  canada: {
    countryName: 'Canada',
    countryCode: 'CA',
    type: 'Hague Apostille',
    primaryDocuments: {
      educational: [
        'Original Degree / Diploma Certificate'
      ],
      personal: [
        'Original Birth Certificate and Marriage Certificate for Spousal / PR sponsorship'
      ],
      commercial: [
        'Corporate Power of Attorney, Business Agreements'
      ]
    },
    supportingDocuments: {
      educational: [
        'Indian Passport copy (first and last pages)',
        'IRCC Express Entry / PNP application details'
      ],
      personal: [
        'Passport copies of sponsor and dependent'
      ],
      commercial: [
        'Canadian corporate registry documents'
      ]
    },
    workflowStages: [
      '1. State Department / SDM Verification',
      '2. MEA Apostille Sticker (Effective January 11, 2024 Hague accession)'
    ],
    crucialNotes: [
      'Canada officially joined the Hague Apostille Convention in 2024. Canadian authorities now accept MEA Apostille directly, replacing the previous redundant embassy legalization process.'
    ]
  },

  general: {
    countryName: 'Global International Standard',
    countryCode: 'INT',
    type: 'Embassy Attestation',
    primaryDocuments: {
      educational: [
        'Original Degree / Diploma / Transcripts certificate',
        'All semester marks cards photocopies',
        'De-lamination if certificate is plastified'
      ],
      personal: [
        'Original Vital Certificate (Birth / Marriage / Death / Affidavit)',
        'English translation if document is in regional language'
      ],
      commercial: [
        'Original Commercial documents with Chamber of Commerce endorsement'
      ]
    },
    supportingDocuments: {
      educational: [
        'Clear passport copies (front & back)',
        'Passport size photographs'
      ],
      personal: [
        'Applicant and family passport copies'
      ],
      commercial: [
        'Certificate of Incorporation and Director ID'
      ]
    },
    workflowStages: [
      '1. State Level Verification (HRD or Home Dept / SDM)',
      '2. Ministry of External Affairs (MEA), Government of India Stamping',
      '3. Target Consular / Apostille Processing'
    ],
    crucialNotes: [
      'Original certificates are mandatory for physical seal application.',
      'Check whether the destination is a Hague Apostille member or requires bilateral consular embassy attestation.'
    ]
  }
};
