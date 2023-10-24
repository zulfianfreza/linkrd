import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "~/components/navbar/navbar";
import PreviewPage from "~/components/preview-page";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/logout");
  }
  const user = await api.user.getCurrentUser.query();
  return (
    <>
      <Navbar user={user} />
      <div className=" flex w-full bg-gray-100">
        <PreviewPage username={user?.username ?? ""} />
        {children}
      </div>
    </>
  );
}
