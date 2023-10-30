"use client";

import { EmojiNormal, GlobalSearch } from "iconsax-react";
import CardHideLogo from "~/components/card/card-hide-logo";
import CardSeo from "~/components/card/card-seo";
import CardSocialIcon from "~/components/card/card-social-icon";
import Container from "~/components/container";
import SkeletonCardHideLogo from "~/components/skeleton/skeleton-card-hide-logo";
import SkeletonCardSeo from "~/components/skeleton/skeleton-card-seo";
import LoadingCardSocialIcon from "~/components/skeleton/skeleton-card-social-icon";
import { api } from "~/trpc/react";

export default function SettingsPage() {
  const {
    data: socialIcons,
    isLoading: isLoadingSocialIcons,
    refetch: refetchSocialIcons,
  } = api.socialIcon.getSocialIcon.useQuery();
  const {
    data: theme,
    isLoading: isLoadingTheme,
    refetch: refetchTheme,
  } = api.theme.getTheme.useQuery();
  const {
    data: site,
    isLoading: isLoadingSite,
    refetch: refetchSite,
  } = api.site.getSite.useQuery();

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

  const hotReloadSocialIcons = async () => {
    const socialIcons = await refetchSocialIcons();
    const iframe = document.getElementById("preview-page") as HTMLIFrameElement;

    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        type: "socialicons-updated",
        socialIcons: socialIcons.data,
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

  return (
    <Container>
      <div className="">
        <div className="flex items-center gap-x-2">
          <EmojiNormal className=" text-violet-700" variant="Bulk" size={28} />
          <h1 className=" text-lg font-semibold text-gray-900">Social Icon</h1>
        </div>
        {isLoadingSocialIcons && isLoadingTheme ? (
          <LoadingCardSocialIcon />
        ) : (
          <CardSocialIcon
            socialIcons={socialIcons}
            theme={theme}
            hotReloadSocialIcons={hotReloadSocialIcons}
            hotReloadTheme={hotReloadTheme}
          />
        )}

        {isLoadingTheme ? (
          <SkeletonCardHideLogo />
        ) : (
          <CardHideLogo theme={theme} refetch={hotReloadTheme} />
        )}

        <div className="mt-8 flex items-center gap-x-2">
          <div className=" flex aspect-square w-6 items-center justify-center rounded-lg bg-violet-700">
            <GlobalSearch className=" text-white" size={16} />
          </div>
          <h1 className=" text-lg font-semibold text-gray-900">SEO</h1>
        </div>

        {isLoadingSite ? (
          <SkeletonCardSeo />
        ) : (
          <CardSeo site={site} refetch={hotReloadSite} />
        )}
      </div>
    </Container>
  );
}
