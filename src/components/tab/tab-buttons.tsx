"use client";

import React from "react";
import ButtonTheme from "../button-theme";
import ColorPicker from "../color-picker";
import { Skeleton } from "../ui/skeleton";

interface TabButtonsProps {
  isLoading?: boolean;
}

export default function TabButtons({ isLoading }: TabButtonsProps) {
  return (
    <div className=" mt-4">
      <h1 className=" text-lg font-semibold text-neutral-800">Buttons</h1>
      {!isLoading ? (
        <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
          <div className="">
            <p className=" text-neutral-800">Fill</p>
            <div className="mt-2 grid grid-cols-3 gap-8">
              <ButtonTheme type="FILL" />
              <ButtonTheme type="FILLROUNDED" />
              <ButtonTheme type="FILLCIRCULAR" />
            </div>
          </div>
          <div className=" mt-8">
            <p className=" text-neutral-800">Outline</p>
            <div className="mt-2 grid grid-cols-3 gap-8">
              <ButtonTheme type="OUTLINE" />
              <ButtonTheme type="OUTLINEROUNDED" />
              <ButtonTheme type="OUTLINECIRCULAR" />
            </div>
          </div>
          <div className=" mt-8">
            <p className=" text-neutral-800">Soft Shadow</p>
            <div className="mt-2 grid grid-cols-3 gap-8">
              <ButtonTheme type="SOFTSHADOW" />
              <ButtonTheme type="SOFTSHADOWROUNDED" />
              <ButtonTheme type="SOFTSHADOWCIRCULAR" />
            </div>
          </div>
          <div className=" mt-8">
            <p className=" text-neutral-800">Hard Shadow</p>
            <div className="mt-2 grid grid-cols-3 gap-8">
              <ButtonTheme type="HARDSHADOW" />
              <ButtonTheme type="HARDSHADOWROUNDED" />
              <ButtonTheme type="HARDSHADOWCIRCULAR" />
            </div>
          </div>

          <ColorPicker
            label="Button Color"
            color=""
            onBlur={() => {
              console.log();
            }}
            setColor={() => {
              console.log();
            }}
          />
        </div>
      ) : (
        <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
          {[1, 1, 1, 1].map((_, index) => (
            <div className=" mt-8 first:mt-0" key={index}>
              <Skeleton className=" h-6 w-48" />
              <div className="mt-2 grid grid-cols-3 gap-8">
                <Skeleton className=" h-10" />
                <Skeleton className=" h-10" />
                <Skeleton className=" h-10" />
              </div>
            </div>
          ))}

          <div className=" mt-8">
            <Skeleton className=" h-6 w-24" />
            <Skeleton className=" mt-2 h-12 w-64" />
          </div>
        </div>
      )}
    </div>
  );
}
