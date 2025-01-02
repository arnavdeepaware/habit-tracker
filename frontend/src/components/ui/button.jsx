// src/components/ui/button.js

import React from 'react';

export function Button({ onClick, children, variant = 'primary' }) {
  const baseStyles = 'px-4 py-2 rounded-md text-white font-semibold focus:outline-none focus:ring-2';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300',
    destructive: 'bg-red-500 hover:bg-red-600 focus:ring-red-300',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
