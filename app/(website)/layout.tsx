import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PolycapWidget } from "@/components/ai/PolycapWidget";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <PolycapWidget />
    </>
  );
}
