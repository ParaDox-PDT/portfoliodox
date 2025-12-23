'use client';

// ===========================================
// CONTACT SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Twitter, Send, MessageSquare } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, Button, Input, Textarea, Select } from '@/components/ui';
import type { Profile } from '@/types';

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
              <div className="flex gap-3">
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
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
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile?.twitter && (
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {profile?.telegram && (
                  <a
                    href={profile.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
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

