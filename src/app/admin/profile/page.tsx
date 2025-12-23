'use client';

// ===========================================
// ADMIN PROFILE PAGE
// ===========================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input, Textarea, Card, ImageUpload } from '@/components/ui';
import { getProfile, updateProfile } from '@/lib/firestore';
import { uploadProfileImage, uploadResume } from '@/lib/storage';
import type { Profile } from '@/types';

// ===========================================
// COMPONENT
// ===========================================

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<Profile>>({
    name: '',
    title: '',
    subtitle: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    summary: '',
    avatarUrl: '',
    resumeUrl: '',
    github: '',
    linkedin: '',
    twitter: '',
    telegram: '',
    yearsExperience: 3,
    projectsCompleted: 15,
    happyClients: 10,
    availableForWork: true,
  });

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      const { data } = await getProfile();
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle avatar upload
  const handleAvatarUpload = async (file: File) => {
    const { data, error } = await uploadProfileImage(file);
    if (error) throw new Error(error);
    setProfile((prev) => ({ ...prev, avatarUrl: data || '' }));
    return data || '';
  };

  // Handle resume upload
  const handleResumeUpload = async (file: File) => {
    const { data, error } = await uploadResume(file);
    if (error) throw new Error(error);
    setProfile((prev) => ({ ...prev, resumeUrl: data || '' }));
    return data || '';
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await updateProfile(profile);
      if (error) throw new Error(error);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Basic Information
              </h2>
              <div className="space-y-5">
                <Input
                  label="Full Name"
                  name="name"
                  value={profile.name || ''}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Title"
                    name="title"
                    value={profile.title || ''}
                    onChange={handleChange}
                    placeholder="Flutter Developer"
                    required
                  />
                  <Input
                    label="Subtitle"
                    name="subtitle"
                    value={profile.subtitle || ''}
                    onChange={handleChange}
                    placeholder="building production-ready apps"
                  />
                </div>
                <Textarea
                  label="Summary (for Hero section)"
                  name="summary"
                  value={profile.summary || ''}
                  onChange={handleChange}
                  placeholder="A brief summary that appears in the hero section..."
                  rows={3}
                />
                <Textarea
                  label="Bio (for About section)"
                  name="bio"
                  value={profile.bio || ''}
                  onChange={handleChange}
                  placeholder="A more detailed bio that appears in the about section..."
                  rows={5}
                />
              </div>
            </Card>

            {/* Contact Info */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={profile.email || ''}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <Input
                  label="Location"
                  name="location"
                  value={profile.location || ''}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </Card>

            {/* Social Links */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Social Links
              </h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="GitHub"
                    name="github"
                    value={profile.github || ''}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />
                  <Input
                    label="LinkedIn"
                    name="linkedin"
                    value={profile.linkedin || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Twitter"
                    name="twitter"
                    value={profile.twitter || ''}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                  />
                  <Input
                    label="Telegram"
                    name="telegram"
                    value={profile.telegram || ''}
                    onChange={handleChange}
                    placeholder="https://t.me/username"
                  />
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Stats
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                <Input
                  label="Years Experience"
                  name="yearsExperience"
                  type="number"
                  value={profile.yearsExperience || 0}
                  onChange={handleChange}
                  min={0}
                />
                <Input
                  label="Projects Completed"
                  name="projectsCompleted"
                  type="number"
                  value={profile.projectsCompleted || 0}
                  onChange={handleChange}
                  min={0}
                />
                <Input
                  label="Happy Clients"
                  name="happyClients"
                  type="number"
                  value={profile.happyClients || 0}
                  onChange={handleChange}
                  min={0}
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Profile Photo
              </h2>
              <ImageUpload
                value={profile.avatarUrl}
                onChange={(url) => setProfile((prev) => ({ ...prev, avatarUrl: url }))}
                onUpload={handleAvatarUpload}
                aspectRatio="square"
                hint="Recommended: 400x400px"
              />
            </Card>

            {/* Resume */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resume
              </h2>
              <Input
                label="Resume URL"
                name="resumeUrl"
                value={profile.resumeUrl || ''}
                onChange={handleChange}
                placeholder="https://..."
                hint="Or upload a PDF file"
              />
            </Card>

            {/* Status */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Availability
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="availableForWork"
                  checked={profile.availableForWork || false}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Available for new projects
                </span>
              </label>
            </Card>

            {/* Save Button */}
            <Button
              type="submit"
              className="w-full"
              isLoading={saving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

