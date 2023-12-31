"use client";

import { ArrowDown2 } from "iconsax-react";
import React, { useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { FONT_LIST } from "~/lib/data/font";
import { cn } from "~/lib/utils";
import type { ThemeSchema } from "~/server/api/schemas/theme";
import type { Theme } from "~/server/db/schema";
import ColorPicker from "../color-picker";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import TabWrapper from "./tab-wrapper";

interface TabFontsProps {
  theme: Theme | undefined;
  handleUpdate: (payload: ThemeSchema) => void;
}

export default function TabFonts({ theme, handleUpdate }: TabFontsProps) {
  const [fontColor, setFontColor] = useState<string>(
    theme?.fontColor && theme.fontColor != "" ? theme.fontColor : "#000000",
  );
  const [fontDialog, setFontDialog] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState(
    theme?.fontFamily ?? "Monserrat",
  );
  const [searchFont, setSearchFont] = useState("");
  const [fontList, setFontList] = useState(FONT_LIST);

  const handleSearchFont = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text != "") {
      let results = [...FONT_LIST];
      results = results.filter((font) => {
        return font.label.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
      setFontList(results);
    } else {
      setFontList(FONT_LIST);
    }

    setSearchFont(e.target.value);
  };

  const handleUpdateTheme = () => {
    handleUpdate({ fontColor, fontFamily, themeType: "custom" });
  };

  const handleUpdateFont = () => {
    setFontDialog(!fontDialog);
    if (fontFamily == theme?.fontFamily) return;
    handleUpdateTheme();
  };

  const onBlurFontColor = () => {
    handleUpdateTheme();
  };

  const toggleFontDialog = () => {
    setFontDialog(!fontDialog);
    setFontFamily(theme?.fontFamily ?? "Monserrat");
  };

  const themeFont = FONT_LIST.find((font) => font.label == fontFamily);
  return (
    <>
      <TabWrapper title="Fonts">
        <div className=" mt-2 rounded-[24px] bg-white p-6">
          <div className="">
            <p className=" text-neutral-800">Font</p>
            <div className="mt-2 flex gap-x-2">
              <div className=" flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 ">
                <p className={cn(themeFont?.value.className)}>Aa</p>
              </div>
              <button
                onClick={toggleFontDialog}
                className=" flex h-12 flex-1 cursor-pointer items-center justify-between rounded-lg border px-4"
              >
                <p className={cn(" text-sm", themeFont?.value.className)}>
                  {fontFamily}
                </p>
                <ArrowDown2 size={16} />
              </button>
            </div>
          </div>
          <ColorPicker
            label="Color"
            color={fontColor}
            setColor={setFontColor}
            onBlur={onBlurFontColor}
          />
        </div>
      </TabWrapper>
      <Dialog open={fontDialog} onOpenChange={toggleFontDialog}>
        <DialogContent className=" w-full max-w-xl border-none bg-transparent p-5 shadow-none">
          <div className="w-full gap-0 rounded-3xl border bg-white p-0 pb-6 shadow-lg">
            <div className="relative flex items-center justify-between p-4 pb-4">
              <div className=" w-9"></div>
              <h1 className=" font-semibold text-neutral-800">Select a Font</h1>
              <button
                className=" rounded-lg p-2 hover:bg-neutral-100"
                onClick={toggleFontDialog}
              >
                <LuX size={20} />
              </button>
            </div>
            <div className=" sticky top-0 bg-white px-4 py-2">
              <Input
                label="Search font"
                value={searchFont}
                onChange={handleSearchFont}
              />
            </div>
            <div className=" relative h-[320px] w-full overflow-y-scroll">
              <div className=" flex flex-col px-4">
                {fontList.map((font, index) => (
                  <button
                    key={index}
                    className={cn(
                      " flex h-12 w-full items-center justify-between rounded-full px-4  hover:bg-neutral-100",
                      {
                        "bg-violet-200 hover:bg-violet-200":
                          font.label == fontFamily,
                      },
                    )}
                    onClick={() => setFontFamily(font.label)}
                  >
                    <p
                      className={cn(" text-neutral-800", font.value.className)}
                    >
                      {font.label}
                    </p>
                    {font.label == fontFamily ? (
                      <p className=" flex items-center gap-1 text-sm text-violet-900">
                        <LuCheck /> Selected
                      </p>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
            <div className=" p-4">
              <Button
                onClick={handleUpdateFont}
                className=" h-12 w-full rounded-full"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
