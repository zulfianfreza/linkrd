"use client";

import { useState } from "react";
import type { ThemeSchema } from "~/server/api/schemas/theme";
import type { Theme } from "~/server/db/schema";
import { BUTTON_TYPE, BUTTON_TYPE_LIST } from "~/types/theme";
import ButtonTheme from "../button-theme";
import ColorPicker from "../color-picker";
import TabWrapper from "./tab-wrapper";

interface TabButtonsProps {
  theme: Theme | undefined;
  handleUpdate: (payload: ThemeSchema) => void;
  refetch: () => void;
}

export default function TabButtons({
  theme,
  handleUpdate,
  refetch,
}: TabButtonsProps) {
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

  const handleUpdateTheme = (type?: BUTTON_TYPE) => {
    handleUpdate({
      buttonType: type,
      buttonColor,
      buttonFontColor,
      shadowColor,
      themeType: "custom",
    });
    refetch();
  };

  const handleUpdateButtonType = (type: BUTTON_TYPE) => {
    if (buttonType == type) return;
    setButtonType(type);
    handleUpdateTheme(type);
  };

  const onBlur = () => {
    handleUpdateTheme();
  };
  return (
    <TabWrapper title="Buttons">
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
    </TabWrapper>
  );
}
