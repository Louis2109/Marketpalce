import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 'medium',
  className = '',
  ...props
}) => {
  const intensityStyles = {
    light: 'bg-white/60 backdrop-blur-sm border border-white/40 shadow-xs',
    medium: 'bg-white/80 backdrop-blur-md border border-white/60 shadow-sm shadow-slate-200/50',
    heavy: 'bg-white/90 backdrop-blur-lg border border-white/80 shadow-md shadow-slate-200/60',
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${intensityStyles[intensity]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
