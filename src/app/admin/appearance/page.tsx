"use client";

import Container from "~/components/container";
import TabButtons from "~/components/tab/tab-buttons";
import TabFonts from "~/components/tab/tab-fonts";
import TabProfile from "~/components/tab/tab-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TABS } from "~/lib/data/constants";

export default function AppearancePage() {
  return (
    <Container>
      <Tabs defaultValue="profile" className=" h-full w-full">
        <TabsList className="flex h-fit justify-between overflow-x-scroll rounded-full bg-white [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
              className=" flex-1 rounded-full px-4 py-2.5 font-medium hover:bg-violet-700 hover:text-white data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="profile">
          <TabProfile />
        </TabsContent>
        <TabsContent value="themes">
          {/* <TabThemes theme={dataTheme} refetch={refetchTheme} /> */}
        </TabsContent>
        <TabsContent value="buttons">
          <TabButtons />
        </TabsContent>
        <TabsContent value="fonts">
          <TabFonts />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
