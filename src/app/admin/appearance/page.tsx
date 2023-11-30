"use client";

import Container from "~/components/container";
import SkeletonTabBackground from "~/components/skeleton/skeleton-tab-background";
import SkeletonTabButtons from "~/components/skeleton/skeleton-tab-buttons";
import SkeletonTabFonts from "~/components/skeleton/skeleton-tab-fonts";
import SkeletonTabProfile from "~/components/skeleton/skeleton-tab-profile";
import SkeletonTabThemes from "~/components/skeleton/skeleton-tab-themes";
import TabBackground from "~/components/tab/tab-background";
import TabButtons from "~/components/tab/tab-buttons";
import TabFonts from "~/components/tab/tab-fonts";
import TabProfile from "~/components/tab/tab-profile";
import TabThemes from "~/components/tab/tab-themes";
import { Button } from "~/components/ui/button";
import useActiveTab from "~/hooks/use-active-tab";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { TABS_LIST } from "~/lib/data/constants";
import { cn } from "~/lib/utils";
import type { ThemeSchema } from "~/server/api/schemas/theme";
import { api } from "~/trpc/react";

export default function AppearancePage() {
  const {
    data: site,
    isLoading: isLoadingSite,
    refetch: refetchSite,
  } = api.site.getSite.useQuery();

  const {
    data: theme,
    isLoading: isLoadingTheme,
    refetch: refetchTheme,
  } = api.theme.getTheme.useQuery();

  const previewLoading = usePreviewLoading();

  const hotReloadTheme = async () => {
    const theme = await refetchTheme();
    const iframe = document.getElementById("preview-page") as HTMLIFrameElement;

    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        type: "theme-updated",
        theme: theme.data,
      },
      "*",
    );
  };

  const hotReloadSite = async () => {
    const site = await refetchSite();
    const iframe = document.getElementById("preview-page") as HTMLIFrameElement;

    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        type: "site-updated",
        site: site.data,
      },
      "*",
    );
  };

  const updateThemeMutation = api.theme.updateTheme.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: async () => {
      await hotReloadTheme();
      await refetchTheme();
    },
    onSettled: () => {
      previewLoading.setIsLoading(false);
    },
  });

  const handleUpdateTheme = (payload: ThemeSchema) => {
    updateThemeMutation.mutate(payload);
  };

  const { activeTab, setActiveTab } = useActiveTab();
  return (
    <Container>
      <div className=" flex w-full rounded-full bg-white p-1">
        {TABS_LIST.map((tab, index) => (
          <Button
            key={index}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              " h-12 flex-1 rounded-full bg-white text-neutral-800 shadow-none hover:bg-violet-700 hover:text-white",
              { "bg-violet-700 text-white": activeTab == tab.value },
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className={cn("hidden", { block: activeTab == "PROFILE" })}>
        {isLoadingSite ? (
          <SkeletonTabProfile />
        ) : (
          <TabProfile site={site} refetch={hotReloadSite} />
        )}
      </div>
      <div className={cn(" mt-8 hidden", { block: activeTab == "CUSTOM" })}>
        <h1 className=" text-lg font-semibold text-neutral-800">
          Custom Theme
        </h1>
        <p className=" text-sm text-neutral-500">
          Completely customize your Linkstation profile. Change your background
          with colors, gradients and images. Choose a button style, change the
          typeface and more.
        </p>
        {isLoadingTheme ? (
          <>
            <SkeletonTabBackground />
            <SkeletonTabButtons />
            <SkeletonTabFonts />
          </>
        ) : (
          <>
            <TabBackground theme={theme} handleUpdate={handleUpdateTheme} />
            <TabButtons
              theme={theme}
              handleUpdate={handleUpdateTheme}
              refetch={refetchTheme}
            />
            <TabFonts theme={theme} handleUpdate={handleUpdateTheme} />
          </>
        )}
      </div>
      <div className={cn("hidden", { block: activeTab == "THEMES" })}>
        {isLoadingTheme ? (
          <SkeletonTabThemes />
        ) : (
          <TabThemes theme={theme} handleUpdate={handleUpdateTheme} />
        )}
      </div>
    </Container>
  );
}
