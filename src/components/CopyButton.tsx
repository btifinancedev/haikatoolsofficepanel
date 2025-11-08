// src/components/CopyButton.tsx
'use client'; // This directive makes it a Client Component

import React from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    alert('Link copied to clipboard!'); // You might want a more sophisticated notification
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
    >
      Copy
    </button>
  );
};

export default CopyButton;