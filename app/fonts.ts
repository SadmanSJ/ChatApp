import { Inter, Kanit, Roboto } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
});
