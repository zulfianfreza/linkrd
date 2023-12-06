import "~/styles/globals.css";
import "~/styles/themes.css";

import { Noto_Sans } from "next/font/google";
import { headers } from "next/headers";

import Providers from "~/components/providers";
import { TRPCReactProvider } from "~/trpc/react";

const monserrat = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Linkrd",
  description: "Link in bio tool website.",
  icons: [{ rel: "icon", url: "/images/logo-linkstation.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${monserrat.variable} bg-gray-100 tracking-tight antialiased`}
      >
        <TRPCReactProvider headers={headers()}>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
