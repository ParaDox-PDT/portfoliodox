'use client';

// ===========================================
// CONTACT SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, Globe, Briefcase } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, Button, Input, Textarea, Select } from '@/components/ui';
import type { Profile } from '@/types';

// ===========================================
// CUSTOM ICONS
// ===========================================

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const HHIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12.16 0C5.764 0 .6 5.164.6 11.56v.88C.6 18.836 5.764 24 12.16 24c6.396 0 11.56-5.164 11.56-11.56v-.88C23.72 5.164 18.556 0 12.16 0zm-3.06 6.48h1.8v4.32h2.88V6.48h1.8v10.8h-1.8v-4.68H10.9v4.68H9.1V6.48zm9 0h1.8v10.8h-1.8V6.48z"/>
  </svg>
);

// ===========================================
// TYPES
// ===========================================

interface ContactSectionProps {
  profile?: Profile | null;
}

// ===========================================
// CONTACT REASONS
// ===========================================

const contactReasons = [
  { value: 'project', label: 'New Project' },
  { value: 'job', label: 'Job Opportunity' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'other', label: 'Other' },
];

// ===========================================
// ANIMATION VARIANTS
// ===========================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          label="Contact"
          title="Let's build"
          titleHighlight="something great"
          description="Have a project in mind? Looking for a Flutter developer to join your team? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Info Cards */}
            <div className="space-y-4 mb-8">
              {profile?.email && (
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="block"
                  variants={itemVariants}
                >
                  <Card hover className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {profile.email}
                      </div>
                    </div>
                  </Card>
                </motion.a>
              )}

              {profile?.location && (
                <motion.div variants={itemVariants}>
                  <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {profile.location}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile?.telegram && (
                  <a
                    href={profile.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-[#0088cc]/10 hover:text-[#0088cc] dark:hover:bg-[#0088cc]/20 dark:hover:text-[#0088cc] transition-colors"
                    title="Telegram"
                  >
                    <TelegramIcon />
                  </a>
                )}
                {profile?.hhuz && (
                  <a
                    href={profile.hhuz}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                    title="hh.uz"
                  >
                    <HHIcon />
                  </a>
                )}
                {profile?.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                    title="Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card className="shadow-lg">
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <Select
                  label="Subject"
                  placeholder="What's this about?"
                  options={contactReasons}
                  required
                />
                <Textarea
                  label="Message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  required
                />
                <Button
                  type="submit"
                  className="w-full"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

