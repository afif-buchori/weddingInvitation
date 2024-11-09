import { HTMLAttributes } from "react";

export default function InputError({
  message,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <p
      {...props}
      className={"text-xs sm:text-sm text-error italic " + className}
    >
      {message}
    </p>
  ) : null;
}
