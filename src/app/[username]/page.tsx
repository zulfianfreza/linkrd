import type { Metadata } from "next";
import Logo from "~/components/logo";
import { api } from "~/trpc/server";
import type { IUser } from "~/types/user";
import UsernameClientPage from "./client-page";

interface PageParams {
  searchParams: {
    is_creation_mode: string;
  };
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const user = await api.user.getUserByUsername.query({
    username: params.username,
  });

  if (!user) {
    return {
      title: "Linkrd | Page Not Found",
    };
  }

  const site = await api.site.getSiteByUsername.query({
    userId: user.id,
  });

  return {
    title: site?.metaTitle ?? site?.profileTitle ?? user?.name,
    description: site?.metaDescription,
  };
}

export default async function Page({ params, searchParams }: PageParams) {
  const user = await api.user.getUserByUsername.query({
    username: params.username,
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

  const isCreationMode = searchParams.is_creation_mode;

  if (!isCreationMode && user) {
    await api.site.updateViewCount.query({ userId: user.id });
  }

  const links = await api.link.getLinksByUsername.query({
    userId: user.id,
  });

  const site = await api.site.getSiteByUsername.query({
    userId: user.id,
  });

  const theme = await api.theme.getThemeByUsername.query({ userId: user.id });

  const socialIcons = await api.socialIcon.getSocialIconByUsername.query({
    userId: user.id,
  });

  return (
    <>
      <UsernameClientPage
        links={links}
        site={site}
        user={user as IUser}
        theme={theme}
        socialIcons={socialIcons}
      />
    </>
  );
}
