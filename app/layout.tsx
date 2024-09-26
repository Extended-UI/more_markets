"use client";

import React, { ReactNode, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Providers } from "./providers";

import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  const checkRegion = async () => {
    try {
      const res = await fetch("https://get.geojs.io/v1/ip.json", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const respData = await res.json();
        console.log(respData.ip);
      }
    } catch (err) {
      console.log("can not detect the location");
    }
  };

  useEffect(() => {
    checkRegion();
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9W0VBJHBWM"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9W0VBJHBWM', {
                page_path: window.location.pathname
              });
            `,
          }}
        />
        <title>More Markets</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
