"use client";

import React from "react";

interface TabWrapperProps {
  children: React.ReactNode;
  title: string;
}
export default function TabWrapper({ children, title }: TabWrapperProps) {
  return (
    <div className=" mt-8">
      <h1 className=" text-lg font-semibold text-neutral-800">{title}</h1>
      {children}
    </div>
  );
}
