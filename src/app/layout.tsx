import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import BackgroundAnimation from "@/components/background-animation";
import ClientLayout from "@/components/client-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
