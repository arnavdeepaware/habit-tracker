// src/components/ui/input.js

import React from 'react';

export function Input({ value, onChange, onKeyPress, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
