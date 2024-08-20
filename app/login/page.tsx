"use client";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { toEn } from "@/functions";
import { signIn } from "next-auth/react";
import { redirect, RedirectType, useRouter } from "next/navigation";
import React, { useId } from "react";
import { toast } from "react-toastify";
interface Props {
  searchParams: { mobile: string };
}

export default function Login({ searchParams }: Props) {
  const id = useId();
  const router = useRouter();
  // const mobile = searchParams.mobile;

  const verifyOTP = async (data: FormData) => {
    const mobile = data.get("mobile");
    console.log(mobile);

    await signIn("credentials", {
      mobile: toEn(mobile),
      // otp: toEn(mobile),
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          return toast.error("Invalid OTP");
        }

        return location.replace("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-6"></h1>

      <form action={verifyOTP} className="loginFormContainer">
        <label className="loginFormLabel pb-2" htmlFor={id}>
          Mobile Number
        </label>
        <div>
          <input
            className="loginFormInput text-center"
            type="text"
            name="mobile"
            id={id}
            placeholder="Type mobile no. starting with 01..."
          />
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <SubmitButton>Enter</SubmitButton>
        </div>
      </form>
    </div>
  );
}
