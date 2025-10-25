"use client";
import { useState } from "react";

export default function LoadingButton({ 
  children, 
  loading = false, 
  className = "", 
  disabled = false,
  onClick,
  type = "button",
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isButtonLoading = loading || isLoading;

  return (
    <button
      type={type}
      className={`relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#005580] hover:bg-[#004466] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005580] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
      disabled={disabled || isButtonLoading}
      onClick={onClick ? handleClick : undefined}
      {...props}
    >
      {isButtonLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {isButtonLoading ? "Loading..." : children}
    </button>
  );
}