"use client";

import TanstackProvider from "@/components/providers/TanstackProvider";
import { createContext } from "react";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

export const Context = createContext<{}>({});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Context.Provider value={{}}>
      <TanstackProvider>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </TanstackProvider>
    </Context.Provider>
  );
}
