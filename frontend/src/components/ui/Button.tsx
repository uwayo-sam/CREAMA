import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creama-accent disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-creama-dark text-creama-bg hover:bg-creama-dark/90': variant === 'primary',
            'bg-creama-accent text-white hover:bg-[#c29161]': variant === 'secondary',
            'border border-creama-dark bg-transparent hover:bg-creama-dark hover:text-creama-bg': variant === 'outline',
            'hover:bg-creama-latte/50 text-creama-dark': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-8 text-base': size === 'md',
            'h-14 px-10 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
