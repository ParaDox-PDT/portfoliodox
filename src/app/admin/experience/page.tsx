'use client';

// ===========================================
// ADMIN EXPERIENCE PAGE
// ===========================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  Badge,
  Modal,
} from '@/components/ui';
import { getExperience, addExperience, updateExperience, deleteExperience } from '@/lib/firestore';
import { formatDateRange } from '@/lib/utils';
import type { Experience, EmploymentType } from '@/types';

// ===========================================
// OPTIONS
// ===========================================

const typeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
];

// ===========================================
// INITIAL STATE
// ===========================================

const initialFormState: Partial<Experience> = {
  company: '',
  role: '',
  location: '',
  type: 'full-time',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  achievements: [],
  technologies: [],
  order: 0,
};

// ===========================================
// COMPONENT
// ===========================================

export default function AdminExperiencePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>(initialFormState);
  const [techInput, setTechInput] = useState('');
  const [achievementInput, setAchievementInput] = useState('');

  // Fetch experience
  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const { data } = await getExperience();
    setExperience(data || []);
    setLoading(false);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
      ...(name === 'isCurrent' && checked ? { endDate: '' } : {}),
    }));
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

  // Handle achievements
  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...(prev.achievements || []), achievementInput.trim()],
      }));
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements?.filter((_, i) => i !== index),
    }));
  };

  // Open modal for adding
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ ...initialFormState, order: experience.length });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (item: Experience) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingItem?.id) {
        const { error } = await updateExperience(editingItem.id, formData);
        if (error) throw new Error(error);
        toast.success('Experience updated successfully!');
      } else {
        const { error } = await addExperience(formData as Omit<Experience, 'id'>);
        if (error) throw new Error(error);
        toast.success('Experience added successfully!');
      }

      setIsModalOpen(false);
      fetchExperience();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const { error } = await deleteExperience(id);
      if (error) throw new Error(error);
      toast.success('Experience deleted successfully!');
      fetchExperience();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete experience');
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
            Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your work history
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Experience
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((item) => (
          <motion.div key={item.id} layout>
            <Card className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-dark-hover flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id!)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatDateRange(item.startDate, item.endDate)}
                  {item.location && ` • ${item.location}`}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2">
                  {item.description}
                </p>
                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {item.technologies.length > 5 && (
                      <Badge variant="default" size="sm">
                        +{item.technologies.length - 5}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {experience.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No experience added yet
          </p>
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
            Add Your First Experience
          </Button>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Experience' : 'Add Experience'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Role"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              placeholder="e.g., Senior Flutter Developer"
              required
            />
            <Input
              label="Company"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              placeholder="e.g., TechStartup Inc."
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA"
            />
            <Select
              label="Employment Type"
              name="type"
              value={formData.type || 'full-time'}
              onChange={handleChange}
              options={typeOptions}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Start Date"
              name="startDate"
              type="month"
              value={formData.startDate || ''}
              onChange={handleChange}
              required
            />
            <div>
              <Input
                label="End Date"
                name="endDate"
                type="month"
                value={formData.endDate || ''}
                onChange={handleChange}
                disabled={formData.isCurrent}
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={formData.isCurrent || false}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Currently working here
                </span>
              </label>
            </div>
          </div>

          <Textarea
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Describe your role and responsibilities..."
            rows={3}
            required
          />

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
              {editingItem ? 'Update' : 'Add'} Experience
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

