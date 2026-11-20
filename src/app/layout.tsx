import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "AZ MARKET | Sàn thương mại điện tử",
  description: "Một sàn thương mại điện tử đa người bán.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
