import { Kaushan_Script } from "next/font/google";
import "./globals.css";

const inter = Kaushan_Script({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Undangan Pernikahan",
  description:
    "Bergabunglah bersama kami dalam merayakan kebersamaan Mas Kuff dan Mbak Kuff saat mereka memulai perjalanan indah bersama. Kami mengundang Anda untuk berbagi kegembiraan dan cinta di hari istimewa kami.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        property="og:title"
        content="Undangan Pernikahan by Mas Kuff & Mbak Kuff"
      />
      <meta
        property="og:description"
        content="Bergabunglah bersama kami dalam merayakan kebersamaan Mas Kuff dan Mbak Kuff saat mereka memulai perjalanan indah bersama. Kami mengundang Anda untuk berbagi kegembiraan dan cinta di hari istimewa kami."
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
