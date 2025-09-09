import React from 'react';

// Define the types for the component's props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  // Base styles for all buttons
  const baseStyles =
    'px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200';

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;