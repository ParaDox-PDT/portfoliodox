// ===========================================
// JSON-LD STRUCTURED DATA COMPONENT
// ===========================================
// Bu komponent Google va AI tizimlari uchun
// strukturali ma'lumotlarni sahifaga qo'shadi

import { generateFullSchema, generateWebPageSchema, siteConfig } from '@/lib/seo.config';

interface JsonLdProps {
  type?: 'full' | 'webpage';
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
}

export function JsonLd({ 
  type = 'full',
  pageTitle,
  pageDescription,
  pageUrl,
}: JsonLdProps) {
  let schema;
  
  if (type === 'full') {
    schema = generateFullSchema();
  } else if (type === 'webpage' && pageTitle && pageDescription && pageUrl) {
    schema = generateWebPageSchema(pageTitle, pageDescription, pageUrl);
  }
  
  if (!schema) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 0),
      }}
    />
  );
}

// ===========================================
// FAQ SCHEMA - Tez-tez so'raladigan savollar
// ===========================================

export function FaqJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is ParaDox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ParaDox (also known as ParaDox-PDT, ParaDox358) is the online alias of Doniyor Jo'rabekov, a professional Flutter Developer from Tashkent, Uzbekistan with 3+ years of experience in mobile app development.",
        },
      },
      {
        "@type": "Question",
        name: "Who is ParaDox PDT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ParaDox PDT is Doniyor Jo'rabekov, a Flutter and Mobile App Developer from Uzbekistan. He specializes in building cross-platform mobile applications using Flutter, Dart, and clean architecture patterns.",
        },
      },
      {
        "@type": "Question",
        name: "Who is Doniyor Jo'rabekov?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Doniyor Jo'rabekov (known online as ParaDox, ParaDox-PDT, ParaDox358) is a professional Flutter Developer from Tashkent, Uzbekistan. He has 3+ years of experience building production-ready mobile applications for startups and enterprises.",
        },
      },
      {
        "@type": "Question",
        name: "What does ParaDox do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ParaDox (Doniyor Jo'rabekov) is a Flutter Developer who builds mobile applications for iOS and Android. He specializes in clean architecture, BLoC pattern, Firebase integration, and creating beautiful user interfaces.",
        },
      },
      {
        "@type": "Question",
        name: "Where is ParaDox from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ParaDox (Doniyor Jo'rabekov) is from Tashkent, Uzbekistan. He works remotely with clients and companies worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "How to contact ParaDox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact ParaDox (Doniyor Jo'rabekov) through his portfolio website, via email at paradox.pdt@gmail.com, or through his social media profiles on GitHub, LinkedIn, and Telegram.",
        },
      },
    ],
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema, null, 0),
      }}
    />
  );
}

// ===========================================
// BREADCRUMB SCHEMA
// ===========================================

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema, null, 0),
      }}
    />
  );
}

// ===========================================
// PROJECT/SOFTWARE SCHEMA
// ===========================================

interface ProjectSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  technologies: string[];
  dateCreated?: string;
  codeRepository?: string;
}

export function ProjectJsonLd({ 
  name, 
  description, 
  url, 
  image,
  technologies,
  dateCreated,
  codeRepository,
}: ProjectSchemaProps) {
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    url: url,
    image: image ? `${siteConfig.url}${image}` : undefined,
    applicationCategory: "MobileApplication",
    operatingSystem: "iOS, Android",
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    creator: {
      "@id": `${siteConfig.url}/#person`,
    },
    dateCreated: dateCreated,
    programmingLanguage: technologies,
    codeRepository: codeRepository,
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(projectSchema, null, 0),
      }}
    />
  );
}
