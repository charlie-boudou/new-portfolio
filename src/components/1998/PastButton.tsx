'use client';

import { memo } from 'react';
import { BUTTON_BASE, BUTTON_VARIANTS } from '@/constants/styles';

interface IPastButtonProps {
  title: string;
  handleClick?: () => void;
  main?: boolean;
}

const PastButton = memo(function PastButton({ title, handleClick, main = false }: IPastButtonProps) {
  const variant = main ? BUTTON_VARIANTS.main : BUTTON_VARIANTS.secondary;

  return (
    <button
      className={`${BUTTON_BASE} ${variant}`}
      onClick={handleClick}
      type="button"
    >
      {title}
    </button>
  );
});

export default PastButton;
