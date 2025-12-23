'use client';

// ===========================================
// CARD COMPONENT
// ===========================================

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ===========================================
// TYPES
// ===========================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// ===========================================
// STYLES
// ===========================================

const variantStyles = {
  default: 'bg-white dark:bg-dark-card',
  elevated: 'bg-white dark:bg-dark-elevated shadow-lg',
  bordered: 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border',
  glass: 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border border-gray-200/50 dark:border-dark-border/50',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// ===========================================
// COMPONENT
// ===========================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'bordered',
      hover = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ===========================================
// SUB COMPONENTS
// ===========================================

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold text-gray-900 dark:text-white',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500 dark:text-gray-400 mt-1', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-gray-100 dark:border-dark-border', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;

