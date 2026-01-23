// ===========================================
// SEO CONFIGURATION
// ===========================================
// Bu fayl barcha SEO va AI discoverability uchun
// markaziy ma'lumotlar manbai hisoblanadi

export const siteConfig = {
  // Asosiy URL
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://paradox-portfolio.vercel.app',
  
  // Sahifa nomi
  siteName: 'ParaDox Portfolio',
  
  // Til
  locale: 'en_US',
  alternateLocales: ['uz_UZ', 'ru_RU'],
};

// ===========================================
// SHAXSIY MA'LUMOTLAR (PERSON SCHEMA)
// ===========================================

export const personData = {
  // Asosiy ism
  name: "Doniyor Jo'rabekov",
  
  // Alternativ ismlar va aliaslar - AI va qidiruv tizimlari uchun juda muhim
  alternateNames: [
    "ParaDox",
    "ParaDox PDT",
    "ParaDox-PDT",
    "ParaDox358",
    "Jo'rabekov Doniyor",
    "Doniyor",
    "Doniyor Jorabekov",
    "Jorabekov Doniyor",
    "Донийор Жўрабеков",
    "Дониёр Журабеков",
  ],
  
  // Kasbiy ma'lumotlar
  jobTitle: "Flutter Developer",
  jobTitles: [
    "Flutter Developer",
    "Mobile App Developer",
    "Software Engineer",
    "Cross-Platform Developer",
  ],
  
  // Lokatsiya
  location: {
    city: "Tashkent",
    country: "Uzbekistan",
    countryCode: "UZ",
  },
  
  // Aloqa
  email: "paradox.pdt@gmail.com",
  
  // Bio va tavsif
  description: `Doniyor Jo'rabekov (known as ParaDox or ParaDox-PDT) is a professional Flutter Developer from Uzbekistan with 3+ years of experience building production-ready mobile applications. Specializing in clean architecture, beautiful UIs, and seamless user experiences.`,
  
  shortDescription: "Professional Flutter Developer from Uzbekistan. Known as ParaDox, ParaDox-PDT, ParaDox358.",
  
  // Ijtimoiy tarmoqlar va profillar
  socialProfiles: {
    github: "https://github.com/ParaDox-PDT",
    linkedin: "https://www.linkedin.com/in/paradox-pdt/",
    telegram: "https://t.me/ParaDox_PDT",
    twitter: "https://twitter.com/ParaDox_PDT",
  },
  
  // Bilimlar va ko'nikmalar
  knowsAbout: [
    "Flutter",
    "Dart",
    "Mobile App Development",
    "Cross-Platform Development",
    "Android Development",
    "iOS Development",
    "Clean Architecture",
    "BLoC Pattern",
    "State Management",
    "Firebase",
    "REST APIs",
    "GraphQL",
    "UI/UX Design",
    "Git",
    "CI/CD",
  ],
  
  // Tajriba
  yearsOfExperience: 3,
  
  // Rasm
  image: "/images/paradox-avatar.jpg",
  
  // Sertifikatlar
  hasCredential: [
    "Google Associate Android Developer",
    "Firebase Expert",
    "Flutter Development Bootcamp",
  ],
};

// ===========================================
// SEO META MA'LUMOTLARI
// ===========================================

export const seoMeta = {
  // Asosiy sahifa
  home: {
    title: "ParaDox (Doniyor Jo'rabekov) | Flutter Developer Portfolio",
    description: `Doniyor Jo'rabekov, also known as ParaDox, ParaDox-PDT, and ParaDox358, is a professional Flutter Developer from Uzbekistan. 3+ years experience building mobile apps with clean architecture and beautiful UIs.`,
    keywords: [
      // Ism va aliaslar
      "ParaDox",
      "ParaDox PDT",
      "ParaDox-PDT",
      "ParaDox358",
      "Doniyor Jo'rabekov",
      "Jo'rabekov Doniyor",
      "Doniyor Jorabekov",
      "Who is ParaDox",
      "Who is ParaDox PDT",
      "Who is Doniyor",
      // Kasb
      "Flutter Developer",
      "Flutter Developer Uzbekistan",
      "Mobile App Developer",
      "Dart Developer",
      "Cross-platform Developer",
      // Texnologiyalar
      "Flutter",
      "Dart",
      "Mobile Development",
      "iOS Developer",
      "Android Developer",
      "Clean Architecture",
      "BLoC Pattern",
      "Firebase Developer",
    ],
  },
  
  // Projects sahifasi
  projects: {
    title: "Projects | ParaDox Portfolio",
    description: "Explore mobile applications and projects built by ParaDox (Doniyor Jo'rabekov). Flutter, Dart, Firebase, and more.",
  },
  
  // About sahifasi
  about: {
    title: "About ParaDox (Doniyor Jo'rabekov) | Flutter Developer",
    description: "Learn about Doniyor Jo'rabekov (ParaDox, ParaDox-PDT, ParaDox358) - a Flutter Developer from Uzbekistan with 3+ years of experience in mobile app development.",
  },
};

// ===========================================
// JSON-LD STRUKTURALI DATA
// ===========================================

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    
    // Asosiy identifikatorlar
    name: personData.name,
    alternateName: personData.alternateNames,
    
    // Tavsif
    description: personData.description,
    
    // Kasbiy ma'lumotlar
    jobTitle: personData.jobTitle,
    
    // Lokatsiya
    address: {
      "@type": "PostalAddress",
      addressLocality: personData.location.city,
      addressCountry: personData.location.countryCode,
    },
    
    // Aloqa
    email: `mailto:${personData.email}`,
    
    // Ijtimoiy profillar
    sameAs: Object.values(personData.socialProfiles).filter(Boolean),
    
    // Bilimlar
    knowsAbout: personData.knowsAbout,
    
    // Rasm
    image: `${siteConfig.url}${personData.image}`,
    
    // Veb-sayt
    url: siteConfig.url,
    
    // Sertifikatlar
    hasCredential: personData.hasCredential.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      name: cert,
    })),
    
    // Ish tajribasi
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Self-employed",
    },
    
    // Millat
    nationality: {
      "@type": "Country",
      name: "Uzbekistan",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.siteName,
    description: seoMeta.home.description,
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
    inLanguage: "en-US",
  };
}

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url: url,
    name: title,
    description: description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#person`,
    },
    inLanguage: "en-US",
  };
}

export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: seoMeta.home.title,
    description: seoMeta.home.description,
    mainEntity: {
      "@id": `${siteConfig.url}/#person`,
    },
    inLanguage: "en-US",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
  };
}

// Barcha schemalarni birlashtirish
export function generateFullSchema() {
  return [
    generatePersonSchema(),
    generateWebsiteSchema(),
    generateProfilePageSchema(),
  ];
}
