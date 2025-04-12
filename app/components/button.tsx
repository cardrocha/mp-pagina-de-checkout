import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  isActive?: boolean;
}

export default function Button({ isActive, ...props }: ButtonProps) {
  return (
    <button
      className={`group flex items-center justify-center w-40 text-xs font-medium gap-1 whitespace-nowrap px-1.5 py-0.5
        ${isActive ? 'bg-white text-black' : 'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-black'}
        cursor-pointer transition-colors duration-300`}
      {...props}
    />
  );
}

