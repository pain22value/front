"use client";

import TanstackProvider from "@/components/providers/TanstackProvider";
import { createContext, Suspense } from "react";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import { PostHogProvider, PostHogPageView } from "./PostHogProvider";
import { InteractionTracker } from "./InteractionTracker";

export const Context = createContext<Record<string, never>>({});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <InteractionTracker />
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <Context.Provider value={{}}>
        <TanstackProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </TanstackProvider>
      </Context.Provider>
    </PostHogProvider>
  );
}
