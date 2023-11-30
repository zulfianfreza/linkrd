import { getServerAuthSession } from "~/server/auth";
import ClientHomePage from "./client-page";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <>
      <ClientHomePage session={session} />
    </>
  );
}
