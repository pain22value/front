"use client";

import TanstackProvider from "@/components/providers/TanstackProvider";
import { ClientTelemetryTracker } from "./ClientTelemetryTracker";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import { createContext } from "react";

export const Context = createContext<Record<string, never>>({});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientTelemetryTracker />
      <Context.Provider value={{}}>
        <TanstackProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </TanstackProvider>
      </Context.Provider>
    </>
  );
}
