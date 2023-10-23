"use client";

import { ArrowDown2 } from "iconsax-react";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ColorPicker from "../color-picker";

interface TabFontsProps {
  isLoading?: boolean;
}

export default function TabFonts({ isLoading }: TabFontsProps) {
  const [fontColor, setFontColor] = useState<string>("");

  const onBlurFontColor = () => {
    console.log();
  };
  return (
    <div className=" mt-8">
      <div className="">
        <h1 className=" text-lg font-semibold text-gray-900">Fonts</h1>
      </div>
      {!isLoading ? (
        <div className=" mt-2 rounded-[24px] bg-white p-6">
          <div className="">
            <p className=" text-neutral-800">Font</p>
            <div className="mt-2 flex gap-x-2">
              <div className=" flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 ">
                <p className="">Aa</p>
              </div>
              <div
                className=" flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border px-4"
                // onClick={selectFontModal.onOpen}
              >
                <p className=" text-sm">{}</p>
                <ArrowDown2 size={16} />
              </div>
            </div>
          </div>
          <ColorPicker
            label="Color"
            color={fontColor}
            setColor={setFontColor}
            onBlur={onBlurFontColor}
          />
        </div>
      ) : (
        <div className=" mt-2 rounded-[24px] bg-white p-6">
          <div className="">
            <Skeleton className=" h-6 w-24" />
            <Skeleton className=" mt-2 h-12" />
          </div>
          <div className=" mt-8">
            <Skeleton className=" h-6 w-24" />
            <Skeleton className=" mt-2 h-12 w-64" />
          </div>
        </div>
      )}
    </div>
  );
}
