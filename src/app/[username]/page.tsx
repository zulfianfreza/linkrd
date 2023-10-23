import React from "react";
import { api } from "~/trpc/server";
import UsernameClientPage from "./client-page";

interface PageParams {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageParams) {
  const links = await api.link.getLinksByUsername.query({
    username: params.username,
  });

  return (
    <div className=" min-h-screen w-full">
      <div className="mx-auto min-h-screen max-w-lg bg-violet-700 p-5 pt-16">
        <div className="flex flex-col gap-4">
          <UsernameClientPage links={links} />
        </div>
      </div>
    </div>
  );
}
