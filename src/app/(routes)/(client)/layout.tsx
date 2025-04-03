"use client";

import { Banner } from "@/app/components/banner";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import type React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Banner />
      <main className="flex-1">
        <div className="h-full">
          <div className="mb-4" />
          {children}
        </div>
      </main>
    </div>
  );
}
