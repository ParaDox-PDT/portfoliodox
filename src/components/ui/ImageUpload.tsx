'use client';

// ===========================================
// IMAGE UPLOAD COMPONENT
// ===========================================

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Upload, X, Loader2 } from 'lucide-react';
import Button from './Button';

// ===========================================
// TYPES
// ===========================================

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => void;
  className?: string;
  label?: string;
  hint?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  maxSize?: number; // in MB
  accept?: string;
}

// ===========================================
// COMPONENT
// ===========================================

export function ImageUpload({
  value,
  onChange,
  onUpload,
  onRemove,
  className,
  label,
  hint,
  aspectRatio = 'auto',
  maxSize = 5,
  accept = 'image/jpeg,image/png,image/webp',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectRatioStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'min-h-[200px]',
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!accept.includes(file.type)) {
      setError('Invalid file type');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const url = await onUpload(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    onRemove?.();
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl overflow-hidden',
          'border-gray-200 dark:border-dark-border',
          'hover:border-primary-400 dark:hover:border-primary-500',
          'transition-colors duration-200',
          aspectRatioStyles[aspectRatio]
        )}
      >
        {value ? (
          // Image Preview
          <div className="relative w-full h-full">
            <Image
              src={value}
              alt="Upload preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className={cn(
                'absolute top-2 right-2 p-1.5 rounded-full',
                'bg-red-500 text-white',
                'hover:bg-red-600 transition-colors'
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Upload Area
          <label
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center cursor-pointer',
              'bg-gray-50 dark:bg-dark-card',
              isUploading && 'pointer-events-none'
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Click to upload
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  or drag and drop
                </span>
              </>
            )}
          </label>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
}

export default ImageUpload;

