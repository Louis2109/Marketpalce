import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'orange' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'orange',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    orange:
      'bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-500/20 border border-orange-400/30',
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-500/20 border border-orange-400/30',
    secondary:
      'bg-slate-900 dark:bg-zinc-800 text-slate-50 hover:bg-slate-800 dark:hover:bg-zinc-700 shadow-sm border border-slate-800/40 dark:border-zinc-700/60',
    outline:
      'border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white shadow-xs',
    ghost:
      'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-zinc-800/60',
    glass:
      'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/60 dark:border-zinc-800/80 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-zinc-900 shadow-sm',
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
