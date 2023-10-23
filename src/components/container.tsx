"use client";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-auto min-h-screen w-full bg-neutral-100 pb-16  pt-32 md:w-[calc(100vw-316px)] md:pt-28 lg:w-[calc(100vw-435px)] xl:w-[calc(100vw-568px)]">
      <div className=" mx-auto h-full w-full max-w-[640px] p-4">{children}</div>
    </div>
  );
}
