import type { Metadata } from "next";
import "./globals.css";
import { ColorModeButton } from "../components/ui/color-mode";
import { Provider } from "../components/ui/provider";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
} from "../components/ui/drawer";

export const metadata: Metadata = {
  title: "madabon",
  description:
    "Discord Manipulation Tool for Game Masters of Murder-Mystery/TTRPGs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Provider>
          <DrawerRoot>
            <DrawerBackdrop />
            <DrawerTrigger />
            <DrawerContent>this is drawer</DrawerContent>
          </DrawerRoot>
          <ColorModeButton />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
