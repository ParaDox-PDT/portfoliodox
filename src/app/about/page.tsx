// ===========================================
// ABOUT PAGE - SEO OPTIMIZED STATIC CONTENT
// ===========================================
// Bu sahifa qidiruv tizimlari va AI uchun statik kontent
// taqdim etadi. Client-side rendering bo'lmagani uchun
// Google va AI bu kontentni to'g'ridan-to'g'ri crawl qila oladi.

import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig, seoMeta, personData, generatePersonSchema, generateWebPageSchema } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

// ===========================================
// METADATA
// ===========================================

export const metadata: Metadata = {
  title: seoMeta.about.title,
  description: seoMeta.about.description,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: seoMeta.about.title,
    description: seoMeta.about.description,
    url: `${siteConfig.url}/about`,
    type: 'profile',
  },
};

// ===========================================
// PAGE COMPONENT
// ===========================================

export default function AboutPage() {
  // JSON-LD for this specific page
  const pageSchema = generateWebPageSchema(
    seoMeta.about.title,
    seoMeta.about.description,
    `${siteConfig.url}/about`
  );
  
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Page Content */}
      <main className="min-h-screen bg-gradient-to-b from-[#0a0a0b] to-[#111113]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-indigo-500">ParaDox</span>
            </h1>
            <p className="text-xl text-gray-400">
              Doniyor Jo&apos;rabekov | Flutter Developer
            </p>
          </header>
          
          {/* Main Content - SEO Rich Text */}
          <article className="prose prose-invert prose-lg max-w-none">
            
            {/* Who is ParaDox Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" id="who-is-paradox">
                Who is ParaDox?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                <strong>ParaDox</strong> (also known as <strong>ParaDox-PDT</strong>, <strong>ParaDox PDT</strong>, 
                and <strong>ParaDox358</strong>) is the online alias of <strong>Doniyor Jo&apos;rabekov</strong> 
                (Uzbek: <span lang="uz">Jo&apos;rabekov Doniyor</span>, Russian: <span lang="ru">Дониёр Журабеков</span>), 
                a professional <strong>Flutter Developer</strong> from <strong>Tashkent, Uzbekistan</strong>.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With over <strong>3 years of experience</strong> in mobile app development, ParaDox specializes in 
                building <strong>production-ready mobile applications</strong> for iOS and Android using Flutter 
                and Dart. He is known for implementing <strong>clean architecture</strong>, beautiful user interfaces, 
                and seamless user experiences.
              </p>
            </section>
            
            {/* Skills Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" id="skills">
                Technical Skills
              </h2>
              <p className="text-gray-300 leading-relaxed">
                ParaDox (Doniyor Jo&apos;rabekov) has expertise in the following technologies and frameworks:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Mobile Development:</strong> Flutter, Dart, Android (Kotlin), iOS (Swift)</li>
                <li><strong>Architecture:</strong> Clean Architecture, BLoC Pattern, Provider, GetX, Riverpod</li>
                <li><strong>Backend:</strong> Firebase, REST APIs, GraphQL, WebSocket, Node.js</li>
                <li><strong>Tools:</strong> Git, CI/CD, Figma, Postman</li>
              </ul>
            </section>
            
            {/* Experience Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" id="experience">
                Professional Experience
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Throughout his career, ParaDox has worked with startups and established companies to build 
                mobile applications used by thousands of users. His approach combines technical excellence 
                with a deep understanding of user needs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Key achievements include:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Building and maintaining fintech applications with 100K+ active users</li>
                <li>Increasing app performance by 40% through optimization</li>
                <li>Leading migration from Provider to BLoC architecture</li>
                <li>Mentoring junior developers</li>
                <li>Implementing CI/CD pipelines reducing deployment time by 60%</li>
              </ul>
            </section>
            
            {/* Aliases Section - Important for SEO */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" id="known-as">
                Also Known As
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Doniyor Jo&apos;rabekov is known by several names and aliases across the internet:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>ParaDox</strong> - Primary online alias</li>
                <li><strong>ParaDox-PDT</strong> - GitHub and professional username</li>
                <li><strong>ParaDox PDT</strong> - Alternative spelling</li>
                <li><strong>ParaDox358</strong> - Gaming and alternative username</li>
                <li><strong>Jo&apos;rabekov Doniyor</strong> - Full name in Uzbek order</li>
                <li><strong>Doniyor Jorabekov</strong> - Romanized name without apostrophe</li>
              </ul>
            </section>
            
            {/* Contact Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" id="contact">
                Contact & Social Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You can connect with ParaDox (Doniyor Jo&apos;rabekov) through the following platforms:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>GitHub:</strong>{' '}
                  <a href="https://github.com/ParaDox-PDT" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">
                    github.com/ParaDox-PDT
                  </a>
                </li>
                <li>
                  <strong>LinkedIn:</strong>{' '}
                  <a href="https://www.linkedin.com/in/paradox-pdt/" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/paradox-pdt
                  </a>
                </li>
                <li>
                  <strong>Telegram:</strong>{' '}
                  <a href="https://t.me/ParaDox_PDT" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">
                    t.me/ParaDox_PDT
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:paradox.pdt@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                    paradox.pdt@gmail.com
                  </a>
                </li>
              </ul>
            </section>
            
            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" id="faq">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Who is ParaDox PDT?</h3>
                  <p className="text-gray-300">
                    ParaDox PDT is Doniyor Jo&apos;rabekov, a Flutter and Mobile App Developer from Uzbekistan. 
                    He specializes in building cross-platform mobile applications using Flutter, Dart, and 
                    clean architecture patterns.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">What does ParaDox do?</h3>
                  <p className="text-gray-300">
                    ParaDox (Doniyor Jo&apos;rabekov) is a Flutter Developer who builds mobile applications 
                    for iOS and Android. He specializes in clean architecture, BLoC pattern, Firebase 
                    integration, and creating beautiful user interfaces.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Where is ParaDox from?</h3>
                  <p className="text-gray-300">
                    ParaDox (Doniyor Jo&apos;rabekov) is from Tashkent, Uzbekistan. He works remotely with 
                    clients and companies worldwide.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Is ParaDox available for hire?</h3>
                  <p className="text-gray-300">
                    Yes, ParaDox is available for freelance projects and full-time opportunities. You can 
                    contact him through his portfolio website or social media profiles.
                  </p>
                </div>
              </div>
            </section>
            
          </article>
          
          {/* Back to Home Link */}
          <div className="text-center mt-12">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
          
        </div>
      </main>
    </>
  );
}
