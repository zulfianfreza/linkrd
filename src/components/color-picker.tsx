"use client";

import { useState } from "react";
import { ChromePicker, type ColorResult } from "react-color";
import { Input } from "./ui/input";

interface ColorPickerProps {
  label: string;
  color: string;
  onBlur: () => void;
  setColor: (color: string) => void;
}

export default function ColorPicker({
  label,
  color,
  onBlur,
  setColor,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" mt-8">
      <p className=" text-sm text-gray-700">{label}</p>

      <div className="relative mt-2 flex gap-x-2">
        {isOpen ? (
          <>
            <div
              className=" fixed inset-0"
              onClick={() => {
                setIsOpen(!isOpen);
                onBlur();
              }}
            ></div>
            <ChromePicker
              className=" absolute bottom-6 left-6 z-20"
              onChange={(color: ColorResult) => setColor(color.hex)}
              color={color}
            />
          </>
        ) : null}
        <div
          className={` h-12 w-12 cursor-pointer overflow-hidden rounded-lg border`}
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className=" w-48">
          <Input
            label={label}
            value={color}
            onBlur={onBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColor(e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
