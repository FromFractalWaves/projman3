
// src/types/cards/variants.ts
// Card appearance variants
export type CardVariant = 'default' | 'compact' | 'detailed';

// Card layout variants
export type CardLayoutVariant = 'grid' | 'list' | 'timeline';

// Card status variants for styling
export type CardStatusVariant = 'default' | 'active' | 'completed' | 'overdue';

// Card action button variants
export type CardActionVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';

// Card size variants
export type CardSizeVariant = 'sm' | 'default' | 'lg';

// Combined variant configuration
export interface CardVariants {
  variant?: CardVariant;
  layout?: CardLayoutVariant;
  status?: CardStatusVariant;
  size?: CardSizeVariant;
}