// src/components/core/Card/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div 
      className={`rounded-lg border border-gray-700 bg-gray-800/40 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
