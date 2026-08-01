import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 border border-emerald-500/20',
    secondary:
      'bg-slate-900 text-slate-50 hover:bg-slate-800 shadow-sm border border-slate-800/40',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70',
    glass:
      'bg-white/80 backdrop-blur-md border border-white/60 text-slate-900 hover:bg-white shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
