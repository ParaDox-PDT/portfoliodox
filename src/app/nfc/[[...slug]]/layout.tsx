import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NFC Pay — Bir teginishda to'lov | Download App",
  description:
    "NFC Pay ilovasi orqali teginish orqali tezkor va xavfsiz to'lovlarni amalga oshiring. Google Play va App Store dan yuklab oling.",
  openGraph: {
    title: "NFC Pay — Bir teginishda to'lov",
    description:
      "Telefoningizni NFC tegiga tekkizing va bir soniyada to'lovni amalga oshiring.",
    type: 'website',
  },
};

export default function NfcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
