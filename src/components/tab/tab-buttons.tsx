"use client";

import React, { useState } from "react";
import ButtonTheme from "../button-theme";
import ColorPicker from "../color-picker";
import { Skeleton } from "../ui/skeleton";
import type { Theme } from "~/server/db/schema";
import { BUTTON_TYPE, BUTTON_TYPE_LIST } from "~/types/theme";
import { api } from "~/trpc/react";
import usePreviewLoading from "~/hooks/use-preview-loading";

interface TabButtonsProps {
  theme: Theme | undefined;
  refetch: () => void;
}

export default function TabButtons({ theme, refetch }: TabButtonsProps) {
  const [buttonType, setButtonType] = useState<BUTTON_TYPE>(
    (theme?.buttonType as BUTTON_TYPE) ?? BUTTON_TYPE.OUTLINEROUNDED,
  );
  const [buttonColor, setButtonColor] = useState(
    theme?.buttonColor ?? "#000000",
  );
  const [buttonFontColor, setButtonFontColor] = useState(
    theme?.buttonFontColor ?? "#000000",
  );
  const [shadowColor, setShadowColor] = useState(
    theme?.shadowColor ?? "#000000",
  );

  const previewLoading = usePreviewLoading();

  const updateThemeMutation = api.theme.updateTheme.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      previewLoading.setIsLoading(false);
    },
  });

  const handleUpdateTheme = (type?: BUTTON_TYPE) => {
    updateThemeMutation.mutate({
      buttonType: type,
      buttonColor,
      buttonFontColor,
      shadowColor,
    });
  };

  const handleUpdateButtonType = (type: BUTTON_TYPE) => {
    setButtonType(type);
    handleUpdateTheme(type);
  };

  const onBlur = () => {
    handleUpdateTheme();
  };
  return (
    <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
      {BUTTON_TYPE_LIST.map((button_type, index) => (
        <div key={index} className=" mt-8">
          <p className=" text-neutral-800">{button_type.type}</p>
          <div className="mt-2 grid grid-cols-3 gap-8">
            {button_type.buttonList.map((button, i) => (
              <ButtonTheme
                key={i}
                type={button}
                value={buttonType}
                onClick={() => handleUpdateButtonType(button)}
              />
            ))}
          </div>
        </div>
      ))}

      <ColorPicker
        label="Button Color"
        color={buttonColor}
        onBlur={onBlur}
        setColor={setButtonColor}
      />

      <ColorPicker
        label="Button Font Color"
        color={buttonFontColor}
        onBlur={onBlur}
        setColor={setButtonFontColor}
      />

      {BUTTON_TYPE_LIST[3]?.buttonList.includes(buttonType) ? (
        <ColorPicker
          label="Shadow Color"
          color={shadowColor}
          onBlur={onBlur}
          setColor={setShadowColor}
        />
      ) : null}
    </div>
  );
}

export const TabButtonsLoading = () => {
  return (
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
  );
};
