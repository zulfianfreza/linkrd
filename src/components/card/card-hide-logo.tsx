"use client";

import React from "react";
import { Switch } from "../ui/switch";
import Logo from "../logo";
import { Theme } from "~/server/db/schema";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { api } from "~/trpc/react";

interface CardHideLogoProps {
  theme: Theme | undefined;
  refetch: () => void;
}
export default function CardHideLogo({ theme, refetch }: CardHideLogoProps) {
  const [hideLogo, setHideLogo] = React.useState<boolean>(
    theme?.hideLogo ?? false,
  );

  const previewLoading = usePreviewLoading();

  const updateThemeMutation = api.theme.updateTheme.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess() {
      refetch();
    },
    onSettled() {
      previewLoading.setIsLoading(false);
    },
  });

  const handleHideLogo = () => {
    setHideLogo(!hideLogo);
    updateThemeMutation.mutate({ hideLogo: !hideLogo });
  };
  return (
    <div className=" mt-8 rounded-3xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h1 className=" font-medium text-neutral-800">Hide the Logo</h1>
        <Switch
          className=" data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-gray-200"
          checked={hideLogo}
          onCheckedChange={handleHideLogo}
        />
      </div>
      <Logo className=" mt-4" />
    </div>
  );
}
