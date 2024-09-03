"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/earn");
    }, [router]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Redirecting...
        </main>
    );
}
