import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export default function InputField({ icon, ...props }: InputFieldProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
        {icon}
      </div>
      <input
        {...props}
        className="input-field"
      />
    </div>
  );
}