"use client";

import { Gallery } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { cn } from "~/lib/utils";
import { type ThemeSchema } from "~/server/api/schemas/theme";
import { type Theme } from "~/server/db/schema";
import { BACKGROUND_TYPE, THEME_TYPE } from "~/types/theme";
import ColorPicker from "../color-picker";
import TabWrapper from "./tab-wrapper";
import { env } from "~/env.mjs";
import { deleteImageCloudinary } from "~/lib/cloudinary";
import axios from "axios";
import { ICloudinaryResponse } from "~/types/shared";
import { useToast } from "~/hooks/use-toast";
import { Button } from "../ui/button";
import Loading from "../loading";
import Image from "next/image";

interface TabBackgroundProps {
  theme: Theme | undefined;
  handleUpdate: (payload: ThemeSchema) => void;
}

export default function TabBackground({
  theme,
  handleUpdate,
}: TabBackgroundProps) {
  const [themeType, setThemeType] = useState<THEME_TYPE>(
    (theme?.themeType ?? THEME_TYPE.CUSTOM) as THEME_TYPE,
  );
  const [backgroundType, setBackgroundType] = useState<BACKGROUND_TYPE>(
    (theme?.backgroundType ?? BACKGROUND_TYPE.SOLID) as BACKGROUND_TYPE,
  );
  const [backgroundPrimary, setBackgroundPrimary] = useState(
    theme?.backgroundPrimary ?? "#fff",
  );
  const [backgroundSecondary, setBackgroundSecondary] = useState(
    theme?.backgroundSecondary ?? "#fff",
  );

  useEffect(() => {
    setBackgroundType(
      (theme?.backgroundType ?? BACKGROUND_TYPE.SOLID) as BACKGROUND_TYPE,
    );
  }, [theme]);

  const handleUpdateTheme = (type?: BACKGROUND_TYPE) => {
    handleUpdate({
      backgroundType: type,
      themeType: "custom",
      backgroundPrimary,
      backgroundSecondary,
    });
  };

  const handleUpdateBackgroundType = (type: BACKGROUND_TYPE) => {
    if (backgroundType == type) return;
    setBackgroundType(type);
    handleUpdateTheme(type);
  };

  const onBlur = () => {
    handleUpdateTheme();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const previewLoading = usePreviewLoading();
  const { toast } = useToast();

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;
    if (e.target.files?.[0]) {
      if (e.target.files[0].size > 5e6) {
        toast({
          title: "Please upload a file smaller than 5 MB",
          variant: "destructive",
        });
        return false;
      }
      setError("");
      file = e.target.files[0];
    }

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      setIsLoading(true);
      previewLoading.setIsLoading(true);
      if (theme?.backgroundImage !== "") {
        await deleteImageCloudinary(theme?.backgroundImage ?? "");
      }
      const { data } = await axios.post<ICloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      console.log(data);
      handleUpdate({ backgroundImage: data.secure_url });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      previewLoading.setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <TabWrapper title="Background">
      <div className=" mt-2 rounded-[24px] bg-white p-6">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.SOLID)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.SOLID,
              })}
            >
              <div className=" h-full w-full rounded-lg bg-gray-300 "></div>
            </div>
            <p className=" text-sm text-gray-700">Solid</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.GRADIENT)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.GRADIENT,
              })}
            >
              <div className=" h-full w-full rounded-lg bg-gradient-to-tr from-gray-300 to-gray-500  "></div>
            </div>
            <p className=" text-sm text-gray-700">Gradient</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.IMAGE)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.IMAGE,
              })}
            >
              <div className=" flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                <Gallery className=" text-gray-800 opacity-50" size={36} />
              </div>
            </div>
            <p className=" text-sm text-gray-700">Image</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.CUBE)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.CUBE,
              })}
            >
              <div className=" bg-cube aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Cube</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() =>
              handleUpdateBackgroundType(BACKGROUND_TYPE.COLORED_PATTERNS)
            }
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.COLORED_PATTERNS,
              })}
            >
              <div className=" bg-colored-patterns aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Colored Patterns</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() =>
              handleUpdateBackgroundType(BACKGROUND_TYPE.COLORED_SHAPES)
            }
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.COLORED_SHAPES,
              })}
            >
              <div className=" bg-colored-shapes aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Colored Shapes</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.HEXAGON)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.HEXAGON,
              })}
            >
              <div className=" bg-hexagon aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Hexagon</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.MOON)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.MOON,
              })}
            >
              <div className=" bg-moon aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Moon</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.SPRINKLE)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.SPRINKLE,
              })}
            >
              <div className=" bg-sprinkle aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Sprinkle</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() => handleUpdateBackgroundType(BACKGROUND_TYPE.CLOUDY)}
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.CLOUDY,
              })}
            >
              <div className=" bg-cloudy aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Cloudy</p>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
            onClick={() =>
              handleUpdateBackgroundType(BACKGROUND_TYPE.CONTOUR_LINE)
            }
          >
            <div
              className={cn(" aspect-[10/16] w-full", {
                "rounded-xl p-2 ring-2 ring-violet-300":
                  backgroundType == BACKGROUND_TYPE.CONTOUR_LINE,
              })}
            >
              <div className=" bg-contour-line aspect-[10/16] h-full w-full rounded-lg bg-cover bg-center"></div>
            </div>
            <p className=" text-sm text-gray-700">Contour Line</p>
          </div>
        </div>

        {backgroundType == BACKGROUND_TYPE.SOLID ||
        backgroundType == BACKGROUND_TYPE.GRADIENT ? (
          <ColorPicker
            label="Background"
            color={backgroundPrimary}
            onBlur={onBlur}
            setColor={setBackgroundPrimary}
          />
        ) : null}
        {backgroundType == BACKGROUND_TYPE.GRADIENT ? (
          <ColorPicker
            label="Background"
            color={backgroundSecondary}
            onBlur={onBlur}
            setColor={setBackgroundSecondary}
          />
        ) : null}
        {backgroundType == BACKGROUND_TYPE.IMAGE ? (
          <div className=" mt-8 flex flex-col">
            <p className=" text-sm text-gray-700">Image</p>
            <div className=" mt-2 flex gap-4 self-start">
              <Image
                src={theme?.backgroundImage ?? ""}
                alt=""
                width={100}
                height={100}
                className=" rounded-lg object-contain"
              />
              <Button disabled={isLoading} onClick={handleClick} className="">
                {isLoading ? (
                  <>
                    <Loading />
                    <p>Uploading</p>
                  </>
                ) : (
                  <p>
                    {theme?.backgroundImage && theme.backgroundImage != ""
                      ? "Change image"
                      : "Upload image"}
                  </p>
                )}
              </Button>
              <input
                type="file"
                name=""
                accept="image/png, image/jpg, image/jpeg"
                ref={inputRef}
                onChange={handleUploadImage}
                id="backgroundImage"
                className=" hidden"
              />
            </div>
          </div>
        ) : null}
      </div>
    </TabWrapper>
  );
}
