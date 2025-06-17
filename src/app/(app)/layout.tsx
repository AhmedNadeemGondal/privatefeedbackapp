import Navbar from "@/components/Navbar";
import { OverlayProvider } from "./contexts/OverlayContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <OverlayProvider>
        <Navbar />
        {children}
      </OverlayProvider>
    </div>
  );
}
