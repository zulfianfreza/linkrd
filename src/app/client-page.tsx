"use client";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiChevronRight } from "react-icons/hi";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiTwitch,
  SiX,
} from "react-icons/si";
import { Tilt } from "react-tilt";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function ClientHomePage({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 45, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: false, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <div className=" min-h-[100dvh] w-full bg-white">
      <header className="fixed z-50 flex w-full items-center justify-between p-8">
        <div className=" flex w-full justify-between rounded-full bg-white p-3 shadow-sm">
          <Logo className=" ml-4" />
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/admin" className=" font-medium text-neutral-800">
                  Admin
                </Link>
                <Button
                  className=" h-14 gap-1 rounded-full bg-neutral-800 px-6 hover:bg-neutral-800/90"
                  onClick={() => signOut()}
                >
                  {/* <Logout /> */}
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => signIn("google", { callbackUrl: "/admin" })}
                // variant="outline"
                className=" h-14 w-full gap-2 rounded-full bg-neutral-800 px-6 text-white hover:bg-neutral-800/90"
              >
                <FcGoogle size={20} />
                <p>Login with Google</p>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className=" relative isolate flex h-[100dvh] w-full bg-violet-900 p-10 pt-20  lg:p-20">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-20 left-20 -z-10 transform-gpu overflow-hidden leading-none blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-500 to-indigo-700 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div> */}
        <div className=" flex flex-1 flex-col justify-center">
          <div className="flex flex-col">
            <h1 className=" text-[56px] font-black leading-none text-violet-300 md:text-[56px] lg:text-[72px]">
              One link to everything.
            </h1>
            <p className=" mt-4 text-violet-300">
              Linkrd is a single link that you can share in your bio or social
              media posts.
            </p>
          </div>
          <div className=" mt-8 flex gap-x-2">
            <button
              onClick={async () => {
                if (session) {
                  router.push("/admin");
                } else {
                  await signIn("google");
                }
              }}
              className=" flex h-14 items-center justify-center rounded-full bg-sky-400 px-6 text-sm text-white "
            >
              <p className=" flex items-center gap-x-1 font-medium">
                Try It Now <HiChevronRight size={20} />
              </p>
            </button>
          </div>
        </div>
        <div className="relative hidden flex-1 justify-end md:flex">
          <Tilt
            options={defaultOptions}
            className="  relative rotate-2 md:w-[400px] lg:w-[450px] xl:w-[520px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className=" flex h-[724px] w-[375px] scale-75 flex-col rounded-[40px] bg-[#fff] p-6 py-10">
              <div className="flex flex-col items-center">
                <div className=" relative aspect-square w-24 overflow-hidden rounded-full">
                  <Image
                    src="/images/53.png"
                    fill
                    alt=""
                    className=" object-cover"
                  />
                </div>
                <div className=" mt-4 text-center">
                  <h1 className=" text-lg font-semibold text-neutral-800">
                    Julian D. Erza
                  </h1>
                  <p className=" text-sm text-neutral-800">
                    Code Crafter | Nyctophile | Vintage
                  </p>
                </div>
                <div className=" mt-4 flex items-center gap-2">
                  <SiX size={16} className=" text-neutral-800" />
                  <SiLinkedin size={16} className=" text-neutral-800" />
                  <SiTwitch size={16} className=" text-neutral-800" />
                  <SiInstagram size={16} className=" text-neutral-800" />
                  <SiGithub size={16} className=" text-neutral-800" />
                </div>
              </div>
            </div>
            <div
              className=" absolute right-20 top-10"
              style={{ transform: "translateZ(-20px)" }}
            >
              <div className=" relative  aspect-square w-[212px]">
                <Image
                  src="/images/vinyl.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div>
            <div
              className=" absolute bottom-10 right-1/3 flex translate-x-1/2 items-center gap-2"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className=" flex aspect-square h-12 items-center justify-center rounded-full bg-neutral-800">
                <SiX className=" text-white" />
              </div>
              <div className=" flex aspect-square h-12 items-center justify-center rounded-full bg-neutral-800">
                <SiTwitch className=" text-white" />
              </div>
              <div className=" flex aspect-square h-12 items-center justify-center rounded-full bg-neutral-800">
                <SiGithub className=" text-white" />
              </div>
            </div>
            <div
              className=" absolute -left-10 bottom-0"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className=" w-[212px] rounded-2xl bg-white p-2.5 shadow-lg">
                <div className=" relative aspect-video w-full">
                  <Image
                    src="/images/vintage-radio.jpg"
                    fill
                    alt=""
                    className=" object-contain"
                  />
                </div>
                <p className=" mt-4 text-sm font-medium text-neutral-800">
                  Retro Vintage Radio
                </p>
              </div>
            </div>
            <div
              className="absolute top-0 flex h-[696px] w-[375px] scale-75 flex-col rounded-[40px] p-6 py-10"
              // style={{ transform: "translateZ(10px)" }}
            >
              <div className=" mt-56 flex flex-col gap-2">
                {["My Website", "Coding Journey", "Black Inspirations"].map(
                  (label, i) => (
                    <button
                      key={i}
                      style={{ transform: "translateZ(20px)" }}
                      className=" flex h-14 w-full items-center justify-center rounded-lg bg-neutral-800 text-sm font-medium text-white"
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </div>
            {/* <div className=" relative h-full w-full">
              <Image
                src="/images/link1.png"
                fill
                alt=""
                className=" object-contain"
              />
            </div>
            <div
              className=" absolute bottom-4 left-10"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="  relative aspect-square  w-44">
                <Image
                  src="/images/link1-glasses.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div>
            <div
              className=" absolute -right-10 top-0"
              style={{ transform: "translateZ(-10px)" }}
            >
              <div className="  relative aspect-square  w-80">
                <Image
                  src="/images/link1-beanie.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div>
            <div
              className=" absolute bottom-0 right-10"
              style={{ transform: "translateZ(15px)" }}
            >
              <div className="  relative aspect-square  w-40">
                <Image
                  src="/images/link1-social.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div> */}
          </Tilt>
        </div>
      </div>

      <div className=" flex h-screen w-full overflow-hidden bg-sky-200 p-10">
        <div className="relative hidden flex-1 justify-center md:flex">
          <Tilt
            options={defaultOptions}
            className="  mt-20 md:w-[400px] lg:w-[450px] xl:w-[480px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* <div className=" relative h-full w-full rotate-2">
              <Image
                src="/images/thumbnail-hero.png"
                fill
                alt=""
                className=" object-contain"
              />
            </div> */}
            <div className=" relative h-full w-full">
              <Image
                src="/images/link1.png"
                fill
                alt=""
                className=" object-contain"
              />
            </div>
            <div
              className=" absolute bottom-4 left-10"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="  relative aspect-square  w-44">
                <Image
                  src="/images/link1-glasses.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div>
            <div
              className=" absolute -right-10 top-0"
              style={{ transform: "translateZ(-10px)" }}
            >
              <div className="  relative aspect-square  w-80">
                <Image
                  src="/images/link1-beanie.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div>
            <div
              className=" absolute bottom-0 right-10"
              style={{ transform: "translateZ(15px)" }}
            >
              <div className="  relative aspect-square  w-40">
                <Image
                  src="/images/link1-social.png"
                  fill
                  alt=""
                  className=" object-contain"
                />
              </div>
            </div>
          </Tilt>
        </div>
        <div className=" flex flex-1 flex-col items-start justify-center">
          <div className="">
            <h1 className="text-[56px] font-black leading-none text-sky-900 md:text-[56px] lg:text-[72px]">
              Create and customize your Linkrd in minutes
            </h1>
            <p className=" mt-4 font-medium text-sky-900">
              Connect your TikTok, Instagram, Twitter, website, store, videos,
              music, podcast, events and more. It all comes together in a link
              in bio landing page designed to convert.
            </p>
          </div>
          <button
            onClick={async () => {
              if (session) {
                router.push("/admin");
              } else {
                await signIn("google");
              }
            }}
            className=" mt-8 flex h-14 items-center justify-center rounded-full bg-sky-900 px-6 text-sm text-white hover:bg-sky-900/90 "
          >
            <p className=" flex items-center gap-x-1 font-medium">
              Get Started for Free
            </p>
          </button>
        </div>
      </div>

      <div className=" relative w-full overflow-hidden bg-pink-900 p-12">
        <div className=" z-[11] flex w-full flex-col justify-between gap-8 rounded-2xl bg-white p-16 px-6 lg:flex-row lg:px-16">
          <div className="">
            <Button
              className=" h-14 rounded-full px-6"
              onClick={async () => {
                if (session) {
                  router.push("/admin");
                } else {
                  await signIn("google");
                }
              }}
            >
              Get Started for Free
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className=" flex aspect-square w-14 items-center justify-center rounded-full bg-neutral-800">
              <SiX className=" text-white" size={24} />
            </div>
            <div className=" flex aspect-square w-14 items-center justify-center rounded-full bg-neutral-800">
              <SiTiktok className=" text-white" size={24} />
            </div>
            <div className=" flex aspect-square w-14 items-center justify-center rounded-full bg-neutral-800">
              <SiInstagram className=" text-white" size={24} />
            </div>
            <div className=" flex aspect-square w-14 items-center justify-center rounded-full bg-neutral-800">
              <SiGithub className=" text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
