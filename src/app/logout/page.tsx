"use client";

import { signIn, signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <button className="" onClick={() => signIn("google")}>
        signIn
      </button>
      <button className="" onClick={() => signOut()}>
        signout
      </button>
    </div>
  );
}
