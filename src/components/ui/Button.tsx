import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  to?: string;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  to,
  href,
  download,
  target,
  rel,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-semibold rounded-button shadow-subtle hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-navy hover:bg-opacity-95 text-white focus:ring-navy focus:ring-offset-2',
    secondary: 'bg-crimson hover:bg-opacity-95 text-white focus:ring-crimson focus:ring-offset-2',
    outline: 'border border-border bg-transparent text-textPrimary hover:bg-surface focus:ring-navy',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-sm md:text-base',
  };

  const widthStyles = fullWidth ? 'w-full' : 'w-full sm:w-auto';
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target !== undefined ? target : '_blank'}
        rel={rel !== undefined ? rel : (target !== '_self' ? 'noopener noreferrer' : undefined)}
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
