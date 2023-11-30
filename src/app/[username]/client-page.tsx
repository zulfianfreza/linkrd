"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { TwitterEmbed } from "react-social-media-embed";
import Avatar from "~/components/avatar";
import Icon from "~/components/icon";
import Logo from "~/components/logo";
import { getButtonStyle } from "~/hooks/use-button-style";
import {
  getDividerStyle,
  getThumbnailStyle,
  headerTextAlign,
} from "~/hooks/use-style";
import { useThemeStyle } from "~/hooks/use-theme-style";
import { SOCIAL_ICON_LIST } from "~/lib/data/social-icon";
import { cn, getVideoIdFromYoutubeUrl } from "~/lib/utils";
import type { SocialIcon, Theme } from "~/server/db/schema";
import { api } from "~/trpc/react";
import type {
  IExtraDivider,
  IExtraTextAlign,
  IExtraThumbnail,
  ILink,
} from "~/types/link";
import type { ISite } from "~/types/site";
import type { BUTTON_TYPE } from "~/types/theme";
import type { IUser } from "~/types/user";

interface UsernameClientPageProps {
  links: ILink[];
  site: ISite | undefined;
  user: IUser | undefined;
  theme: Theme | undefined;
  socialIcons: SocialIcon[];
}

export default function UsernameClientPage({
  links,
  site,
  user,
  theme,
  socialIcons,
}: UsernameClientPageProps) {
  const [linksData, setLinksData] = useState<ILink[]>(links);
  const [siteData, setSiteData] = useState<ISite | undefined>(
    site ?? undefined,
  );
  const [themeData, setThemeData] = useState<Theme | undefined>(
    theme ?? undefined,
  );
  const [socialIconsData, setSocialIconsData] =
    useState<SocialIcon[]>(socialIcons);

  useEffect(() => {
    window.addEventListener(
      "message",
      (
        event: MessageEvent<{
          type: string;
          links: ILink[];
          site: ISite;
          theme: Theme;
          socialIcons: SocialIcon[];
        }>,
      ) => {
        const type = event.data.type;
        const data = event.data;
        if (type === "links-updated") {
          setLinksData(data.links);
        }
        if (type === "site-updated") {
          setSiteData(data.site);
        }
        if (type === "theme-updated") {
          setThemeData(data.theme);
        }
        if (type === "socialicons-updated") {
          setSocialIconsData(data.socialIcons);
        }
      },
    );
  }, []);

  const { themeClass, themeStyle, nameStyle, dividerColor } =
    useThemeStyle(themeData);

  const getIcon = (iconId: number): IconType => {
    const icon = SOCIAL_ICON_LIST.find((icon) => {
      return icon.id == iconId;
    });

    return icon?.icon ?? SOCIAL_ICON_LIST[0]!.icon;
  };

  const updateLinkMutation = api.link.incrementClickCount.useMutation();

  const searchParams = useSearchParams();
  const isCreationMode = searchParams.get("is_creation_mode");

  const handleClick = (linkId: string) => {
    if (isCreationMode) return;

    updateLinkMutation.mutate({ linkId });
  };

  const dividerStyle = (extra: string) => {
    const jsonExtra = JSON.parse(extra) as IExtraDivider;
    const extraDividerStyle = getDividerStyle(jsonExtra);

    return {
      ...extraDividerStyle,
      ...dividerColor,
    } as React.CSSProperties;
  };

  return (
    <div
      className={cn(
        " flex min-h-screen w-full flex-col bg-neutral-50 bg-cover bg-center transition-all",
        themeClass,
      )}
      style={themeStyle}
    >
      <div className=" bg-black/25 backdrop-blur-2xl">
        <div
          className={cn(
            "mx-auto flex h-full min-h-screen w-full max-w-lg flex-col p-5 pb-8 pt-16 sm:p-6",
            themeClass,
          )}
          style={themeStyle}
        >
          <div className=" flex-1">
            {/* PROFILE */}
            <div className=" flex flex-col items-center justify-center gap-y-4 md:flex-row">
              <div className=" flex flex-col items-center justify-center gap-x-8">
                <Avatar
                  src={
                    siteData?.profileImage && siteData.profileImage != ""
                      ? siteData.profileImage
                      : user?.image
                  }
                  className=" h-24 w-24"
                />
                <div className=" mt-2 flex flex-1 flex-col gap-y-2">
                  <div className=" text-center">
                    <p className=" text-xl font-bold " style={nameStyle}>
                      {siteData?.profileTitle && siteData?.profileTitle != ""
                        ? siteData?.profileTitle
                        : user?.name}
                    </p>
                    <p className=" text-center text-sm font-medium">
                      {siteData?.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn(" mt-4 flex flex-col gap-y-6", {
                "flex-col-reverse": themeData?.socialIconPosition == "bottom",
              })}
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                {socialIconsData.map((socialIcon, index) => {
                  return (
                    socialIcon.active && (
                      <Link
                        href={socialIcon.url ?? "/"}
                        target="_blank"
                        key={index}
                      >
                        <Icon
                          icon={getIcon(socialIcon.iconId ?? 1)}
                          size={16}
                        />
                      </Link>
                    )
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 ">
                {linksData.map((link) => {
                  if (link.type == "button" && link.active) {
                    const extraThumbnail = link.extra
                      ? (JSON.parse(link.extra ?? "") as IExtraThumbnail)
                      : null;
                    return (
                      <Link
                        onClick={() => {
                          handleClick(link.id);
                        }}
                        href="/"
                        key={link.id}
                        target="_blank"
                        className=" relative flex min-h-[56px] w-full items-center justify-center px-[56px] py-4 font-medium transition duration-300 ease-in-out hover:scale-[1.05]"
                        style={getButtonStyle(themeData!)}
                      >
                        {link.extra &&
                        extraThumbnail?.thumbnailType == "ICON" ? (
                          <div className=" absolute left-1.5 flex aspect-square h-10 items-center justify-center">
                            <Icon
                              icon={getIcon(extraThumbnail?.iconId ?? 0)}
                              size={24}
                            />
                          </div>
                        ) : extraThumbnail?.thumbnailType == "IMAGE" ? (
                          <div className=" absolute left-1.5">
                            <div
                              className=" relative aspect-square h-11 overflow-hidden"
                              style={getThumbnailStyle(themeData!)}
                            >
                              <Image
                                src={extraThumbnail.imageUrl ?? ""}
                                alt=""
                                fill
                                className=" object-cover"
                              />
                            </div>
                          </div>
                        ) : null}
                        <p>{link.label}</p>
                      </Link>
                    );
                  }
                  if (link.type == "header" && link.active) {
                    return (
                      <h1
                        key={link.id}
                        className={cn(
                          " font-semibold ",
                          headerTextAlign(
                            JSON.parse(link.extra ?? "") as IExtraTextAlign,
                          ),
                        )}
                      >
                        {link.label}
                      </h1>
                    );
                  }
                  if (link.type == "youtube" && link.active) {
                    return (
                      <iframe
                        key={link.id}
                        className=" aspect-video w-full rounded-xl"
                        src={`https://www.youtube.com/embed/${getVideoIdFromYoutubeUrl(
                          link.url ?? "",
                        )}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    );
                  }
                  if (link.type == "x" && link.active && link.url != "") {
                    return <TwitterEmbed key={link.id} url={link.url ?? ""} />;
                  }
                  if (link.type == "text" && link.active && link.url != "") {
                    return (
                      <Link
                        onClick={() => handleClick(link.id)}
                        key={link.id}
                        href={link.url ?? "/"}
                        target="_blank"
                        className=" text-center underline"
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  if (link.type == "divider" && link.active) {
                    return (
                      <div
                        key={link.id}
                        className={cn(" w-full border-b")}
                        style={dividerStyle(link.extra ?? "")}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {themeData?.hideLogo ? null : (
            <div
              className={cn(
                " mt-8 flex items-center  justify-center gap-x-1 justify-self-end",
              )}
            >
              <Logo path="/" target="_blank" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
