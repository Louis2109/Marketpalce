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
      'bg-white border border-slate-100 shadow-xs shadow-slate-200/50',
    flat: 'bg-slate-50/80 border border-slate-100',
    bordered: 'bg-white border border-slate-200/80',
  };

  const hoverStyles = hoverEffect
    ? 'hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5'
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
