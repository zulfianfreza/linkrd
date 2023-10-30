"use client";
import { ArrowRight2, Logout } from "iconsax-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function ClientHomePage({
  session,
}: {
  session: Session | null;
}) {
  return (
    <div className=" min-h-[100dvh] w-full bg-white">
      <header className="fixed z-50 flex w-full items-center justify-between p-5 sm:px-8">
        <Logo />
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin" className=" text-neutral-800">
                Admin
              </Link>
              <Button
                className=" h-12 gap-1 rounded-full bg-neutral-800 px-8"
                onClick={() => signOut()}
              >
                {/* <Logout /> */}
                Logout
              </Button>
            </>
          ) : (
            // <button
            //   onClick={() => signIn("google", { callbackUrl: "/admin" })}
            //   className=" h-12 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-700 p-[2px] transition-all hover:bg-gradient-to-l"
            // >
            //   <div className=" flex h-full w-full items-center justify-center gap-1 rounded-full bg-white px-8 text-sm font-medium text-neutral-800">
            //     <FcGoogle />
            //     <p>Login with Google</p>
            //   </div>
            // </button>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/admin" })}
              variant="outline"
              className=" h-12 w-full gap-1 rounded-full px-8"
            >
              <FcGoogle />
              <p>Login with Google</p>
            </Button>
          )}
        </div>
      </header>

      <div className=" relative isolate flex h-screen w-full bg-white p-10 pt-20  lg:p-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-20 left-20 -z-10 transform-gpu overflow-hidden leading-none blur-3xl"
        >
          {/* <p className=' bg-gradient-to-r from-violet-500 to-violet-900 bg-clip-text text-[520px] text-transparent opacity-50'>
              Oo
            </p> */}
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-500 to-indigo-700 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className=" flex flex-1 flex-col justify-center">
          <div className="flex flex-col">
            <h1 className=" text-[56px] font-black leading-none text-gray-800 md:text-[56px] lg:text-[72px]">
              One link to everything.
            </h1>
            <p className=" mt-4 text-gray-500">
              Catalink is a single link that you can share in your bio or social
              media posts.
            </p>
          </div>
          <div className=" mt-8 flex gap-x-2">
            <button
              onClick={() => signIn("google")}
              className=" flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-700 to-violet-700 px-8 text-sm text-white "
            >
              <p className=" flex items-center gap-x-1">
                Try It Now <ArrowRight2 size={20} />
              </p>
            </button>
          </div>
        </div>
        <div className="hidden flex-1 justify-end md:flex">
          <div className="relative md:w-[400px] lg:w-[450px] xl:w-[560px]">
            <div className=" relative h-full w-full">
              <Image
                src="/images/hero_image.png"
                fill
                alt=""
                className=" object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
