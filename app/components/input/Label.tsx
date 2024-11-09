import React from "react";

interface LabelProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ label, className, children }) => {
  return (
    <label className={className}>
      <p className="text-xs sm:text-sm font-medium mb-1">{label}</p>
      {children}
    </label>
  );
};

export default Label;
