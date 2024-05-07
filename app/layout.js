import { Inter } from "next/font/google";
import "./globals.css";
import "./Assist/Css/style.css"
import "./Assist/Css/Responsive.css"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tong Topup offer service",
   description:"this is an affer providing site for Telicommunication system."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
      {children}
      <Footer/>
      </body>
    </html>
  );
}
