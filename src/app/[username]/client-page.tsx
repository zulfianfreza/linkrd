/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TwitterEmbed } from "react-social-media-embed";
import { dividerStyle, headerTextAlign } from "~/hooks/use-style";
import { cn, getVideoIdFromYoutubeUrl } from "~/lib/utils";
import { IExtraDivider, IExtraTextAlign, ILink } from "~/types/link";

interface UsernameClientPageProps {
  links: ILink[];
}

export default function UsernameClientPage({ links }: UsernameClientPageProps) {
  const [linksData, setLinksData] = useState<ILink[]>(links);

  useEffect(() => {
    window.addEventListener("message", (event: MessageEvent) => {
      const type = event.data.type as string;
      const data = event.data;
      if (type === "links-updated") {
        setLinksData(data.links as ILink[]);
      }
    });
  }, []);

  return linksData.map((link) => {
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
  });
}
