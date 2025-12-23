'use client';

// ===========================================
// BUTTON COMPONENT
// ===========================================

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ===========================================
// TYPES
// ===========================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ===========================================
// STYLES
// ===========================================

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-medium rounded-lg
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variantStyles = {
  primary: `
    bg-primary-500 text-white
    hover:bg-primary-600
    focus:ring-primary-500
    shadow-md hover:shadow-lg
  `,
  secondary: `
    bg-secondary-500 text-white
    hover:bg-secondary-600
    focus:ring-secondary-500
    shadow-md hover:shadow-lg
  `,
  ghost: `
    bg-transparent
    text-gray-700 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-gray-800
    focus:ring-gray-500
  `,
  danger: `
    bg-red-500 text-white
    hover:bg-red-600
    focus:ring-red-500
    shadow-md hover:shadow-lg
  `,
  outline: `
    bg-transparent
    border-2 border-primary-500
    text-primary-500
    hover:bg-primary-500 hover:text-white
    focus:ring-primary-500
  `,
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

// ===========================================
// COMPONENT
// ===========================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

