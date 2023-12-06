import React from "react";
import UserInformationClientPage from "./client-page";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function UserInformationPage() {
  const user = await api.user.getCurrentUser.query();
  if (!user) {
    redirect("/");
  }
  if (user.username && user.username != "") {
    redirect("/admin");
  }
  return <UserInformationClientPage />;
}
