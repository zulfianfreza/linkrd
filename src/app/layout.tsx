import "~/styles/globals.css";
import "~/styles/themes.css";

import { Montserrat } from "next/font/google";
import { headers } from "next/headers";

import Providers from "~/components/providers";
import { TRPCReactProvider } from "~/trpc/react";

const monsMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Catalink",
  description: "Link in bio website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${monsMontserrat.variable} bg-gray-100`}>
        <TRPCReactProvider headers={headers()}>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
