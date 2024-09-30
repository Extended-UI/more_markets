import React, { ReactNode } from "react";
import MainLayout from "@/layouts/MainLayout";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "./providers";

import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>More Markets</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google tag (gtag.js) */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </head>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
