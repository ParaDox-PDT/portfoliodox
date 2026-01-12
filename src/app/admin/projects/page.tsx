'use client';

// ===========================================
// ADMIN PROJECTS PAGE
// ===========================================

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, ImageIcon, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  Badge,
  Modal,
  ImageUpload,
} from '@/components/ui';
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/firestore';
import { uploadProjectThumbnail } from '@/lib/storage';
import { generateSlug, validateProject } from '@/lib/utils';
import type { Project, ProjectCategory } from '@/types';

// ===========================================
// OPTIONS
// ===========================================

const categoryOptions = [
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'web-app', label: 'Web App' },
  { value: 'package', label: 'Package / Library' },
  { value: 'open-source', label: 'Open Source' },
  { value: 'other', label: 'Other' },
];

// ===========================================
// INITIAL STATE
// ===========================================

const initialFormState: Partial<Project> = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  category: 'mobile-app',
  thumbnailUrl: '',
  images: [],
  liveUrl: '',
  githubUrl: '',
  playStoreUrl: '',
  appStoreUrl: '',
  technologies: [],
  features: [],
  isFeatured: false,
  order: 0,
};

// ===========================================
// COMPONENT
// ===========================================

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>(initialFormState);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await getProjects();
    setProjects(data || []);
    setLoading(false);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'order' ? parseInt(value) || 0 : value,
      }));
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async (file: File) => {
    const projectId = editingItem?.id || `new-${Date.now()}`;
    const { data, error } = await uploadProjectThumbnail(projectId, file);
    if (error) throw new Error(error);
    setFormData((prev) => ({ ...prev, thumbnailUrl: data || '' }));
    return data || '';
  };

  // Handle tech tags
  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((_, i) => i !== index),
    }));
  };

  // Handle features
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  };

  // Open modal for adding
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ ...initialFormState, order: projects.length });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (item: Project) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateProject(formData);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please fix the form errors');
      return;
    }
    
    setSaving(true);

    try {
      if (editingItem?.id) {
        const { error } = await updateProject(editingItem.id, formData);
        if (error) throw new Error(error);
        toast.success('Project updated successfully!');
      } else {
        const { error } = await addProject(formData as Omit<Project, 'id'>);
        if (error) throw new Error(error);
        toast.success('Project added successfully!');
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await deleteProject(id);
      if (error) throw new Error(error);
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project');
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
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div key={project.id} layout>
            <Card padding="none" hover className="overflow-hidden h-full flex flex-col">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100 dark:bg-dark-hover">
                {project.thumbnailUrl ? (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
                {project.isFeatured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="primary" size="sm" className="gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <Badge variant="default" size="sm" className="self-start mb-2">
                  {project.category.replace('-', ' ')}
                </Badge>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 flex-1">
                  {project.shortDescription}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(project)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id!)}
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
      {projects.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No projects added yet
          </p>
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
            Add Your First Project
          </Button>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Project' : 'Add Project'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="e.g., FinTrack Pro"
              required
            />
            <Input
              label="Slug"
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              placeholder="Auto-generated from title"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Select
              label="Category"
              name="category"
              value={formData.category || 'mobile-app'}
              onChange={handleChange}
              options={categoryOptions}
            />
            <Input
              label="Order"
              name="order"
              type="number"
              value={formData.order || 0}
              onChange={handleChange}
              min={0}
            />
          </div>

          <Textarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription || ''}
            onChange={handleChange}
            placeholder="Brief description for project cards..."
            rows={2}
            required
          />

          <Textarea
            label="Full Description"
            name="fullDescription"
            value={formData.fullDescription || ''}
            onChange={handleChange}
            placeholder="Detailed description for project page..."
            rows={4}
          />

          {/* Thumbnail */}
          <ImageUpload
            label="Thumbnail"
            value={formData.thumbnailUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, thumbnailUrl: url }))}
            onUpload={handleThumbnailUpload}
            aspectRatio="video"
            hint="Recommended: 1200x800px"
          />

          {/* Links */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Live URL"
              name="liveUrl"
              value={formData.liveUrl || ''}
              onChange={handleChange}
              placeholder="https://..."
            />
            <Input
              label="GitHub URL"
              name="githubUrl"
              value={formData.githubUrl || ''}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Play Store URL"
              name="playStoreUrl"
              value={formData.playStoreUrl || ''}
              onChange={handleChange}
              placeholder="https://play.google.com/..."
            />
            <Input
              label="App Store URL"
              name="appStoreUrl"
              value={formData.appStoreUrl || ''}
              onChange={handleChange}
              placeholder="https://apps.apple.com/..."
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Technologies
            </label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTech}>
                Add
              </Button>
            </div>
            {formData.technologies && formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech, i) => (
                  <Badge key={i} variant="default" className="gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(i)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured || false}
              onChange={handleCheckboxChange}
              className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Featured project (shows on homepage)
            </span>
          </label>

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
              {editingItem ? 'Update' : 'Add'} Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

