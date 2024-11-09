import React from 'react';

interface SocialButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export default function SocialButton({ onClick, icon, label }: SocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="social-button bg-white bg-opacity-90 hover:bg-opacity-100"
    >
      <span className="mr-2">{icon}</span>
      <span className="text-gray-800">{label}</span>
    </button>
  );
}