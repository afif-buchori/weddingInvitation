"use client";
import React, { forwardRef, useContext } from "react";
import { inputGroupContext } from "./InputGroup";
import clsx from "clsx";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  variant?: "primary" | "secondary";
  inputSize?: "sm" | "lg";
  rounded?: boolean;
  error?: string;
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

const InputText = forwardRef((props: FormInputProps, ref: FormInputRef) => {
  const inputGroup = useContext(inputGroupContext);

  const { variant = "primary", inputSize, rounded, ...computedProps } = props;

  const variantClass = {
    primary: clsx([
      "focus:input-primary",
      inputGroup && "focus:border-primary",
      inputGroup?.error ? "border-error" : "border-secondary",
    ]),
    secondary: "",
  };
  return (
    <input
      {...computedProps}
      ref={ref}
      className={clsx([
        "flex-1 focus:!outline-none",
        props.error && "input-error",
        inputGroup && "h-full",
        !inputGroup?.size && !props.inputSize && "input-xs min-h-10",
        props.inputSize === "sm" && "input-xs min-h-8",
        props.inputSize === "lg" && "input-lg",
        props.rounded && "rounded-full",
        inputGroup
          ? "rounded-none first:rounded-l last:rounded-r z-10 first:border-r last:border-l"
          : "input input-secondary",
        inputGroup && !props.inputSize && "px-4 py-0",
        inputGroup && props.inputSize === "sm" && "px-2 py-0",
        inputGroup && props.inputSize === "lg" && "px-5",
        variantClass[variant],
        props.className,
      ])}
    />
  );
});

export default InputText;
