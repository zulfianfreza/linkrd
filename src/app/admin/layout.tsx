import Navbar from "~/components/navbar/navbar";
import PreviewPage from "~/components/preview-page";
import { api } from "~/trpc/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.user.getCurrentUser.query();
  return (
    <>
      <Navbar user={user} />
      <div className=" flex w-full bg-gray-100">
        <PreviewPage username="adam" />
        {children}
      </div>
    </>
  );
}
