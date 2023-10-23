import type { QueryObserverResult } from "@tanstack/react-query";
import type { Link } from "~/server/db/schema";

interface hotReloadLinksProps {
  refetchLinks: () => Promise<QueryObserverResult>;
}

export async function hotReloadLinks({ refetchLinks }: hotReloadLinksProps) {
  const links = await refetchLinks();
  const iframe = document.getElementById("preview-page") as HTMLIFrameElement;

  if (!iframe) return;

  iframe.contentWindow?.postMessage(
    {
      type: "links-updated",
      links: links.data,
    },
    "*",
  );
}
