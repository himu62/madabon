import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import SideNavLayout from "@/components/layout/navigation";

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
          <SideNavLayout>{children}</SideNavLayout>
        </Provider>
      </body>
    </html>
  );
}
