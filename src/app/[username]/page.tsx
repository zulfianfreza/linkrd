import React from "react";
import { api } from "~/trpc/server";
import UsernameClientPage from "./client-page";
import Logo from "~/components/logo";
import { IUser } from "~/types/user";

interface PageParams {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageParams) {
  const user = await api.user.getUserByUsername.query({
    username: params.username,
  });

  const links = await api.link.getLinksByUsername.query({
    userId: user?.id,
  });

  const site = await api.site.getSiteByUsername.query({
    userId: user?.id,
  });

  if (!user) {
    return (
      <div className=" flex h-screen w-full items-center justify-center">
        <div className=" flex h-full max-w-lg items-center p-5">
          <h1 className=" text-center text-xl text-gray-800">
            The page you’re looking for doesn’t exist. Please check back soon.
          </h1>
          <Logo
            className=" absolute bottom-5 right-1/2 translate-x-1/2"
            path="/"
          />
        </div>
      </div>
    );
  }

  return <UsernameClientPage links={links} site={site} user={user as IUser} />;
}
