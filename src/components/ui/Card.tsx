import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'bordered';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-200';

  const variantStyles = {
    default:
      'bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-xs shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-zinc-100',
    flat: 'bg-slate-50/80 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800 text-slate-900 dark:text-zinc-100',
    bordered: 'bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-900 dark:text-zinc-100',
  };

  const hoverStyles = hoverEffect
    ? 'hover:shadow-md hover:border-orange-500/30 dark:hover:border-orange-500/40 hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
