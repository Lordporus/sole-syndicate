import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx('max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16', className)}>
      {children}
    </div>
  );
}
