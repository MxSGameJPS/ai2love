import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import BackgroundAnimation from "@/components/background-animation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundAnimation />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
