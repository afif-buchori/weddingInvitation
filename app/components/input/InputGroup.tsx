"use client";
import clsx from "clsx";
import React, { createContext, useContext } from "react";

interface InputGroupCtxProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "lg";
  error?: string;
}
type InputGroupProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div"> &
  InputGroupCtxProps;

export const inputGroupContext = createContext<InputGroupCtxProps | null>(null);

function InputGroup(props: InputGroupProps) {
  const { variant = "primary", size, className, error, children } = props;

  const variantClass = {
    primary: "focus-within:input-primary",
    secondary: "",
  };

  return (
    <inputGroupContext.Provider value={{ variant, size, error }}>
      <div
        {...props}
        className={clsx([
          "flex-1 flex flex-shrink items-center group input input-secondary !outline-none pr-0",
          className,
          error && "input-error",
          !size && "input-sm min-h-10 gap-3",
          size === "sm" && "input-xs min-h-8 gap-2",
          size === "lg" && "gap-4",
          variantClass[variant],
        ])}
      >
        {children}
      </div>
    </inputGroupContext.Provider>
  );
}

// type TextProps = React.PropsWithChildren &
//   React.ComponentPropsWithoutRef<"div">;

// const InputGroupText: React.FC<TextProps> = (props) => {
//   const inputGroup = useContext(inputGroupContext);

//   return (
//     <div
//       {...props}
//       className={clsx([
//         "input input-secondary",
//         // inputGroup &&
//         //   "rounded-none [&:not(:first-child)]:border-l-transparent first:rounded-l last:rounded-r",
//         props.className,
//       ])}
//     >
//       {props.children}
//     </div>
//   );
// };

// InputGroup.Text = InputGroupText;

// InputGroup.displayName = "InputGroup";
// InputGroupText.displayName = "InputGroup.Text";

export default InputGroup;
