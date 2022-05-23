import { ReactNode } from "react";
import { ErrorBoundary } from "./error";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageRoot({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="page-root flex h-screen min-h-screen flex-col bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-50 font-sans font-light text-blue-800 selection:bg-indigo-400 selection:text-white">
      <Header />

      <div className="flex-grow overflow-y-auto">
        <main className="h-full">
          {/* boundary to catch errors where we can still show some UI (like the header and footer) */}
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>

      <Footer />
    </div>
  );
}
