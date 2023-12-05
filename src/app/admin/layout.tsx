import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "~/components/navbar/navbar";
import PreviewPage from "~/components/preview-page";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Linkrd Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  const user = await api.user.getCurrentUser.query();
  if (user?.username == null || user?.username == "") {
    redirect("/user-information");
  }
  const site = await api.site.getSite.query();
  return (
    <>
      <Navbar user={user} site={site} />
      <div className=" flex w-full bg-neutral-100">
        <PreviewPage username={user?.username ?? ""} />
        {children}
      </div>
    </>
  );
}
