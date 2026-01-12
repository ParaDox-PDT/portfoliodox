'use client';

// ===========================================
// ADMIN SKILLS PAGE
// ===========================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Button,
  Input,
  Select,
  Card,
  Badge,
  Modal,
} from '@/components/ui';
import { getSkills, addSkill, updateSkill, deleteSkill } from '@/lib/firestore';
import { groupBy, capitalize, validateSkill } from '@/lib/utils';
import type { Skill, SkillCategory, SkillLevel } from '@/types';

// ===========================================
// OPTIONS
// ===========================================

const categoryOptions = [
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'architecture', label: 'Architecture & Patterns' },
  { value: 'backend', label: 'Backend & Services' },
  { value: 'tools', label: 'Tools & DevOps' },
  { value: 'other', label: 'Other' },
];

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

// ===========================================
// INITIAL STATE
// ===========================================

const initialFormState: Partial<Skill> = {
  name: '',
  category: 'mobile',
  level: 'intermediate',
  order: 0,
};

// ===========================================
// COMPONENT
// ===========================================

export default function AdminSkillsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>(initialFormState);

  // Fetch skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await getSkills();
      
      if (error) {
        console.error('Error fetching skills:', error);
        // Don't show toast on initial load to avoid spam
        if (skills.length > 0) {
          toast.error(`Failed to reload skills: ${error}`);
        }
        // Keep existing skills if error occurs during refresh
        if (skills.length === 0) {
          setSkills([]);
        }
      } else {
        const skillsData = data || [];
        setSkills(skillsData);
        if (skillsData.length > 0) {
          console.log(`✅ Loaded ${skillsData.length} skills from Firebase`);
        } else {
          console.log('ℹ️ No skills found in Firebase');
        }
      }
    } catch (err: any) {
      console.error('Unexpected error fetching skills:', err);
      if (skills.length === 0) {
        toast.error('Failed to load skills');
        setSkills([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  // Open modal for adding
  const handleAdd = () => {
    setEditingSkill(null);
    setFormData({ ...initialFormState, order: skills.length });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData(skill);
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateSkill(formData);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please fix the form errors');
      return;
    }
    
    setSaving(true);

    try {
      if (editingSkill?.id) {
        // Update existing
        const { error } = await updateSkill(editingSkill.id, formData);
        if (error) throw new Error(error);
        toast.success('Skill updated successfully!');
      } else {
        // Add new
        const { error } = await addSkill(formData as Omit<Skill, 'id'>);
        if (error) throw new Error(error);
        toast.success('Skill added successfully!');
      }

      setIsModalOpen(false);
      // Reset form
      setFormData(initialFormState);
      setEditingSkill(null);
      // Refresh skills list after save
      await fetchSkills();
    } catch (err: any) {
      console.error('Error saving skill:', err);
      toast.error(err.message || 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await deleteSkill(id);
      if (error) throw new Error(error);
      toast.success('Skill deleted successfully!');
      // Refresh skills list after delete
      await fetchSkills();
    } catch (err: any) {
      console.error('Error deleting skill:', err);
      toast.error(err.message || 'Failed to delete skill');
    }
  };

  // Group skills by category
  const groupedSkills = groupBy(skills, (skill) => skill.category);

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
            Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your technical skills
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Skill
        </Button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {categoryOptions.map((category) => {
          const categorySkills = groupedSkills[category.value as SkillCategory] || [];
          if (categorySkills.length === 0) return null;

          return (
            <Card key={category.value}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category.label}
              </h2>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-hover rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <Badge
                        variant={
                          skill.level === 'expert'
                            ? 'primary'
                            : skill.level === 'advanced'
                            ? 'secondary'
                            : 'default'
                        }
                        size="sm"
                      >
                        {capitalize(skill.level)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(skill)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(skill.id!)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No skills added yet
          </p>
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
            Add Your First Skill
          </Button>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Skill Name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="e.g., Flutter"
            required
          />
          <Select
            label="Category"
            name="category"
            value={formData.category || 'mobile'}
            onChange={handleChange}
            options={categoryOptions}
            required
          />
          <Select
            label="Level"
            name="level"
            value={formData.level || 'intermediate'}
            onChange={handleChange}
            options={levelOptions}
            required
          />
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
              {editingSkill ? 'Update' : 'Add'} Skill
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

