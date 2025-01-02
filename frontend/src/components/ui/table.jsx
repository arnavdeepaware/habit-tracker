// src/components/ui/table.js

import React from 'react';

export function Table({ children }) {
  return (
    <table className="table-auto w-full text-sm text-gray-700">
      {children}
    </table>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-gray-100">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableRow({ children }) {
  return <tr>{children}</tr>;
}

export function TableCell({ children }) {
  return (
    <td className="text-center p-2 border">{children}</td>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableHead({ children }) {
  return (
    <th className="text-xs font-medium text-gray-600 p-2">{children}</th>
  );
}
