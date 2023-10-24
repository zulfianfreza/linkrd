"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  type DropResult,
  type DroppableProvided,
} from "react-beautiful-dnd";
import CardAddLink from "~/components/card/card-add-link";
import CardButtonLink from "~/components/card/card-button-link";
import CardDivider from "~/components/card/card-divider";
import CardHeader from "~/components/card/card-header";
import CardTextLink from "~/components/card/card-text-link";
import CardX from "~/components/card/card-x";
import CardYoutube from "~/components/card/card-youtube";
import Container from "~/components/container";
import { DroppableStrictMode } from "~/components/droppable-strict-mode";
import Loading from "~/components/loading";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { ILink, ILinkDivider, ILinkTextAlign } from "~/types/link";

export default function AdminPage() {
  const [linksData, setLinksData] = useState<ILink[]>([]);

  const previewLoading = usePreviewLoading();
  const { toast } = useToast();

  const { data, isLoading, refetch } = api.link.getLinks.useQuery(undefined, {
    onSuccess(data) {
      setLinksData(data);
    },
  });

  const dataLinks = linksData ?? data;

  const hotReloadIframe = async () => {
    const links = await refetch();
    const iframe = document.getElementById("preview-page") as HTMLIFrameElement;

    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        type: "links-updated",
        links: links.data,
      },
      "*",
    );
  };

  const reorderMutation = api.link.reorderLinkPosition.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: async () => {
      previewLoading.setIsLoading(false);
      await hotReloadIframe();
    },
    onError: (error) => {
      previewLoading.setIsLoading(false);
      toast({ title: JSON.stringify(error.message) });
    },
  });

  const reorderLinksMutation = (
    id: string,
    newIndex: number,
    oldIndex: number,
  ) => {
    reorderMutation.mutate({ linkId: id, newIndex, oldIndex });
  };

  const reorderLinks = (result: DropResult) => {
    const id = result.draggableId;
    const newIndex = result.destination?.index ?? -1;
    const oldIndex = result.source.index;
    const { source, destination } = result;

    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    const newLinks = [...linksData];
    const [removed] = newLinks.splice(source.index, 1);
    newLinks.splice(destination.index, 0, removed!);

    setLinksData(newLinks);

    if (id && newIndex >= 0 && oldIndex >= 0) {
      reorderLinksMutation(id, newIndex, oldIndex);
    }
  };

  return (
    <Container>
      <CardAddLink hotReload={hotReloadIframe} />

      {isLoading ? (
        <div className=" flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : dataLinks?.length == 0 ? (
        <div className=" flex h-full w-full flex-col items-center justify-center gap-y-4">
          {/* <Logo className=" opacity-25 grayscale filter" /> */}
          <p className=" text-center font-semibold leading-tight text-gray-400">
            Show the world who you are. <br />
            Add a link to get started.
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={reorderLinks}>
          <DroppableStrictMode droppableId="links">
            {(provided: DroppableProvided) => (
              <ul
                className="links mt-8 flex w-full flex-col gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dataLinks?.map((link, index) => (
                  <Draggable
                    key={link.id}
                    index={index}
                    draggableId={link.id.toString()}
                  >
                    {(provided) => (
                      <li
                        className=" hover:cursor-default"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        {link.type == "button" ? (
                          <CardButtonLink
                            key={index}
                            link={link}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : link.type == "header" ? (
                          <CardHeader
                            key={index}
                            link={link as ILinkTextAlign}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : link.type == "youtube" ? (
                          <CardYoutube
                            key={index}
                            link={link}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : link.type == "x" ? (
                          <CardX
                            key={index}
                            link={link}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : link.type == "text" ? (
                          <CardTextLink
                            key={index}
                            link={link}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : link.type == "divider" ? (
                          <CardDivider
                            key={index}
                            link={link as ILinkDivider}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : null}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </DroppableStrictMode>
        </DragDropContext>
      )}
    </Container>
  );
}
