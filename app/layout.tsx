import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import Header from "../components/header/Header";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MainLayout from "@/layouts/MainLayout";
import { Providers } from "./providers";

interface LayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
    return (
        <html lang="en">
            <head>
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
