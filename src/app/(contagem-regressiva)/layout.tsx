import type { Metadata } from "next";
import { Inter, Zen_Dots } from "next/font/google";

import {MenuSuper} from '@/app/components/collection.menu/menu/index'
import Home from "./contagem-de-dias/page";

const inter = Inter({ subsets: ["latin"] });
const zdots = Zen_Dots({ 
  subsets : ["latin-ext"],
  weight : '400'
 });

export const metadata: Metadata = {
  title: "Contagem Regressiva",
  description: "Contagem regressiva dos desafios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
    <html lang="pt" className="bg-slate-900">
      <body className={(zdots.className) as any}>
      <MenuSuper />
        {children}
        </body>
    </html>
  </>
  );
}
