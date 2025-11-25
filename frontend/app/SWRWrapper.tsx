// app/SWRWrapper.tsx
"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { SidebarNav, MobileNav } from "./components/SideNavBar";

export default function SWRWrapper({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: true,
        dedupingInterval: 2000,
      }}
    >
              <div className="min-h-screen bg-slate-100 flex justify-center">
            <main className="w-full max-w-6xl p-4 md:p-8">
              <div className="flex gap-4 md:gap-6">
                <aside className="hidden md:block w-20">
                  <SidebarNav />
                </aside>

                <div className="flex-1 pb-20 md:pb-0">{children}</div>
              </div>

              <MobileNav />
            </main>
          </div>
    </SWRConfig>
  );
}


