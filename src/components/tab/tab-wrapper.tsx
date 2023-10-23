"use client";

import React from "react";

export default function TabWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" mt-4">
      <h1 className=" text-lg font-semibold text-neutral-800">Profile</h1>
      {children}
    </div>
  );
}
