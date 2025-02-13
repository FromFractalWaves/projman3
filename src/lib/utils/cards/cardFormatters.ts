// src/lib/utils/cards/cardFormatters.ts
import { format, differenceInDays, isAfter } from 'date-fns';

/**
 * Format duration in minutes to human readable string
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format a date with optional time
 */
export function formatDate(date: Date | string, includeTime = false): string {
  const d = new Date(date);
  return includeTime 
    ? format(d, 'MMM d, yyyy h:mma')
    : format(d, 'MMM d, yyyy');
}

/**
 * Calculate days remaining until a date
 */
export function getDaysRemaining(date: Date | string): number {
  const targetDate = new Date(date);
  const now = new Date();
  return Math.max(0, differenceInDays(targetDate, now));
}

/**
 * Check if a date is overdue
 */
export function isOverdue(date: Date | string): boolean {
  return isAfter(new Date(), new Date(date));
}

// src/lib/utils/cards/cardValidators.ts
import type { BaseEntity } from '@/types/base';

/**
 * Validate required card fields
 */
export function validateCardFields(entity: Partial<BaseEntity>): string[] {
  const errors: string[] = [];

  if (!entity.name?.trim()) {
    errors.push('Name is required');
  }

  if (entity.startDate && entity.dueDate) {
    const start = new Date(entity.startDate);
    const due = new Date(entity.dueDate);
    if (isAfter(start, due)) {
      errors.push('Start date must be before due date');
    }
  }

  return errors;
}

/**
 * Check if a card is editable based on status
 */
export function isCardEditable(status: string): boolean {
  const nonEditableStatuses = ['completed', 'cancelled', 'archived'];
  return !nonEditableStatuses.includes(status.toLowerCase());
}

// src/lib/utils/cards/cardStyles.ts
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Card container styles
 */
export const cardVariants = cva(
  'rounded-lg border transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50',
        compact: 'bg-zinc-900/50 border-zinc-800/50',
        detailed: 'bg-zinc-900 border-zinc-800 p-6'
      },
      status: {
        default: '',
        active: 'border-l-4 border-l-blue-500',
        completed: 'border-l-4 border-l-green-500',
        overdue: 'border-l-4 border-l-red-500'
      }
    },
    defaultVariants: {
      variant: 'default',
      status: 'default'
    }
  }
);

/**
 * Status badge styles
 */
export const statusVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      status: {
        active: 'bg-blue-400/10 text-blue-400 ring-blue-400/30',
        completed: 'bg-green-400/10 text-green-400 ring-green-400/30',
        'in-progress': 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30',
        overdue: 'bg-red-400/10 text-red-400 ring-red-400/30',
        default: 'bg-zinc-400/10 text-zinc-400 ring-zinc-400/30'
      }
    },
    defaultVariants: {
      status: 'default'
    }
  }
);

/**
 * Priority indicator styles
 */
export const priorityVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
  {
    variants: {
      priority: {
        high: 'bg-red-400/10 text-red-400',
        medium: 'bg-yellow-400/10 text-yellow-400',
        low: 'bg-blue-400/10 text-blue-400'
      }
    },
    defaultVariants: {
      priority: 'medium'
    }
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;
export type StatusVariants = VariantProps<typeof statusVariants>;
export type PriorityVariants = VariantProps<typeof priorityVariants>;