"use client";
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "error";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  className,
  ...props
}) => {
  const variantClass = {
    primary: "btn-primary disabled:bg-primary disabled:text-secondary",
    secondary: "btn-secondary disabled:bg-secondary disabled:text-primary",
    error: "btn-error disabled:bg-error disabled:text-primary",
  };

  const sizeClass = {
    sm: "btn-xs min-h-8",
    md: "btn-sm min-h-10",
    lg: "",
  };

  const loadingClass = loading ? "opacity-70 cursor-wait" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "btn",
        variantClass[variant],
        sizeClass[size],
        loadingClass,
        disabledClass,
        className
      )}
    >
      {loading && (
        <span
          className={clsx([
            "loading",
            size === "sm" && "loading-xs",
            size === "md" && "loading-sm",
          ])}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
