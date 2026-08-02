import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 'medium',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const intensityStyles = {
    light: 'bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-white/40 dark:border-zinc-800 shadow-xs text-slate-900 dark:text-zinc-100',
    medium: 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/60 dark:border-zinc-800 shadow-sm shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-zinc-100',
    heavy: 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-white/80 dark:border-zinc-800 shadow-md shadow-slate-200/60 dark:shadow-none text-slate-900 dark:text-zinc-100',
  };

  const hoverStyles = hoverEffect
    ? 'hover:shadow-md hover:border-orange-500/30 dark:hover:border-orange-500/40 hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${intensityStyles[intensity]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
