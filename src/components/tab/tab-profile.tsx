"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import type { Site } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TabWrapper from "./tab-wrapper";
import { env } from "~/env.mjs";
import { deleteImageCloudinary } from "~/lib/cloudinary";
import axios, { AxiosResponse } from "axios";
import Avatar from "../avatar";
import Loading from "../loading";
import { ICloudinaryResponse } from "~/types/shared";

interface TabProfileProps {
  site: Site | undefined;
  refetch: () => void;
}

export default function TabProfile({ site, refetch }: TabProfileProps) {
  const [profileTitle, setProfileTitle] = useState(site?.profileTitle ?? "");
  const [bio, setBio] = useState(site?.bio ?? "");

  const session = useSession();
  const previewLoading = usePreviewLoading();
  const { toast } = useToast();

  const updateSiteMutation = api.site.updateSite.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      // await hotReloadIframe();
      refetch();
    },
    onError: (error) => {
      toast({ title: JSON.stringify(error.message) });
    },
    onSettled: () => {
      previewLoading.setIsLoading(false);
    },
  });

  const handleUpdateSite = (imageUrl?: string) => {
    updateSiteMutation.mutate({ profileTitle, bio, profileImage: imageUrl });
  };

  const onBlur = () => {
    if (profileTitle == site?.profileTitle && bio == site?.bio) return;
    handleUpdateSite();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;
    if (e.target.files?.[0]) {
      if (e.target.files[0].size > 2e6) {
        toast({
          title: "Please upload a file smaller than 2 MB",
          variant: "destructive",
        });
        return false;
      }
      file = e.target.files[0];
    }

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      previewLoading.setIsLoading(true);
      setIsLoadingUpload(true);
      if (site?.profileImage !== "") {
        await deleteImageCloudinary(site?.profileTitle ?? "");
      }

      const { data } = await axios.post<ICloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      console.log(data);
      handleUpdateSite(data.secure_url);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      previewLoading.setIsLoading(false);
      setIsLoadingUpload(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      previewLoading.setIsLoading(true);
      setIsLoadingDelete(true);
      await deleteImageCloudinary(site?.profileImage ?? "");
      handleUpdateSite("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      previewLoading.setIsLoading(false);
      setIsLoadingDelete(false);
    }
  };

  return (
    <TabWrapper title="Profile">
      <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
        <div className="flex gap-4">
          <Avatar
            src={
              site?.profileImage && site.profileImage != ""
                ? site.profileImage
                : session.data?.user.image
            }
            className=" h-24 w-24"
          />
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="file"
              name=""
              id=""
              className=" hidden"
              ref={inputRef}
              onChange={handleUpdateImage}
              accept="image/png, image/jpg, image/jpeg"
            />
            <Button
              className=" h-12 w-full gap-1 rounded-full"
              onClick={handleClick}
            >
              {isLoadingUpload ? (
                <>
                  <Loading className=" w-4" />
                  <p>Uploading</p>
                </>
              ) : (
                <p>Choose an Image</p>
              )}
            </Button>
            <Button
              className=" h-12 w-full gap-1 rounded-full"
              variant="outline"
              onClick={handleDeleteImage}
            >
              {isLoadingDelete ? (
                <>
                  <Loading className=" w-4" />
                  <p>Deleting</p>
                </>
              ) : (
                <p>Remove</p>
              )}
            </Button>
          </div>
        </div>

        <div className=" mt-4 flex flex-col gap-2">
          <div className=" relative w-full">
            <Input
              label="Profile Title"
              value={profileTitle}
              onBlur={onBlur}
              onChange={(e) => setProfileTitle(e.target.value)}
            />
          </div>
          <div className=" relative w-full">
            <textarea
              value={bio}
              onBlur={onBlur}
              onChange={(e) => setBio(e.target.value)}
              placeholder=" "
              className={cn(
                "peer h-24 w-full rounded-lg bg-gray-100 p-2 pl-4 pt-6 text-sm outline-none transition hover:ring-2 hover:ring-gray-200 focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-70",
              )}
            />
            <label
              className={cn(
                "absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-[0.75] transform truncate text-sm text-gray-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-[0.75]",
              )}
            >
              Bio
            </label>
          </div>
        </div>
      </div>
    </TabWrapper>
  );
}
