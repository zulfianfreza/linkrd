"use client";

import { useEffect, useState } from "react";
import useActiveTab from "~/hooks/use-active-tab";
import { balsamiqSans } from "~/lib/data/font";
import { cn } from "~/lib/utils";
import type { ThemeSchema } from "~/server/api/schemas/theme";
import type { Theme } from "~/server/db/schema";
import { THEME_TYPE } from "~/types/theme";
import TabWrapper from "./tab-wrapper";

interface TabThemesProps {
  theme: Theme | undefined;
  handleUpdate: (payload: ThemeSchema) => void;
}

export default function TabThemes({ theme, handleUpdate }: TabThemesProps) {
  const { setActiveTab } = useActiveTab();
  const [themeType, setThemeType] = useState<THEME_TYPE>(
    (theme?.themeType ?? THEME_TYPE.CUSTOM) as THEME_TYPE,
  );

  const handleUpdateTheme = (type?: THEME_TYPE) => {
    handleUpdate({ themeType: type, backgroundType: "" });
  };

  const handleUpdateThemeType = (type: THEME_TYPE) => {
    setThemeType(type);
    handleUpdateTheme(type);
  };

  useEffect(() => {
    setThemeType((theme?.themeType ?? THEME_TYPE.CUSTOM) as THEME_TYPE);
  }, [theme]);

  return (
    <TabWrapper title="Theme">
      <div className=" mt-2 rounded-[24px] bg-white p-6">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <button
            className="flex flex-col items-center justify-center gap-y-2"
            onClick={() => setActiveTab("CUSTOM")}
          >
            <div className=" flex aspect-[10/16] w-full items-center justify-center rounded-xl border-[1.5px] border-dashed border-black text-center uppercase">
              <p className=" text-lg">
                Create <br />
                Your <br />
                Own
              </p>
            </div>
            <p className=" text-sm text-gray-700">Custom</p>
          </button>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.BALSAMIQ)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.BALSAMIQ,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-white ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" flex h-4 w-full items-center justify-center border border-black shadow-[2px_2px_0_0_#000000]">
                    <p className={" text-[8px]"}>Link</p>
                  </div>
                  <div className=" flex h-4 w-full items-center justify-center border border-black shadow-[2px_2px_0_0_#000000]">
                    <p className={" text-[8px]"}>Link</p>
                  </div>
                  <div className=" flex h-4 w-full items-center justify-center border border-black shadow-[2px_2px_0_0_#000000]">
                    <p className={" text-[8px]"}>Link</p>
                  </div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Balsamiq</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_WHITE)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_WHITE,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-white ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-[#eceef1]"></div>
                  <div className=" h-4 w-full rounded bg-[#eceef1]"></div>
                  <div className=" h-4 w-full rounded bg-[#eceef1]"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air White</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_LEAF)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_LEAF,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-white ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-[#44e660]"></div>
                  <div className=" h-4 w-full rounded bg-[#44e660]"></div>
                  <div className=" h-4 w-full rounded bg-[#44e660]"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air Leaf</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_MOON)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_MOON,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-white ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-[#2665d6]"></div>
                  <div className=" h-4 w-full rounded bg-[#2665d6]"></div>
                  <div className=" h-4 w-full rounded bg-[#2665d6]"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air Moon</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_SNOW)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_SNOW,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-white ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-[#2b3235]"></div>
                  <div className=" h-4 w-full rounded bg-[#2b3235]"></div>
                  <div className=" h-4 w-full rounded bg-[#2b3235]"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air Snow</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_GREY)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_GREY,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-[#eceef1] ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-white"></div>
                  <div className=" h-4 w-full rounded bg-white"></div>
                  <div className=" h-4 w-full rounded bg-white"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air Grey</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_SMOKE)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_SMOKE,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-[#2b3235] ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-white"></div>
                  <div className=" h-4 w-full rounded bg-white"></div>
                  <div className=" h-4 w-full rounded bg-white"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air Smoke</p>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-y-2",
            )}
            onClick={() => handleUpdateThemeType(THEME_TYPE.AIR_BLACK)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", balsamiqSans.className, {
                "rounded-xl  ring-2 ring-violet-300 ring-offset-4":
                  themeType == THEME_TYPE.AIR_BLACK,
              })}
            >
              <div className=" h-full w-full rounded-lg border border-gray-200 bg-[#000] ">
                <div className=" flex h-full flex-col justify-center gap-y-2 p-4">
                  <div className=" h-4 w-full rounded bg-[#222]"></div>
                  <div className=" h-4 w-full rounded bg-[#222]"></div>
                  <div className=" h-4 w-full rounded bg-[#222]"></div>
                </div>
              </div>
            </div>
            <p className=" text-sm text-gray-700">Air Black</p>
          </div>
        </div>
      </div>
    </TabWrapper>
  );
}
