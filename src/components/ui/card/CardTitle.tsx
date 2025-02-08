// src/components/core/Card/CardTitle.tsx
import React from 'react';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ children, className = '', ...props }: CardTitleProps) {
  return (
    <h3 
      className={`font-semibold leading-none tracking-tight text-lg ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

