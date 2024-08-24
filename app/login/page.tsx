"use client";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { toEn } from "@/functions";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { redirect, RedirectType, useRouter } from "next/navigation";
import React, { useId } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

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
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl mb-6"></h1>

      <div className="w-36 aspect-square py-12 flex flex-col items-center space-y-4">
        <Image
          src={"/chatAppLogo.png"}
          alt="ChatAppLogo"
          width={300}
          height={290}
        />
        <h1 className="font-bold text-xl text-blue-500">Chat App</h1>
      </div>
      {/* <form action={verifyOTP} className="loginFormContainer">
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
      </form> */}
      <div>
        <SubmitButton
          className="flex items-center space-x-3 dark:border-neutral-500"
          type="button"
          onClick={() => signIn("google")}
        >
          <FcGoogle size={30} />
          <b>Sigh in With Google</b>
        </SubmitButton>
      </div>
    </div>
  );
}
