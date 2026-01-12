'use client';

// ===========================================
// ADMIN CERTIFICATES PAGE
// ===========================================

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Award, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Button,
  Input,
  Textarea,
  Card,
  Badge,
  Modal,
  ImageUpload,
} from '@/components/ui';
import { getCertificates, addCertificate, updateCertificate, deleteCertificate } from '@/lib/firestore';
import { uploadCertificateImage } from '@/lib/storage';
import { formatDate, validateCertificate } from '@/lib/utils';
import type { Certificate } from '@/types';

// ===========================================
// INITIAL STATE
// ===========================================

const initialFormState: Partial<Certificate> = {
  title: '',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  credentialId: '',
  credentialUrl: '',
  imageUrl: '',
  description: '',
  skills: [],
  order: 0,
};

// ===========================================
// COMPONENT
// ===========================================

export default function AdminCertificatesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState<Partial<Certificate>>(initialFormState);
  const [skillInput, setSkillInput] = useState('');

  // Fetch certificates
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const { data } = await getCertificates();
    setCertificates(data || []);
    setLoading(false);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const certId = editingItem?.id || `new-${Date.now()}`;
    const { data, error } = await uploadCertificateImage(certId, file);
    if (error) throw new Error(error);
    setFormData((prev) => ({ ...prev, imageUrl: data || '' }));
    return data || '';
  };

  // Handle skills
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index),
    }));
  };

  // Open modal for adding
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ ...initialFormState, order: certificates.length });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (item: Certificate) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateCertificate(formData);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please fix the form errors');
      return;
    }
    
    setSaving(true);

    try {
      if (editingItem?.id) {
        const { error } = await updateCertificate(editingItem.id, formData);
        if (error) throw new Error(error);
        toast.success('Certificate updated successfully!');
      } else {
        const { error } = await addCertificate(formData as Omit<Certificate, 'id'>);
        if (error) throw new Error(error);
        toast.success('Certificate added successfully!');
      }

      setIsModalOpen(false);
      fetchCertificates();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      const { error } = await deleteCertificate(id);
      if (error) throw new Error(error);
      toast.success('Certificate deleted successfully!');
      fetchCertificates();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete certificate');
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Certificates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your professional certifications
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Certificate
        </Button>
      </div>

      {/* Certificates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <motion.div key={cert.id} layout>
            <Card padding="none" hover className="overflow-hidden h-full flex flex-col">
              {/* Image */}
              {cert.imageUrl ? (
                <div className="relative aspect-video bg-gray-100 dark:bg-dark-hover">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 dark:bg-dark-hover flex items-center justify-center">
                  <Award className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                </div>
              )}

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {cert.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm">
                  {cert.issuer}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Issued {formatDate(cert.issueDate, { month: 'short', year: 'numeric' })}
                </p>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(cert)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(cert.id!)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No certificates added yet
          </p>
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
            Add Your First Certificate
          </Button>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Certificate' : 'Add Certificate'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Certificate Title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="e.g., Google Associate Android Developer"
            required
          />

          <Input
            label="Issuing Organization"
            name="issuer"
            value={formData.issuer || ''}
            onChange={handleChange}
            placeholder="e.g., Google"
            required
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Issue Date"
              name="issueDate"
              type="month"
              value={formData.issueDate || ''}
              onChange={handleChange}
              required
            />
            <Input
              label="Expiry Date (optional)"
              name="expiryDate"
              type="month"
              value={formData.expiryDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Credential ID"
              name="credentialId"
              value={formData.credentialId || ''}
              onChange={handleChange}
              placeholder="e.g., ABC123XYZ"
            />
            <Input
              label="Credential URL"
              name="credentialUrl"
              value={formData.credentialUrl || ''}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <Textarea
            label="Description (optional)"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Brief description of the certification..."
            rows={2}
          />

          {/* Image */}
          <ImageUpload
            label="Certificate Image"
            value={formData.imageUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
            onUpload={handleImageUpload}
            aspectRatio="video"
            hint="Upload certificate image or badge"
          />

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Related Skills
            </label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button type="button" onClick={handleAddSkill}>
                Add
              </Button>
            </div>
            {formData.skills && formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, i) => (
                  <Badge key={i} variant="default" className="gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(i)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Input
            label="Order"
            name="order"
            type="number"
            value={formData.order || 0}
            onChange={handleChange}
            min={0}
            hint="Lower numbers appear first"
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" isLoading={saving}>
              {editingItem ? 'Update' : 'Add'} Certificate
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

