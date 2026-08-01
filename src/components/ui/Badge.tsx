import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'slate' | 'blue' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200/60 font-medium',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200/60 font-medium',
    blue: 'bg-sky-50 text-sky-700 border border-sky-200/60 font-medium',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/60 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
