import { Kaushan_Script } from "next/font/google";
import "./globals.css";

const inter = Kaushan_Script({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Wedding Invitation",
  description:
    "Join us in celebrating the union of Mas Kuff & Mbak Kuff as they embark on a beautiful journey together. We invite you to share in the joy and love of our special day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        property="og:title"
        content="Wedding invitation by Mas Kuff & Mbak Kuff"
      />
      <meta
        property="og:description"
        content="Join us in celebrating the union of Mas Kuff & Mbak Kuff as they embark on a beautiful journey together. We invite you to share in the joy and love of our special day"
      />
      <meta
        property="og:image"
        content="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/slide-1-2372-202102060607.jpg"
      />
      <meta property="og:image:alt" content="About Acme" />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
