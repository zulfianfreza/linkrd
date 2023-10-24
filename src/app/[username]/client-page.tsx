"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TwitterEmbed } from "react-social-media-embed";
import Avatar from "~/components/avatar";
import Logo from "~/components/logo";
import { dividerStyle, headerTextAlign } from "~/hooks/use-style";
import { cn, getVideoIdFromYoutubeUrl } from "~/lib/utils";
import type { IExtraDivider, IExtraTextAlign, ILink } from "~/types/link";
import type { ISite } from "~/types/site";
import { IUser } from "~/types/user";

interface UsernameClientPageProps {
  links: ILink[];
  site: ISite | undefined;
  user: IUser | undefined;
}

export default function UsernameClientPage({
  links,
  site,
  user,
}: UsernameClientPageProps) {
  const [linksData, setLinksData] = useState<ILink[]>(links);

  useEffect(() => {
    window.addEventListener(
      "message",
      (event: MessageEvent<{ type: string; links: ILink[] }>) => {
        const type = event.data.type;
        const data = event.data;
        if (type === "links-updated") {
          setLinksData(data.links);
        }
      },
    );
  }, []);

  return (
    <div className=" flex min-h-screen w-full flex-col">
      <div className="mx-auto flex h-full min-h-screen w-full max-w-lg flex-col bg-violet-700 p-5 pt-16">
        <div className="flex-1 ">
          {/* PROFILE */}
          <div className=" flex flex-col items-center justify-center gap-y-4 md:flex-row">
            <div className=" flex flex-col items-center justify-center gap-x-8">
              <Avatar
                src={site?.profileImage ?? user?.image}
                className=" h-24 w-24"
              />
              <div className=" mt-2 flex flex-1 flex-col gap-y-2">
                <div className=" text-center">
                  <p className=" text-xl font-bold ">
                    {site?.profileTitle != ""
                      ? site?.profileTitle
                      : "Profile Title"}
                  </p>
                  <p className=" text-center font-medium">
                    {site?.bio != "" ? site?.bio : "Bio"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-4 gap-y-6">
            <div className="flex flex-col gap-4">
              {linksData.map((link) => {
                if (link.type == "button" && link.active) {
                  return (
                    <div
                      key={link.id}
                      className=" flex h-12 w-full items-center justify-center bg-white px-4"
                    >
                      <p>{link.label}</p>
                    </div>
                  );
                }
                if (link.type == "header" && link.active) {
                  return (
                    <h1
                      key={link.id}
                      className={cn(
                        " font-semibold text-neutral-800",
                        headerTextAlign(link.extra as IExtraTextAlign),
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
                if (link.type == "x" && link.active) {
                  return <TwitterEmbed key={link.id} url={link.url ?? ""} />;
                }
                if (link.type == "text" && link.active) {
                  return (
                    <Link
                      key={link.id}
                      href={link.url ?? "/"}
                      className=" text-center text-neutral-800 underline"
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
                      style={dividerStyle(link.extra as IExtraDivider)}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div
          className={cn(
            " flex items-center justify-center  gap-x-1 justify-self-end py-4",
          )}
        >
          <Logo />
        </div>
      </div>
    </div>
  );
}
