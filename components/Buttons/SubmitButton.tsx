"use client";
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  LoadingIcon?: ReactNode;
}

export default function SubmitButton({
  isLoading,
  children,
  onClick,
  disabled,
  className,
  LoadingIcon,
  ...props
}: ButtonProps) {
  const data = useFormStatus();
  const pending = data.pending;
  return (
    <button
      className={`${className} submitButton w-fit h-fit`}
      onClick={onClick}
      {...props}
      disabled={pending || disabled}
    >
      {pending ? LoadingIcon || "Loading.." : children}
    </button>
  );
}
