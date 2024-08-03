import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EAST LINE",
  description: "EAST LINE TELEKOM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative flex flex-col`}>
        <Header />
        <div className="grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
